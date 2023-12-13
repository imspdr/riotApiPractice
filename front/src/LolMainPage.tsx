import { LolMainStoreProvider } from "./store/LolMainStoreProvider";
import LolMainTemplate from "./components/LolMainTemplate";

function LolMainPage() {
  return (
    <LolMainStoreProvider>
      <LolMainTemplate />
    </LolMainStoreProvider>
  );
}

export default LolMainPage;
