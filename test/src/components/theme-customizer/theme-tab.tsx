"use client"
import { useThemeManager } from '@/hooks/use-theme-manager'
import { useCircularTransition } from '@/hooks/use-circular-transition'
import { colorThemes, tweakcnThemes } from '@/config/theme-data'
import React from 'react'
import "./circular-transition.css"


export function ThemeTab({
  setSelectedTheme,

  setSelectedTweakcnTheme,

  setSelectedRadius,
  setImportedTheme,

}: ThemeTabProps) {
  const {
    isDarkMode,
    brandColorsValues,
    setBrandColorsValues,
    applyTheme,
    applyTweakcnTheme,
    applyRadius,
    handleColorChange
  } = useThemeManager()

  const { toggleTheme } = useCircularTransition()

  const handleRandomShadcn = () => {
 
    const randomTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)]
    setSelectedTheme(randomTheme.value)
    setSelectedTweakcnTheme("") 
    setBrandColorsValues({}) 
    setImportedTheme(null) 
    applyTheme(randomTheme.value, isDarkMode)
  }

  const handleRandomTweakcn = () => {
   
    const randomTheme = tweakcnThemes[Math.floor(Math.random() * tweakcnThemes.length)]
    setSelectedTweakcnTheme(randomTheme.value)
    setSelectedTheme("") 
    setBrandColorsValues({})
    setImportedTheme(null) 
    applyTweakcnTheme(randomTheme.preset, isDarkMode)
  }

  const handleRadiusSelect = (radius: string) => {
    setSelectedRadius(radius)
    applyRadius(radius)
  }

  const handleLightMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDarkMode === false) return
    toggleTheme(event)
  }

  const handleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDarkMode === true) return
    toggleTheme(event)
  }

  return (
    <div className="">


   
    </div>
  )
}
