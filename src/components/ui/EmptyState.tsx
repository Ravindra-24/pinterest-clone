import { ImageOff } from "lucide-react";
import type { ReactNode } from "react";

export const EmptyState = ({ title, description, action, icon }: { title: string; description: string; action?: ReactNode; icon?: ReactNode }) => (
  <div className="empty" role="status">
    <div>
      {icon || <ImageOff className="empty-icon" aria-hidden="true" />}
      <h2 className="editorial">{title}</h2>
      <p>{description}</p>
      {action}
    </div>
  </div>
);
