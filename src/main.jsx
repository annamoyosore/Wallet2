import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiConfig } from "wagmi";
import { REOWN_PROJECT_ID, CHAINS } from "./config";

// ✅ Error catcher for Android (shows error on screen)
window.onerror = function (message, source, lineno, colno, error) {
  document.body.innerHTML = `
    <div style="padding:20px;color:red;font-family:monospace;">
      <h2>Runtime Error Detected</h2>
      <p><b>Message:</b> ${message}</p>
      <p><b>Source:</b> ${source}</p>
      <p><b>Line:</b> ${lineno}</p>
      <p><b>Column:</b> ${colno}</p>
    </div>
  `;
};

const queryClient = new QueryClient();

const wagmiAdapter = new WagmiAdapter({
  projectId: REOWN_PROJECT_ID,
  chains: CHAINS
});

createAppKit({
  adapters: [wagmiAdapter],
  projectId: REOWN_PROJECT_ID,
  networks: CHAINS,
  metadata: {
    name: "Web3 dApp",
    description: "Native balance sender",
    url: "https://wallet2-one.vercel.app",
    icons: []
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <WagmiConfig config={wagmiAdapter.wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </WagmiConfig>
);