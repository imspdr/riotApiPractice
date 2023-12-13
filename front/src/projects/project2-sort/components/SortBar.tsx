import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useSortStore } from "../store/SortStoreProvider";
import { bar } from "../store/SortStore";

function SortBar(props: { width: number; height: number }) {
  const sortStore = useSortStore();
  const width = props.width / sortStore.numberArray.length;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        height: ${props.height}px;
        width: ${props.width}px;
      `}
    >
      <svg viewBox={`0 0 ${props.width} ${props.height}`}>
        {sortStore.numberArray.map((bar: bar, index: number) => {
          const height = (props.height * bar.value) / 1000;
          return (
            <rect
              width={width}
              height={height}
              fill={
                bar.state === "compare" ? "#00ff00" : bar.state === "moving" ? "#0000ff" : "#dddddd"
              }
              x={index * width}
              y={props.height - height}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default observer(SortBar);
