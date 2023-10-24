import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { server } from "../main";
import {
  Button,
  Container,
  HStack,
  Radio,
  RadioGroup,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import Error from "./Error";
import CoinCard from "./CoinCard";
import { Link } from "react-router-dom";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [searchTerm , setSearchTerm] = useState("");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1);
  useEffect(() => {
    async function fetchCoins() {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoins();
  }, [currency, page]);

  if (error) return <Error message="Error fetching the coins" />;

  return (
    <Container maxWidth={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack justifyContent={"space-evenly"} wrap={"wrap"}>
            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
              <HStack spacing={"4"}>
                <Radio value={"inr"}>₹ INR</Radio>
                <Radio value={"usd"}>$ USD</Radio>
                <Radio value={"eur"}>€ EUR</Radio>
              </HStack>
            </RadioGroup>

            <FormControl justifyContent={"center"} w={["" , "25%"]}>
              <Input type="text" placeholder="Search any coin..." onChange={e => (setSearchTerm(e.target.value))}/>
            </FormControl>
          </HStack>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.filter( (value) => {
              if( searchTerm === ""){
                return value
              } else if (value.name.toLowerCase().includes(searchTerm.toLowerCase())){
                return value
              }
            }).map((item) => (
              <CoinCard
                id={item.id}
                key={item.id}
                name={item.name}
                image={item.image}
                price={item.current_price}
                sym={item.symbol}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
