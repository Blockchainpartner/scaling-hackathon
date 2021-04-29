import { useState } from "react";
export default function useSessionStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.sessionStorage.getItem(key);
        return null !== item ? JSON.parse(item) : initialValue;
      } catch (error) {
        return initialValue;
      }
    }),
    setValue = (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore),
          window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {}
    };
  return [storedValue, setValue];
}
