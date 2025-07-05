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
  Progress,
  Tabs
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { FiCpu } from "react-icons/fi";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

// Define types
interface ModelPerformance {
  trainAccuracy: number;
  testAccuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}
interface TrainingHistory {
  x: string[];
  y: number[];
}
interface Model {
  id: string;
  name: string;
  type: string;
  status: string;
  accuracy: number;
  lastUpdated: string;
  features: string[];
  performance: ModelPerformance;
  trainingHistory: TrainingHistory;
}

export default function Models() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState("");
  const [isTraining, setIsTraining] = useState(false);

  useEffect(() => {
    // Mock models data
    setTimeout(() => {
      setModels([
        {
          id: "gbm_momentum",
          name: "Gradient Boosted Momentum",
          type: "ML",
          status: "trained",
          accuracy: 0.78,
          lastUpdated: "2024-01-15",
          features: ["price_momentum", "volume_ratio", "volatility", "sentiment"],
          performance: {
            trainAccuracy: 0.82,
            testAccuracy: 0.78,
            precision: 0.75,
            recall: 0.73,
            f1Score: 0.74
          },
          trainingHistory: {
            x: ["Epoch 1", "Epoch 2", "Epoch 3", "Epoch 4", "Epoch 5"],
            y: [0.65, 0.72, 0.76, 0.78, 0.78]
          }
        },
        {
          id: "ppo_allocator",
          name: "PPO Portfolio Allocator",
          type: "RL",
          status: "training",
          accuracy: 0.71,
          lastUpdated: "2024-01-14",
          features: ["portfolio_weights", "market_conditions", "risk_metrics"],
          performance: {
            trainAccuracy: 0.74,
            testAccuracy: 0.71,
            precision: 0.68,
            recall: 0.72,
            f1Score: 0.70
          },
          trainingHistory: {
            x: ["Epoch 1", "Epoch 2", "Epoch 3", "Epoch 4", "Epoch 5"],
            y: [0.58, 0.64, 0.68, 0.70, 0.71]
          }
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const trainModel = async (modelId: string) => {
    setIsTraining(true);
    console.log(`Training started for ${modelId}...`);

    setTimeout(() => {
      setIsTraining(false);
      console.log(`Training complete for ${modelId}!`);
    }, 3000);
  };

  const accuracyPlotData = (model: Model) => [
    {
      x: model.trainingHistory.x,
      y: model.trainingHistory.y,
      type: "scatter" as const,
      mode: "lines+markers" as const,
      marker: { color: "#4FD1C5" },
      name: "Training Accuracy",
    },
  ];

  const plotLayout = {
    paper_bgcolor: "rgba(0,0,0,0.0)",
    plot_bgcolor: "rgba(0,0,0,0.0)",
    font: { color: "#fff" },
    margin: { t: 30, r: 20, l: 40, b: 40 },
    xaxis: {},
    yaxis: {},
  };

  const glassBg = "rgba(32,32,32,0.7)";
  const glassBorder = "#2d3748";

  // Contextual glow styles
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
        Model Management
      </Heading>
      
      {loading ? (
        <Spinner size="lg" color="#4FD1C5" />
      ) : error ? (
        <Text color="#F56565">{error}</Text>
      ) : (
        <Box w="100%" maxW="1400px">
          <Tabs.Root defaultValue="overview">
            <Tabs.List mb={6} justifyContent="center">
              <Tabs.Trigger value="overview" color="#E2E8F0">Model Overview</Tabs.Trigger>
              <Tabs.Trigger value="training" color="#E2E8F0">Training</Tabs.Trigger>
              <Tabs.Trigger value="performance" color="#E2E8F0">Performance</Tabs.Trigger>
            </Tabs.List>

            <Tabs.ContentGroup>
              {/* Model Overview Tab */}
              <Tabs.Content value="overview">
                <SimpleGrid columns={[1, 2, 3]} gap={6} mb={8}>
                  {models.map((model) => (
                    <Box
                      key={model.id}
                      bg={glassBg}
                      borderRadius="2xl"
                      boxShadow="2xl"
                      border="1.5px solid"
                      borderColor={glassBorder}
                      p={6}
                      style={
                        model.status === "trained" ? glowGreen :
                        model.status === "training" ? glowBlue :
                        model.status === "error" ? glowRed :
                        model.type && model.type.toLowerCase().includes("ml") ? glowPurple :
                        glowTeal
                      }
                    >
                      <Flex justify="space-between" align="center" mb={4}>
                        <Heading size="md" color="#81E6D9">
                          {model.name}
                        </Heading>
                        <Badge
                          colorScheme={
                            model.status === "trained" ? "green" : 
                            model.status === "training" ? "blue" : "red"
                          }
                        >
                          {model.status}
                        </Badge>
                      </Flex>
                      
                      <Text color="#A0AEC0" mb={2}>Type: {model.type}</Text>
                      <Text color="#4FD1C5" fontSize="2xl" fontWeight="bold" mb={2}>
                        {(model.accuracy * 100).toFixed(1)}%
                      </Text>
                      <Text color="#E2E8F0" fontSize="sm" mb={4}>
                        Last updated: {model.lastUpdated}
                      </Text>
                      
                      <Button
                        colorScheme="teal"
                        size="sm"
                        onClick={() => trainModel(model.id)}
                        loading={isTraining}
                        loadingText="Training..."
                        w="100%"
                      >
                        Train Model
                      </Button>
                    </Box>
                  ))}
                </SimpleGrid>
              </Tabs.Content>

              {/* Training Tab */}
              <Tabs.Content value="training">
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
                    Training Progress
                  </Heading>
                  
                  <Table.Root colorScheme="teal">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>Model</Table.ColumnHeader>
                        <Table.ColumnHeader>Status</Table.ColumnHeader>
                        <Table.ColumnHeader>Progress</Table.ColumnHeader>
                        <Table.ColumnHeader>Last Updated</Table.ColumnHeader>
                        <Table.ColumnHeader>Actions</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {models.map((model) => (
                        <Table.Row key={model.id}>
                          <Table.Cell>
                            <Text color="#E2E8F0" fontWeight="medium">{model.name}</Text>
                          </Table.Cell>
                          <Table.Cell>
                            <Badge
                              colorScheme={
                                model.status === "trained" ? "green" : 
                                model.status === "training" ? "blue" : "red"
                              }
                            >
                              {model.status}
                            </Badge>
                          </Table.Cell>
                          <Table.Cell>
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
                                width={`${model.status === "trained" ? 100 : 75}%`}
                                transition="width 0.3s"
                              />
                            </Box>
                          </Table.Cell>
                          <Table.Cell>
                            <Text color="#A0AEC0">{model.lastUpdated}</Text>
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              colorScheme="teal"
                              size="xs"
                              onClick={() => trainModel(model.id)}
                              loading={isTraining}
                            >
                              Train
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Box>
              </Tabs.Content>

              {/* Performance Tab */}
              <Tabs.Content value="performance">
                <SimpleGrid columns={[1, 2]} gap={6}>
                  {models.map((model) => (
                    <Box
                      key={model.id}
                      bg={glassBg}
                      borderRadius="2xl"
                      boxShadow="2xl"
                      border="1.5px solid"
                      borderColor={glassBorder}
                      p={6}
                      style={
                        model.status === "trained" ? glowGreen :
                        model.status === "training" ? glowBlue :
                        model.status === "error" ? glowRed :
                        model.type && model.type.toLowerCase().includes("ml") ? glowPurple :
                        glowTeal
                      }
                    >
                      <Heading size="md" mb={4} color="#81E6D9">
                        {model.name} Performance
                      </Heading>
                      
                      <SimpleGrid columns={2} gap={4} mb={4}>
                        <Box>
                          <Text color="#A0AEC0" fontSize="sm">Train Accuracy</Text>
                          <Text color="#4FD1C5" fontSize="lg" fontWeight="bold">
                            {(model.performance.trainAccuracy * 100).toFixed(1)}%
                          </Text>
                        </Box>
                        <Box>
                          <Text color="#A0AEC0" fontSize="sm">Test Accuracy</Text>
                          <Text color="#4FD1C5" fontSize="lg" fontWeight="bold">
                            {(model.performance.testAccuracy * 100).toFixed(1)}%
                          </Text>
                        </Box>
                        <Box>
                          <Text color="#A0AEC0" fontSize="sm">Precision</Text>
                          <Text color="#4FD1C5" fontSize="lg" fontWeight="bold">
                            {(model.performance.precision * 100).toFixed(1)}%
                          </Text>
                        </Box>
                        <Box>
                          <Text color="#A0AEC0" fontSize="sm">Recall</Text>
                          <Text color="#4FD1C5" fontSize="lg" fontWeight="bold">
                            {(model.performance.recall * 100).toFixed(1)}%
                          </Text>
                        </Box>
                      </SimpleGrid>
                      
                      <Plot
                        data={accuracyPlotData(model)}
                        layout={{
                          ...plotLayout,
                          height: 300,
                          title: { text: "Training History" }
                        }}
                        style={{ width: "100%" }}
                      />
                    </Box>
                  ))}
                </SimpleGrid>
              </Tabs.Content>
            </Tabs.ContentGroup>
          </Tabs.Root>
        </Box>
      )}
    </Flex>
  );
} 