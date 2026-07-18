import { Compass, Home, Plus, Search, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";

export const MobileNav = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <NavLink to="/" end><Home size={20} />Home</NavLink>
      <NavLink to="/explore/all"><Compass size={20} />Explore</NavLink>
      <NavLink to="/create"><Plus size={20} />Create</NavLink>
      <NavLink to="/search"><Search size={20} />Search</NavLink>
      <NavLink to={user ? `/u/${user.username}` : "/auth/login"}><UserRound size={20} />Profile</NavLink>
    </nav>
  );
};
