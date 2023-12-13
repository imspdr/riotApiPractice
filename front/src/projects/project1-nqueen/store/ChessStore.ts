import { makeAutoObservable } from "mobx";
import { sleep } from "@src/common/util";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class ChessStore {
  private __nQueen: number;
  private __poses: string;
  private __solving: boolean;

  constructor() {
    this.__nQueen = 8;
    this.__poses = "";
    this.__solving = false;
    makeAutoObservable(this);
  }
  get nQueen() {
    return this.__nQueen;
  }
  set nQueen(n: number) {
    if (!this.solving) {
      this.__nQueen = n;
      this.clear();
    }
  }
  get poses() {
    return this.__poses;
  }
  set poses(poses: string) {
    this.__poses = poses;
  }
  get solving() {
    return this.__solving;
  }
  set solving(bool: boolean) {
    this.__solving = bool;
  }

  clear = () => {
    if (!this.solving) this.poses = "";
  };

  addQueenOnPos = (x: number, y: number) => {
    const pos = `${alphabet[x]}${y},`;
    if (this.poses.includes(pos)) {
      this.poses = this.poses.replace(pos, "");
    } else if (!this.isCovered(x, y)) {
      this.poses = this.poses + pos;
    }
  };
  included = (x: number, y: number) => {
    const pos = `${alphabet[x]}${y},`;
    return this.poses.includes(pos);
  };
  isCovered = (x: number, y: number) => {
    let ret = false;
    this.poses.split(",").forEach((pos) => {
      const givenX = pos[0];
      const givenY = Number(pos.slice(1));
      if (givenX) {
        const alpha = alphabet.indexOf(givenX);
        if (alpha === x || givenY === y) {
          ret = true;
          return;
        }
        if (Math.abs(alpha - x) === Math.abs(givenY - y)) {
          ret = true;
          return;
        }
      }
    });
    return ret;
  };

  onClickSolver = async () => {
    this.clear();
    this.solving = true;
    await this.solver(0);
    this.solving = false;
  };
  onClickStop = () => {
    this.solving = false;
  };
  solver = async (i: number) => {
    if (i >= this.nQueen) {
      return true;
    }
    for (let j = 0; j <= this.nQueen; j++) {
      const pos = `${alphabet[i]}${j},`;
      if (j === this.nQueen) {
        const nPos = this.poses.split(",").length - 1;
        this.poses = this.poses.split(",").reduce((a, c, i) => {
          if (i < nPos - 1) {
            return a + c + ",";
          } else {
            return a;
          }
        }, "");
        return false;
      } else if (!this.isCovered(i, j)) {
        await sleep(10);
        this.poses = this.poses + pos;
        let ret = await this.solver(i + 1);
        if (ret) return true;
      }
      if (!this.solving) {
        return true;
      }
    }
  };
}

export default ChessStore;
