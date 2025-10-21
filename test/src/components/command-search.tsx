"use client"

import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Command as CommandPrimitive } from "cmdk"
import {
  LayoutDashboard,
  CheckSquare,
  Settings,
  User,
 
  type LucideIcon,
} from "lucide-react"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-xl bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Input
    ref={ref}
    className={cn(
      "flex h-12 w-full border-none bg-transparent px-4 py-3 text-[17px] outline-none placeholder:text-zinc-500 dark:placeholder:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 mb-4",
      className
    )}
    {...props}
  />
))
CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[400px] overflow-y-auto overflow-x-hidden pb-2", className)}
    {...props}
  />
))
CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="flex h-12 items-center justify-center text-sm text-zinc-500 dark:text-zinc-400"
    {...props}
  />
))
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden px-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-zinc-500 dark:[&_[cmdk-group-heading]]:text-zinc-400 [&:not(:first-child)]:mt-2",
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex h-12 cursor-pointer select-none items-center gap-2 rounded-lg px-4 text-sm text-zinc-700 dark:text-zinc-300 outline-none transition-colors data-[disabled=true]:pointer-events-none data-[selected=true]:bg-zinc-100 dark:data-[selected=true]:bg-zinc-800 data-[selected=true]:text-zinc-900 dark:data-[selected=true]:text-zinc-100 data-[disabled=true]:opacity-50 [&+[cmdk-item]]:mt-1",
      className
    )}
    {...props}
  />
))
CommandItem.displayName = CommandPrimitive.Item.displayName

interface SearchItem {
  title: string
  url: string
  group: string
  icon?: LucideIcon
}

interface CommandSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandSearch({ open, onOpenChange }: CommandSearchProps) {
  const navigate = useNavigate()
  const commandRef = React.useRef<HTMLDivElement>(null)

  const searchItems: SearchItem[] = [

    { title: "Dashboard 1", url: "/dashboard", group: "Dashboards", icon: LayoutDashboard },
    { title: "Tasks", url: "/tasks", group: "Apps", icon: CheckSquare },
    { title: "User Settings", url: "/settings/user", group: "Settings", icon: User },
    { title: "Account Settings", url: "/settings/account", group: "Settings", icon: Settings },

  
  ]

  const groupedItems = searchItems.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = []
    }
    acc[item.group].push(item)
    return acc
  }, {} as Record<string, SearchItem[]>)

  const handleSelect = (url: string) => {
    navigate(url)
    onOpenChange(false)
    if (commandRef.current) {
      commandRef.current.style.transform = 'scale(0.96)'
      setTimeout(() => {
        if (commandRef.current) {
          commandRef.current.style.transform = ''
        }
      }, 100)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 shadow-2xl border border-zinc-200 dark:border-zinc-800 max-w-[640px]">
        <DialogTitle className="sr-only">Command Search</DialogTitle>
        <Command
          ref={commandRef}
          className="transition-transform duration-100 ease-out"
        >
          <CommandInput placeholder=".." autoFocus />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {Object.entries(groupedItems).map(([group, items]) => (
              <CommandGroup key={group} heading={group}>
                {items.map((item) => {
                  const Icon = item.icon
                  return (
                    <CommandItem
                      key={item.url}
                      value={item.title}
                      onSelect={() => handleSelect(item.url)}
                    >
                      {Icon && <Icon className="mr-2 h-4 w-4" />}
                      {item.title}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}

export function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <>
    
    </>
  )
}
