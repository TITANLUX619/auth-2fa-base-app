'use client';

import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [dark, setDark] = useState(false)


  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    if (isDarkMode) {
      setDark(true);
      document.body.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDark(!dark)
    document.body.classList.toggle('dark')
    const isDarkMode = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }

  return { toggleDarkMode };
};

export default useDarkMode;
