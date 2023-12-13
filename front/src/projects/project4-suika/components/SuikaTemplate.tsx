import { css } from "@emotion/react";
import { observer } from "mobx-react";
import SuikaBoard from "./SuikaBoard";
import SuikaHelp from "./SuikaHelp";
import SuikaController from "./SuikaController";
import { useSuikaStore } from "../store/SuikaStoreProvider";
import { useEffect, useState } from "react";
import SuikaOption from "./SuikaOption";

function SuikaTemplate(props: { width: number }) {
  const suikaStore = useSuikaStore();

  const keyDownEvent = (ev: KeyboardEvent) => {
    if (ev.key === "ArrowRight") {
      suikaStore.posX += 5;
    } else if (ev.key === "ArrowLeft") {
      suikaStore.posX -= 5;
    } else if (ev.key === "Enter") {
      suikaStore.addFruit();
    } else if (ev.key === " ") {
      if (suikaStore.stopFlag) {
        suikaStore.start();
      } else {
        suikaStore.stop();
      }
    } else if (ev.key === "r") {
      suikaStore.reset();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", keyDownEvent);
    return () => window.removeEventListener("keydown", keyDownEvent);
  }, []);
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <div
          css={css`
            width: 240px;
          `}
        >
          {"주의) 과일이 많아지면 브라우저가 힘겨워할 수 있습니다"}
        </div>
        <SuikaBoard />
        <SuikaController />
      </div>
      {props.width > 800 && (
        <>
          <SuikaHelp />
          <SuikaOption />
        </>
      )}
    </div>
  );
}

export default observer(SuikaTemplate);
