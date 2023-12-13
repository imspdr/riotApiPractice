import { css } from "@emotion/react";
import { game } from "../../store/types";
import { useState } from "react";

export default function GameCard(props: { game: game; width: number }) {
  const game = props.game;
  const bgcolor = game.myPlay.win ? "#22cccc" : "#009999";
  const [hover, setHover] = useState(false);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        transition: 0s;
        width: ${props.width - 20}px;
        height: 30px;
        border-radius: 10px;
        padding: ${hover ? "8px" : "10px"};
        ${hover ? "border: 2px solid;" : `background-color: ${bgcolor};`}
        ${props.width < 400 && "font-size: 12px;"}
      `}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <span>{game.myPlay.win ? "승리" : "패배"}</span>
      <span>{game.myPlay.championName}</span>
      <span>{`KDA : ${game.myPlay.kill} / ${game.myPlay.death} / ${game.myPlay.assist} `}</span>
    </div>
  );
}
