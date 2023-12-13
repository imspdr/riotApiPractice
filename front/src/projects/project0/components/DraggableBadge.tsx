import { observer } from "mobx-react";
import { css } from "@emotion/react";
import { useMainStore } from "../store/MainStoreProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { badge } from "../store/types";
import { unselectable } from "@src/common/util";
import iconMap from "./IconMap";

function DraggableBadge(props: { badgeId: number }) {
  const mainStore = useMainStore();
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [description, setDescription] = useState(false);
  const badge: badge | undefined = mainStore.badges.find(
    (badge: badge) => badge.id === props.badgeId
  );

  return (
    <>
      {badge && (
        <>
          <div
            css={css`
              position: absolute;
              left: ${badge.pos.x - badge.radius - (hover ? 5 : 0)}px;
              top: ${badge.pos.y - badge.radius - (hover ? 5 : 0)}px;
              width: ${badge.radius * 2}px;
              height: ${badge.radius * 2}px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: ${badge.radius}px;
              background-color: transparent;
              border: ${hover ? "5px solid" : ""};
              z-index: ${hover ? 10 : 1};
              ${unselectable}
            `}
            onMouseDown={(e) => {
              const mousemove = (ev: MouseEvent) => {
                mainStore.setPos(
                  props.badgeId,
                  Math.max(
                    badge.radius + 20,
                    Math.min(ev.clientX, mainStore.windowWidth - badge.radius - 20)
                  ),
                  Math.max(
                    badge.radius + 20,
                    Math.min(ev.clientY, mainStore.windowHeight - badge.radius - 20)
                  ),
                  []
                );
                setDescription(false);
              };
              const mouseup = () => {
                window.removeEventListener("mousemove", mousemove);
                window.removeEventListener("mouseup", mouseup);
                setDescription(true);
              };
              window.addEventListener("mousemove", mousemove);
              window.addEventListener("mouseup", mouseup);
            }}
            onMouseOver={(e) => {
              setHover(true);
              setDescription(true);
            }}
            onMouseOut={(e) => {
              setHover(false);
              setDescription(false);
            }}
            onDoubleClick={() => {
              setDescription(false);
              navigate(`/${badge.route}`);
            }}
          >
            {iconMap.find((icon) => icon.label === badge.icon)?.comp}
          </div>
          {description && (
            <div
              css={css`
                position: absolute;
                left: ${badge.pos.x > mainStore.windowWidth - badge.radius - 220
                  ? badge.pos.x - badge.radius - 220
                  : badge.pos.x + badge.radius + 20}px;
                ${badge.pos.y < mainStore.windowHeight / 2
                  ? `top: ${badge.pos.y - badge.radius - 10}px;`
                  : `bottom: ${mainStore.windowHeight - badge.pos.y - badge.radius - 10}px;`}
                width: 200px;
                z-index: 10;
                ${unselectable}
              `}
            >
              <div
                css={css`
                  border: 3px solid;
                  padding: 10px;
                  min-height: ${badge.radius}px;
                  z-index: 10;
                  ${unselectable}
                `}
              >
                <div
                  css={css`
                    font-size: 20px;
                  `}
                >
                  {badge.title}
                </div>
                <div
                  css={css`
                    font-size: 15px;
                    margin-top: 10px;
                  `}
                >
                  {badge.description}
                </div>
                <div
                  css={css`
                    margin-top: 30px;
                    margin-bottom: 10px;
                  `}
                >
                  {badge.tag.map((tag: string) => {
                    return <div>{"#" + tag}</div>;
                  })}
                </div>
                <div
                  css={css`
                    font-size: 12px;
                  `}
                >
                  {"더블 클릭 시 이동"}
                </div>

                <div
                  css={css`
                    font-size: 12px;
                  `}
                >
                  {"아이콘을 드래그 해보세요"}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default observer(DraggableBadge);
