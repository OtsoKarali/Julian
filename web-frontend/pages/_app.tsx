import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import SidebarLayout from "../src/components/SidebarLayout";

const config = defineConfig({
  globalCss: {
    table: {
      background: "#23272f !important",
      bg: "#23272f !important",
    },
    th: {
      background: "#23272f !important",
      bg: "#23272f !important",
      color: "#fff !important",
    },
    td: {
      background: "#23272f !important",
      bg: "#23272f !important",
      color: "#fff !important",
    },
  },
});
const system = createSystem(defaultConfig, config);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={system}>
      <SidebarLayout>
        <Component {...pageProps} />
      </SidebarLayout>
    </ChakraProvider>
  );
}

export default MyApp; 