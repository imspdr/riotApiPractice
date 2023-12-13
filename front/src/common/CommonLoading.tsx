import { css } from "@emotion/react";
import { useState, useEffect } from "react";

export default function CommonLoading(props: { width: number; fontSize: number }) {
  const text = "로딩 중 .";
  const [loadingText, setLoadingText] = useState(text);
  useEffect(() => {
    const textAnimation = setInterval(() => {
      setLoadingText((v) => {
        if (v.length > text.length + 3) {
          return text;
        } else {
          return v + " .";
        }
      });
    }, 500);
    return () => clearInterval(textAnimation);
  }, []);
  return (
    <div
      css={css`
        width: ${props.width}px;
        font-size: ${props.fontSize}px;
      `}
    >
      {loadingText}
    </div>
  );
}
