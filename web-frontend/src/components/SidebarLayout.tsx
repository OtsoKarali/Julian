import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Button, IconButton, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaChartLine, FaCogs, FaBook, FaUser, FaMoon, FaSun, FaChartBar, FaPlay, FaBrain, FaDatabase, FaRocket, FaHeartbeat } from "react-icons/fa";

const navItems: { label: keyof typeof navColors; icon: any; path: string }[] = [
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
  { label: "Health", icon: FaHeartbeat, path: "/health" },
  { label: "Profile", icon: FaUser, path: "/profile" },
];

const glassBg = "rgba(32,32,32,0.7)";
const glassBorder = "#2d3748";

// Color map for sidebar nav items
const navColors = {
  Dashboard: "#4FD1C5", // teal
  Analytics: "#4299E1", // blue
  Backtesting: "#38A169", // green
  Models: "#9F7AEA", // purple
  Data: "#ED8936", // orange
  Research: "#ECC94B", // yellow
  Strategies: "#F56565", // red
  Portfolio: "#0BC5EA", // cyan
  Trades: "#A0AEC0", // gray
  Settings: "#718096", // dark gray
  Health: "#48BB78", // green
  Profile: "#D53F8C", // pink
};

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [theme, setTheme] = React.useState("dark");
  // Geometric SVG animation state
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    // Rotate 360deg every 60 seconds
    const interval = setInterval(() => {
      setRotation((r) => (r + 6) % 360); // 6deg per second, 60s for full rotation
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Flex minH="100vh" bg="#18181b">
      {/* Sidebar */}
      <Flex
        as="nav"
        direction="column"
        minW="240px"
        maxW="400px"
        bg={glassBg}
        borderRight="1px solid"
        borderColor={glassBorder}
        boxShadow="lg"
        py={8}
        px={0}
        position="sticky"
        top={0}
        h="100vh"
        zIndex={10}
        alignItems="center"
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={6} mt={2} mx="auto">
          <Box
            as="span"
            width="90px"
            height="90px"
            borderRadius="50%"
            boxShadow="0 0 32px 4px #4FD1C5aa"
            style={{
              background: "conic-gradient(from 0deg, #4FD1C5, #4299E1, #9F7AEA, #4FD1C5)",
              animation: "spinGradient 16s linear infinite"
            }}
          />
          <style jsx global>{`
            @keyframes spinGradient {
              0% { filter: hue-rotate(0deg); }
              100% { filter: hue-rotate(360deg); }
            }
          `}</style>
        </Box>
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? router.pathname === "/"
              : router.pathname.startsWith(item.path);
          return (
            <Link href={item.path} key={item.label} passHref legacyBehavior>
              <Button
                as="a"
                variant="ghost"
                color={isActive ? "#18181b" : "#E2E8F0"}
                bg={isActive ? navColors[item.label as keyof typeof navColors] + "22" : "transparent"}
                borderLeft={"6px solid " + navColors[item.label as keyof typeof navColors]}
                borderRight={isActive ? "2px solid #4FD1C5" : "none"}
                justifyContent="flex-start"
                fontWeight="bold"
                fontSize="xl"
                mb={5}
                py={6}
                _hover={{
                  bg: navColors[item.label as keyof typeof navColors] + "33",
                  color: "#fff",
                }}
                transition="all 0.2s"
                width="85%"
                mx="auto"
                style={{ boxShadow: isActive ? `0 0 0 2px ${navColors[item.label as keyof typeof navColors]}55` : undefined }}
              >
                {React.createElement(item.icon, { style: { marginRight: 16, fontSize: 28, color: navColors[item.label as keyof typeof navColors] } })}
                {item.label}
              </Button>
            </Link>
          );
        })}
        <Box as="hr" my={4} borderColor={glassBorder} borderWidth="1px" opacity={0.3} />
        <IconButton
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          alignSelf="center"
          mt={8}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </IconButton>
      </Flex>
      {/* Main Content */}
      <Flex direction="column" flex={1} align="center" py={10} px={4}>
        {children}
      </Flex>
    </Flex>
  );
};

export default SidebarLayout; 