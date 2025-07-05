import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Flex, Button, Spinner, SimpleGrid, Badge, Table } from "@chakra-ui/react";
import axios from "axios";
import NextLink from "next/link";

interface Strategy {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  performance: number;
  lastUpdated: string;
}

export default function Strategies() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState("");

  useEffect(() => {
    // Mock strategies data
    setTimeout(() => {
      setStrategies([
        {
          id: "momentum",
          name: "Dual EMA Momentum",
          description: "Breakout strategy using dual exponential moving averages",
          type: "Technical",
          status: "active",
          performance: 0.156,
          lastUpdated: "2024-01-15"
        },
        {
          id: "pairs",
          name: "Pairs Trading",
          description: "Mean reversion strategy using Kalman filter",
          type: "Statistical",
          status: "active",
          performance: 0.089,
          lastUpdated: "2024-01-14"
        },
        {
          id: "ml_factor",
          name: "ML Factor Model",
          description: "Machine learning based factor model",
          type: "ML",
          status: "active",
          performance: 0.234,
          lastUpdated: "2024-01-13"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Flex direction="column" align="center" py={10} px={4} minH="100vh" bg="#18181b">
      <Heading fontSize={["4xl", "5xl", "6xl"]} mb={8} color="#4FD1C5" fontFamily="'Poppins', 'Montserrat', 'Oswald', sans-serif" fontWeight="extrabold" letterSpacing="tight">
        Strategies
      </Heading>
      {loading ? <Spinner size="lg" color="#4FD1C5" /> : error ? <Text color="#F56565">{error}</Text> : (
        <SimpleGrid columns={[1, 2, 3]} gap={6} w="100%" maxW="1200px">
          {strategies.map((s) => (
            <Box key={s.id} bg="rgba(32,32,32,0.7)" borderRadius="2xl" boxShadow="2xl" border="1.5px solid #2d3748" p={6}>
              <Heading size="md" color="#81E6D9" mb={2}>{s.name}</Heading>
              <Text color="#E2E8F0" mb={2}>{s.description}</Text>
              <Text color="#A0AEC0" mb={2}>Performance: {s.performance}</Text>
              <NextLink href={`/strategies/${s.id}`} passHref legacyBehavior>
                <Button as="a" colorScheme="teal" size="sm" w="100%">View Details</Button>
              </NextLink>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
} 