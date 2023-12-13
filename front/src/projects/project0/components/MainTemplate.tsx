import { observer } from "mobx-react";
import { useEffect } from "react";
import { css } from "@emotion/react";
import { useMainStore } from "../store/MainStoreProvider";
import DraggableBadge from "./DraggableBadge";
import { badge } from "../store/types";
import MobileTemplate from "./MobileTemplate";
import { isMobile } from "react-device-detect";

function MainPageTemplate() {
  const mainStore = useMainStore();
  const handleSizeChange = () => {
    mainStore.windowHeight = window.innerHeight;
    mainStore.windowWidth = window.innerWidth;
  };
  const minHeight =
    Math.ceil((mainStore.badges.length / mainStore.windowWidth) * (mainStore.badgeRadius + 5) * 2) *
      (mainStore.badgeRadius + 5) *
      3 +
    64;

  useEffect(() => {
    addEventListener("resize", handleSizeChange);
    return () => {
      removeEventListener("resize", handleSizeChange);
    };
  }, []);

  return (
    <>
      {isMobile || mainStore.windowHeight < minHeight ? (
        <MobileTemplate />
      ) : (
        <div
          css={css`
            min-width: ${(mainStore.badgeRadius + 5) * 2}px;
            min-height: ${minHeight}px;
          `}
        >
          {mainStore.badges.map((badge: badge) => (
            <DraggableBadge key={`${badge.id}+${badge.title}`} badgeId={badge.id} />
          ))}
        </div>
      )}
    </>
  );
}

export default observer(MainPageTemplate);
