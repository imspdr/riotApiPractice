import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useSuikaStore } from "../store/SuikaStoreProvider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import RefreshIcon from "@mui/icons-material/Refresh";
import { unselectable } from "@src/common/util";

function SuikaController() {
  const suikaStore = useSuikaStore();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        border: 3px solid;
        border-radius: 5px;
        margin-top: 10px;
        width: 200px;
        height: 32px;
        ${unselectable}
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
        `}
        onClick={() => {
          suikaStore.posX -= 5;
        }}
      >
        {"<"}
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
        `}
        onClick={() => {
          suikaStore.posX += 5;
        }}
      >
        {">"}
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
        onClick={() => {
          suikaStore.reset();
        }}
      >
        <RefreshIcon />
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
        onClick={() => {
          if (suikaStore.stopFlag) {
            suikaStore.start();
          } else {
            suikaStore.stop();
          }
        }}
      >
        {suikaStore.stopFlag ? (
          <PlayArrowIcon
            css={css`
              color: var(--darkorange);
            `}
          />
        ) : (
          <StopIcon />
        )}
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
        `}
        onClick={() => {
          suikaStore.addFruit();
        }}
      >
        {"O"}
      </div>
    </div>
  );
}

export default observer(SuikaController);
