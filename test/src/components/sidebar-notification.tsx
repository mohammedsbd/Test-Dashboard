"use client"

import * as React from "react"

export function SidebarNotification() {
  const [isVisible, setIsVisible] = React.useState(true)

  if (!isVisible) return null

  return (
    <>
    </>
  )
}
