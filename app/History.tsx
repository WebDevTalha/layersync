import React from "react"
import { ethers } from "ethers"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { Button } from "@mui/material"
import {
    useSignMessage,
    useNetwork,
    useSwitchNetwork,
    useContractRead,
    useAccount,
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from "wagmi"
import { waitForTransaction } from "@wagmi/core"
import { Select, SelectProps, selectClasses } from "@mui/base/Select"
import { Option, optionClasses } from "@mui/base/Option"
import { Popper } from "@mui/base/Popper"
import { styled } from "@mui/system"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import Swal from "sweetalert2"
import OnftAbi from "../utils/OmnichainNftAbi.json"

import opIcon from "../public/optimismIcon.png"
import polyIcon from "../public/polygonIcon.png"
import ethIcon from "../public/ethereumIcon.png"
import Image from "next/image"
import { LoaderSmall } from "./Loader"
import CloseIcon from "@mui/icons-material/Close"
import { addListener } from "process"

declare let window: any

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
})

export default function Bridge() {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <div className="mainBridge">
                    <div className="cardWrapper">
                        <div className="bridgeCard">
                            <h1>History</h1>
                            <p>Transaction History will show here</p>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}
