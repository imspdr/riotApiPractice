import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import CommonTemplate from "@src/common/CommonTemplate";
import { SortStoreProvider } from "./store/SortStoreProvider";
import SortBar from "./components/SortBar";
import SortController from "./components/SortController";
import SortScore from "./components/SortScore";

export default function SortPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const handleSizeChange = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    addEventListener("resize", handleSizeChange);
    return () => {
      removeEventListener("resize", handleSizeChange);
    };
  }, []);
  return (
    <SortStoreProvider>
      <CommonTemplate title="정렬 시각화" width={windowWidth}>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}
        >
          <SortController width={(windowWidth * 4) / 5} />
          <SortScore width={(windowWidth * 4) / 5} />
          <SortBar width={(windowWidth * 4) / 5} height={Math.max(windowHeight - 450, 200)} />
        </div>
      </CommonTemplate>
    </SortStoreProvider>
  );
}
