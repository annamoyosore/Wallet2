// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiConfig } from "wagmi";

// --- Hardcoded AppKit networks
import { mainnet, bsc, polygon } from "@reown/appkit/networks";
const CHAINS = [mainnet, bsc, polygon];

// --- Your Project ID
const REOWN_PROJECT_ID = "c00145b1e7f8d39d821971d8aeb61276";

// --- React Query client
const queryClient = new QueryClient();

// --- Wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  projectId: REOWN_PROJECT_ID,
  chains: CHAINS,
});

// --- Initialize AppKit
createAppKit({
  adapters: [wagmiAdapter],
  projectId: REOWN_PROJECT_ID,
  networks: CHAINS,
  metadata: {
    name: "Web3 Native dApp",
    description: "Native balance sender",
    icons: [],
    // url removed for testing purposes
  },
});

// --- Render app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiConfig>
  </React.StrictMode>
);