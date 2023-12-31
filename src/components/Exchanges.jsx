import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { server } from "../main";
import {
  Container,
  FormControl,
  HStack,
  Heading,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import Error from "./Error";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchDetails() {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchDetails();
  }, []);

  if (error) return <Error message="Error fetching the exchanges" />;

  return (
    <Container maxWidth={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <FormControl justifyContent={"center"} w={["", "25%"]} mt={"2"}>
            <Input
              type="text"
              placeholder="Search any Exchange..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FormControl>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges
              .filter((item) => {
                if (searchTerm === "") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return item;
                }
              })
              .map((item) => (
                <ExchangeCard
                  key={item.id}
                  name={item.name}
                  image={item.image}
                  rank={item.trust_score_rank}
                  url={item.url}
                />
              ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, image, rank, url }) => {
  return (
    <a href={url} target={"blank"}>
      <VStack
        w={"52"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image
          src={image}
          w={"10"}
          h={"10"}
          objectFit={"contain"}
          alt={"Exchanges"}
        />

        <Heading size={"md"} noOfLines={1}>
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
