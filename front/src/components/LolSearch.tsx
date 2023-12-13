import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useLolMainStore } from "../store/LolMainStoreProvider";
import CommonSearchBar from "@src/common/CommonSearchBar";

function LolSearch() {
  const lolStore = useLolMainStore();
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          font-size: ${lolStore.windowWidth > 700 ? 70 : 30}px;
          margin-bottom: ${lolStore.windowWidth > 700 ? 50 : 30}px;
        `}
      >
        {"IM.SPDR"}
      </div>
      <CommonSearchBar
        onEnter={(v) => {
          lolStore.onSearch(v);
        }}
        onClick={(v) => {
          lolStore.onSearch(v);
        }}
        width={Math.min(lolStore.windowWidth - 150, 700)}
        height={lolStore.windowWidth > 700 ? 100 : 50}
      />
    </div>
  );
}

export default observer(LolSearch);
