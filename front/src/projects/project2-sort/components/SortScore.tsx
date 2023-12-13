import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useSortStore } from "../store/SortStoreProvider";

function SortScore(props: { width: number }) {
  const sortStore = useSortStore();
  return (
    <div
      css={css`
        width: ${props.width}px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-bottom: 20px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <div>{"비교 수 : "}</div>
        <div
          css={css`
            width: 100px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
          `}
        >{`${sortStore.compareCount}`}</div>
      </div>
    </div>
  );
}

export default observer(SortScore);
