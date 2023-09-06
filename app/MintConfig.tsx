import * as React from "react"
import { ethers, BigNumber } from "ethers"
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useNetwork,
    useSwitchNetwork,
} from "wagmi"
import { waitForTransaction } from "@wagmi/core"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import OmnichainNftAbi from "../utils/OmnichainNftAbi.json"
import { LoaderMini } from "./Loader"
import { Button } from "@mui/material"
import Swal from "sweetalert2/dist/sweetalert2.js"
import "@sweetalert2/theme-dark/dark.scss"

declare let window: any

export default function MintConfig() {
    const [isMinting, setMinting] = React.useState(false)
    const { chain } = useNetwork()
    const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork()
    const { address } = useAccount()
    const waddress = address
    const numbGen = Math.floor(Math.random() * 10000 + 1)
    const tokenId = numbGen
    const currentChainId = chain?.id
    const dRpc = chain?.rpcUrls.default.http[0]

    // console.log(chain)
    // var contractAddress = null;
    if (currentChainId === 421613) {
        var contractAddress = "0x1ff9eab0a594201b4d04d706c99cfab29053e869"
    } else if (currentChainId === 5) {
        var contractAddress = "0x7D2463017ED96471D759cAc533eA46a008362903"
    } else if (currentChainId === 43113) {
        var contractAddress = "0xafacD82F9423D362865DbeD36F6403120e2e6746"
    } else if (currentChainId === 97) {
        var contractAddress = "0xafacD82F9423D362865DbeD36F6403120e2e6746"
    }

    // const arbGoerliContractAddress =
    //     "0x1fF9eab0A594201b4d04D706C99cfAB29053e869"
    // const goerliContractAddress = "0xafacD82F9423D362865DbeD36F6403120e2e6746"
    //     console.log(address)

    // const switchToGoerli = () => {
    //     switchNetwork?.(Number(5))
    // }

    const handleMint = async () => {
        setMinting(true)
        const ethprovider = new ethers.providers.JsonRpcProvider(dRpc)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(
            contractAddress,
            OmnichainNftAbi,
            signer,
        )
        try {
            const rawTxn = await contract.mint({
                value: ethers.utils.parseEther((0.001).toString()),
            })
            console.log("rawTxn")
            let signedTxn = await signer.sendTransaction(rawTxn)
            console.log("signedTxn")
            await signedTxn.wait()
        } catch (err: any) {
            const getTxnHash = err.value.hash

            const waitForTransactionHash: any = await waitForTransaction({
                confirmations: 3,
                hash: getTxnHash,
            })
                .then((kds) => {
                    console.log(kds)
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener("mouseenter", Swal.stopTimer)
                            toast.addEventListener(
                                "mouseleave",
                                Swal.resumeTimer,
                            )
                        },
                    })
                    Toast.fire({
                        icon: "success",
                        title: "ONFT Mint Successfuly!",
                    })
                    setMinting(false)
                })
                .catch((reson: any) => {
                    console.log(reson)
                    if (reson) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener(
                                    "mouseenter",
                                    Swal.stopTimer,
                                )
                                toast.addEventListener(
                                    "mouseleave",
                                    Swal.resumeTimer,
                                )
                            },
                        })
                        Toast.fire({
                            icon: "error",
                            title: "Nft Mint Failed",
                        })
                        setMinting(false)
                    }
                })
        }
    }

    return (
        <div>
            <Button
                variant="outlined"
                disabled={isMinting}
                onClick={handleMint}
            >
                {isMinting ? <LoaderMini /> : "Mint Now"}
            </Button>
        </div>
    )
}
