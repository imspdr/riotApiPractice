import { css } from "@emotion/react";
import ChessBoard from "./components/ChessBoard";
import ExplainBlog from "./components/explainBlog/ExplainBlog";
import { useState, useEffect } from "react";
import CommonTemplate from "@src/common/CommonTemplate";
import { ChessStoreProvider } from "./store/ChessStoreProvider";

function ChessPage() {
  const [chessWidth, setChessWidth] = useState(window.innerWidth);
  const [chessHeight, setChessHeight] = useState(window.innerHeight);
  useEffect(() => {
    addEventListener("resize", () => {
      setChessWidth(window.innerWidth);
      setChessHeight(window.innerHeight);
    });
  }, []);
  return (
    <ChessStoreProvider>
      <CommonTemplate title="P=NP와 n-퀸 문제" width={chessWidth}>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          {chessWidth > 900 && (
            <div
              css={css`
                margin-right: 20px;
              `}
            >
              <ExplainBlog width={(chessWidth * 2) / 3 - 200} height={chessHeight - 200} />
            </div>
          )}
          <ChessBoard
            boardSize={
              chessWidth > 900 ? chessWidth / 3 : Math.min(chessWidth - 200, chessHeight - 300)
            }
          />
        </div>
      </CommonTemplate>
    </ChessStoreProvider>
  );
}

export default ChessPage;
