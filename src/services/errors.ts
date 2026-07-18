import type { ApiEnvelope } from "../types/api";

export const apiErrorMessage = (error: unknown, fallback: string) => {
  const candidate = error as {
    data?: ApiEnvelope<null> & { message?: string };
    error?: string;
  };
  return candidate?.data?.error?.message || candidate?.data?.message || candidate?.error || fallback;
};
