import React from "react"
import Image from "next/image"
import Container from "@mui/material/Container"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Grid from "@mui/material/Grid"

export default function Navbar() {
    return (
        <>
            <header>
                <div className="header-wrapper">
                    <Container maxWidth="xl">
                        <Grid
                            container
                            spacing={2}
                            columns={16}
                            sx={{
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "20px 0 20px 0",
                            }}
                        >
                            <Grid
                                item
                                sx={{
                                    padding: "0 0 0 0",
                                }}
                            >
                                <Image
                                    src="/logo.png"
                                    alt="logo"
                                    width="150"
                                    height="150"
                                />
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    padding: "0 0 0 0",
                                }}
                            >
                                <ConnectButton />
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </header>
        </>
    )
}
