import { useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/no-empty-function
function useClientEffect(callback = () => {}, effectDependencies = []) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useEffect((): any => {
    if (typeof window !== "undefined") return callback();
  }, [typeof window, ...effectDependencies]);
}
export default useClientEffect;
