import React, { useEffect, useState } from "react";
import { 
  Box, 
  Heading, 
  Text, 
  Flex, 
  Spinner, 
  SimpleGrid, 
  Tabs, 
  Table,
  Badge
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { FiBarChart2 } from "react-icons/fi";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

// Define types for analytics state
interface PerformanceMetrics {
  sharpe: number;
  sortino: number;
  maxDrawdown: number;
  alpha: number;
  beta: number;
  cvar: number;
}
interface EquityCurve { x: string[]; y: number[]; }
interface Drawdown { x: string[]; y: number[]; }
interface ShapFeature { feature: string; importance: number; direction: string; }
interface AnalyticsState {
  performance: PerformanceMetrics;
  equityCurve: EquityCurve;
  drawdown: Drawdown;
  shapFeatures: ShapFeature[];
}

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState("");

  useEffect(() => {
    // Mock data for now - replace with actual API call
    setTimeout(() => {
      setAnalytics({
        performance: {
          sharpe: 1.87,
          sortino: 2.34,
          maxDrawdown: -0.032,
          alpha: 0.021,
          beta: 0.89,
          cvar: -0.045
        },
        equityCurve: {
          x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          y: [100, 110, 120, 115, 130, 140]
        },
        drawdown: {
          x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          y: [0, -0.02, -0.01, -0.032, -0.015, 0]
        },
        shapFeatures: [
          { feature: "Momentum", importance: 0.45, direction: "positive" },
          { feature: "Volatility", importance: 0.32, direction: "negative" },
          { feature: "Sentiment", importance: 0.28, direction: "positive" },
          { feature: "Volume", importance: 0.15, direction: "negative" }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  const equityPlotData = [
    {
      x: analytics?.equityCurve.x || [],
      y: analytics?.equityCurve.y || [],
      type: "scatter" as const,
      mode: "lines+markers" as const,
      marker: { color: "#4FD1C5" },
      name: "Equity Curve",
    },
  ];

  const drawdownPlotData = [
    {
      x: analytics?.drawdown.x || [],
      y: analytics?.drawdown.y || [],
      type: "scatter" as const,
      mode: "lines" as const,
      fill: "tonexty" as const,
      fillcolor: "rgba(245, 101, 101, 0.3)",
      marker: { color: "#F56565" },
      name: "Drawdown",
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
    <Flex direction="column" align="center" justify="center" py={0} px={0} minH="100vh" maxH="100vh" minW="100vw" maxW="100vw" bg="#18181b" overflow="hidden">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Montserrat:wght@700&family=Oswald:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <Box w="100vw" h="100vh" minH="100vh" minW="100vw" px={[2, 8, 16]} py={[2, 8, 10]} display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" bg="#18181b" style={{boxSizing: 'border-box'}}>
        <Heading fontSize={["4xl", "5xl", "6xl"]} mb={10} color="#4FD1C5" fontFamily={headingFont} fontWeight="extrabold" letterSpacing="tight" textAlign="center" ml="-200px">
          Analytics & Performance
        </Heading>
        {loading ? (
          <Spinner size="lg" color="#4FD1C5" />
        ) : error ? (
          <Text color="#F56565">{error}</Text>
        ) : analytics && (
          <Box w="100%" h="100%" maxW="1800px" maxH="900px" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" overflow="visible" px={6} py={4} ml="-200px" style={{boxSizing: 'border-box'}}>
            {/* Stat Cards Row */}
            <Flex w="100%" justify="center" align="center" gap={8} mb={6}>
              {Object.entries(analytics.performance).map(([key, value]) => (
                <Box
                  key={key}
                  bg={glassBg}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={glassBorder}
                  px={8}
                  py={6}
                  minW="170px"
                  maxW="220px"
                  h="110px"
                  textAlign="center"
                  style={(() => {
                    if (key.toLowerCase().includes("sharpe")) return { boxShadow: "0 0 8px 2px #4299E1, 0 2px 4px 0 rgba(66,153,225,0.13)" };
                    if (key.toLowerCase().includes("sortino")) return { boxShadow: "0 0 8px 2px #4FD1C5, 0 2px 4px 0 rgba(79,209,197,0.13)" };
                    if (key.toLowerCase().includes("alpha")) return { boxShadow: "0 0 8px 2px #9F7AEA, 0 2px 4px 0 rgba(159,122,234,0.13)" };
                    if (key.toLowerCase().includes("drawdown")) return { boxShadow: "0 0 8px 2px #F56565, 0 2px 4px 0 rgba(245,101,101,0.13)" };
                    if (key.toLowerCase().includes("return")) return { boxShadow: "0 0 8px 2px #38A169, 0 2px 4px 0 rgba(56,161,105,0.13)" };
                    if (key.toLowerCase().includes("beta")) return { boxShadow: "0 0 8px 2px #ED8936, 0 2px 4px 0 rgba(237,137,54,0.13)" };
                    if (key.toLowerCase().includes("cvar")) return { boxShadow: "0 0 8px 2px #ECC94B, 0 2px 4px 0 rgba(236,201,75,0.13)" };
                    return { boxShadow: "0 0 6px 1px #4FD1C5, 0 2px 4px 0 rgba(79,209,197,0.10)" };
                  })()}
                >
                  <Text fontSize="lg" color="#A0AEC0" mb={1} textTransform="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Text>
                  <Text fontSize="3xl" fontWeight="bold" color="#4FD1C5">
                    {['sharpe', 'sortino', 'beta'].includes(key.toLowerCase())
                      ? value.toFixed(2)
                      : typeof value === 'number' ? (value * 100).toFixed(2) + '%' : value}
                  </Text>
                </Box>
              ))}
            </Flex>
            {/* Large Graph Area */}
            <Box flex={1} w="100%" h="calc(100% - 170px)" display="flex" alignItems="center" justifyContent="center" mt={2}>
              <Tabs.Root defaultValue="equity" orientation="vertical" style={{ width: "100%", height: "100%" }}>
                <Tabs.List mb={0} justifyContent="center" direction="column" style={{ position: "absolute", left: 32, top: 120, zIndex: 2 }}>
                  <Tabs.Trigger value="equity" color="#E2E8F0">Equity Curve</Tabs.Trigger>
                  <Tabs.Trigger value="drawdown" color="#E2E8F0">Drawdown</Tabs.Trigger>
                  <Tabs.Trigger value="shap" color="#E2E8F0">SHAP</Tabs.Trigger>
                </Tabs.List>
                <Tabs.ContentGroup style={{ width: "100%", height: "100%" }}>
                  <Tabs.Content value="equity" style={{ width: "100%", height: "100%" }}>
                    <Box w="100%" h="100%" display="flex" alignItems="center" justifyContent="center">
                      <Plot
                        data={equityPlotData}
                        layout={{
                          ...plotLayout,
                          height: Math.floor(window.innerHeight * 0.6),
                          width: undefined,
                          autosize: true,
                          title: { text: "Portfolio Value Over Time", font: { size: 26, color: '#fff', family: headingFont } },
                          margin: { t: 60, r: 40, l: 60, b: 60 },
                          plot_bgcolor: '#18181b',
                          paper_bgcolor: '#18181b',
                          xaxis: {
                            title: { text: 'Month', font: { size: 18, color: '#fff', family: headingFont } },
                            color: '#fff',
                            gridcolor: '#444',
                            tickfont: { size: 16, color: '#fff', family: headingFont },
                            zeroline: false,
                          },
                          yaxis: {
                            title: { text: 'Portfolio Value', font: { size: 18, color: '#fff', family: headingFont } },
                            color: '#fff',
                            gridcolor: '#444',
                            tickfont: { size: 16, color: '#fff', family: headingFont },
                            zeroline: false,
                          },
                          showlegend: false,
                        }}
                        style={{ width: "100%", height: "100%" }}
                        useResizeHandler
                      />
                    </Box>
                  </Tabs.Content>
                  <Tabs.Content value="drawdown" style={{ width: "100%", height: "100%" }}>
                    <Box w="100%" h="100%" display="flex" alignItems="center" justifyContent="center">
                      <Plot
                        data={drawdownPlotData}
                        layout={{
                          ...plotLayout,
                          height: Math.floor(window.innerHeight * 0.6),
                          width: undefined,
                          autosize: true,
                          title: { text: "Portfolio Drawdown", font: { size: 26, color: '#fff', family: headingFont } },
                          margin: { t: 60, r: 40, l: 60, b: 60 },
                          plot_bgcolor: '#18181b',
                          paper_bgcolor: '#18181b',
                          xaxis: {
                            title: { text: 'Month', font: { size: 18, color: '#fff', family: headingFont } },
                            color: '#fff',
                            gridcolor: '#444',
                            tickfont: { size: 16, color: '#fff', family: headingFont },
                            zeroline: false,
                          },
                          yaxis: {
                            title: { text: 'Drawdown', font: { size: 18, color: '#fff', family: headingFont } },
                            color: '#fff',
                            gridcolor: '#444',
                            tickfont: { size: 16, color: '#fff', family: headingFont },
                            zeroline: false,
                          },
                          showlegend: false,
                        }}
                        style={{ width: "100%", height: "100%" }}
                        useResizeHandler
                      />
                    </Box>
                  </Tabs.Content>
                  <Tabs.Content value="shap" style={{ width: "100%", height: "100%", overflow: "auto" }}>
                    <Box w="100%" h="100%" display="flex" alignItems="center" justifyContent="center">
                      <Table.Root colorScheme="teal" w="100%">
                        <Table.Header>
                          <Table.Row>
                            <Table.ColumnHeader>Feature</Table.ColumnHeader>
                            <Table.ColumnHeader>Importance</Table.ColumnHeader>
                            <Table.ColumnHeader>Direction</Table.ColumnHeader>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {analytics.shapFeatures.map((feature, index) => (
                            <Table.Row key={index}>
                              <Table.Cell>
                                <Text color="#E2E8F0">{feature.feature}</Text>
                              </Table.Cell>
                              <Table.Cell>
                                <Text color="#4FD1C5">{(feature.importance * 100).toFixed(1)}%</Text>
                              </Table.Cell>
                              <Table.Cell>
                                <Badge
                                  colorScheme={feature.direction === "positive" ? "green" : "red"}
                                >
                                  {feature.direction}
                                </Badge>
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
          </Box>
        )}
      </Box>
    </Flex>
  );
} 