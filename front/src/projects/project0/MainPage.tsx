import { MainStoreProvider } from "./store/MainStoreProvider";
import MainPageTemplate from "./components/MainTemplate";

export default function MainPage() {
  return (
    <MainStoreProvider>
      <MainPageTemplate />
    </MainStoreProvider>
  );
}
