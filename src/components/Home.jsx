import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btcSrc from "../assets/btc.jpg";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box bgColor={"black"} w={"full"} h={"100vh"}>
      <motion.div style={{height:"80vh"}}
      animate={{translateY:"20px"}}
      transition={{duration:1.5,
      repeat:Infinity,
      repeatType:"reverse"}}>
        <Image w={"full"} h={"full"} objectFit={"contain"} src={btcSrc} />
      </motion.div>
      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"bold"}
        fontFamily={"cursive"}
        letterSpacing={"8px"}
        color={"whiteAlpha.700"}
        mt={"-20"}
        filter={"grayscale(1)"}
      >
        Crypto Coins
      </Text>
    </Box>
  );
};

export default Home;
