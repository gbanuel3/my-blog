import React from 'react'
import { Button, useColorMode } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import Link from 'next/link'
import { colors } from '@/constants'

type NavigationBarButtonProps = {
  icon: any
  text: string
  href: string
  isActive?: boolean
  onClick: any
}

function NavigationBarButton({
  icon,
  text,
  href,
  isActive,
  onClick,
}: NavigationBarButtonProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  const activeBg = colors[colorMode].btn_active_bg
  const inactiveBg = 'transparent'
  const activeText = colors[colorMode].btn_active_text
  const hoverColor = isActive ? activeBg : colors[colorMode].btn_hover

  return (
    <Button
      as={Link}
      href={href}
      leftIcon={icon}
      colorScheme="gray"
      variant="outline"
      borderRadius="full"
      px="4"
      py="2"
      fontSize="md"
      color={isActive ? activeText : colors[colorMode].btn_text}
      bg={isActive ? activeBg : inactiveBg}
      _hover={{
        bg: hoverColor,
      }}
      _active={{
        bg: colors[colorMode].btn_active_bg,
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  )
}

export default NavigationBarButton
