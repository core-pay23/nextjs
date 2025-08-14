import { NextResponse } from "next/server";
import { defineChain, verifyMessage } from "viem";
import { clientExists, getPrivateKey } from "@/lib/walletUtils";
import {
  createWalletClient,
  http,
  parseUnits,
  createPublicClient,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { erc20Abi } from "@/lib/contracts/erc20";
import { tokenList } from "@/lib/tokenlist";

const error = (message) => {
  return NextResponse.json({ error: message }, { status: 400 });
};

const success = (data) => {
  return NextResponse.json({ success: true, ...data }, { status: 200 });
};

export const coreTestnetConfig = {
  id: 1114,
  name: "core Testnet",
  network: "core-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "tCORE2",
    symbol: "tCORE2",
  },
  rpcUrls: {
    public: { http: ["https://rpc.test2.btcs.network/"] },
    default: { http: ["https://rpc.test2.btcs.network/"] },
  },
  blockExplorers: {
    blockscout: {
      name: "Blockscout",
      url: "https://scan.test2.btcs.network/",
    },
    default: {
      name: "Blockscout",
      url: "https://scan.test2.btcs.network/",
    },
  },
  testnet: true,
};

export async function POST(request) {
  try {
    const { clientWalletAddress, amount, tokenAddress, signature, message } =
      await request.json();

    // Validate input
    if (
      !clientWalletAddress ||
      !amount ||
      !tokenAddress ||
      !signature ||
      !message
    ) {
      return error("All fields are required");
    }

    // 1. Check the signature match clientWalletAddress

    const isValidSignature = await verifyMessage({
      address: clientWalletAddress,
      message: message,
      signature: signature,
    });

    if (!isValidSignature) {
      return error("Invalid signature");
    }

    // 2. Check if there is a user with exact clientWalletAddress
    const userExists = await clientExists(clientWalletAddress);
    if (!userExists) {
      return error("User not found");
    }
    
    console.log("Withdrawal request:", { clientWalletAddress, amount, tokenAddress });

    // return success(clientPrivateKey);

    // 3. Send the token from merchant wallet to clientWalletAddress, return the txhash
    // Get the private key for the merchant's EOA wallet (not the client's)
    const merchantPrivateKey = await getPrivateKey(clientWalletAddress);
    console.log("Retrieved merchant private key:", merchantPrivateKey ? "REDACTED" : "NOT FOUND");

    // Ensure the private key is in the correct format for viem
    let formattedPrivateKey = merchantPrivateKey;
    if (!merchantPrivateKey.startsWith("0x")) {
      // Check if it's a hex string or needs to be converted
      if (/^[0-9a-fA-F]+$/.test(merchantPrivateKey)) {
        // It's already a hex string, just add 0x prefix
        formattedPrivateKey = `0x${merchantPrivateKey}`;
      } else {
        // It might be a base64 encoded string, convert it to hex
        try {
          const buffer = Buffer.from(merchantPrivateKey, "base64");
          formattedPrivateKey = `0x${buffer.toString("hex")}`;
        } catch (e) {
          // If conversion fails, try to use it as is with 0x prefix
          formattedPrivateKey = `0x${merchantPrivateKey}`;
        }
      }
    }

    const account = privateKeyToAccount(formattedPrivateKey);
    console.log("Account address:", account.address);

    // // Create wallet client
    const client = createWalletClient({
      chain: defineChain(coreTestnetConfig),
      transport: http(coreTestnetConfig.rpcUrls.default.http[0]),
      account,
    });
    console.log("Wallet client created");

    // // Create public client to get token decimals
    const publicClient = createPublicClient({
      chain: defineChain(coreTestnetConfig),
      transport: http(coreTestnetConfig.rpcUrls.public.http[0]),
    });

    // Check if token is native (CORE)
    const isNativeToken =
      tokenAddress === "0x0000000000000000000000000000000000000000";

    let decimals = 18; // Default to 18 decimals for native token
    if (!isNativeToken) {
      try {
        decimals = await publicClient.readContract({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: "decimals",
        });
        console.log(`decimals`, decimals);
      } catch (err) {
        console.warn("Could not fetch token decimals, using default of 18");
      }
    }

    let tokenInfos = tokenList.find(t => t.address.toLocaleLowerCase() === tokenAddress.toLocaleLowerCase());
    console.log("Token info:", tokenInfos);

    // Parse amount with correct decimals
    const parsedAmount = parseUnits(amount.toString(), decimals);

    console.log("Parsed amount:", parsedAmount.toString(), "decimals:", decimals);

    let txHash;
    if (isNativeToken) {
      // For native tokens, use sendTransaction
      txHash = await client.sendTransaction({
        account,
        to: clientWalletAddress,
        value: parsedAmount,
      });
      return success({ txHash });
    }

    // For non-native tokens, transfer directly (no approval needed for transfer from own account)
    // Send token transfer transaction using writeContract for better error handling
    console.log("Attempting token transfer:", {
      address: tokenAddress,
      functionName: "transfer",
      args: [clientWalletAddress, parsedAmount.toString()]
    });
    
    try {
      txHash = await client.writeContract({
        address: tokenAddress,
        abi: tokenInfos?.abi,
        functionName: "transfer",
        args: [clientWalletAddress, parsedAmount],
      });
      console.log("Transfer successful, txHash:", txHash);
      
      return success({ txHash });
    } catch (transferError) {
      console.error("Transfer failed:", transferError);
      return error("Transfer failed: " + transferError.message);
    }
  } catch (err) {
    console.error("Withdrawal error:", err);
    return error("Failed to process withdrawal: " + err.message);
  }
}
