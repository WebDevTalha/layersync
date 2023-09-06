"use client"

import * as React from "react"
import {
    RainbowKitProvider,
    getDefaultWallets,
    connectorsForWallets,
    darkTheme,
} from "@rainbow-me/rainbowkit"
import {
    argentWallet,
    trustWallet,
    ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import {
    goerli,
    polygonMumbai,
    optimismGoerli,
    arbitrumGoerli,
    avalancheFuji,
    bscTestnet,
} from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import * as env from "./env"
import "dotenv/config"

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        goerli,
        polygonMumbai,
        optimismGoerli,
        arbitrumGoerli,
        avalancheFuji,
        bscTestnet,
    ],
    [publicProvider()],
)

const projectId = "201675b279d66737f3978db03768e72f"

const { wallets } = getDefaultWallets({
    appName: "Nft Bridge",
    projectId,
    chains,
})

const demoAppInfo = {
    appName: "Nft Bridge",
}

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: "Other",
        wallets: [
            argentWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
        ],
    },
])

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
})

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => setMounted(true), [])
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
                chains={chains}
                appInfo={demoAppInfo}
                theme={darkTheme({
                    accentColor: "#45f882",
                    accentColorForeground: "black",
                    overlayBlur: "small",
                })}
            >
                {mounted && children}
            </RainbowKitProvider>
        </WagmiConfig>
    )
}
