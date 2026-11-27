export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (error && typeof error === "object") {
    const errObj = error as {
      data?: { message?: string };
      message?: string;
    };
    if (errObj.data?.message) {
      return errObj.data.message;
    }
    if (errObj.message) {
      return errObj.message;
    }
  }
  return fallback;
}
