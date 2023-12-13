import { css } from "@emotion/react";
import { participant } from "../../store/types";

function GameDetail(props: { width: number; participants: participant[] }) {
  const maxDeal = Math.max(...props.participants.map((part) => part.deal));
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        ${props.width <= 680 && "font-size: 10px"}
      `}
    >
      <div
        css={css`
          width: ${props.width / 2}px;
        `}
      >
        {props.participants
          .filter((part) => part.win === 1)
          .map((part) => {
            return (
              <div
                css={css`
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: flex-start;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                    width: ${props.width / 4}px;
                    height: 70px;
                    padding: 10px;
                  `}
                >
                  <span>{part.name}</span>
                  <span>{`${part.kill} / ${part.death} / ${part.assist} `}</span>
                  <span>{part.championName}</span>
                </div>
                <div
                  css={css`
                    background-color: #22cccc;
                    transition: 0s;
                    width: ${((props.width / 4) * part.deal) / maxDeal - 30}px;
                    height: 30px;
                  `}
                ></div>
              </div>
            );
          })}
      </div>
      <div
        css={css`
          margin-left: 10px;
          width: ${props.width / 2}px;
        `}
      >
        {props.participants
          .filter((part) => part.win === 0)
          .map((part) => {
            return (
              <div
                css={css`
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: flex-end;
                `}
              >
                <div
                  css={css`
                    background-color: #009999;
                    transition: 0s;
                    width: ${((props.width / 4) * part.deal) / maxDeal - 30}px;
                    height: 30px;
                  `}
                ></div>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                    width: ${props.width / 4}px;
                    height: 70px;
                    padding: 10px;
                  `}
                >
                  <span>{part.name}</span>
                  <span>{part.championName}</span>
                  <span>{`${part.kill} / ${part.death} / ${part.assist} `}</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default GameDetail;
