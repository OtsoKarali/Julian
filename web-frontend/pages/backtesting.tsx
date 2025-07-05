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
  Table
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { FiPlayCircle } from "react-icons/fi";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

// Define types
interface Strategy {
  id: string;
  name: string;
  description: string;
}
interface BacktestMetrics {
  totalReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  profitFactor: number;
}
interface EquityCurve { x: string[]; y: number[]; }
interface Trade {
  date: string;
  symbol: string;
  side: string;
  quantity: number;
  price: number;
  pnl: number;
}
interface BacktestResults {
  strategy: string;
  period: string;
  metrics: BacktestMetrics;
  equityCurve: EquityCurve;
  trades: Trade[];
}

export default function Backtesting() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2024-01-01");
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<BacktestResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState("");

  // Add Google Fonts for distinctive heading
  const headingFont = "'Poppins', 'Montserrat', 'Oswald', sans-serif";

  useEffect(() => {
    // Mock strategies data
    setTimeout(() => {
      setStrategies([
        { id: "momentum", name: "Dual EMA Momentum", description: "Breakout strategy using dual exponential moving averages" },
        { id: "pairs", name: "Pairs Trading", description: "Mean reversion strategy using Kalman filter" },
        { id: "ml_factor", name: "ML Factor Model", description: "Machine learning based factor model" },
        { id: "mean_reversion", name: "Mean Reversion", description: "Simple mean reversion strategy" }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const runBacktest = async () => {
    if (!selectedStrategy) {
      return;
    }

    setIsRunning(true);

    // Mock backtest execution
    setTimeout(() => {
      setResults({
        strategy: selectedStrategy,
        period: `${startDate} to ${endDate}`,
        metrics: {
          totalReturn: 0.156,
          sharpeRatio: 1.87,
          maxDrawdown: -0.032,
          winRate: 0.68,
          profitFactor: 2.34
        },
        equityCurve: {
          x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          y: [100, 105, 112, 108, 115, 122, 118, 125, 132, 128, 135, 142]
        },
        trades: [
          { date: "2023-01-15", symbol: "AAPL", side: "BUY", quantity: 100, price: 150.25, pnl: 1250 },
          { date: "2023-02-20", symbol: "GOOGL", side: "SELL", quantity: 50, price: 2800.50, pnl: -500 },
          { date: "2023-03-10", symbol: "MSFT", side: "BUY", quantity: 75, price: 320.75, pnl: 1875 }
        ]
      });
      setIsRunning(false);
    }, 3000);
  };

  const equityPlotData = results ? [
    {
      x: results.equityCurve.x,
      y: results.equityCurve.y,
      type: "scatter" as const,
      mode: "lines+markers" as const,
      marker: { color: "#4FD1C5" },
      name: "Equity Curve",
    },
  ] : [];

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

  return (
    <Flex direction="column" align="center" py={10} px={4} minH="100vh" bg="#18181b">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Montserrat:wght@700&family=Oswald:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <Heading fontSize={["4xl", "5xl", "6xl"]} mb={8} color="#4FD1C5" fontFamily={headingFont} fontWeight="extrabold" letterSpacing="tight">
        Backtesting Engine
      </Heading>
      
      {loading ? (
        <Spinner size="lg" color="#4FD1C5" />
      ) : error ? (
        <Text color="#F56565">{error}</Text>
      ) : (
        <Box w="100%" maxW="1400px">
          {/* Configuration Panel */}
          <Box
            bg={glassBg}
            borderRadius="2xl"
            boxShadow="2xl"
            border="1.5px solid"
            borderColor={glassBorder}
            p={8}
            mb={8}
            maxW="500px"
            minW="380px"
            mx="auto"
            style={glowBlue}
          >
            <Heading size="md" mb={4} color="#81E6D9">
              Backtest Configuration
            </Heading>
            <Box mb={4}>
              <Text color="#E2E8F0" mb={1}>Strategy</Text>
              <select
                value={selectedStrategy}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStrategy(e.target.value)}
                style={{ background: '#2d3748', color: '#E2E8F0', borderColor: glassBorder, width: '100%', padding: 8, borderRadius: 6 }}
              >
                <option value="">Select Strategy</option>
                {strategies.map((strategy) => (
                  <option key={strategy.id} value={strategy.id}>
                    {strategy.name}
                  </option>
                ))}
              </select>
            </Box>
            <Box mb={4}>
              <Text color="#E2E8F0" mb={1}>Start Date</Text>
              <input
                type="date"
                value={startDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
                style={{ background: '#2d3748', color: '#E2E8F0', borderColor: glassBorder, width: '100%', padding: 8, borderRadius: 6 }}
              />
            </Box>
            <Box mb={4}>
              <Text color="#E2E8F0" mb={1}>End Date</Text>
              <input
                type="date"
                value={endDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
                style={{ background: '#2d3748', color: '#E2E8F0', borderColor: glassBorder, width: '100%', padding: 8, borderRadius: 6 }}
              />
            </Box>
            
            <Button
              colorScheme="teal"
              size="lg"
              mt={6}
              onClick={runBacktest}
              loading={isRunning}
              loadingText="Running Backtest..."
            >
              Run Backtest
            </Button>
          </Box>

          {/* Results */}
          {results && (
            <Box
              bg={glassBg}
              borderRadius="2xl"
              boxShadow="2xl"
              border="1.5px solid"
              borderColor={glassBorder}
              p={6}
              mb={8}
              style={glowTeal}
            >
              <Heading size="md" mb={4} color="#81E6D9">
                Backtest Results
              </Heading>
              
              <SimpleGrid columns={[1, 2, 3, 4, 5]} gap={6} mb={6}>
                <Box textAlign="center">
                  <Text color="#A0AEC0" fontSize="sm">Total Return</Text>
                  <Text color="#4FD1C5" fontSize="2xl" fontWeight="bold">
                    {(results.metrics.totalReturn * 100).toFixed(2)}%
                  </Text>
                </Box>
                <Box textAlign="center">
                  <Text color="#A0AEC0" fontSize="sm">Sharpe Ratio</Text>
                  <Text color="#4FD1C5" fontSize="2xl" fontWeight="bold">
                    {results.metrics.sharpeRatio.toFixed(2)}
                  </Text>
                </Box>
                <Box textAlign="center">
                  <Text color="#A0AEC0" fontSize="sm">Max Drawdown</Text>
                  <Text color="#F56565" fontSize="2xl" fontWeight="bold">
                    {(results.metrics.maxDrawdown * 100).toFixed(2)}%
                  </Text>
                </Box>
                <Box textAlign="center">
                  <Text color="#A0AEC0" fontSize="sm">Win Rate</Text>
                  <Text color="#4FD1C5" fontSize="2xl" fontWeight="bold">
                    {(results.metrics.winRate * 100).toFixed(1)}%
                  </Text>
                </Box>
                <Box textAlign="center">
                  <Text color="#A0AEC0" fontSize="sm">Profit Factor</Text>
                  <Text color="#4FD1C5" fontSize="2xl" fontWeight="bold">
                    {results.metrics.profitFactor.toFixed(2)}
                  </Text>
                </Box>
              </SimpleGrid>
              
              <Box mb={6}>
                <Heading size="sm" mb={4} color="#E2E8F0">Equity Curve</Heading>
                <Plot
                  data={equityPlotData}
                  layout={{
                    ...plotLayout,
                    height: 400,
                    title: { text: "Portfolio Performance" }
                  }}
                  style={{ width: "100%" }}
                />
              </Box>
              
              <Box>
                <Heading size="sm" mb={4} color="#E2E8F0">Recent Trades</Heading>
                <Table.Root colorScheme="teal">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader>Date</Table.ColumnHeader>
                      <Table.ColumnHeader>Symbol</Table.ColumnHeader>
                      <Table.ColumnHeader>Side</Table.ColumnHeader>
                      <Table.ColumnHeader>Quantity</Table.ColumnHeader>
                      <Table.ColumnHeader>Price</Table.ColumnHeader>
                      <Table.ColumnHeader>PnL</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {results.trades.map((trade, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>
                          <Text color="#E2E8F0">{trade.date}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text color="#4FD1C5" fontWeight="medium">{trade.symbol}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge
                            colorScheme={trade.side === "BUY" ? "green" : "red"}
                          >
                            {trade.side}
                          </Badge>
                        </Table.Cell>
                        <Table.Cell>
                          <Text color="#E2E8F0">{trade.quantity}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text color="#E2E8F0">${trade.price.toFixed(2)}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text color={trade.pnl >= 0 ? "#4FD1C5" : "#F56565"} fontWeight="bold">
                            ${trade.pnl.toFixed(2)}
                          </Text>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Flex>
  );
} 