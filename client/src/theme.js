// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark", // default dark mode
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;
