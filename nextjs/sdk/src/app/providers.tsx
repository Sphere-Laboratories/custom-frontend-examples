"use client";

import "./globals.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { SphereProvider } from "@spherelabs/react";

require("@solana/wallet-adapter-react-ui/styles.css");

export default function Providers({ children }: { children: React.ReactNode }) {
  const endpoint =
    "https://rpc.helius.xyz/?api-key=5b61f350-4c99-4f81-8331-246906ba53dc";

  return (
    <html lang="en">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <SphereProvider
              paymentLinkId={
                process.env.NEXT_PUBLIC_PAYMENT_LINK_ID ||
                "paymentLink_51ae9e9aa1684340ae969bc1b23f540d"
              }
            >
              <body>{children}</body>
            </SphereProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </html>
  );
}
