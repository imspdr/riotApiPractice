import { observer } from "mobx-react";
import { css } from "@emotion/react";
import { useSortStore } from "../store/SortStoreProvider";
import { unselectable } from "@src/common/util";
import CommonDropDown from "@src/common/CommonDropDown";
import CommonNumberField from "@src/common/CommonNumberField";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import RefreshIcon from "@mui/icons-material/Refresh";

function SortController(props: { width: number }) {
  const sortStore = useSortStore();
  const mobileMode = props.width < 500;
  return (
    <div
      css={css`
        display: flex;
        width: ${props.width}px;
        height: 100px;
        flex-direction: "row";
        margin-bottom: 30px;
        align-items: center;
        justify-content: flex-start;
        font-size: 20px;
        ${unselectable}
      `}
    >
      <CommonDropDown
        nodes={sortStore.sortAlgos}
        selected={sortStore.selectedAlgo}
        onSelect={(v: string) => {
          sortStore.selectedAlgo = v;
        }}
        width={mobileMode ? 150 : 200}
      />
      {!mobileMode && (
        <div
          css={css`
            margin-left: 50px;
            font-size: 12px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-end;
            `}
          >
            {props.width > 720 && <div>{"숫자"}</div>}
            <CommonNumberField
              value={sortStore.arrayLength}
              onChange={(v: number) => (sortStore.arrayLength = v)}
              min={10}
              max={1000}
              unit={"개"}
              width={50}
              customCss={"margin-left: 20px;"}
            />
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
            `}
          >
            {props.width > 720 && <div>{"애니메이션 시간"}</div>}
            <CommonNumberField
              value={sortStore.animateTime}
              onChange={(v: number) => (sortStore.animateTime = v)}
              min={10}
              max={1000}
              unit={"ms"}
              width={50}
              customCss={"margin-left: 20px;"}
            />
          </div>
        </div>
      )}

      {!mobileMode ? (
        <>
          <div
            css={css`
              margin-left: 50px;
              border: 3px solid;
              border-radius: 10px;
              width: 70px;
              height: 70px;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
            onClick={() => {
              if (sortStore.stopFlag) {
                sortStore.runSort();
              } else {
                sortStore.stopFlag = true;
              }
            }}
          >
            {sortStore.stopFlag ? (
              <PlayArrowIcon
                css={css`
                  color: var(--darkorange);
                `}
                fontSize="large"
              />
            ) : (
              <StopIcon fontSize="large" />
            )}
          </div>
          <div
            css={css`
              margin-left: 50px;
            `}
            onClick={() => {
              sortStore.reset();
            }}
          >
            <RefreshIcon fontSize="large" />
          </div>
        </>
      ) : (
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-left: 30px;
            border: 3px solid;
            border-radius: 5px;
            width: 64px;
            height: 32px;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
            `}
            onClick={() => {
              if (sortStore.stopFlag) {
                sortStore.runSort();
              } else {
                sortStore.stopFlag = true;
              }
            }}
          >
            {sortStore.stopFlag ? (
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
              margin-left: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
            onClick={() => {
              sortStore.reset();
            }}
          >
            <RefreshIcon />
          </div>
        </div>
      )}
    </div>
  );
}

export default observer(SortController);
