import { extendTheme } from "@chakra-ui/react";

const fonts = {
  body: "Inter, sans-serif",
  heading: "Inter, sans-serif",
};

const theme = extendTheme({
  fonts,
  components: {
    Button: {
      variants: {
        fav: {
          bg: "white",
          _hover: {
            bg: "gray.100",
          },
        },
      },
    },
  },
});

export default theme;
