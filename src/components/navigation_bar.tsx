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
  Image,
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

const navItems = [
  {
    url: '/',
    icon: 'data:image/png;base64,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',
    label: 'Home',
    isExternal: false,
  },
  {
    url: '/about',
    icon: 'data:image/png;base64,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',
    label: 'About',
    isExternal: false,
  },
  {
    url: '/blog',
    icon: 'data:image/png;base64,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',
    label: 'Blog',
    isExternal: false,
  },
  {
    url: '/projects',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEuklEQVR4nO2af2wTZRjHH00Y/oFZ4h+aGAWHiUuMC1ksO9BtLFLcrxIZIhgiMtQQE43GnzATSOQfbSERRCNk6oiTrdcfdhvDABvQzkhsNteaJWzGRMMWGYxdcSSo2VYf8xzXs653/XG93nW3+ybfP9a+d/d+P+/7Pu/drgCmTJkyZcqUKVOmTEmqvLX3YavL767zBCbqPX1Rm/c7jLnWHZhcy/qb17ScvwOMqMq2s5vrvH1/xoeWMkEAI458XRrhYzMBjCary+9OJ3zMYDTVeQITqUKvc/mxrLUH7/rYZzwA9ULBc42M4V8zs8iOjOKiA24EBytto8kmjPJM9B8kTUej8uEdLDLhiK4uC0VuMGHOZ/npWrGqAOKVzwD+A8FFLEPc/QsWAHPLroUOYMqQACr7r+Jjg9fSamuIIvjMmWF8/2gXend/hD9veRVnKhqw7+W96QHg++W8AQ7WB3ZXsWIA7MjorW1weFQTAPWBX/HcK/uQq34Oo+VPJTj0/NsZABAdgQPtmRVGm9TdngYAdh3rkQwec9ueT5UAILvmBYDVgxx6mg7KAtjTfFIZADubWWG0zQlf4w5kDeC9L07h1frteMXWiO981Zu0Ha13KQCbei4qnQGYFYBVX/cqBrAqxOGRD47hbMUGMch05UY+qFR4+k4q/JT1Wf5cctexXBjD0lNDuOLEgPoA7v6kQxGA8oEJ7H7LIRmIRnlvc7fYtqnldEL4mYoN4mwIvtgke51H/b/gis5+0aoCKP7826Th5QBYL4xh/45dSYtaDIJ0+AZ+zdOsoF1h35FO2ZGPD68KgBp3gJ/2qUZeDsDTPcP428adCYGvV29NCEp/S30mtUSkzE97tQFAGqHlALzk68fJ2m0J4S817MTNpy/i7pYzsus8fuTT3TlozecNgDdbz+HfVZsSQg00vovrvh9LWewyGXkRwJzwugK4YmtMCEVFkIphqoqvJHxeACg41CF25vL6HWIg2vZo+0u2ddH9wLitkT8u2b1BXgO41x0UO/NaWwB/X/8CH0rJaM4rAAWHOvjwZYOTmgTVBcDiw11Y1D2EpT+MI5NkKhsSQOGXvWgZSO8fEDG/cfy8ZCHM1rSkXj8e0A7A4sNdGYcnj+cgfMxUKDUDUNQ9pGg6GgZAKa15BQBomuYCAoWnHUYzAGUhfSt7ul4ZvJwbAEwoclOPQPHP9FLB0nX2MyDMdWodfu4zvVKX+IJqALhexIS4aS1HXo3w5Afa+1S4DwAAZpCr1QqC1DO9Ej/yTRALDnrVAUBa/WNkGb11ZcLcTSacuzvBbNd8SUeQH3nZ8EoB/E92djTTx+S8ctZyOI/qHkKxnX9kD2C/q0h434bzznYnC6rI0f7k/IPgnIQPvfeBatrvWQYO52fgcF4Cu3M2f0edneJHXtXwpkyZMmXK1FwtAoBCALgHAJYCwEMAUAIAK+mH5wBQAQBVAPAE/Q4bAKrp/Su9hBZcI3xmFdpUCceUC+coEc65VLhGoXBN3XQnADxIT81Cp2062Sr0gfqyRIvgtwOARcfAqWwR+rigAdwGGmgJACwX1qeeS2Ct0IflWi0BkFGyIvi4UNDWCAWOOi1XBOk7akNt6Rg6NqdF8F/B6AosM56vPQAAAABJRU5ErkJggg==',
    label: 'Projects',
    isExternal: false,
  },
  {
    url: GITHUB,
    icon: 'data:image/png;base64,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',
    label: 'GitHub',
    isExternal: true,
  },
]

function getRouteItem(url: string) {
  const defaultItem = {
    icon: <FaHome />,
    label: 'Not Found',
  }
  if (url.includes('/blog/')) {
    return routerMap['/blog']
  }
  return routerMap[url] || defaultItem
}

const routerMap: any = {
  '/': { icon: navItems[0].icon, label: 'Home' },
  '/about': { icon: navItems[1].icon, label: 'About' },
  '/blog': { icon: navItems[2].icon, label: 'Blog' },
  '/projects': { icon: navItems[3].icon, label: 'Projects' },
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
          <MenuButton
            as={Button}
            leftIcon={
              <Image src={selectedItem.icon} width="30px" height="30px" alt={'icon'} />
            }
            variant="outline"
          >
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
