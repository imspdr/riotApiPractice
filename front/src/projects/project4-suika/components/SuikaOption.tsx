import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useSuikaStore } from "../store/SuikaStoreProvider";
import { unselectable } from "@src/common/util";
import CommonSlider from "@src/common/CommonSlider";

function SuikaOption() {
  const suikaStore = useSuikaStore();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        margin-left: 30px;
        ${unselectable}
      `}
    >
      {/* <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <span>{`부피 비례 질량 적용 (클릭시 변경):`}</span>
        <span
          onClick={() => {
            suikaStore.messOption = !suikaStore.messOption;
          }}
        >{` ${suikaStore.messOption ? "on" : "off"}`}</span>
      </div> */}
      <div
        css={css`
          margin-top: 20px;
        `}
      >{`중력 가속도 : ${suikaStore.gravity}`}</div>
      <CommonSlider
        now={suikaStore.gravity}
        setNow={(v) => (suikaStore.gravity = v)}
        step={1}
        min={1}
        max={9}
        height={50}
      />

      <div
        css={css`
          margin-top: 20px;
        `}
      >{`충격 계수 : ${suikaStore.collisionPower}`}</div>
      <CommonSlider
        now={suikaStore.collisionPower}
        setNow={(v) => (suikaStore.collisionPower = v)}
        step={1}
        min={1}
        max={5}
        height={50}
      />
    </div>
  );
}

export default observer(SuikaOption);
