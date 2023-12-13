import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useSuikaStore } from "../store/SuikaStoreProvider";
import { fruit } from "../store/types";

function SuikaBoard() {
  const suikaStore = useSuikaStore();
  const fillIndex = [
    "#94d6c5",
    "#3a987f",
    "#d694c6",
    "#c15da9",
    "#ffd700",
    "#645047",
    "#ff8c00",
    "#e65100",
    "#01579b",
    "#c62828",
  ];
  return (
    <div
      css={css`
        width: ${suikaStore.width}px;
        height: ${suikaStore.height}px;
        border: 1px solid;
      `}
    >
      <svg viewBox={`0 0 ${suikaStore.width} ${suikaStore.height}`}>
        <circle
          cx={suikaStore.posX}
          cy={0}
          r={suikaStore.nowRadius}
          fill={fillIndex[suikaStore.nowFill]}
        />
        {suikaStore.renderFruits.map((fruit: fruit | undefined) => {
          if (fruit)
            return (
              <circle
                cx={fruit.pos.x}
                cy={fruit.pos.y}
                r={fruit.radius}
                fill={fillIndex[fruit.fillIndex >= fillIndex.length ? 0 : fruit.fillIndex]}
              />
            );
          else return <></>;
        })}
      </svg>
    </div>
  );
}

export default observer(SuikaBoard);
