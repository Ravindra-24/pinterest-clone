import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Bell, Compass, Home, LogOut, Moon, Plus, Search, ShieldCheck, Sun, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { appConfig } from "../../app/config";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useLogoutMutation } from "../../services/api";
import { sessionCleared } from "../../features/auth/authSlice";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { AuthDialog } from "../../features/auth/AuthDialog";
import type { Theme } from "../../hooks/useTheme";

export const Header = ({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) => {
  const [authOpen, setAuthOpen] = useState(false);
  const [query, setQuery] = useState("");
  const user = useAppSelector((state) => state.auth.user);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const signOut = async () => {
    try { await logout().unwrap(); } finally { dispatch(sessionCleared()); navigate("/"); }
  };

  return (
    <>
      <header className="app-header">
        <div className="container header-inner">
          <NavLink to="/" className="brand" aria-label={`${appConfig.brandName} home`}>
            <img className="brand-mark" src="/brand-mark.svg" alt="" />
            <span>{appConfig.brandName}</span>
          </NavLink>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <NavLink to="/" className="nav-link" end><Home size={17} />Home</NavLink>
            <NavLink to="/explore/all" className="nav-link"><Compass size={17} />Explore</NavLink>
          </nav>
          <form className="header-search" role="search" onSubmit={submitSearch}>
            <Search size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="site-search">Search ideas</label>
            <input id="site-search" className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search ideas, styles, places…" />
          </form>
          <div className="header-actions">
            <Button variant="ghost" size="icon" onClick={onToggleTheme} aria-label={`Use ${theme === "dark" ? "light" : "dark"} theme`}>
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </Button>
            {user ? (
              <>
                <Button onClick={() => navigate("/create")}><Plus size={18} /><span className="create-label">Create</span></Button>
                <Button variant="ghost" size="icon" aria-label="Notifications" onClick={() => navigate("/notifications")}><Bell size={19} /></Button>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild><button className="button button-ghost button-icon" aria-label="Open account menu"><Avatar user={user} size={36} /></button></DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="surface" sideOffset={8} align="end" style={{ minWidth: 210, padding: ".45rem", zIndex: 180 }}>
                      <DropdownMenu.Label style={{ padding: ".65rem .7rem", fontWeight: 800 }}>{user.displayName}</DropdownMenu.Label>
                      <DropdownMenu.Separator className="divider" />
                      <DropdownMenu.Item className="nav-link" onSelect={() => navigate(`/u/${user.username}`)}><UserRound size={17} />Profile</DropdownMenu.Item>
                      {user.permissions?.includes("moderate") && <DropdownMenu.Item className="nav-link" onSelect={() => navigate("/moderation")}><ShieldCheck size={17} />Moderation</DropdownMenu.Item>}
                      <DropdownMenu.Item className="nav-link" onSelect={signOut}><LogOut size={17} />Sign out</DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </>
            ) : <Button onClick={() => setAuthOpen(true)}>Sign in</Button>}
          </div>
        </div>
      </header>
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};
