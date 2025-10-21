"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import type { ImportedTheme } from '@/types/theme-customizer'

interface ImportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImport: (theme: ImportedTheme) => void
}

export function ImportModal({ open, onOpenChange, onImport }: ImportModalProps) {
  const [importText, setImportText] = React.useState("")

  const processImport = () => {
    try {
      if (!importText.trim()) {
        console.error("No CSS content provided")
        return
      }

      // Parse CSS content into light and dark theme variables
      const lightTheme: Record<string, string> = {}
      const darkTheme: Record<string, string> = {}
      
      // Split CSS into sections
      const cssText = importText.replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      
      // Extract :root section (light theme)
      const rootMatch = cssText.match(/:root\s*\{([^}]+)\}/)
      if (rootMatch) {
        const rootContent = rootMatch[1]
        const variableMatches = rootContent.matchAll(/--([^:]+):\s*([^;]+);/g)
        for (const match of variableMatches) {
          const [, variable, value] = match
          lightTheme[variable.trim()] = value.trim()
        }
      }
      
      // Extract .dark section (dark theme)
      const darkMatch = cssText.match(/\.dark\s*\{([^}]+)\}/)
      if (darkMatch) {
        const darkContent = darkMatch[1]
        const variableMatches = darkContent.matchAll(/--([^:]+):\s*([^;]+);/g)
        for (const match of variableMatches) {
          const [, variable, value] = match
          darkTheme[variable.trim()] = value.trim()
        }
      }
      
      // Store the imported theme
      const importedThemeData = { light: lightTheme, dark: darkTheme }
      onImport(importedThemeData)
      
      onOpenChange(false)
      setImportText("")
    } catch (error) {
      console.error("Error importing theme:", error)
    }
  }

  return (
  <>
  </>
  )
}
