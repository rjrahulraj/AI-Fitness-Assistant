// src/components/ThemeToggle.jsx
import React from 'react';
import { HStack, Switch, useColorMode, Text } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export default function ThemeToggle({ size = 'md' }) {
     const { colorMode, toggleColorMode } = useColorMode();

     return (
          <HStack spacing={2} align="center">
               <SunIcon />
               <Switch
                    isChecked={colorMode === 'dark'}
                    onChange={toggleColorMode}
                    size={size}
                    aria-label="Toggle dark mode"
               />
               <MoonIcon />
               <Text fontSize="sm" ml={2} display={{ base: 'none', md: 'block' }}>
                    {colorMode === 'dark' ? 'Dark' : 'Light'}
               </Text>
          </HStack>
     );
}
