import React, { useEffect, useState } from "react";
import { 
  Box, 
  Heading, 
  Text, 
  Flex, 
  Spinner, 
  SimpleGrid, 
  Button, 
  Badge,
  Table,
  Tabs
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { FiDatabase } from "react-icons/fi";

// Define types
interface DataSource {
  id: string;
  name: string;
  status: string;
  lastUpdate: string;
  symbols: number;
  dataPoints: string;
  updateFrequency: string;
}
interface FeatureGroup {
  name: string;
  count: number;
  status: string;
}
interface FeatureStore {
  status: string;
  totalFeatures: number;
  activeFeatures: number;
  lastComputed: string;
  storageUsed: string;
  storageTotal: string;
  featureGroups: FeatureGroup[];
}
interface Pipeline {
  id: string;
  name: string;
  status: string;
  lastRun: string;
  duration: string;
  successRate: number;
  nextRun: string;
}

export default function Data() {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [featureStore, setFeatureStore] = useState<FeatureStore | null>(null);
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setDataSources([
        {
          id: "yfinance",
          name: "Yahoo Finance",
          status: "active",
          lastUpdate: "2024-01-15 09:30:00",
          symbols: 500,
          dataPoints: "2.5M",
          updateFrequency: "Daily"
        },
        {
          id: "polygon",
          name: "Polygon.io",
          status: "active",
          lastUpdate: "2024-01-15 09:15:00",
          symbols: 300,
          dataPoints: "1.8M",
          updateFrequency: "Real-time"
        },
        {
          id: "twitter",
          name: "Twitter Sentiment",
          status: "active",
          lastUpdate: "2024-01-15 08:45:00",
          symbols: 100,
          dataPoints: "500K",
          updateFrequency: "Hourly"
        }
      ]);

      setFeatureStore({
        status: "healthy",
        totalFeatures: 45,
        activeFeatures: 42,
        lastComputed: "2024-01-15 10:00:00",
        storageUsed: "2.3GB",
        storageTotal: "10GB",
        featureGroups: [
          { name: "Technical Indicators", count: 15, status: "active" },
          { name: "Sentiment Features", count: 8, status: "active" },
          { name: "Market Microstructure", count: 12, status: "active" },
          { name: "Alternative Data", count: 10, status: "processing" }
        ]
      });

      setPipelines([
        {
          id: "daily_prices",
          name: "Daily Price Pipeline",
          status: "completed",
          lastRun: "2024-01-15 09:30:00",
          duration: "15m",
          successRate: 0.98,
          nextRun: "2024-01-16 09:30:00"
        },
        {
          id: "feature_computation",
          name: "Feature Computation",
          status: "running",
          lastRun: "2024-01-15 10:00:00",
          duration: "45m",
          successRate: 0.95,
          nextRun: "2024-01-15 11:00:00"
        },
        {
          id: "sentiment_analysis",
          name: "Sentiment Analysis",
          status: "completed",
          lastRun: "2024-01-15 08:45:00",
          duration: "30m",
          successRate: 0.92,
          nextRun: "2024-01-15 09:45:00"
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const refreshData = async () => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 3000);
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
        Data Management
      </Heading>
      
      {loading ? (
        <Spinner size="lg" color="#4FD1C5" />
      ) : error ? (
        <Text color="#F56565">{error}</Text>
      ) : (
        <Box w="100%" maxW="1400px">
          {/* Quick Stats */}
          <SimpleGrid columns={[1, 2, 3, 4]} gap={6} mb={8}>
            {[
              {
                label: "Data Sources",
                value: dataSources.length,
                sub: "Active",
                glow: glowBlue,
              },
              {
                label: "Total Features",
                value: featureStore?.totalFeatures,
                sub: "Available",
                glow: glowPurple,
              },
              {
                label: "Storage Used",
                value: featureStore?.storageUsed,
                sub: `of ${featureStore?.storageTotal}`,
                glow: glowTeal,
              },
              {
                label: "Pipelines",
                value: pipelines.length,
                sub: "Running",
                glow: glowGreen,
              },
            ].map(({ label, value, sub, glow }) => (
              <Box
                key={label}
                bg={glassBg}
                borderRadius="xl"
                boxShadow="md"
                border="1px solid"
                borderColor={glassBorder}
                px={6}
                py={4}
                textAlign="center"
                style={glow}
              >
                <Text color="#A0AEC0">{label}</Text>
                <Text color="#4FD1C5" fontSize="2xl" fontWeight="bold">{value}</Text>
                <Text color="#E2E8F0">{sub}</Text>
              </Box>
            ))}
          </SimpleGrid>

          <Tabs.Root defaultValue="sources">
            <Tabs.List mb={6} justifyContent="center">
              <Tabs.Trigger value="sources" color="#E2E8F0">Data Sources</Tabs.Trigger>
              <Tabs.Trigger value="features" color="#E2E8F0">Feature Store</Tabs.Trigger>
              <Tabs.Trigger value="pipelines" color="#E2E8F0">Pipelines</Tabs.Trigger>
            </Tabs.List>

            <Tabs.ContentGroup>
              {/* Data Sources Tab */}
              <Tabs.Content value="sources">
                <Box
                  bg={glassBg}
                  borderRadius="2xl"
                  boxShadow="2xl"
                  border="1.5px solid"
                  borderColor={glassBorder}
                  p={6}
                  mb={6}
                  style={glowTeal}
                >
                  <Flex justify="space-between" align="center" mb={4}>
                    <Heading size="md" color="#81E6D9">
                      Data Sources
                    </Heading>
                    <Button
                      colorScheme="teal"
                      size="sm"
                      onClick={refreshData}
                      loading={isRefreshing}
                      loadingText="Refreshing..."
                    >
                      Refresh All
                    </Button>
                  </Flex>
                  
                  <Box bg="#23272f" borderRadius="xl" p={2}>
                    <Table.Root colorScheme="teal" style={{ background: "#23272f" }}>
                      <style jsx global>{`
                        .chakra-table, .chakra-table thead, .chakra-table tbody, .chakra-table tr, .chakra-table th, .chakra-table td {
                          background: #23272f !important;
                        }
                      `}</style>
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader><Text color="#fff">Source</Text></Table.ColumnHeader>
                          <Table.ColumnHeader><Text color="#fff">Status</Text></Table.ColumnHeader>
                          <Table.ColumnHeader><Text color="#fff">Last Update</Text></Table.ColumnHeader>
                          <Table.ColumnHeader><Text color="#fff">Symbols</Text></Table.ColumnHeader>
                          <Table.ColumnHeader><Text color="#fff">Data Points</Text></Table.ColumnHeader>
                          <Table.ColumnHeader><Text color="#fff">Frequency</Text></Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {dataSources.map((source) => (
                          <Table.Row key={source.id}>
                            <Table.Cell>
                              <Text color="#fff" fontWeight="medium">{source.name}</Text>
                            </Table.Cell>
                            <Table.Cell>
                              <Badge colorScheme={source.status === "active" ? "green" : "red"}>
                                {source.status}
                              </Badge>
                            </Table.Cell>
                            <Table.Cell>
                              <Text color="#fff">{source.lastUpdate}</Text>
                            </Table.Cell>
                            <Table.Cell>
                              <Text color="#fff">{source.symbols.toLocaleString()}</Text>
                            </Table.Cell>
                            <Table.Cell>
                              <Text color="#fff">{source.dataPoints}</Text>
                            </Table.Cell>
                            <Table.Cell>
                              <Text color="#fff">{source.updateFrequency}</Text>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Box>
                </Box>
              </Tabs.Content>

              {/* Feature Store Tab */}
              <Tabs.Content value="features">
                <SimpleGrid columns={[1, 2]} gap={6}>
                  <Box
                    bg={glassBg}
                    borderRadius="2xl"
                    boxShadow="2xl"
                    border="1.5px solid"
                    borderColor={glassBorder}
                    p={6}
                    style={glowTeal}
                  >
                    <Heading size="md" mb={4} color="#81E6D9">
                      Feature Store Status
                    </Heading>
                    
                    <Flex justify="space-between" align="center" mb={4}>
                      <Text color="#E2E8F0">Status</Text>
                      <Badge
                        colorScheme={featureStore?.status === "healthy" ? "green" : "red"}
                      >
                        {featureStore?.status}
                      </Badge>
                    </Flex>
                    
                    <Flex justify="space-between" align="center" mb={4}>
                      <Text color="#E2E8F0">Active Features</Text>
                      <Text color="#4FD1C5">{featureStore?.activeFeatures}/{featureStore?.totalFeatures}</Text>
                    </Flex>
                    
                    <Flex justify="space-between" align="center" mb={4}>
                      <Text color="#E2E8F0">Last Computed</Text>
                      <Text color="#A0AEC0">{featureStore?.lastComputed}</Text>
                    </Flex>
                    
                    <Box mb={4}>
                      <Text color="#E2E8F0" mb={2}>Storage Usage</Text>
                      <Box
                        width="100%"
                        height="16px"
                        borderRadius="8px"
                        bg="#2d3748"
                        position="relative"
                        overflow="hidden"
                      >
                        <Box
                          height="100%"
                          borderRadius="8px"
                          bgGradient="linear(to-r, teal.400, teal.600)"
                          width={`${(parseFloat(featureStore?.storageUsed || "0") / parseFloat(featureStore?.storageTotal || "1")) * 100}%`}
                          transition="width 0.3s"
                        />
                      </Box>
                      <Text color="#A0AEC0" fontSize="sm" mt={1}>
                        {featureStore?.storageUsed} / {featureStore?.storageTotal}
                      </Text>
                    </Box>
                  </Box>
                  
                  <Box
                    bg={glassBg}
                    borderRadius="2xl"
                    boxShadow="2xl"
                    border="1.5px solid"
                    borderColor={glassBorder}
                    p={6}
                    style={glowTeal}
                  >
                    <Heading size="md" mb={4} color="#81E6D9">
                      Feature Groups
                    </Heading>
                    
                    {featureStore?.featureGroups.map((group, index) => (
                      <Box key={index} mb={3}>
                        <Flex justify="space-between" align="center" mb={1}>
                          <Text color="#E2E8F0">{group.name}</Text>
                          <Badge
                            colorScheme={group.status === "active" ? "green" : "yellow"}
                            fontSize="xs"
                          >
                            {group.status}
                          </Badge>
                        </Flex>
                        <Text color="#4FD1C5" fontSize="sm">{group.count} features</Text>
                      </Box>
                    ))}
                  </Box>
                </SimpleGrid>
              </Tabs.Content>

              {/* Pipelines Tab */}
              <Tabs.Content value="pipelines">
                <Box
                  bg={glassBg}
                  borderRadius="2xl"
                  boxShadow="2xl"
                  border="1.5px solid"
                  borderColor={glassBorder}
                  p={6}
                  mb={6}
                  style={glowTeal}
                >
                  <Heading size="md" mb={4} color="#81E6D9">
                    Data Pipelines
                  </Heading>
                  
                  <Table.Root colorScheme="teal">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>Pipeline</Table.ColumnHeader>
                        <Table.ColumnHeader>Status</Table.ColumnHeader>
                        <Table.ColumnHeader>Last Run</Table.ColumnHeader>
                        <Table.ColumnHeader>Duration</Table.ColumnHeader>
                        <Table.ColumnHeader>Success Rate</Table.ColumnHeader>
                        <Table.ColumnHeader>Next Run</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {pipelines.map((pipeline) => (
                        <Table.Row key={pipeline.id}>
                          <Table.Cell>
                            <Text color="#E2E8F0" fontWeight="medium">{pipeline.name}</Text>
                          </Table.Cell>
                          <Table.Cell>
                            <Badge
                              colorScheme={
                                pipeline.status === "completed" ? "green" : 
                                pipeline.status === "running" ? "blue" : "red"
                              }
                            >
                              {pipeline.status}
                            </Badge>
                          </Table.Cell>
                          <Table.Cell>
                            <Text color="#A0AEC0">{pipeline.lastRun}</Text>
                          </Table.Cell>
                          <Table.Cell>
                            <Text color="#4FD1C5">{pipeline.duration}</Text>
                          </Table.Cell>
                          <Table.Cell>
                            <Text color="#4FD1C5">{(pipeline.successRate * 100).toFixed(1)}%</Text>
                          </Table.Cell>
                          <Table.Cell>
                            <Text color="#A0AEC0">{pipeline.nextRun}</Text>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Box>
              </Tabs.Content>
            </Tabs.ContentGroup>
          </Tabs.Root>
        </Box>
      )}
    </Flex>
  );
} 