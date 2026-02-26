#Web3 dApp

A React + Vite frontend dApp using Reown AppKit (WalletConnect) for Web3 wallet connectivity. Allows users to connect their crypto wallet and send native tokens to fixed recipient addresses.

## Architecture

- **Framework**: React 18 + Vite 5
- **Web3**: Reown AppKit + Wagmi v2 + Viem v2
- **Chains**: Ethereum, BSC, Polygon

## Key Files

- `src/main.jsx` - App entry point, AppKit initialization
- `src/App.jsx` - Main UI component (wallet connect + send tx)
- `src/config.js` - Project ID, chain config, fixed recipient addresses
- `vite.config.js` - Vite dev server config (port 5000, allowedHosts)

## Development

Run on port 5000 via `npm run dev`. Configured to allow all hosts for the Replit proxy environment.

## Notes

- `@wagmi/core` is symlinked from `wagmi/node_modules/@wagmi/core` to `node_modules/@wagmi/core` due to npm ENOTEMPTY issues with the imported node_modules tree
- Deployment is configured as a static site (builds with `npm run build`, serves `dist/`)
