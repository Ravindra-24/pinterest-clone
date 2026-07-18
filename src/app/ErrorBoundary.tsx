import { AlertTriangle } from "lucide-react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { Seo } from "../components/ui/Seo";

export const ErrorBoundary = () => {
  const error = useRouteError();
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : "An unexpected error interrupted this page.";
  return <div className="page container"><Seo title="Something went wrong" description="The page could not be displayed." noIndex /><EmptyState icon={<AlertTriangle className="empty-icon" />} title="That did not go as planned." description={message} action={<Button onClick={() => window.location.assign("/")}>Return home</Button>} /></div>;
};
