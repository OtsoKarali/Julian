import { useRouter } from "next/router";
import { Box, Heading, Text, Flex, Spinner, Button, Badge } from "@chakra-ui/react";
import React from "react";
import { FaChartLine, FaCogs, FaBrain } from "react-icons/fa";

const mockStrategies = [
  {
    id: "momentum",
    name: "Dual EMA Momentum",
    description: "Breakout strategy using dual exponential moving averages",
    type: "Technical",
    status: "active",
    performance: 0.156,
    lastUpdated: "2024-01-15",
    icon: <FaChartLine color="#4FD1C5" size={32} />,
    explanation: {
      how: "This strategy uses two exponential moving averages (EMAs) of different lengths. A buy signal is generated when the short-term EMA crosses above the long-term EMA, and a sell signal is generated when the short-term EMA crosses below the long-term EMA. This approach aims to capture breakout trends early.",
      when: "Best used in trending markets where momentum is strong and false signals are minimized. Not ideal for choppy or sideways markets.",
      params: [
        { label: "Short EMA Period", value: "12" },
        { label: "Long EMA Period", value: "26" },
        { label: "Asset Universe", value: "S&P 500 stocks" }
      ]
    }
  },
  {
    id: "pairs",
    name: "Pairs Trading",
    description: "Mean reversion strategy using Kalman filter",
    type: "Statistical",
    status: "active",
    performance: 0.089,
    lastUpdated: "2024-01-14",
    icon: <FaCogs color="#81E6D9" size={32} />,
    explanation: {
      how: "Pairs trading identifies two historically correlated assets. When their price relationship diverges, the strategy goes long the underperformer and short the outperformer, betting on reversion. The Kalman filter dynamically estimates the spread and adapts to changing market conditions.",
      when: "Effective in markets with stable relationships between assets, such as stocks in the same sector. Less effective during regime shifts or structural breaks.",
      params: [
        { label: "Asset Pair", value: "AAPL/MSFT" },
        { label: "Lookback Window", value: "60 days" },
        { label: "Entry Threshold", value: "2 standard deviations" }
      ]
    }
  },
  {
    id: "ml_factor",
    name: "ML Factor Model",
    description: "Machine learning based factor model",
    type: "ML",
    status: "active",
    performance: 0.234,
    lastUpdated: "2024-01-13",
    icon: <FaBrain color="#9F7AEA" size={32} />,
    explanation: {
      how: "This model uses machine learning algorithms to combine multiple alpha factors (e.g., value, momentum, sentiment) into a predictive signal. The model is trained on historical data to maximize risk-adjusted returns and adapt to changing market regimes.",
      when: "Best for diversified portfolios and when you have access to a rich set of features. Requires careful validation to avoid overfitting.",
      params: [
        { label: "Model Type", value: "Gradient Boosting" },
        { label: "Feature Set", value: "Value, Momentum, Sentiment" },
        { label: "Training Window", value: "2 years" }
      ]
    }
  }
];

export default function StrategyDetails() {
  const router = useRouter();
  const { id } = router.query;

  const strategy = mockStrategies.find((s) => s.id === id);

  if (!strategy) {
    return (
      <Flex direction="column" align="center" py={10} px={4} minH="100vh" bg="#18181b">
        <Spinner size="lg" color="#4FD1C5" />
        <Text color="#F56565" mt={4}>Strategy not found.</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" py={10} px={4} minH="100vh" bg="#18181b">
      <Box bg="rgba(32,32,32,0.7)" borderRadius="2xl" boxShadow="2xl" border="1.5px solid #2d3748" px={[4, 10]} py={[6, 10]} mb={8} minW={["90vw", "600px"]} maxW="900px" textAlign="left">
        <Flex mb={2} align="center" gap={4}>
          {strategy.icon}
          <Heading size="xl" color="#4FD1C5">{strategy.name}</Heading>
        </Flex>
        <Text color="#E2E8F0" fontSize="lg" mb={4}>{strategy.description}</Text>
        <Box my={4} borderBottom="2px solid #4FD1C5" />
        <Flex direction="column" align="start" gap={4} mb={4}>
          <Box>
            <Text color="#81E6D9" fontWeight="bold" fontSize="md">How it works:</Text>
            <Text color="#E2E8F0" mt={1}>{strategy.explanation.how}</Text>
          </Box>
          <Box>
            <Text color="#81E6D9" fontWeight="bold" fontSize="md">When to use:</Text>
            <Text color="#E2E8F0" mt={1}>{strategy.explanation.when}</Text>
          </Box>
          <Box>
            <Text color="#81E6D9" fontWeight="bold" fontSize="md">Key Parameters:</Text>
            <Flex gap={3} mt={2} flexWrap="wrap">
              {strategy.explanation.params.map((param, idx) => (
                <Badge key={idx} colorScheme="teal" fontSize="md" px={3} py={1} borderRadius="md">
                  <b>{param.label}:</b> {param.value}
                </Badge>
              ))}
            </Flex>
          </Box>
        </Flex>
        <Box my={4} borderBottom="2px solid #4FD1C5" />
        <Text color="#A0AEC0" mb={2}><b>Type:</b> {strategy.type}</Text>
        <Text color="#A0AEC0" mb={2}><b>Status:</b> {strategy.status}</Text>
        <Text color="#A0AEC0" mb={2}><b>Performance:</b> {strategy.performance}</Text>
        <Text color="#A0AEC0" mb={2}><b>Last Updated:</b> {strategy.lastUpdated}</Text>
        <Button mt={6} colorScheme="teal" onClick={() => router.back()}>Back to Strategies</Button>
      </Box>
    </Flex>
  );
} 