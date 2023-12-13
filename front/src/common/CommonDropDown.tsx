import { css } from "@emotion/react";
import { unselectable } from "@src/common/util";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function CommonDropDown(props: {
  nodes: {
    label: string;
    value: string;
  }[];
  selected: string;
  onSelect: (v: string) => void;
  height?: number;
  width?: number;
  customCss?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      css={css`
        ${props.customCss && props.customCss}
        display: flex;
        flex-direction: column;
        position: relative;
        ${props.height && `height: ${props.height}px;`}
        ${props.width && `width: ${props.width}px;`}
        ${unselectable}
      `}
    >
      <div
        css={css`
          border: 2px solid;
          padding: 5px 5px 5px 10px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          font-size: 15px;
          min-width: 120px;
          min-height: 30px;
          ${props.height && `height: ${props.height}px;`}
          ${props.width && `width: ${props.width}px;`}
        ${unselectable}
        `}
        onClick={() => {
          setOpen((v) => !v);
        }}
      >
        {props.nodes.find((node) => node.value === props.selected)?.label}
        <ArrowDropDownIcon />
      </div>
      {open && (
        <div
          css={css`
            position: absolute;
            top: ${props.height ? `${props.height + 14}px` : "44px"};
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            font-size: 15px;
          `}
        >
          {props.nodes.map((node) => {
            if (node.value !== props.selected) {
              return (
                <div
                  css={css`
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    min-width: 120px;
                    min-height: 30px;
                    ${props.height && `height: ${props.height}px;`}
                    ${props.width && `width: ${props.width}px;`}
                    padding: 5px 5px 5px 10px;
                    border: 1px solid;
                    border-top: 0px;
                    margin-left: 1px;
                  `}
                  onClick={() => {
                    setOpen(false);
                    props.onSelect(node.value);
                  }}
                >
                  {node.label}
                </div>
              );
            } else {
              return <></>;
            }
          })}
        </div>
      )}
    </div>
  );
}
