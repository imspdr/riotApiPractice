import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { unselectable } from "@src/common/util";
import CloseIcon from "@mui/icons-material/Close";

export default function CommonTemplate(props: {
  title: string;
  children: JSX.Element;
  width?: number;
}) {
  const navigate = useNavigate();
  return (
    <div
      css={css`
        padding: ${props.width && props.width < 600 ? "10px" : "20px"};
        border: 5px solid;
        margin: ${props.width && props.width < 600 ? "10px" : "20px"};
        height: calc(100% - 64px);
        min-height: 500px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          height: 40px;
          font-size: ${props.width && props.width < 500 ? 20 : 30}px;
          ${unselectable}
        `}
      >
        <div>{props.title}</div>
        <div
          onClick={() => {
            navigate("/");
          }}
          css={css`
            width: 20px;
            height: 20px;
          `}
        >
          <CloseIcon />
        </div>
      </div>
      <div
        css={css`
          overflow: auto;
          margin-top: 10px;
          height: calc(100% - 50px);
        `}
      >
        {props.children}
      </div>
    </div>
  );
}
