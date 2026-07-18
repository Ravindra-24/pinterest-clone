import type { PublicUser } from "../../types/api";

export const Avatar = ({ user, size = 44 }: { user?: Partial<PublicUser> | null; size?: number }) => {
  const initials = (user?.displayName || user?.firstName || "C")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span className="avatar" style={{ width: size, height: size, flex: `0 0 ${size}px` }} aria-label={user?.displayName || "Member"}>
      {user?.profilePicture ? <img src={user.profilePicture} alt="" /> : initials}
    </span>
  );
};
