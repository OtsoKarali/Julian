import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Flex, Spinner, Table } from "@chakra-ui/react";

interface Trade {
  id: string;
  time: string;
  asset: string;
  side: string;
  quantity: number;
  price: number;
  status: string;
}

export default function Trades() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/trades")
      .then(res => res.json())
      .then(data => {
        setTrades(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load trades.");
        setLoading(false);
      });
  }, []);

  return (
    <Flex direction="column" align="center" justify="center" py={0} px={0} minH="100vh" maxH="100vh" minW="100vw" maxW="100vw" bg="#18181b" overflow="hidden">
      <Box w="100vw" h="100vh" minH="100vh" minW="100vw" px={[2, 8, 16]} py={[2, 8, 10]} display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" bg="#18181b" style={{boxSizing: 'border-box'}}>
        <Heading fontSize={["4xl", "5xl", "6xl"]} mb={10} color="#4FD1C5" fontFamily="'Poppins', 'Montserrat', 'Oswald', sans-serif" fontWeight="extrabold" letterSpacing="tight" textAlign="center" ml="-200px">
          Trades
        </Heading>
        {loading ? <Spinner size="lg" color="#4FD1C5" /> : error ? <Text color="#F56565">{error}</Text> : (
          <Box w="100%" maxW="1200px" minW="700px" bg="#23272f" borderRadius="2xl" p={8} ml="-200px" style={{boxShadow: "0 0 16px 2px #4FD1C5, 0 2px 8px 0 rgba(79,209,197,0.10)"}}>
            <Table.Root colorScheme="teal">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Time</Table.ColumnHeader>
                  <Table.ColumnHeader>Asset</Table.ColumnHeader>
                  <Table.ColumnHeader>Side</Table.ColumnHeader>
                  <Table.ColumnHeader>Quantity</Table.ColumnHeader>
                  <Table.ColumnHeader>Price</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {trades.map((trade) => (
                  <Table.Row key={trade.id}>
                    <Table.Cell>
                      <Text color="#E2E8F0">{trade.time}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text color="#4FD1C5" fontWeight="medium">{trade.asset}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text color={trade.side === "BUY" ? "#4FD1C5" : "#F56565"} fontWeight="bold">
                        {trade.side}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text color="#E2E8F0">{trade.quantity}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text color="#E2E8F0">${trade.price.toFixed(2)}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text color={trade.status === "FILLED" ? "#4FD1C5" : "#F56565"}>
                        {trade.status}
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}
      </Box>
    </Flex>
  );
} 