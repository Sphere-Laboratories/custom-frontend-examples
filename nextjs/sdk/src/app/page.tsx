"use client";

import { useSphere } from "@spherelabs/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

export const styles = {
  main: "flex min-h-screen flex-col gap-y-4 p-24 items-center",
  button:
    "items-center w-[350px] bg-indigo-600 px-4 py-3 text-center text-sm font-semibold inline-block text-white cursor-pointer uppercase transition duration-200 ease-in-out rounded-lg hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 active:scale-95",
  input: "border-[2px] border-[#E4EBFF] rounded-md",
  subtotal: "text-[#0F2A43]",
};

export default function Home() {
  const { setLineItemQuantity, lineItems, pay, subtotal, discount } =
    useSphere();

  const { connected } = useWallet();

  if (!connected || !lineItems) {
    return (
      <main className={styles.main}>
        <WalletMultiButton className={styles.button} />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.subtotal}>Tax: {subtotal?.totalTaxFormatted}</div>
      <div className={styles.subtotal}>
        Fees : {subtotal?.totalFeeFormatted}
      </div>
      <div className={styles.subtotal}>
        Total: {subtotal?.rawAmountWithTaxAndFeesFormatted}{" "}
        {lineItems[0].price.currency}
      </div>
      <div className={styles.subtotal}>
        NFT Discount: {discount?.nft ? JSON.stringify(discount.nft) : "None"}
      </div>
      <input
        className={styles.input}
        onChange={(e) => {
          setLineItemQuantity(parseInt(e.target.value), lineItems[0].id);
        }}
      />
      <button
        onClick={async () => {
          const txId = await pay();
          console.log(txId);
        }}
        className={styles.button}
      >
        Pay
      </button>
    </main>
  );
}
