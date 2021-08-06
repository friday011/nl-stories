import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <Box
      w="full"
      minH="100vh"
      bg="gray.50"
      overflowY="auto"
      display="flex"
      flexDirection="column"
    >
      <Head>
        <title>Newslaundry Stories</title>
        <meta name="description" content="Demo Project." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.xl">{children}</Container>
    </Box>
  );
};

export default Layout;
