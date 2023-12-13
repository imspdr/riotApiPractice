import { css } from "@emotion/react";
import { unselectable } from "@src/common/util";

export default function CommonTextField(props: {
  value: string;
  onChange: (v: string) => void;
  height?: number;
  width?: number;
  customCss?: string;
}) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding: 5px;
        border: 3px solid;
        min-width: 50px;
        min-height: 20px;
        ${props.customCss && props.customCss}
        ${props.height && `height: ${props.height}px;`}
        ${props.width && `width: ${props.width}px;`}
        ${unselectable}
      `}
    >
      <input
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        css={css`
          width: 50px;
          height: 40px;
          ${props.height && `height: ${props.height}px;`}
          ${props.width && `width: ${props.width}px;`}
          border: 0px;
          font-size: ${props.height ? props.height * 0.5 + "px" : "15px"};
          margin-right: 5px;
        `}
      />
    </div>
  );
}
