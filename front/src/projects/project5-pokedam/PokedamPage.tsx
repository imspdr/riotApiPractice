import CommonTemplate from "@src/common/CommonTemplate";
import { PokedamStoreProvider } from "./store/PokedamStoreProvider";
import PokedamTemplate from "./components/PokedamTemplate";
import { useEffect, useState } from "react";

function PokedamPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleSizeChange = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    addEventListener("resize", handleSizeChange);
    return () => {
      removeEventListener("resize", handleSizeChange);
    };
  }, []);
  return (
    <PokedamStoreProvider>
      <CommonTemplate title="포켓몬 데미지 계산기" width={windowWidth}>
        <PokedamTemplate width={windowWidth} />
      </CommonTemplate>
    </PokedamStoreProvider>
  );
}

export default PokedamPage;
