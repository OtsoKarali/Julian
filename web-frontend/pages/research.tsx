import React, { useEffect, useState } from "react";
import { 
  Box, 
  Heading, 
  Text, 
  Flex, 
  Spinner, 
  SimpleGrid, 
  Button, 
  Tabs,
  Badge,
  VStack,
  HStack,
  Input,
  Textarea
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { FiBookOpen } from "react-icons/fi";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function Research() {
  const [activeNotebook, setActiveNotebook] = useState("alpha_research");
  const [newNote, setNewNote] = useState("");

  const notebooks = [
    {
      id: "alpha_research",
      name: "Alpha Research",
      description: "Factor analysis and alpha generation research",
      lastModified: "2024-01-15",
      tags: ["factors", "alpha", "research"]
    },
    {
      id: "backtest_analysis",
      name: "Backtest Analysis",
      description: "Strategy backtesting results and analysis",
      lastModified: "2024-01-14",
      tags: ["backtesting", "performance", "analysis"]
    },
    {
      id: "market_structure",
      name: "Market Structure",
      description: "Market microstructure and liquidity analysis",
      lastModified: "2024-01-13",
      tags: ["microstructure", "liquidity", "market"]
    },
    {
      id: "ml_experiments",
      name: "ML Experiments",
      description: "Machine learning model experiments and results",
      lastModified: "2024-01-12",
      tags: ["ml", "experiments", "models"]
    }
  ];

  const researchTools = [
    {
      name: "Factor Analysis",
      description: "Analyze factor performance and correlations",
      icon: "📊",
      status: "active"
    },
    {
      name: "Risk Analytics",
      description: "Portfolio risk analysis and stress testing",
      icon: "⚠️",
      status: "active"
    },
    {
      name: "Market Scanner",
      description: "Real-time market scanning and alerts",
      icon: "🔍",
      status: "active"
    },
    {
      name: "News Sentiment",
      description: "News sentiment analysis and scoring",
      icon: "📰",
      status: "active"
    }
  ];

  const addNote = () => {
    if (newNote.trim()) {
      console.log("Research note has been saved successfully!");
      setNewNote("");
    }
  };

  const glassBg = "rgba(32,32,32,0.7)";
  const glassBorder = "#2d3748";

  // Faint glow style for important elements
  const glowTeal = { boxShadow: "0 0 10px 1px #4FD1C5, 0 2px 8px 0 rgba(79,209,197,0.10)" };
  const glowGreen = { boxShadow: "0 0 10px 1px #38A169, 0 2px 8px 0 rgba(56,161,105,0.10)" };
  const glowRed = { boxShadow: "0 0 10px 1px #F56565, 0 2px 8px 0 rgba(245,101,101,0.10)" };
  const glowBlue = { boxShadow: "0 0 10px 1px #4299E1, 0 2px 8px 0 rgba(66,153,225,0.10)" };
  const glowPurple = { boxShadow: "0 0 10px 1px #9F7AEA, 0 2px 8px 0 rgba(159,122,234,0.10)" };

  // Add Google Fonts for distinctive heading
  const headingFont = "'Poppins', 'Montserrat', 'Oswald', sans-serif";

  return (
    <Flex direction="column" align="center" py={10} px={4} minH="100vh" bg="#18181b">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Montserrat:wght@700&family=Oswald:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <Heading fontSize={["4xl", "5xl", "6xl"]} mb={8} color="#4FD1C5" fontFamily={headingFont} fontWeight="extrabold" letterSpacing="tight">
        Research
      </Heading>
      
      <Box w="100%" maxW="1400px">
        <Tabs.Root defaultValue="notebooks">
          <Tabs.List mb={6} justifyContent="center">
            <Tabs.Trigger value="notebooks" color="#E2E8F0">Notebooks</Tabs.Trigger>
            <Tabs.Trigger value="tools" color="#E2E8F0">Research Tools</Tabs.Trigger>
            <Tabs.Trigger value="analysis" color="#E2E8F0">Analysis</Tabs.Trigger>
            <Tabs.Trigger value="notes" color="#E2E8F0">Notes</Tabs.Trigger>
          </Tabs.List>

          <Tabs.ContentGroup>
            {/* Notebooks Tab */}
            <Tabs.Content value="notebooks">
              <SimpleGrid columns={[1, 2]} gap={6} mb={8}>
                {notebooks.map((notebook) => (
                  <Box
                    key={notebook.id}
                    bg={glassBg}
                    borderRadius="2xl"
                    boxShadow="2xl"
                    border="1.5px solid"
                    p={6}
                    cursor="pointer"
                    onClick={() => setActiveNotebook(notebook.id)}
                    _hover={{ transform: "translateY(-2px)", transition: "all 0.2s" }}
                    borderColor={activeNotebook === notebook.id ? "#4FD1C5" : glassBorder}
                  >
                    <Heading size="md" color="#81E6D9" mb={2}>
                      {notebook.name}
                    </Heading>
                    <Text color="#E2E8F0" mb={3} fontSize="sm">
                      {notebook.description}
                    </Text>
                    <Text color="#A0AEC0" fontSize="xs" mb={3}>
                      Last modified: {notebook.lastModified}
                    </Text>
                    <Flex wrap="wrap" gap={2}>
                      {notebook.tags.map((tag, index) => (
                        <Badge key={index} colorScheme="blue" variant="subtle" fontSize="xs">
                          {tag}
                        </Badge>
                      ))}
                    </Flex>
                  </Box>
                ))}
              </SimpleGrid>
              
              <Box
                bg={glassBg}
                borderRadius="2xl"
                boxShadow="2xl"
                border="1.5px solid"
                borderColor={glassBorder}
                p={6}
                style={glowBlue}
              >
                <Heading size="md" mb={4} color="#81E6D9">
                  Active Notebook: {notebooks.find(n => n.id === activeNotebook)?.name}
                </Heading>
                <Box bg="#23272f" borderRadius="md" p={4} color="#A0AEC0" fontFamily="mono">
                  <Text mb={2}># {notebooks.find(n => n.id === activeNotebook)?.name}</Text>
                  <Text mb={2}>import pandas as pd</Text>
                  <Text mb={2}>import numpy as np</Text>
                  <Text mb={2}>import matplotlib.pyplot as plt</Text>
                  <Text mb={2}></Text>
                  <Text mb={2}># Load data</Text>
                  <Text mb={2}>df = pd.read_parquet('data/features.parquet')</Text>
                  <Text mb={2}></Text>
                  <Text mb={2}># Analysis code goes here...</Text>
                  <Text color="#4FD1C5"># Ready for research and analysis</Text>
                </Box>
              </Box>
            </Tabs.Content>

            {/* Research Tools Tab */}
            <Tabs.Content value="tools">
              <SimpleGrid columns={[1, 2, 3]} gap={6} mb={8}>
                {researchTools.map((tool, index) => (
                  <Box
                    key={index}
                    bg={glassBg}
                    borderRadius="2xl"
                    boxShadow="2xl"
                    border="1.5px solid"
                    borderColor={glassBorder}
                    p={6}
                    textAlign="center"
                  >
                    <Text fontSize="4xl" mb={3}>{tool.icon}</Text>
                    <Heading size="md" color="#81E6D9" mb={2}>
                      {tool.name}
                    </Heading>
                    <Text color="#E2E8F0" mb={4} fontSize="sm">
                      {tool.description}
                    </Text>
                    <Badge
                      colorScheme={tool.status === "active" ? "green" : "red"}
                      mb={3}
                    >
                      {tool.status}
                    </Badge>
                    <Button colorScheme="teal" size="sm" width="100%">
                      Launch Tool
                    </Button>
                  </Box>
                ))}
              </SimpleGrid>
              
              <Box
                bg={glassBg}
                borderRadius="2xl"
                boxShadow="2xl"
                border="1.5px solid"
                borderColor={glassBorder}
                p={6}
                style={glowBlue}
              >
                <Heading size="md" mb={4} color="#81E6D9">
                  Research Dashboard
                </Heading>
                <SimpleGrid columns={[1, 2]} gap={6}>
                  <Box>
                    <Text color="#E2E8F0" mb={2} fontWeight="bold">Recent Analysis</Text>
                    <VStack align="start" gap={2}>
                      <Text color="#A0AEC0" fontSize="sm">• Factor correlation analysis completed</Text>
                      <Text color="#A0AEC0" fontSize="sm">• Risk model validation in progress</Text>
                      <Text color="#A0AEC0" fontSize="sm">• Market regime detection updated</Text>
                    </VStack>
                  </Box>
                  <Box>
                    <Text color="#E2E8F0" mb={2} fontWeight="bold">Upcoming Research</Text>
                    <VStack align="start" gap={2}>
                      <Text color="#A0AEC0" fontSize="sm">• Alternative data integration</Text>
                      <Text color="#A0AEC0" fontSize="sm">• ML model performance review</Text>
                      <Text color="#A0AEC0" fontSize="sm">• Portfolio optimization study</Text>
                    </VStack>
                  </Box>
                </SimpleGrid>
              </Box>
            </Tabs.Content>

            {/* Analysis Tab */}
            <Tabs.Content value="analysis">
              <Box
                bg={glassBg}
                borderRadius="2xl"
                boxShadow="2xl"
                border="1.5px solid"
                borderColor={glassBorder}
                p={6}
                style={glowBlue}
              >
                <Heading size="md" mb={4} color="#81E6D9">
                  Research Analysis
                </Heading>
                
                <SimpleGrid columns={[1, 2]} gap={6} mb={6}>
                  <Box>
                    <Text color="#E2E8F0" mb={3} fontWeight="bold">Factor Performance</Text>
                    <Box bg="#23272f" borderRadius="md" p={4} color="#A0AEC0">
                      <Text>Momentum Factor: +2.3% (t-stat: 3.2)</Text>
                      <Text>Value Factor: +1.8% (t-stat: 2.1)</Text>
                      <Text>Quality Factor: +1.5% (t-stat: 1.9)</Text>
                      <Text>Size Factor: +0.9% (t-stat: 1.2)</Text>
                    </Box>
                  </Box>
                  
                  <Box>
                    <Text color="#E2E8F0" mb={3} fontWeight="bold">Market Regime</Text>
                    <Box bg="#23272f" borderRadius="md" p={4} color="#A0AEC0">
                      <Text>Current Regime: Trending</Text>
                      <Text>Volatility: Medium</Text>
                      <Text>Correlation: High</Text>
                      <Text>Liquidity: Normal</Text>
                    </Box>
                  </Box>
                </SimpleGrid>
                
                <Box>
                  <Text color="#E2E8F0" mb={3} fontWeight="bold">Research Insights</Text>
                  <Box bg="#23272f" borderRadius="md" p={4} color="#A0AEC0">
                    <Text mb={2}>• Momentum strategies show strong performance in trending markets</Text>
                    <Text mb={2}>• Factor correlations have increased over the past quarter</Text>
                    <Text mb={2}>• Alternative data signals show early signs of regime change</Text>
                    <Text>• ML models are adapting well to current market conditions</Text>
                  </Box>
                </Box>
              </Box>
            </Tabs.Content>

            {/* Notes Tab */}
            <Tabs.Content value="notes">
              <Box
                bg={glassBg}
                borderRadius="2xl"
                boxShadow="2xl"
                border="1.5px solid"
                borderColor={glassBorder}
                p={6}
                style={glowBlue}
              >
                <Heading size="md" mb={4} color="#81E6D9">
                  Research Notes
                </Heading>
                
                <VStack gap={4} mb={6}>
                  <Textarea
                    placeholder="Add a new research note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    bg="#2d3748"
                    color="#E2E8F0"
                    borderColor={glassBorder}
                    rows={4}
                  />
                  <Button
                    colorScheme="teal"
                    onClick={addNote}
                    alignSelf="flex-end"
                  >
                    Add Note
                  </Button>
                </VStack>
                
                <Box>
                  <Text color="#E2E8F0" mb={3} fontWeight="bold">Recent Notes</Text>
                  <VStack align="start" gap={3}>
                    <Box bg="#23272f" borderRadius="md" p={3} width="100%">
                      <Text color="#4FD1C5" fontSize="sm" mb={1}>2024-01-15 14:30</Text>
                      <Text color="#E2E8F0">Momentum factor showing strong performance in tech sector. Consider increasing exposure.</Text>
                    </Box>
                    <Box bg="#23272f" borderRadius="md" p={3} width="100%">
                      <Text color="#4FD1C5" fontSize="sm" mb={1}>2024-01-15 11:15</Text>
                      <Text color="#E2E8F0">Risk model validation complete. All stress tests passed with acceptable thresholds.</Text>
                    </Box>
                    <Box bg="#23272f" borderRadius="md" p={3} width="100%">
                      <Text color="#4FD1C5" fontSize="sm" mb={1}>2024-01-14 16:45</Text>
                      <Text color="#E2E8F0">Alternative data signals suggest potential market rotation. Monitor closely.</Text>
                    </Box>
                  </VStack>
                </Box>
              </Box>
            </Tabs.Content>
          </Tabs.ContentGroup>
        </Tabs.Root>
      </Box>
    </Flex>
  );
} 