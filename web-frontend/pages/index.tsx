import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  IconButton,
  Button,
  SimpleGrid,
  Table
} from "@chakra-ui/react";
import { FaChartLine, FaCogs, FaBook, FaUser, FaMoon, FaSun, FaChartBar, FaPlay, FaBrain, FaDatabase, FaRocket } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import type { IconType } from "react-icons";
import type { PlotParams } from "react-plotly.js";
import Head from "next/head";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const navItems = [
  { label: "Dashboard", icon: FaChartLine, path: "/" },
  { label: "Analytics", icon: FaChartBar, path: "/analytics" },
  { label: "Backtesting", icon: FaPlay, path: "/backtesting" },
  { label: "Models", icon: FaBrain, path: "/models" },
  { label: "Data", icon: FaDatabase, path: "/data" },
  { label: "Research", icon: FaBook, path: "/research" },
  { label: "Strategies", icon: FaRocket, path: "/strategies" },
  { label: "Portfolio", icon: FaChartLine, path: "/portfolio" },
  { label: "Trades", icon: FaChartBar, path: "/trades" },
  { label: "Settings", icon: FaCogs, path: "/settings" },
  { label: "Profile", icon: FaUser, path: "/profile" },
];

// Define types
interface MarketData {
  symbol: string;
  price: number;
  change: number;
  volume: number;
  marketCap: number;
}
interface PerformanceMetrics {
  totalReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
}
interface EquityCurve { x: string[]; y: number[]; }

export default function Home() {
  const [apiStatus, setApiStatus] = useState<"loading" | "ok" | "error">("loading");
  const [theme, setTheme] = useState("dark");
  const router = useRouter();
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [performance, setPerformance] = useState<PerformanceMetrics | null>(null);
  const [equityCurve, setEquityCurve] = useState<EquityCurve | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/health")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") setApiStatus("ok");
        else setApiStatus("error");
      })
      .catch(() => setApiStatus("error"));

    // Mock data
    setTimeout(() => {
      setMarketData([
        { symbol: "AAPL", price: 150.25, change: 2.5, volume: 50000000, marketCap: 2500000000000 },
        { symbol: "GOOGL", price: 2800.50, change: -1.2, volume: 25000000, marketCap: 1800000000000 },
        { symbol: "MSFT", price: 320.75, change: 1.8, volume: 35000000, marketCap: 2400000000000 },
        { symbol: "TSLA", price: 850.00, change: 5.2, volume: 40000000, marketCap: 850000000000 }
      ]);

      setPerformance({
        totalReturn: 0.156,
        sharpeRatio: 1.87,
        maxDrawdown: -0.032,
        winRate: 0.68
      });

      setEquityCurve({
        x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        y: [100, 110, 120, 115, 130, 140]
      });

      setLoading(false);
    }, 1000);
  }, []);

  // Example stats
  const stats = [
    { label: "PnL (YTD)", value: "+12.4%", color: "#38A169" },
    { label: "Alpha", value: "+2.1%", color: "#9F7AEA" },
  ];

  const equityPlotData = equityCurve ? [
    {
      x: equityCurve.x,
      y: equityCurve.y,
      type: "scatter" as const,
      mode: "lines+markers" as const,
      marker: { color: "#4FD1C5" },
      name: "Portfolio Value",
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

  // Hardcoded dark theme glassmorphism
  const glassBg = "rgba(32,32,32,0.7)";
  const glassBorder = "#2d3748";

  // Subtle, varied glow styles
  const glowTeal = { boxShadow: "0 0 12px 1px #4FD1C5, 0 2px 8px 0 rgba(79,209,197,0.10)" };
  const glowGreen = { boxShadow: "0 0 10px 1px #38A169, 0 2px 8px 0 rgba(56,161,105,0.10)" };
  const glowBlue = { boxShadow: "0 0 10px 1px #4299E1, 0 2px 8px 0 rgba(66,153,225,0.10)" };
  const glowPurple = { boxShadow: "0 0 10px 1px #9F7AEA, 0 2px 8px 0 rgba(159,122,234,0.10)" };
  const glowRed = { boxShadow: "0 0 10px 1px #F56565, 0 2px 8px 0 rgba(245,101,101,0.10)" };

  // Add Google Fonts for distinctive heading
  const headingFont = "'Poppins', 'Montserrat', 'Oswald', sans-serif";

  return (
    <Flex direction="column" align="center" justify="flex-start" py={0} px={0} minH="100vh" maxH="100vh" minW="100vw" maxW="100vw" bg="#18181b" overflow="hidden" style={{overflow: 'hidden'}}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Montserrat:wght@700&family=Oswald:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <Box
        w="100vw"
        h="100vh"
        minH="100vh"
        minW="100vw"
        px={[2, 8, 16]}
        py={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bg="#18181b"
        style={{
          boxSizing: 'border-box',
          overflow: 'hidden',
          marginLeft: '-300px', // moved much further right from sidebar
          width: 'calc(100vw - 200px)'
        }}
      >
        <Heading
          fontSize={["4xl", "5xl", "6xl"]}
          mb={20}
          color="#4FD1C5"
          fontFamily={headingFont}
          fontWeight="extrabold"
          letterSpacing="tight"
          textShadow="0 2px 16px rgba(0,255,255,0.12)"
          textAlign="center"
          w="100%"
          maxW="1200px"
        >
          Julian Dashboard
        </Heading>

        {/* Portfolio Chart - large, analytics style */}
        <Box
          bg={glassBg}
          borderRadius="2xl"
          border="1.5px solid"
          borderColor={glassBorder}
          p={6}
          mb={6}
          w="100%"
          maxW="1200px"
          minH="340px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={Object.assign({}, glowPurple)}
        >
          <Heading size="md" mb={4} color="#81E6D9">
            Portfolio Performance
          </Heading>
          {/* Performance Stats */}
          {performance && (
            <Flex gap={8} mb={4} wrap="wrap" justify="center">
              <Box textAlign="center">
                <Text color="#A0AEC0" fontSize="sm">Total Return</Text>
                <Text color="#4FD1C5" fontSize="xl" fontWeight="bold">{(performance.totalReturn * 100).toFixed(2)}%</Text>
              </Box>
              <Box textAlign="center">
                <Text color="#A0AEC0" fontSize="sm">Sharpe Ratio</Text>
                <Text color="#4FD1C5" fontSize="xl" fontWeight="bold">{performance.sharpeRatio.toFixed(2)}</Text>
              </Box>
              <Box textAlign="center">
                <Text color="#A0AEC0" fontSize="sm">Max Drawdown</Text>
                <Text color="#F56565" fontSize="xl" fontWeight="bold">{(performance.maxDrawdown * 100).toFixed(2)}%</Text>
              </Box>
              <Box textAlign="center">
                <Text color="#A0AEC0" fontSize="sm">Win Rate</Text>
                <Text color="#4FD1C5" fontSize="xl" fontWeight="bold">{(performance.winRate * 100).toFixed(1)}%</Text>
              </Box>
            </Flex>
          )}
          <Box w="100%" h="60vh" minH="260px" maxH="500px" display="flex" alignItems="center" justifyContent="center">
            <Plot
              data={[
                {
                  x: equityCurve ? equityCurve.x : [],
                  y: equityCurve ? equityCurve.y : [],
                  type: "scatter",
                  mode: "lines+markers",
                  line: { color: "#4FD1C5", width: 3 },
                  fill: "tozeroy",
                  fillcolor: "rgba(79,209,197,0.15)",
                  marker: { color: "#4FD1C5", size: 6 },
                  name: "Portfolio Value",
                },
              ]}
              layout={{
                paper_bgcolor: "#23272f",
                plot_bgcolor: "#23272f",
                font: { color: "#fff" },
                margin: { t: 60, r: 40, l: 60, b: 60 },
                height: undefined,
                autosize: true,
                title: {
                  text: "Portfolio Value Over Time",
                  font: { color: "#fff", size: 24 },
                  xref: "paper",
                  x: 0.5,
                  xanchor: "center",
                },
                xaxis: {
                  showgrid: true,
                  gridcolor: "#444",
                  zeroline: false,
                  color: "#fff",
                  tickfont: { color: "#fff", size: 16 },
                  title: {
                    text: "Month",
                    font: { color: "#fff", size: 18 },
                    standoff: 10,
                  },
                },
                yaxis: {
                  showgrid: true,
                  gridcolor: "#444",
                  zeroline: false,
                  color: "#fff",
                  tickfont: { color: "#fff", size: 16 },
                  title: {
                    text: "Portfolio Value",
                    font: { color: "#fff", size: 18 },
                    standoff: 10,
                  },
                },
                hovermode: "x unified",
                showlegend: false,
              }}
              config={{ displayModeBar: false, responsive: true }}
              style={{ width: "100%", height: "100%" }}
              useResizeHandler
            />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
} 