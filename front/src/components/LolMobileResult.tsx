import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useLolMainStore } from "../store/LolMainStoreProvider";
import CommonLoading from "@src/common/CommonLoading";
import CommonSearchBar from "@src/common/CommonSearchBar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { unselectable } from "@src/common/util";
import { useState, useEffect } from "react";
import GameDetail from "./result/LolGameDetail";
import GameCard from "./result/LolGameCard";
import ProfileCard from "./result/LolProfileCard";

function LolMobileResult() {
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
        align-items: center;
        overflow: auto;
      `}
    >
      <CommonSearchBar
        onEnter={(v) => {
          lolStore.onSearch(v);
        }}
        onClick={(v) => {
          lolStore.onSearch(v);
        }}
        width={Math.min(lolStore.windowWidth - 150, 500)}
        height={50}
      />
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 12px;
        `}
      >
        {"히스토리 : "}
        {lolStore.nowUsers.slice(0, 3).map((user, index) => {
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
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-top: 20px;
          ${unselectable}
        `}
      >
        {lolStore.loading ? (
          <CommonLoading width={Math.min(lolStore.windowWidth - 150, 300)} fontSize={30} />
        ) : lolStore.nowIndex === -1 ? (
          <div>{"뭔가... 잘못됐습니다... API 토큰 문제일 가능성이 높습니다..."}</div>
        ) : (
          user && (
            <>
              <ProfileCard user={user} width={Math.min(lolStore.windowWidth - 120, 700)} />
              <div
                css={css`
                  margin-top: 10px;
                `}
              >
                {user.lastGames.map((game, index) => {
                  return (
                    <>
                      <div
                        css={css`
                          margin-bottom: 5px;
                        `}
                        onClick={() => setGameIndex((v) => (v === index ? -1 : index))}
                      >
                        <GameCard game={game} width={Math.min(lolStore.windowWidth - 120, 700)} />
                      </div>
                      {index === gameIndex && (
                        <GameDetail
                          width={Math.min(lolStore.windowWidth - 120, 700)}
                          participants={user.lastGames[gameIndex]!.participants}
                        />
                      )}
                    </>
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
            </>
          )
        )}
      </div>
    </div>
  );
}

export default observer(LolMobileResult);
