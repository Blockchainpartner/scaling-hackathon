import { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useSessionStorage(key: any, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.sessionStorage.getItem(key);
        return null !== item ? JSON.parse(item) : initialValue;
      } catch (error) {
        return initialValue;
      }
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue = (value: any) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore),
          window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {}
    };
  return [storedValue, setValue];
}
