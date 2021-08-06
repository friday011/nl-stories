import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Retrieve the key from localStorage
      const item = window.localStorage.getItem(key);

      // If item exists, parse & return it otherwise return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      // Return initialValue if something goes wrong
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // Change the state and update the contents in localStorage
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
