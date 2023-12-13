import { Route, Routes, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ThemeToggle from "./common/ThemeToggle";
import { css } from "@emotion/react";
import MainPage from "./projects/project0/MainPage";
import { unselectable } from "./common/util";

function App() {
  const navigate = useNavigate();
  const ChessPage = lazy(() => import("./projects/project1-nqueen/ChessPage"));
  const SortPage = lazy(() => import("./projects/project2-sort/SortPage"));
  const LolPage = lazy(() => import("./projects/project3-lol/LolMainPage"));
  const SuikaPage = lazy(() => import("./projects/project4-suika/SuikaPage"));
  const PokedamPage = lazy(() => import("./projects/project5-pokedam/PokedamPage"));
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
          IMSPDR - 개발 연습장
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
            <Route path="/chess" element={<ChessPage />} />
            <Route path="/sort" element={<SortPage />} />
            <Route path="/lol" element={<LolPage />} />
            <Route path="/suika" element={<SuikaPage />} />
            <Route path="/pokedam" element={<PokedamPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
