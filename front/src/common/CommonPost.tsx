import { css } from "@emotion/react";
import { scriptPost } from "./commonTypes";

export default function CommonPost(props: { script: scriptPost }) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding: 15px;
      `}
    >
      <div
        css={css`
          font-size: 30px;
          margin-bottom: 20px;
        `}
      >
        {props.script.title}
      </div>
      <div>
        {props.script.content.map((block) => {
          return (
            <div>
              <div
                css={css`
                  font-size: 20px;
                  margin-top: 20px;
                  margin-bottom: 20px;
                `}
              >
                {block.title}
              </div>
              {block.text.map((txt, i) => {
                return (
                  <div
                    css={css`
                      font-size: 15px;
                      margin-bottom: 10px;
                    `}
                  >
                    {txt}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
