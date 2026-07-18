import { Link } from "react-router-dom";
import { appConfig } from "../../app/config";

export const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <span>© {new Date().getFullYear()} {appConfig.brandName}. Ideas worth keeping.</span>
      <nav className="footer-links" aria-label="Legal and information">
        <Link to="/about">About</Link>
        <Link to="/guidelines">Community guidelines</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <a href="mailto:hello@example.com">Contact</a>
      </nav>
    </div>
  </footer>
);
