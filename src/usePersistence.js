import { useState, useEffect } from 'react';

function usePersistence(key, defaultValue) {
  const [value, setValue] = useState(()=> {
    const persistedValue = localStorage.getItem(key);
    if (persistedValue !== null) return JSON.parse(persistedValue)
    return defaultValue;
  })

  useEffect(() => {
    if (value === null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key])

  return [value, setValue]
}

export default usePersistence