import { Route, Routes, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ThemeToggle from "./common/ThemeToggle";
import { css } from "@emotion/react";
import MainPage from "./LolMainPage";
import { unselectable } from "./common/util";

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        css={css`
          position: absolute;
          top: 0px;
          width: calc(99vw);
          height: 64px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <div
          onClick={() => {
            navigate("/");
          }}
          css={css`
            ${unselectable}
          `}
        >
          IMSPDR - RIOT API 연습
        </div>
        <ThemeToggle />
      </div>
      <div
        css={css`
          margin-top: 64px;
          width: calc(99vw);
          height: calc(99vh - 64px);
        `}
      >
        <Suspense fallback={<div>{"loading"}</div>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
