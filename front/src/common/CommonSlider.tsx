import { css } from "@emotion/react";
import { unselectable } from "@src/common/util";
import { useState } from "react";

export default function CommonSlider(props: {
  now: number;
  setNow: (v: number) => void;
  step: number;
  min: number;
  max: number;

  width?: number;
  height?: number;
}) {
  if (props.max === props.min) return <></>;
  const { now, step, min, max } = props;
  const width = props.width ? props.width : 200;
  const height = props.height ? props.height : 100;
  const unit = step / (max - min);
  return (
    <div
      css={css`
        height: ${height}px;
        width: ${width + 1}px;
      `}
      onMouseDown={(e) => {
        const mousemove = (ev: MouseEvent) => {
          const val = Math.round(((max - min) * ev.offsetX) / width + min);
          if (val > max) return;
          if (val < min) return;
          props.setNow(val);
        };
        const mouseup = () => {
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        };
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);
      }}
    >
      <svg viewBox={`0 0 ${width + 2} ${height}`}>
        <circle cx={(now - min) * unit * width} cy={height / 2 + 1} r={5} />
        <rect width={width} height={2} x={0} y={height / 2} />
        {unit > 0.05 &&
          [...new Array(Math.ceil(1 / unit + 1))].map((_, index) => {
            return (
              <>
                <rect
                  width={width / (max - min + 1)}
                  height={5}
                  x={index * unit * width}
                  fill={"transparent"}
                  y={height / 2 - 2}
                  onClick={() => {
                    props.setNow(index + min);
                  }}
                />
                <rect
                  width={2}
                  height={5}
                  x={index * unit * width}
                  y={height / 2 - 2}
                  onClick={() => {
                    props.setNow(index + min);
                  }}
                />
              </>
            );
          })}
        <text
          x={0}
          y={height / 2 + 15}
          css={css`
            font-size: 8px;
          `}
        >
          {min}
        </text>
        <text
          x={width - 4}
          y={height / 2 + 15}
          css={css`
            font-size: 8px;
          `}
        >
          {max}
        </text>
      </svg>
    </div>
  );
}
