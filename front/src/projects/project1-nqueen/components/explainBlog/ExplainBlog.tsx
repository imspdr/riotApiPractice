import { css } from "@emotion/react";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import { unselectable } from "@src/common/util";

import pisnp from "./pisnp.json";
import nqueen from "./nqueen.json";
import solve from "./solve.json";
import CommonPost from "@src/common/CommonPost";

function ExplainBlog(props: { width: number; height: number }) {
  const testTab = [
    { label: "P vs NP", value: 0, comp: <CommonPost script={pisnp} /> },
    { label: "n-퀸 문제", value: 1, comp: <CommonPost script={nqueen} /> },
    { label: "풀어줘!", value: 2, comp: <CommonPost script={solve} /> },
  ];
  const [nowTab, setNowTab] = useState(0);
  const givenHeight = Math.max(props.height, testTab.length * 50 + 10);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        height: ${givenHeight}px;
      `}
    >
      <div>
        {testTab.map((tab) => {
          return (
            <div
              css={css`
                width: ${nowTab === tab.value ? 151 : 150}px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 20px 0px 0px 20px;
                ${nowTab === tab.value
                  ? "border: 5px solid; border-right-width: 0px;"
                  : "border: 1px solid; border-right-width: 5px;"}
                ${unselectable}
              `}
              onClick={() => setNowTab(tab.value)}
            >
              {tab.label}
            </div>
          );
        })}
        <div
          css={css`
            height: ${givenHeight - testTab.length * 52 - 8}px;
            border: 0px solid;
            border-right-width: 5px;
          `}
        ></div>
      </div>
      <div
        css={css`
          width: ${props.width - 150}px;
          border: 5px solid;
          border-left-width: 0px;
          overflow: auto;
        `}
      >
        {testTab.find((tab) => tab.value === nowTab)?.comp}
      </div>
    </div>
  );
}

export default observer(ExplainBlog);
