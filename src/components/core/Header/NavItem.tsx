'use client'

import React from 'react'

import { cn } from '@/lib/utils'

import { NavigationMenuLink } from '@/components/ui/navigation-menu'

interface NavItemProps extends React.ComponentPropsWithoutRef<'a'> {
  title: string
  children: React.ReactNode
}

export const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className='text-sm font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
NavItem.displayName = 'NavItem'
