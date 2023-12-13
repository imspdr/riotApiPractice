import { useState } from "react";
import { css, keyframes } from "@emotion/react";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const toggleTheme = () => {
    const styles = getComputedStyle(document.body);
    const black = styles.getPropertyValue("--black");
    const white = styles.getPropertyValue("--white");
    const mint = styles.getPropertyValue("--mint");
    const pink = styles.getPropertyValue("--pink");
    const scrollColorBlack = styles.getPropertyValue("--scrollColorBlack");
    const scrollColorWhite = styles.getPropertyValue("--scrollColorWhite");
    const docEl = document.documentElement;
    if (isDark) {
      docEl.style.setProperty("--background", white);
      docEl.style.setProperty("--foreground", black);
      docEl.style.setProperty("--scrollColor", scrollColorBlack);
      docEl.style.setProperty("--highlight", pink);
    } else {
      docEl.style.setProperty("--background", black);
      docEl.style.setProperty("--foreground", white);
      docEl.style.setProperty("--scrollColor", scrollColorWhite);
      docEl.style.setProperty("--highlight", mint);
    }
    setIsDark((v) => !v);
  };
  const right = 30;
  const top = 20;
  const ICONTOPHIGH = `${top}px`;
  const ICONTOPLOW = `${top + 13}px`;
  const ICONRIGHT = `${right}px`;
  const ICONRIGHTFROM = `${right + 10}px`;
  const ICONRIGHTTO = `${right - 10}px`;

  const raise = keyframes`
    from {
      opacity: 0;
      top: ${ICONTOPLOW};
      right: ${ICONRIGHTFROM};
      transform: rotate(-45deg);
    }
    to {
      opacity: 1;
      top: ${ICONTOPHIGH};
      right: ${ICONRIGHT};
    }`;
  const down = keyframes`
    from {
      opacity: 1;
      top: ${ICONTOPHIGH};
      right: ${ICONRIGHT};
    }
    to {
      opacity: 0;
      top: ${ICONTOPLOW};
      right: ${ICONRIGHTTO};
      transform: rotate(45deg);
    }`;

  return (
    <div
      onClick={toggleTheme}
      css={css`
        height: 48px;
        width: 40px;
        z-index: 10;
      `}
    >
      <NightsStayIcon
        css={css`
          position: absolute;
          opacity: ${isDark ? 1 : 0};
          top: ${isDark ? ICONTOPHIGH : ICONTOPLOW};
          right: ${isDark ? ICONRIGHT : ICONRIGHTTO};
          animation: ${isDark ? raise : down} 1s;
        `}
      />
      <WbSunnyIcon
        css={css`
          position: absolute;
          opacity: ${isDark ? 0 : 1};
          top: ${isDark ? ICONTOPLOW : ICONTOPHIGH};
          right: ${isDark ? ICONRIGHTTO : ICONRIGHT};
          animation: ${isDark ? down : raise} 1s;
        `}
      />
    </div>
  );
}
