'use client'

import React, { useState } from 'react'
import { RxHalf2 } from "react-icons/rx";

const DarkModeButton = () => {
  const [dark, setDark] = useState(false)


  React.useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    if (isDarkMode) {
      setDark(true);
      document.body.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDark(!dark)
    document.body.classList.toggle('dark')
    const isDarkMode = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }

  return (
    <RxHalf2
      size={40}
      className="fixed bottom-6 right-10 cursor-pointer"
      style={{ color: dark ? '#71717A' : '#1E1B4B' }}
      onClick={() => {
        toggleTheme()
      }}
    />
  )
}

export default DarkModeButton
