"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { useGoogleLogin } from "@/hooks";
import { getApiErrorMessage, getDashboardPathByRole } from "@/utils";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

function GoogleGIcon() {
  return (
    <svg className="size-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
      />
    </svg>
  );
}

export default function GoogleLoginComponent() {
  const router = useRouter();
  const { mutate: googleLogin } = useGoogleLogin();

  if (!GOOGLE_CLIENT_ID) {
    return (
      <button
        type="button"
        onClick={() =>
          toast.add({
            title: "Google Sign-In Not Configured",
            description:
              "Set NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local to enable Google OAuth.",
            type: "info",
          })
        }
        className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
      >
        <GoogleGIcon />
        <span>Continue with Google</span>
      </button>
    );
  }

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.add({
        title: "Google OAuth Failed",
        description: "Something went wrong. Please try again.",
        type: "error",
      });
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: (res) => {
          toast.add({
            title: "Logged in Successfully",
            description: "Welcome to CampusOS",
            type: "success",
          });
          const user = res.data?.user;
          if (user?.needPasswordChange) {
            router.push("/change-password");
          } else if (user?.status === "PENDING_APPROVAL") {
            router.push("/pending-approval");
          } else if (user?.role) {
            router.push(getDashboardPathByRole(user.role));
          } else {
            router.push("/");
          }
        },
        onError: (err) => {
          toast.add({
            title: "Google OAuth Failed",
            description: getApiErrorMessage(err),
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google OAuth Failed",
      description: "Something went wrong. Please try again.",
      type: "error",
    });
  };

  return (
    <div className="flex w-full justify-center overflow-hidden rounded-xl">
      <GoogleLogin
        theme="outline"
        shape="rectangular"
        size="large"
        width="370"
        text="continue_with"
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    </div>
  );
}
