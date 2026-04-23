import axios from "axios";

export function getErrorMessage(err: unknown, fallback = "Something went wrong"): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as
      | { message?: unknown; error?: unknown }
      | undefined;

    if (typeof data?.message === "string") return data.message;
    if (typeof data?.error === "string") return data.error;
    if (Array.isArray(data?.error)) {
      const first = data.error[0];
      if (first && typeof first === "object" && "message" in first) {
        const msg = (first as { message?: unknown }).message;
        if (typeof msg === "string") return msg;
      }
    }
    if (err.message) return err.message;
  }
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}
