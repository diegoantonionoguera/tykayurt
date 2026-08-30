import Index from "./pages/index";
import Regulation from "./pages/regulation";
import { Provider } from "./components/provider";

type AppProps = {
  pathname?: string;
};

function App({ pathname }: AppProps) {
  const currentPath = pathname ?? (typeof window === "undefined" ? "/" : window.location.pathname);

  return (
    <Provider>
      {currentPath === "/regulamento" || currentPath === "/regulamento/" ? (
        <Regulation />
      ) : (
        <Index />
      )}
    </Provider>
  );
}

export default App;
