import { makeAutoObservable, runInAction } from "mobx";
import { sleep } from "@src/common/util";
import { fruit } from "./types";
import { circleCollision } from "./physics";

const EPSILON = 0.0001;

class SuikaStore {
  public fruits: (fruit | undefined)[];
  public renderFruits: (fruit | undefined)[];
  public interval: NodeJS.Timeout | undefined;
  public stopFlag: boolean;
  public createFlag: boolean;

  public width: number;
  public height: number;
  public lossrate: number;
  public t: number;

  private __messOption: boolean;
  private __collisionPower: number;
  private __gravity: number;
  private __lossFlag: boolean;
  private __posX: number;
  private __nowRadius: number;
  private __nowFill: number;
  constructor() {
    this.fruits = [];
    this.renderFruits = [];
    this.__posX = 125;
    this.__nowRadius = 6;
    this.__nowFill = 0;
    this.__lossFlag = false;

    this.width = 250;
    this.height = 350;

    this.lossrate = 0.9; 
    this.t = 1;

    this.__messOption = false;
    this.__gravity = 5;
    this.__collisionPower = 1;

    this.stopFlag = true;
    this.createFlag = false;
    makeAutoObservable(this);
  }
  get messOption() {
    return this.__messOption;
  }
  set messOption(bool: boolean) {
    this.__messOption = bool;
  }
  get gravity() {
    return this.__gravity;
  }
  set gravity(num: number) {
    this.__gravity = num;
  }
  get collisionPower() {
    return this.__collisionPower;
  }
  set collisionPower(num: number) {
    this.__collisionPower = num;
  }

  get posX() {
    return this.__posX;
  }
  set posX(pos: number) {
    if (pos > this.width - this.nowRadius) {
      this.__posX = this.nowRadius;
    } else if (pos < this.nowRadius) {
      this.__posX = this.width - this.nowRadius;
    } else {
      this.__posX = pos;
    }
  }
  get nowRadius() {
    return this.__nowRadius;
  }
  set nowRadius(num: number) {
    this.__nowRadius = num;
  }
  get nowFill() {
    return this.__nowFill;
  }
  set nowFill(num: number) {
    this.__nowFill = num;
  }

  get lossFlag() {
    return this.__lossFlag;
  }
  set lossFlag(bool: boolean) {
    this.__lossFlag = bool;
    if (bool) {
      this.stop();
    }
  }

  start = () => {
    if (this.lossFlag) this.reset();
    this.lossFlag = false;
    this.stopFlag = false;
    this.interval = setInterval(() => {
      this.unitAction(this.t);
      runInAction(() => {
        this.renderFruits = this.fruits;
      });
    }, 16);
  };
  stop = () => {
    this.stopFlag = true;
    if (this.interval) clearInterval(this.interval);
  };

  reset = () => {
    this.fruits = [];
    this.renderFruits = [];
  };
  addFruit = async () => {
    if (this.createFlag || this.stopFlag) return;
    this.createFlag = true;
    await sleep(500);
    this.fruits = [
      ...this.fruits,
      {
        radius: this.nowRadius,
        pos: {
          x: this.posX,
          y: this.nowRadius * 2,
        },
        velocity: { x: 0, y: 5 },
        accel: { x: 0, y: this.gravity },
        fillIndex: this.nowFill,
      },
    ];
    runInAction(() => {
      const rand = Math.random();
      if (rand < 0.4) {
        this.nowRadius = 6 * 1.4;
        this.nowFill = 1;
        this.posX += 1;
      } else if (rand < 0.8) {
        this.nowRadius = 6;
        this.nowFill = 0;
      } else {
        this.nowRadius = 6 * 1.4 * 1.4;
        this.nowFill = 2;
        this.posX -= 1;
      }
      this.createFlag = false;
    });
  };
  unitAction = (t: number) => {
    runInAction(() => {
      // unit move
      for (let n = 0; n < t; n++) {
        for (let i = 0; i < this.fruits.length; i++) {
          let fruit = this.fruits[i];
          if (!fruit) continue;
          let newX = fruit.pos.x + fruit.velocity.x * 0.1;
          let newY = fruit.pos.y + fruit.velocity.y * 0.1;
          let newVeloX = fruit.velocity.x + fruit.accel.x * 0.1;
          let newVeloY = fruit.velocity.y + fruit.accel.y * 0.1;
          if (newY > this.height - fruit.radius) {
            newY = this.height - fruit.radius;
            newVeloY = -(1 - this.lossrate) * newVeloY;
          }
          if (newY < fruit.radius) {
            this.lossFlag = true;
            newVeloY = 0;
          }
          if (newX > this.width - fruit.radius) {
            newX = this.width - fruit.radius;
            newVeloX = -(1 - this.lossrate) * newVeloX;
          }
          if (newX < fruit.radius) {
            newX = fruit.radius;
            newVeloX = -(1 - this.lossrate) * newVeloX;
          }
          if (Math.abs(newVeloX) < EPSILON) newVeloX = 0;
          if (Math.abs(newVeloY) < EPSILON) newVeloY = 0;
          this.fruits = this.fruits.map((fruit, index) => {
            if (index === i && fruit) {
              return {
                ...fruit,
                velocity: {
                  x: newVeloX,
                  y: newVeloY,
                },
                pos: {
                  x: newX,
                  y: newY,
                },
              };
            } else return fruit;
          });
          for (let j = 0; j < this.fruits.length; j++) {
            if (!this.fruits[i] || !this.fruits[j] || i === j) continue;

            let newFruits = circleCollision(
              this.fruits[i]!,
              this.fruits[j]!,
              this.messOption,
              this.collisionPower
            );
            this.fruits = this.fruits.map((fruit, index) => {
              if (index === i) {
                return newFruits.fruit1;
              } else if (index === j) {
                return newFruits.fruit2;
              } else return fruit;
            });
          }
        }
      }
    });
  };
}

export default SuikaStore;
