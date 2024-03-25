import React from 'react'
import {
  Flex,
  IconButton,
  useColorMode,
  Box,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons'
import { colors } from '@/constants'
import { FaHome, FaUser, FaPen, FaProjectDiagram, FaGithub } from 'react-icons/fa'
import NavigationBarButton from './navigation_bar_button'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Url } from 'next/dist/shared/lib/router/router'
import DropdownMenuItem from './dropdown_menu_item'
import { GITHUB } from '@/constants'

function getRouteItem(url: string) {
  const defaultItem = {
    icon: <FaHome />,
    label: 'Not Found',
  }

  return routerMap[url] || defaultItem
}

const navItems = [
  { url: '/', icon: <FaHome />, label: 'Home', isExternal: false },
  { url: '/about', icon: <FaUser />, label: 'About', isExternal: false },
  { url: '/blog', icon: <FaPen />, label: 'Blog', isExternal: false },
  {
    url: '/projects',
    icon: <FaProjectDiagram />,
    label: 'Projects',
    isExternal: false,
  },
  {
    url: GITHUB,
    icon: <FaGithub />,
    label: 'GitHub',
    isExternal: true,
  },
]

const routerMap: any = {
  '/': { icon: <FaHome />, label: 'Home' },
  '/about': { icon: <FaUser />, label: 'About' },
  '/blog': { icon: <FaPen />, label: 'Blog' },
  '/projects': { icon: <FaProjectDiagram />, label: 'Projects' },
}

function NavigationBar() {
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()
  const [selectedItem, setSelectedItem] = useState({
    label: getRouteItem(router.pathname).label,
    icon: getRouteItem(router.pathname).icon,
  })
  const isMobile = useBreakpointValue({ base: true, md: false })

  useEffect(() => {
    setSelectedItem({
      label: getRouteItem(router.pathname).label,
      icon: getRouteItem(router.pathname).icon,
    })
  }, [router.pathname])

  const handleNavItemClick = (event: any, item: any, isExternal = false) => {
    event.preventDefault()
    if (isExternal) {
      window.open(item.url, '_blank')
    } else {
      setSelectedItem({ label: item.label, icon: item.icon })
      router.push(item.url)
    }
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      bg={colors[colorMode].bg_color}
      color={colorMode === 'light' ? 'black' : 'white'}
      mt={'5px'}
    >
      {isMobile ? (
        <Menu>
          <MenuButton as={Button} leftIcon={selectedItem.icon} variant="outline">
            {selectedItem.label}
          </MenuButton>
          <MenuList bg={colors[colorMode].bg_color}>
            {navItems.map((item) => (
              <DropdownMenuItem
                key={item.label}
                icon={item.icon}
                text={item.label}
                href={item.url}
                onClick={(event: any) =>
                  handleNavItemClick(event, item, item.isExternal)
                }
              />
            ))}
          </MenuList>
        </Menu>
      ) : (
        <Flex align="center" gap={'2px'}>
          {navItems.map((item) => (
            <NavigationBarButton
              key={item.label}
              icon={item.icon}
              text={item.label}
              href={item.url}
              isActive={router.pathname === item.url}
              onClick={(event: any) => handleNavItemClick(event, item, item.isExternal)}
            />
          ))}
        </Flex>
      )}

      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
        variant="ghost"
        color="current"
        ml="2"
        mr="4"
        onClick={toggleColorMode}
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      />
    </Flex>
  )
}

export default NavigationBar
