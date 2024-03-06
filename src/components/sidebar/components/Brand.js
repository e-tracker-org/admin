import React from "react";

// Chakra imports
import { Flex, Image, useColorMode, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { RequisiteLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";
import navImageLight from 'assets/img/layout/logo.png';
import navImageDark from 'assets/img/layout/logoDark.png';

export function SidebarBrand() {
  //   Chakra color mode
  const { colorMode } = useColorMode();

  return (
    <Flex align='center' direction='column'>
      <Image src={colorMode === "dark" ? navImageLight :  navImageDark}  h='56px' my='32px' mb='28px' />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
