import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

import {
  Center,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";

import Layout from "../components/Layout";
import Card from "../components/Card";
import { FaSearch } from "react-icons/fa";

const Home = ({ data }) => {
  const [items, setItems] = useState(data.items);
  const [searchText, setSearchText] = useState("");
  const [favourites, setFavourites] = useLocalStorage("favourites", []);

  // Handle Search Input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const re = new RegExp(value, "g");
    setItems(data.items.filter((item) => item.story.headline.match(re)));
  };

  // Handle Favourites button Click
  const handleFavBtnClick = (itemId, isFav) => {
    if (isFav) {
      setFavourites(favourites.filter((favStoryId) => favStoryId !== itemId));
      return;
    }

    setFavourites([...favourites, itemId]);
  };

  return (
    <Layout>
      <Stack w="full" spacing={8} my="5rem">
        <Heading textAlign="center">Newslaundry Stories</Heading>
        <Center>
          <InputGroup maxW="sm" w="full">
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input
              borderColor="gray.400"
              _hover={{
                borderColor: "gray.400",
              }}
              value={searchText}
              onChange={handleInputChange}
              placeholder="Search stories"
            />
          </InputGroup>
        </Center>
        <Grid
          w="full"
          templateColumns={{
            base: "1fr",
            sm: "1fr 1fr",
            lg: "1fr 1fr 1fr",
          }}
          gap={{ base: 2, md: 4 }}
        >
          {items.map((item) => (
            <Card
              key={item.id}
              data={item}
              handleFavBtnClick={handleFavBtnClick}
              isFav={
                favourites.find((favId) => favId === item.id) ? true : false
              }
            />
          ))}
        </Grid>
      </Stack>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(
    "https://ace.qtstage.io/api/v1/collections/entertainment"
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default Home;
