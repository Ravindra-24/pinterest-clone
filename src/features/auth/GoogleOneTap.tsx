import { useCallback } from "react";
import { useGoogleOneTapLogin, type CredentialResponse } from "@react-oauth/google";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useGoogleLoginMutation } from "../../services/api";
import { apiErrorMessage } from "../../services/errors";
import { sessionReceived } from "./authSlice";

export const GoogleOneTap = () => {
  const { user, initialized } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [googleLogin] = useGoogleLoginMutation();

  const onSuccess = useCallback(async (response: CredentialResponse) => {
    if (!response.credential) return;
    try {
      const session = await googleLogin({ credential: response.credential }).unwrap();
      dispatch(sessionReceived(session));
      toast.success(`Welcome, ${session.user.firstName || session.user.displayName}`);
    } catch (error) {
      toast.error(apiErrorMessage(error, "Google sign-in could not be completed"));
    }
  }, [dispatch, googleLogin]);

  useGoogleOneTapLogin({
    onSuccess,
    onError: () => toast.error("Google sign-in is temporarily unavailable"),
    disabled: !initialized || Boolean(user),
    cancel_on_tap_outside: true,
    use_fedcm_for_prompt: true,
    auto_select: false,
  });

  return null;
};
