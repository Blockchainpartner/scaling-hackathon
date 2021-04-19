import { useEffect } from "react";
function useClientEffect(callback = () => {}, effectDependencies = []) {
  useEffect((): any => {
    if (typeof window !== "undefined") return callback();
  }, [typeof window, ...effectDependencies]);
}
export default useClientEffect;
