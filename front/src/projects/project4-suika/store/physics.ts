import { fruit, twod } from "./types";

const getNorm = (v: twod) => {
  return Math.sqrt(v.x * v.x + v.y * v.y);
};
const getVectorCal = (v1: twod, v2: twod, cal: string): twod => {
  if (cal === "-") {
    return {
      x: v1.x - v2.x,
      y: v1.y - v2.y,
    };
  } else if (cal === "+") {
    return {
      x: v1.x + v2.x,
      y: v1.y + v2.y,
    };
  } else return v1;
};

const getCosThetaV2 = (v1: twod, v2: twod) => {
  const innerProduct = v1.x * v2.x + v1.y * v2.y;
  return innerProduct / getNorm(v1);
};

const nearby = (fruit1: fruit, fruit2: fruit) => {
  return getNorm(getVectorCal(fruit1.pos, fruit2.pos, "-")) < fruit1.radius + fruit2.radius;
};
export const circleCollision = (
  fruit1: fruit,
  fruit2: fruit,
  messOption: boolean,
  colPower: number
): {
  fruit1: fruit;
  fruit2: fruit | undefined;
} => {
  if (!nearby(fruit1, fruit2)) {
    return {
      fruit1: fruit1,
      fruit2: fruit2,
    };
  } else {
    if (fruit1.radius === fruit2.radius) {
      if (fruit1.radius > 120) {
        return {
          fruit1: {
            ...fruit1,
            pos: {
              x: (fruit1.pos.x + fruit2.pos.x) / 2,
              y: (fruit1.pos.y + fruit2.pos.y) / 2,
            },
            radius: 6,
            fillIndex: 0,
          },
          fruit2: undefined,
        };
      } else {
        return {
          fruit1: {
            ...fruit1,
            pos: {
              x: (fruit1.pos.x + fruit2.pos.x) / 2,
              y: (fruit1.pos.y + fruit2.pos.y) / 2,
            },
            radius: fruit1.radius * 1.4,
            fillIndex: fruit1.fillIndex + 1,
          },
          fruit2: undefined,
        };
      }
    }
    const fruit12 = getVectorCal(fruit1.pos, fruit2.pos, "-");
    const fruit21 = getVectorCal(fruit2.pos, fruit1.pos, "-");

    const m1 = messOption ? fruit1.radius * 30 : 500;
    const m2 = messOption ? fruit2.radius * 30 : 500;

    const v21 = getVectorCal(fruit1.velocity, fruit2.velocity, "-");

    // const v1 = getCosThetaV2(fruit21, fruit1.velocity);
    // const v2 = getCosThetaV2(fruit12, fruit2.velocity);

    const dist = fruit1.radius + fruit2.radius;
    const nowDist = getNorm(fruit12);

    const collisionPower = colPower * getNorm(v21);
    const collisionRate = 0.9;

    const newVelo1 = {
      x: (fruit1.velocity.x + (collisionPower / m1) * fruit12.x) * collisionRate,
      y: (fruit1.velocity.y + (collisionPower / m1) * fruit12.y) * collisionRate,
    };
    const newVelo2 = {
      x: (fruit2.velocity.x + (collisionPower / m2) * fruit21.x) * collisionRate,
      y: (fruit2.velocity.y + (collisionPower / m2) * fruit21.y) * collisionRate,
    };
    return {
      fruit1: {
        ...fruit1,
        velocity: newVelo1,
      },
      fruit2: {
        ...fruit2,
        pos: {
          x: fruit1.pos.x + fruit21.x * (dist / nowDist),
          y: fruit1.pos.y + fruit21.y * (dist / nowDist),
        },
        velocity: newVelo2,
      },
    };
  }
};
