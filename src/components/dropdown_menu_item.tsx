import React from 'react'
import { MenuItem, useColorMode, Icon } from '@chakra-ui/react'
import Link from 'next/link'
import { colors } from '@/constants'

type CustomMenuItemProps = {
  icon: any // Adjusted for proper typing
  text: string
  href: string
  onClick: any
}

const DropdownMenuItem = ({ icon, text, href, onClick }: CustomMenuItemProps) => {
  const { colorMode } = useColorMode()

  return (
    <Link href={href} passHref>
      <MenuItem
        key={text}
        icon={icon}
        _hover={{
          bg: colors[colorMode].btn_hover,
        }}
        _active={{
          bg: colors[colorMode].btn_active_bg,
          color: colors[colorMode].btn_active_text,
        }}
        onClick={onClick}
        bg={colors[colorMode].bg_color}
      >
        {text}
      </MenuItem>
    </Link>
  )
}

export default DropdownMenuItem
