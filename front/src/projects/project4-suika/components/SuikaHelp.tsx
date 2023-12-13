import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useSuikaStore } from "../store/SuikaStoreProvider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

function SuikaHelp() {
  const suikaStore = useSuikaStore();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-left: 30px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          height: 180px;
          justify-content: space-evenly;
        `}
      >
        <span>{"조작법 : "}</span>
        <span>{"\tSpace (멈춤 / 시작)"}</span>
        <span>{"\t방향키 <- -> (좌우 이동)"}</span>
        <span>{"\tEnter (과일 드랍)"}</span>
        <span>{"\tR (리셋)"}</span>
      </div>
    </div>
  );
}

export default observer(SuikaHelp);
