import { useEffect, useState } from "react";
import NextImage from "next/image";

import {
  Avatar,
  Badge,
  Box,
  Heading,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

import { FaFacebookF, FaHeart, FaRegHeart, FaTwitter } from "react-icons/fa";

const Card = ({ data, handleFavBtnClick, isFav }) => {
  // Mounting is used for properly displaying
  // the Favourite Icon based on a condition
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box w="full" bg="white" boxShadow="md" rounded="md" overflow="hidden">
      <Box position="relative" h="60">
        {mounted && (
          <IconButton
            aria-label="Mark as Favourite."
            icon={isFav ? <FaHeart color="red" /> : <FaRegHeart color="red" />}
            variant="fav"
            isRound
            position="absolute"
            top={4}
            right={4}
            zIndex={10}
            onClick={() => handleFavBtnClick(data.id, isFav)}
          />
        )}
        <NextImage
          src={
            data.story["hero-image-s3-key"]
              ? `https://qtstage-01.gumlet.io/${data.story["hero-image-s3-key"]}`
              : "/images/default-image.jpg"
          }
          alt={data.story["hero-image-caption"] || data.story.headline}
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Stack p={4} spacing={4}>
        {data.story.tags && (
          <HStack>
            {data.story.tags.slice(0, 2).map((tag) => (
              <Badge key={tag.id} colorScheme="red">
                {tag.name}
              </Badge>
            ))}
            {data.story.tags.length > 2 && (
              <Badge>+ {data.story.tags.length - 2}</Badge>
            )}
          </HStack>
        )}
        <Link isExternal href={data.story.url}>
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {data.story.headline}
          </Heading>
        </Link>
        {data.story.subheadline && (
          <Text color="gray.500" isTruncated>
            {data.story.subheadline}
          </Text>
        )}
        <Stack direction="row" spacing={4} align="center">
          <Avatar
            src={data.story.authors[0]["avatar-url"]}
            name={data.story["author-name"]}
            alt="Author"
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <HStack spacing={3}>
              <Text fontWeight="semibold">{data.story["author-name"]}</Text>
              {data.story.authors[0].social && (
                <HStack>
                  {data.story.authors[0].social.twitter && (
                    <Link
                      aria-label="Twitter Handle"
                      href={data.story.authors[0].social.twitter.handle}
                    >
                      <FaTwitter color="#5EAADA" />
                    </Link>
                  )}
                  {data.story.authors[0].social.facebook && (
                    <Link
                      aria-label="Facebook Profile URL"
                      href={data.story.authors[0].social.facebook.url}
                    >
                      <FaFacebookF color="#4869A7" />
                    </Link>
                  )}
                </HStack>
              )}
            </HStack>
            <Text color={"gray.500"}>
              {new Date(data.story["updated-at"]).toDateString()} &bull;{" "}
              {data.story["read-time"]} min read
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Card;
