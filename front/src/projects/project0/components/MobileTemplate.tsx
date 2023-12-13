import { observer } from "mobx-react";
import { css } from "@emotion/react";
import { useMainStore } from "../store/MainStoreProvider";
import { useNavigate } from "react-router-dom";
import { badge } from "../store/types";
import iconMap from "./IconMap";
import { unselectable } from "@src/common/util";
import { useEffect } from "react";

function MobileBadge(props: { badgeId: number; width: number }) {
  const mainStore = useMainStore();
  const navigate = useNavigate();
  const badge: badge | undefined = mainStore.badges.find(
    (badge: badge) => badge.id === props.badgeId
  );

  return (
    <>
      {badge && (
        <>
          <div
            onClick={() => {
              navigate(`/${badge.route}`);
            }}
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border: 3px solid;
              margin: 10px;
              width: ${props.width}px;
              height: ${props.width}px;
              ${unselectable}
            `}
          >
            {iconMap.find((icon) => icon.label === badge.icon)?.comp}
            <span
              css={css`
                margin-top: 10px;
              `}
            >
              {badge.title}
            </span>
          </div>
        </>
      )}
    </>
  );
}

function MobileTemplate() {
  const mainStore = useMainStore();
  const handleSizeChange = () => {
    mainStore.windowHeight = window.innerHeight;
    mainStore.windowWidth = window.innerWidth;
  };

  const xGridN = Math.floor(mainStore.windowWidth / (mainStore.badgeRadius * 2 + 10));
  const xWidth = Math.floor(mainStore.windowWidth / xGridN) - 10;
  const gtc = [...new Array(xGridN)].reduce((a, c) => {
    return a + `${xWidth}px `;
  }, "");
  console.log(gtc);
  useEffect(() => {
    addEventListener("resize", handleSizeChange);
    return () => {
      removeEventListener("resize", handleSizeChange);
    };
  }, []);
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: ${gtc};
      `}
    >
      {mainStore.badges.map((badge: badge) => (
        <MobileBadge key={`${badge.id}+${badge.title}`} badgeId={badge.id} width={xWidth - 30} />
      ))}
    </div>
  );
}

export default observer(MobileTemplate);
