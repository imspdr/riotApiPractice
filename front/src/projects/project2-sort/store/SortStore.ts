import { makeAutoObservable, action } from "mobx";
import { sleep } from "@src/common/util";

export type bar = {
  state: string;
  value: number;
};

const generateArray = (length: number) => {
  let ret: bar[] = [];
  for (let i = 0; i < length; i++) {
    ret.push({
      state: "normal",
      value: Math.round(Math.random() * 1000),
    });
  }
  return ret;
};

class SortStore {
  public sortAlgos: {
    label: string;
    value: string;
  }[];

  private __compareCount: number;
  private __selectedAlgo: string;
  private __animateTime: number;
  private __arrayLength: number;
  private __stopFlag: boolean;
  private __numberArray: bar[];
  constructor() {
    this.__compareCount = 0;
    this.__animateTime = 10;
    this.__arrayLength = 300;
    this.__numberArray = generateArray(this.arrayLength);
    this.__stopFlag = true;

    this.sortAlgos = [
      {
        label: "Merge Sort",
        value: "merge",
      },
      {
        label: "Bubble Sort",
        value: "bubble",
      },
      {
        label: "Quick Sort",
        value: "quick",
      },
    ];
    this.__selectedAlgo = "merge";

    makeAutoObservable(this);
  }
  get compareCount() {
    return this.__compareCount;
  }
  set compareCount(num: number) {
    this.__compareCount = num;
  }
  get numberArray() {
    return this.__numberArray;
  }
  set numberArray(numArray: bar[]) {
    this.__numberArray = numArray;
  }
  get stopFlag() {
    return this.__stopFlag;
  }
  set stopFlag(bool: boolean) {
    this.__stopFlag = bool;
  }
  get selectedAlgo() {
    return this.__selectedAlgo;
  }
  set selectedAlgo(algo: string) {
    if (this.selectedAlgo !== algo) {
      this.__selectedAlgo = algo;
      this.reset();
    }
  }
  get arrayLength() {
    return this.__arrayLength;
  }
  set arrayLength(length: number) {
    if (this.arrayLength !== length) {
      this.__arrayLength = length;
      this.reset();
    }
  }
  get animateTime() {
    return this.__animateTime;
  }
  set animateTime(time: number) {
    this.__animateTime = time;
  }

  runSort = () => {
    switch (this.selectedAlgo) {
      case "bubble":
        this.bubbleSort();
        return;
      case "quick":
        this.quickSort();
        return;

      case "merge":
      default:
        this.mergeSort();
        return;
    }
  };
  reset = () => {
    this.stopFlag = true;
    this.compareCount = 0;
    this.numberArray = generateArray(this.arrayLength);
  };

  setState = (indexes: number[], state: string) => {
    indexes.forEach((i) => {
      if (this.numberArray[i]) {
        let val = this.numberArray[i]?.value;
        if (val)
          this.numberArray[i] = {
            value: val,
            state: state,
          };
      }
    });
  };
  setValues = (indexes: number[], values: number[]) => {
    indexes.forEach((ind, i) => {
      let ithVal = values[i];
      if (ithVal) {
        this.numberArray[ind] = {
          state: "normal",
          value: ithVal,
        };
      }
    });
  };

  swap = async (i: number, j: number) => {
    this.setState([i, j], "moving");
    await sleep(this.animateTime);
    const ival = this.numberArray[i]?.value;
    const jval = this.numberArray[j]?.value;
    if (ival && jval) {
      this.setValues([i, j], [jval, ival]);
    }
  };
  compare = async (i: number, j: number) => {
    this.setState([i, j], "compare");
    await sleep(this.animateTime);
    this.setState([i, j], "normal");
    this.compareCount++;
  };

  // 버블
  bubbleSort = async () => {
    this.stopFlag = false;
    for (let i = 0; i < this.numberArray.length - 1; i++) {
      for (let j = 0; j < this.numberArray.length - 1 - i; j++) {
        if (this.stopFlag) {
          return;
        }
        await this.compare(j, j + 1);
        let val1 = this.numberArray[j]?.value;
        let val2 = this.numberArray[j + 1]?.value;
        if (val1 && val2) {
          if (val1 > val2) await this.swap(j, j + 1);
        }
      }
    }
    this.stopFlag = true;
  };

  // 머지
  innerMerge = async (start: number, end: number) => {
    if (this.stopFlag) return;
    const middle = Math.round((start + end) / 2);
    const nowIndexes = [...new Array(end - start + 1)].map((_, i) => start + i);
    let tempArray: number[] = [];
    let left = start;
    let right = middle;

    this.setState(nowIndexes, "compare");
    await sleep(this.animateTime);
    this.compareCount += nowIndexes.length;
    this.setState(nowIndexes, "normal");

    for (let i = 0; i < end - start + 1; i++) {
      let leftVal = this.numberArray[left]?.value;
      let rightVal = this.numberArray[right]?.value;
      if (leftVal && left < middle) {
        if (rightVal && right <= end) {
          if (leftVal < rightVal) {
            tempArray.push(leftVal);
            left++;
          } else {
            tempArray.push(rightVal);
            right++;
          }
        } else {
          tempArray.push(leftVal);
          left++;
        }
      } else {
        if (rightVal && right <= end) {
          tempArray.push(rightVal);
          right++;
        }
      }
    }

    this.setState(nowIndexes, "moving");
    await sleep(this.animateTime);
    this.setState(nowIndexes, "normal");
    this.setValues(nowIndexes, tempArray);
  };
  innerDivide = async (start: number, end: number) => {
    if (this.stopFlag) return;
    if (start < end) {
      const middle = Math.ceil((end + start) / 2);
      await this.innerDivide(start, middle - 1);
      await this.innerDivide(middle, end);
      await this.innerMerge(start, end);
    }
  };
  mergeSort = async () => {
    this.stopFlag = false;
    await this.innerDivide(0, this.numberArray.length - 1);
    this.stopFlag = true;
  };

  // 퀵
  innerQuickSort = async (left: number, right: number) => {
    if (left < right) {
      const pivot = this.numberArray[left]?.value;
      if (pivot) {
        let biggerIndex = right;
        let smallerIndex = left;
        while (biggerIndex > smallerIndex) {
          if (this.stopFlag) return;
          let biggerVal = this.numberArray[biggerIndex]?.value;
          while (biggerVal && biggerVal > pivot) {
            if (this.stopFlag) return;
            await this.compare(left, biggerIndex);
            biggerIndex -= 1;
            biggerVal = this.numberArray[biggerIndex]?.value;
          }
          let smallerVal = this.numberArray[smallerIndex]?.value;
          while (smallerIndex < biggerIndex && smallerVal && smallerVal <= pivot) {
            if (this.stopFlag) return;
            await this.compare(left, smallerIndex);
            smallerIndex += 1;
            smallerVal = this.numberArray[smallerIndex]?.value;
          }
          await this.swap(smallerIndex, biggerIndex);
        }

        let smallerVal = this.numberArray[smallerIndex]?.value;
        if (smallerVal) this.setValues([left, smallerIndex], [smallerVal, pivot]);
        await this.innerQuickSort(left, smallerIndex - 1);
        await this.innerQuickSort(smallerIndex + 1, right);
      }
    }
  };
  quickSort = async () => {
    this.stopFlag = false;
    await this.innerQuickSort(0, this.numberArray.length - 1);
    this.stopFlag = true;
  };
}

export default SortStore;
