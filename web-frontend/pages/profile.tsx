import React from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";

export default function Profile() {
  return (
    <Flex direction="column" align="center" py={10} px={4} minH="100vh" bg="#18181b">
      <Heading fontSize={["4xl", "5xl", "6xl"]} mb={8} color="#4FD1C5" fontFamily="'Poppins', 'Montserrat', 'Oswald', sans-serif" fontWeight="extrabold" letterSpacing="tight">
        Profile
      </Heading>
      <Box
        bg="rgba(32,32,32,0.7)"
        borderRadius="2xl"
        boxShadow="2xl"
        border="1.5px solid #2d3748"
        px={[4, 10]}
        py={[6, 10]}
        mb={8}
        minW={["90vw", "400px"]}
        maxW="600px"
        textAlign="center"
      >
        <Flex direction="column" align="center" gap={4}>
          <Box w="80px" h="80px" borderRadius="full" bg="#4FD1C5" mb={2} />
          <Heading size="md" color="#81E6D9">Julian User</Heading>
          <Text color="#E2E8F0">user@email.com</Text>
          <Text color="#A0AEC0">Quant Researcher | Portfolio Manager</Text>
        </Flex>
      </Box>
    </Flex>
  );
} 