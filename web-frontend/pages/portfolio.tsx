import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Flex, Spinner, Table, SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";
import { FiPieChart } from "react-icons/fi";

interface Allocation {
  asset: string;
  weight: number;
}
interface PortfolioData {
  allocations: Allocation[];
  exposures: string[];
  risk: { label: string; value: string }[];
}

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Faint glow style for important elements
  const glowTeal = { boxShadow: "0 0 10px 1px #4FD1C5, 0 2px 8px 0 rgba(79,209,197,0.10)" };
  const glowGreen = { boxShadow: "0 0 10px 1px #38A169, 0 2px 8px 0 rgba(56,161,105,0.10)" };
  const glowRed = { boxShadow: "0 0 10px 1px #F56565, 0 2px 8px 0 rgba(245,101,101,0.10)" };
  const glowBlue = { boxShadow: "0 0 10px 1px #4299E1, 0 2px 8px 0 rgba(66,153,225,0.10)" };
  const glowPurple = { boxShadow: "0 0 10px 1px #9F7AEA, 0 2px 8px 0 rgba(159,122,234,0.10)" };

  // Add Google Fonts for distinctive heading
  const headingFont = "'Poppins', 'Montserrat', 'Oswald', sans-serif";

  useEffect(() => {
    fetch("http://localhost:8000/api/portfolio")
      .then(res => res.json())
      .then(data => {
        setPortfolio(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load portfolio.");
        setLoading(false);
      });
  }, []);

  return (
    <Flex direction="column" align="center" justify="center" py={0} px={0} minH="100vh" maxH="100vh" minW="100vw" maxW="100vw" bg="#18181b" overflow="hidden">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Montserrat:wght@700&family=Oswald:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <Box w="100vw" h="100vh" minH="100vh" minW="100vw" px={[2, 8, 16]} py={[2, 8, 10]} display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" bg="#18181b" style={{boxSizing: 'border-box'}}>
        <Heading fontSize={["4xl", "5xl", "6xl"]} mb={10} color="#4FD1C5" fontFamily={headingFont} fontWeight="extrabold" letterSpacing="tight" textAlign="center" ml="-200px">
          Portfolio Overview
        </Heading>
        {loading ? <Spinner size="lg" color="#4FD1C5" /> : error ? <Text color="#F56565">{error}</Text> : portfolio && (
          <Box w="100%" h="100%" maxW="1800px" maxH="900px" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" overflow="visible" px={6} py={4} ml="-200px" style={{boxSizing: 'border-box'}}>
            {/* Stat Cards Row (Risk) */}
            <Flex w="100%" justify="center" align="center" gap={8} mb={6}>
              {portfolio.risk.map((r) => (
                <Box key={r.label} bg="rgba(32,32,32,0.7)" borderRadius="xl" border="1px solid #2d3748" px={8} py={6} minW="170px" maxW="220px" h="110px" textAlign="center" style={
                  r.label.toLowerCase().includes("risk") ? glowRed :
                  r.label.toLowerCase().includes("return") ? glowGreen :
                  r.label.toLowerCase().includes("sharpe") ? glowBlue :
                  r.label.toLowerCase().includes("alpha") ? glowPurple :
                  glowTeal
                }>
                  <Text fontSize="lg" color="#A0AEC0" mb={1}>{r.label}</Text>
                  <Text fontSize="3xl" fontWeight="bold" color="#4FD1C5">{r.value}</Text>
                </Box>
              ))}
            </Flex>
            {/* Large Table Area (Allocations) */}
            <Box flex={1} w="100%" h="calc(100% - 170px)" display="flex" alignItems="center" justifyContent="center" mt={2}>
              <Box w="60%" minW="500px" maxW="900px" bg="#23272f" borderRadius="2xl" p={8} style={glowBlue}>
                <Heading size="lg" mb={6} color="#81E6D9" textAlign="center">Allocations</Heading>
                <Table.Root colorScheme="teal">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader>Asset</Table.ColumnHeader>
                      <Table.ColumnHeader>Weight</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {portfolio.allocations.map((a) => (
                      <Table.Row key={a.asset}>
                        <Table.Cell>
                          <Text color="#E2E8F0">{a.asset}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text color="#4FD1C5">{a.weight}%</Text>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Box>
            </Box>
            {/* Exposures Row */}
            <Box w="100%" maxW="900px" mt={4} textAlign="center">
              <Heading size="md" mb={2} color="#81E6D9">Exposures</Heading>
              <Text color="#E2E8F0">{portfolio.exposures.join(", ")}</Text>
            </Box>
          </Box>
        )}
      </Box>
    </Flex>
  );
} 