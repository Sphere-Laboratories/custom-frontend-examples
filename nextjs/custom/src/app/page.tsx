"use client";

import axios from "axios";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import qs from "qs";
import { VersionedTransaction } from "@solana/web3.js";

export const styles = {
  main: "flex min-h-screen flex-col gap-y-4 p-24 items-center",
  button:
    "items-center w-[350px] bg-indigo-600 px-4 py-3 text-center text-sm font-semibold inline-block text-white cursor-pointer uppercase transition duration-200 ease-in-out rounded-lg hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 active:scale-95",
  input: "border-[2px] border-[#E4EBFF] rounded-md",
  subtotal: "text-[#0F2A43]",
};

const paymentLinkId =
  process.env.NEXT_PUBLIC_PAYMENT_LINK_ID ||
  "paymentLink_51ae9e9aa1684340ae969bc1b23f540d";

export default function Home() {
  const { connection } = useConnection();
  const { connected, publicKey, sendTransaction } = useWallet();

  const [paymentLink, setPaymentLink] = useState<any>(null);
  const [message, setMessage] = useState("Pay");

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `https://api.spherepay.co/v1/public/paymentLink/${paymentLinkId}`,
      );
      setPaymentLink(response.data.data.paymentLink);
    })();
  }, []);

  const pay = async () => {
    if (!publicKey) throw Error("wallet not connected");
    if (!paymentLink) throw Error("payment link not loaded");

    setMessage("Processing...");
    const query = paymentLink.lineItems.map((lineItem: any) => {
      return {
        id: lineItem.id,
        quantity: +lineItem.quantity,
      };
    });
    const response = await axios.post(
      `https://api.spherepay.co/v1/public/paymentLink/pay/${paymentLinkId}?${qs.stringify(
        {
          lineItems: JSON.stringify(query),
        },
      )}`,
      {
        account: publicKey.toBase58(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const txBuf = Buffer.from(response.data.transaction, "base64");
    const tx = VersionedTransaction.deserialize(txBuf);
    const txId = await sendTransaction(tx, connection);

    setMessage("Confirming...");
    const confirmation = await connection.confirmTransaction(txId, "confirmed");
    if (confirmation.value.err) {
      setMessage(`Error`);
      return;
    }
    setMessage(`Success`);
  };

  if (!connected) {
    return (
      <main className={styles.main}>
        <WalletMultiButton className={styles.button} />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <button
        onClick={async () => {
          const txId = await pay();
          console.log(txId);
        }}
        className={styles.button}
      >
        {message}
      </button>
    </main>
  );
}
