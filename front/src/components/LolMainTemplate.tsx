import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useLolMainStore } from "../store/LolMainStoreProvider";
import { useEffect } from "react";
import LolResult from "./LolResult";
import LolSearch from "./LolSearch";
import LolHiddenButton from "./LolHiddenButton";
import LolMobileResult from "./LolMobileResult";

function LolMainTemplate() {
  const lolStore = useLolMainStore();
  const handleSizeChange = () => {
    lolStore.windowWidth = window.innerWidth;
  };

  useEffect(() => {
    addEventListener("resize", handleSizeChange);
    return () => {
      removeEventListener("resize", handleSizeChange);
    };
  }, []);

  return (
    <div
      css={css`
        margin-top: 20px;
      `}
    >
      {lolStore.windowWidth > 1400 && <LolHiddenButton />}
      {!lolStore.showResult ? (
        <LolSearch />
      ) : lolStore.windowWidth > 1400 ? (
        <LolResult />
      ) : (
        <LolMobileResult />
      )}
    </div>
  );
}

export default observer(LolMainTemplate);
