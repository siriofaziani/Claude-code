import { useSyncExternalStore } from "react";
import { getPath, navigate, subscribe } from "../router";

export function usePathname() {
  return useSyncExternalStore(subscribe, getPath, getPath);
}
export function useRouter() {
  return { push: (p) => navigate(p), replace: (p) => navigate(p), back: () => history.back(), refresh: () => {}, prefetch: () => {} };
}
export function notFound() {
  throw new Error("Page not found");
}
