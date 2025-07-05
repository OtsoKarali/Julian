import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Head from "next/head";
import { FiHeart } from "react-icons/fi";

const glassBg = "rgba(26, 32, 44, 0.85)";
const glassBorder = "#2d3748";

// Subtle, varied glow styles
const glowGreen = { boxShadow: "0 0 10px 1px #38A169, 0 2px 8px 0 rgba(56,161,105,0.10)" };

// Add Google Fonts for distinctive heading
const headingFont = "'Poppins', 'Montserrat', 'Oswald', sans-serif";

export default function HealthPage() {
  const [apiStatus, setApiStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    // Simulate API health check
    fetch("/api/health")
      .then((res) => {
        if (res.ok) setApiStatus("ok");
        else setApiStatus("error");
      })
      .catch(() => setApiStatus("error"));
  }, []);

  return (
    <Flex direction="column" align="center" justify="center" minH="80vh" px={2}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Montserrat:wght@700&family=Oswald:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <Heading fontSize={["4xl", "5xl", "6xl"]} mb={8} color="#81E6D9" fontFamily={headingFont} fontWeight="extrabold" letterSpacing="tight">
        Health
      </Heading>
      <Box
        bg={glassBg}
        borderRadius="2xl"
        border="1.5px solid"
        borderColor={glassBorder}
        px={[4, 10]}
        py={[6, 10]}
        mb={8}
        minW={["90vw", "600px"]}
        maxW="900px"
        textAlign="center"
        style={glowGreen}
      >
        <Heading size="md" mb={4} color="#81E6D9">
          Health
        </Heading>
        <Flex gap={8} justify="center" wrap="wrap">
          {/* API Status */}
          <Box
            bg="#23272f"
            borderRadius="xl"
            px={6}
            py={4}
            minW="180px"
            textAlign="center"
            style={glowGreen}
          >
            <Text color="#A0AEC0" mb={1}>API</Text>
            {apiStatus === "loading" ? (
              <Spinner size="md" color="#4FD1C5" />
            ) : apiStatus === "ok" ? (
              <Text fontSize="lg" color="#38A169" fontWeight="bold">Running</Text>
            ) : (
              <Text fontSize="lg" color="#F56565" fontWeight="bold">Not Reachable</Text>
            )}
          </Box>
          {/* DB Status (mock) */}
          <Box
            bg="#23272f"
            borderRadius="xl"
            px={6}
            py={4}
            minW="180px"
            textAlign="center"
            style={glowGreen}
          >
            <Text color="#A0AEC0" mb={1}>Database</Text>
            <Text fontSize="lg" color="#38A169" fontWeight="bold">Connected</Text>
          </Box>
          {/* Worker Status (mock) */}
          <Box
            bg="#23272f"
            borderRadius="xl"
            px={6}
            py={4}
            minW="180px"
            textAlign="center"
            style={glowGreen}
          >
            <Text color="#A0AEC0" mb={1}>Worker</Text>
            <Text fontSize="lg" color="#38A169" fontWeight="bold">Active</Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
} 