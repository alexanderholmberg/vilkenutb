import { useState, useEffect } from 'react';

export const useLocalStorage = (initialState, key) => {
  const get = () => {
    if (typeof (Storage) !== "undefined") {
      const storage = localStorage.getItem(key);
      //console.log('localStorage: ', localStorage, 'storage: ', storage);
      return (storage) ? JSON.parse(storage).value : initialState;
    }
    return initialState;
  };

  const [value, setValue] = useState(get());

  useEffect(() => {
    if (typeof (Storage) !== "undefined") {
      localStorage.setItem(key, JSON.stringify({ value }));
    }
  }, [value]);

  return [value, setValue];
};