import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { usePokedamStore } from "../store/PokedamStoreProvider";
import { useEffect, useState } from "react";

function PokedamTemplate(props: { width: number }) {
  const pokedamStore = usePokedamStore();
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
      `}
    ></div>
  );
}

export default observer(PokedamTemplate);
