import "./globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import "./950.css"
import "./App.css"
import "./main.css"
import "@sweetalert2/theme-dark/dark.scss"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Nft Bridge",
    description:
        "A Bridge, Where You can Mint an NFT and bridge to other EVM Supported Chains",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
