import Home from "./components/Home";
import { AppProviders } from "./contexts";
import AppNavbar from "./components/AppComponents/AppNavbar";
import AppFooter from "./components/AppComponents/AppFooter";

export default function App() {
  return (
    <AppProviders>
      <div>
        <AppNavbar />
        <main>
          <Home />
        </main>
        <AppFooter />
      </div>
    </AppProviders>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#1e293b",
    color: "#fff",
  },
  logo: { margin: 0 },
  menu: {
    listStyle: "none",
    display: "flex",
    gap: "1.5rem",
    margin: 0,
    padding: 0,
  },
};
