import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useLolMainStore } from "../store/LolMainStoreProvider";
import CommonLoading from "@src/common/CommonLoading";
import CommonSearchBar from "@src/common/CommonSearchBar";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { unselectable } from "@src/common/util";
import { useEffect, useState } from "react";
import GameDetail from "./result/LolGameDetail";
import GameCard from "./result/LolGameCard";
import ProfileCard from "./result/LolProfileCard";

function LolResult() {
  const lolStore = useLolMainStore();
  const [gameIndex, setGameIndex] = useState(-1);
  const user = lolStore.nowUsers[lolStore.nowIndex];
  useEffect(() => {
    setGameIndex(-1);
  }, [lolStore.nowIndex]);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: 700px;
        width: 1550px;
        overflow: auto;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 80px;
        `}
      >
        <div
          css={css`
            margin-right: 20px;
          `}
          onClick={() => (lolStore.showResult = false)}
        >
          {"<"}
        </div>
        <CommonSearchBar
          onEnter={(v) => {
            lolStore.onSearch(v);
          }}
          onClick={(v) => {
            lolStore.onSearch(v);
          }}
          width={Math.min(lolStore.windowWidth - 200, 400)}
          height={80}
        />
        <div
          css={css`
            margin-left: 30px;
            display: flex;
            flex-direction: row;
            align-items: center;
          `}
        >
          {"히스토리 : "}
          {lolStore.nowUsers.map((user, index) => {
            return (
              <div
                css={css`
                  margin-left: 15px;
                  ${unselectable}
                `}
                onClick={() => (lolStore.nowIndex = index)}
              >
                {user.name + (index === lolStore.nowUsers.length - 1 ? "" : ",")}
              </div>
            );
          })}
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-top: 20px;
          height: 600px;
          ${unselectable}
        `}
      >
        {lolStore.loading ? (
          <CommonLoading width={300} fontSize={50} />
        ) : lolStore.nowIndex === -1 ? (
          <div>{"뭔가... 잘못됐습니다... API 토큰 문제일 가능성이 높습니다..."}</div>
        ) : (
          user && (
            <>
              <ProfileCard user={user} width={400} />
              <div
                css={css`
                  margin-left: 10px;
                  height: 600px;
                  overflow: auto;
                `}
              >
                {user.lastGames.map((game, index) => {
                  return (
                    <div
                      css={css`
                        margin-bottom: 5px;
                      `}
                      onClick={() => setGameIndex((v) => (v === index ? -1 : index))}
                    >
                      <GameCard game={game} width={300} />
                    </div>
                  );
                })}
                {user.lastGames.length >= 10 && (
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                    `}
                    onClick={() => lolStore.getMoreMatch()}
                  >
                    <KeyboardDoubleArrowDownIcon />
                  </div>
                )}
              </div>
              {gameIndex >= 0 && gameIndex < user.lastGames.length && user.lastGames[gameIndex] && (
                <GameDetail width={760} participants={user.lastGames[gameIndex]!.participants} />
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}

export default observer(LolResult);
