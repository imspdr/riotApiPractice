import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useChessStore } from "../store/ChessStoreProvider";
import { unselectable } from "@src/common/util";
import { ReactComponent as QueenIcon } from "@src/images/queenIcon.svg";
import RefreshIcon from "@mui/icons-material/Refresh";

function ChessBlock(props: {
  color: number; // 0 for black 1 for white
  size: number;
  hasQueen: boolean;
  isCovered: boolean;
  onClick: () => void;
}) {
  return (
    <div
      css={css`
        width: ${props.size}px;
        height: ${props.size}px;
        background-color: ${props.color === 0
          ? props.isCovered
            ? "#009999"
            : "#000000"
          : props.isCovered
          ? "#22cccc"
          : "#ffffff"};
        color: #000000;
        transition: 0s;
        display: flex;
        align-items: center;
        justify-content: center;
        ${unselectable}
      `}
      onClick={props.onClick}
    >
      {props.hasQueen ? (
        <QueenIcon
          width={`${props.size}px`}
          height={`${props.size}px`}
          fill={props.color === 0 ? "#ffffff" : "#000000"}
        />
      ) : (
        ""
      )}
    </div>
  );
}

function ChessBoard(props: { boardSize: number }) {
  const chessStore = useChessStore();
  const givenSize = props.boardSize < 280 ? 280 : props.boardSize;
  const boardSize = Math.round(givenSize / chessStore.nQueen) * chessStore.nQueen;
  return (
    <div>
      <div
        css={css`
          display: flex;
          flex-direcion: row;
          justify-content: space-between;
          width: ${givenSize}px;
          align-items: center;
        `}
      >
        {givenSize >= 500 && (
          <div
            css={css`
              width: 10%;
            `}
          >
            {`N퀸 : `}
          </div>
        )}
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            width: 20%;
          `}
        >
          <div
            onClick={() => {
              if (chessStore.nQueen > 4) {
                chessStore.nQueen = chessStore.nQueen - 1;
              }
            }}
            css={css`
              width: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              ${unselectable}
              ${chessStore.solving ? "color : #AAAAAA;" : ""}
            `}
          >
            {"-"}
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            {`${chessStore.nQueen}`}
          </div>
          <div
            onClick={() => {
              if (chessStore.nQueen < 20) {
                chessStore.nQueen = chessStore.nQueen + 1;
              }
            }}
            css={css`
              width: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              ${chessStore.solving ? "color : #AAAAAA;" : ""}
              ${unselectable}
            `}
          >
            {"+"}
          </div>
        </div>

        <div
          onClick={() => {
            if (chessStore.solving) {
              chessStore.onClickStop();
            } else {
              chessStore.onClickSolver();
            }
          }}
          css={css`
            width: 25%;
            display: flex;
            align-items: center;
            justify-content: center;
            ${unselectable}
          `}
        >
          {chessStore.solving ? "그만해!" : "풀어줘!"}
        </div>
        <div
          onClick={() => chessStore.clear()}
          css={css`
            width: 20%;
            display: flex;
            align-items: center;
            justify-content: center;
            ${chessStore.solving ? "color : #AAAAAA;" : ""}
            ${unselectable}
          `}
        >
          {chessStore.poses.split(",").length - 1 === chessStore.nQueen ? "CLEAR" : <RefreshIcon />}
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            width: 25%;
          `}
        >
          <div>{givenSize >= 500 ? `배치한 퀸 : ` : ""}</div>
          <div
            css={css`
              width: 20px;
              margin-left: 10px;
            `}
          >
            {`${chessStore.poses.split(",").length - 1}`}
          </div>
        </div>
      </div>
      <div
        css={css`
          width: ${boardSize}px;
          height: ${boardSize}px;
          border: 5px solid;
          margin-top: 10px;
        `}
      >
        {[...new Array(chessStore.nQueen)].map((_, i) => {
          return (
            <div
              key={`${i}th-row-of-chessboard`}
              css={css`
                display: flex;
                flex-direcion: row;
              `}
            >
              {[...new Array(chessStore.nQueen)].map((_, j) => {
                return (
                  <ChessBlock
                    key={`${i}${j}th-chessblock`}
                    color={(i + j) % 2 === 0 ? 0 : 1}
                    size={Math.round(givenSize / chessStore.nQueen)}
                    hasQueen={chessStore.included(i, j)}
                    isCovered={chessStore.isCovered(i, j)}
                    onClick={() => {
                      chessStore.addQueenOnPos(i, j);
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default observer(ChessBoard);
