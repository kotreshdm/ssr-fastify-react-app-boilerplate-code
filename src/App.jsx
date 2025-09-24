import { AppProviders } from "./contexts";
import AppNavbar from "./components/AppComponents/AppNavbar";
import AppFooter from "./components/AppComponents/AppFooter";
import AppRoutes from "./components/AppComponents/AppRoutes";
import { Suspense } from "react";

export default function App() {
  return (
    <AppProviders>
      <div>
        <AppNavbar />
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <AppRoutes /> {/* dynamic content inside */}
          </Suspense>
        </main>
        <AppFooter />
      </div>
    </AppProviders>
  );
}
