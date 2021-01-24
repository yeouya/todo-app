import TodosProvider from "./contexts/TodosContext";
import GlobalHeader from "./components/GlobalHeader";
import Home from "./pages/Home";
import GlobalFooter from "./components/GlobalFooter";

export default function App() {
  return (
    <TodosProvider>
      <GlobalHeader />
      <Home />
      <GlobalFooter />
    </TodosProvider>
  );
}
