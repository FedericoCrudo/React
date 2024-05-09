import { useEffect } from "react";
export function useKey(action, key) {
  useEffect(
    function () {
      document.addEventListener("keydown", eventCallback);

      function eventCallback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      return () => document.removeEventListener("keydown", eventCallback);
    },
    [action, key]
  );
}
