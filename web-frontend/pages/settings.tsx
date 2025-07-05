import React, { useState } from "react";
import { Box, Heading, Flex, VStack } from "@chakra-ui/react";

export default function Settings() {
  return (
    <Flex direction="column" align="center" justify="center" py={0} px={0} minH="100vh" maxH="100vh" minW="100vw" maxW="100vw" bg="#18181b" overflow="hidden">
      <Box w="100vw" h="100vh" minH="100vh" minW="100vw" px={[2, 8, 16]} py={[2, 8, 10]} display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" bg="#18181b" style={{boxSizing: 'border-box'}}>
        <Heading fontSize={["4xl", "5xl", "6xl"]} mb={10} color="#4FD1C5" fontFamily="'Poppins', 'Montserrat', 'Oswald', sans-serif" fontWeight="extrabold" letterSpacing="tight" textAlign="center" ml="-200px">
          Settings
        </Heading>
        <Box
          bg="rgba(32,32,32,0.7)"
          borderRadius="2xl"
          boxShadow="2xl"
          border="1.5px solid #2d3748"
          px={[4, 10, 20]}
          py={[6, 10, 16]}
          mb={8}
          minW={["90vw", "600px", "900px"]}
          maxW="1200px"
          textAlign="left"
          ml="-200px"
          style={{boxShadow: "0 0 16px 2px #4FD1C5, 0 2px 8px 0 rgba(79,209,197,0.10)"}}
        >
          <Heading size="lg" mb={6} color="#81E6D9">
            User Preferences
          </Heading>
          <VStack align="start" gap={6}>
            <Flex alignItems="center" gap={4}>
              <label htmlFor="dark-mode" style={{ color: "#E2E8F0", margin: 0 }}>
                Dark Mode
              </label>
              <input
                type="checkbox"
                id="dark-mode"
                defaultChecked
                style={{ 
                  width: "20px", 
                  height: "20px", 
                  accentColor: "#4FD1C5",
                  cursor: "pointer"
                }}
              />
            </Flex>
            <Flex alignItems="center" gap={4}>
              <label htmlFor="notifications" style={{ color: "#E2E8F0", margin: 0 }}>
                Notifications
              </label>
              <input
                type="checkbox"
                id="notifications"
                style={{ 
                  width: "20px", 
                  height: "20px", 
                  accentColor: "#4FD1C5",
                  cursor: "pointer"
                }}
              />
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
} 