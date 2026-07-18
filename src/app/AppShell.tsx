import { Outlet } from "react-router-dom";
import { Header } from "../components/patterns/Header";
import { MobileNav } from "../components/patterns/MobileNav";
import { Footer } from "../components/patterns/Footer";
import { useTheme } from "../hooks/useTheme";
import { ConsentBanner } from "../components/patterns/ConsentBanner";
import { InterestDialog } from "../features/onboarding/InterestDialog";

export const AppShell = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content"><Outlet /></main>
      <Footer />
      <MobileNav />
      <ConsentBanner />
      <InterestDialog />
    </>
  );
};
