'use client'

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu'

import { navLinks } from './nav-links'
import { NavItem } from './NavItem'

export function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[350px] gap-3 p-2 md:p-4 md:w-[450px] md:grid-cols-1 lg:w-[450px]'>
              {navLinks.map((item) => (
                <NavItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                >
                  {item.description}
                </NavItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
