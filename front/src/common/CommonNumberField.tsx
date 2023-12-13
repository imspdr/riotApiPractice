import { css } from "@emotion/react";
import { unselectable } from "@src/common/util";
import { useState } from "react";

export default function CommonNumberField(props: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  unit?: string;
  height?: number;
  width?: number;
  customCss?: string;
}) {
  const [tempVal, setTempVal] = useState(props.value);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        padding: 5px;
        min-width: 50px;
        min-height: 40px;
        ${props.customCss && props.customCss}
        ${props.height && `height: ${props.height - 10}px;`}
        ${props.width && `width: ${props.width - 10}px;`}
        ${unselectable}
      `}
    >
      <input
        value={tempVal}
        onChange={(e) => {
          if (Number(e.target.value) == 0 || Number(e.target.value)) {
            setTempVal(Number(e.target.value));
          } else {
            if (!e.target.value) {
              setTempVal(0);
            } else {
              setTempVal(props.value);
            }
          }
        }}
        onBlur={(e) => {
          if (tempVal == 0 || tempVal) {
            if (tempVal > props.max) {
              setTempVal(props.max);
              props.onChange(props.max);
            } else if (tempVal < props.min) {
              setTempVal(props.min);
              props.onChange(props.min);
            } else {
              props.onChange(tempVal);
            }
          } else {
            setTempVal(props.value);
          }
        }}
        css={css`
          width: 40px;
          height: 30px;
          min-width: 40px;
          min-height: 30px;
          ${props.height && `height: ${props.height - 10}px;`}
          ${props.width && `width: ${props.width - 10}px;`}
          border: 0px;
          font-size: ${props.height ? props.height * 0.3 + "px" : "15px"};
          margin-right: 5px;
        `}
      />
      {props.unit ? props.unit : ""}
    </div>
  );
}
