import { Navigate, useParams } from "react-router-dom";
import { useGetPostQuery, useGetProfileQuery } from "../services/api";

export const LegacyPostRedirect = () => {
  const { id = "" } = useParams();
  const { data, isLoading } = useGetPostQuery(id);
  if (isLoading) return <div className="page container"><div className="feed-status">Finding this idea…</div></div>;
  return <Navigate to={data ? `/p/${data.slug}` : "/not-found"} replace />;
};

export const LegacyUserRedirect = () => {
  const { id = "" } = useParams();
  const { data, isLoading } = useGetProfileQuery(id);
  if (isLoading) return <div className="page container"><div className="feed-status">Finding this profile…</div></div>;
  return <Navigate to={data ? `/u/${data.username}` : "/not-found"} replace />;
};
