// --- Error catcher for production / mobile browsers ---
window.onerror = function (message, source, lineno, colno, error) {
  document.body.innerHTML = `
    <div style="padding:20px;color:red;font-family:monospace;">
      <h2>Runtime Error Detected</h2>
      <p><b>Message:</b> ${message}</p>
      <p><b>Source:</b> ${source}</p>
      <p><b>Line:</b> ${lineno}</p>
      <p><b>Column:</b> ${colno}</p>
      <pre>${error?.stack || ""}</pre>
    </div>
  `;
};
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiConfig } from "wagmi";
import { REOWN_PROJECT_ID, CHAINS } from "./config";

// --- React Query client
const queryClient = new QueryClient();

// --- Wagmi adapter for AppKit
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
    description: "Send balances natively with AppKit",
    url: "https://wallet2-wy5e.vercel.app", // Make sure this is your real domain
    icons: [],
  },
});

// --- Render the React app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiConfig>
  </React.StrictMode>
);