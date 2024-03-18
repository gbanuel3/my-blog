import React from 'react'
import { Flex, IconButton, useColorMode, Box } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { colors } from '@/constants'
import { FaHome, FaUser, FaPen, FaProjectDiagram, FaGithub } from 'react-icons/fa'
import NavigationBarButton from './navigation_bar_button'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const navItems = [
  { url: '/', icon: <FaHome />, label: 'Home' },
  { url: '/about', icon: <FaUser />, label: 'About' },
  { url: '/blog', icon: <FaPen />, label: 'Blog' },
  { url: '/projects', icon: <FaProjectDiagram />, label: 'Projects' },
  { url: '/github', icon: <FaGithub />, label: 'GitHub' },
]

function NavigationBar() {
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <div style={{ width: '48px', height: '48px' }} />
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg={colors[colorMode].bg_color}
      color={colorMode === 'light' ? 'black' : 'white'}
    >
      {/* Navigation Links */}
      <Flex align="center" mr={5}>
        {navItems.map((item) => (
          <NavigationBarButton
            key={item.label}
            icon={item.icon}
            text={item.label}
            href={item.url}
            isActive={router.pathname === item.url}
          />
        ))}
      </Flex>

      {/* Color Mode Button */}
      <Box>
        <IconButton
          size="md"
          fontSize="lg"
          aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
          variant="ghost"
          color="current"
          ml="2"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        />
      </Box>
    </Flex>
  )
}

export default NavigationBar
