import { useEffect, type ReactNode } from "react";
import { useGetSessionQuery } from "../services/api";
import { sessionCleared, sessionReceived } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks/store";

export const SessionBootstrap = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isError } = useGetSessionQuery();
  useEffect(() => { if (isSuccess && data) dispatch(sessionReceived(data)); }, [data, dispatch, isSuccess]);
  useEffect(() => { if (isError) dispatch(sessionCleared()); }, [dispatch, isError]);
  return children;
};
