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

function CustomSelect(props: SelectProps<number, false>) {
    const slots: SelectProps<number, false>["slots"] = {
        root: StyledButton,
        listbox: StyledListbox,
        popper: StyledPopper,
        ...props.slots,
    }

    return <Select {...props} slots={slots} />
}

const characters = [
    { name: "Ethereum", race: "eth", srcicon: ethIcon },
    { name: "Polygon", race: "pol", srcicon: polyIcon },
    { name: "Optimism", race: "opt", srcicon: opIcon },
]
const blue = {
    100: "#DAECFF",
    200: "#99CCF3",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
}

const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#15162a",
}

const StyledButton = styled("button")(
    ({ theme }) => `
   font-family: IBM Plex Sans, sans-serif;
   font-size: 1rem;
   box-sizing: border-box;
   min-width: 100%;
   padding: 17px 12px;
   border-radius: 8px;
   text-align: left;
   line-height: 1.5;
   background: #15162a0d;
   border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
   color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
   box-shadow: 0px 4px 6px ${
       theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
   };

   transition-property: all;
   transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
   transition-duration: 120ms;

   &:hover {
     background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
     border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
   }

   &.${selectClasses.focusVisible} {
     border-color: ${blue[400]};
     outline: 3px solid ${
         theme.palette.mode === "dark" ? blue[500] : blue[200]
     };
   }

   &.${selectClasses.expanded} {
     &::after {
       content: '▴';
     }
   }

   &::after {
     content: '▾';
     float: right;
   }
   `,
)

const StyledListbox = styled("ul")(
    ({ theme }) => `
   font-family: IBM Plex Sans, sans-serif;
   font-size: 0.875rem;
   box-sizing: border-box;
   padding: 6px;
   margin: 12px 0;
   min-width: 365px;
   border-radius: 12px;
   overflow: auto;
   outline: 0px;
   background: #1c1c1c;
   border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
   color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
   box-shadow: 0px 4px 6px ${
       theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
   };
   `,
)

const StyledOption = styled(Option)(
    ({ theme }) => `
   list-style: none;
   padding: 8px;
   border-radius: 8px;
   cursor: default;

   &:last-of-type {
     border-bottom: none;
   }

   &.${optionClasses.selected} {
     background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
     color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
   }

   &.${optionClasses.highlighted} {
     background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
     color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
   }

   &.${optionClasses.highlighted}.${optionClasses.selected} {
     background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
     color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
   }

   &.${optionClasses.disabled} {
     color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
   }

   &:hover:not(.${optionClasses.disabled}) {
     background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
     color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
   }
   `,
)

const StyledPopper = styled(Popper)`
    z-index: 1;
`

const numbGen = Math.floor(Math.random() * 4 + 1)
const imgPrefix =
    "https://ipfs.io/ipfs/QmZeZaXgoHPT6Bt5TybwUj9sDJP3pu6QZ1wjo8KgLFCA89/"
const imgExtention = ".png"
const genImage = imgPrefix + numbGen + imgExtention

export default function Bridge() {
    const [rvalue, setReciveValue] = React.useState<number | null>(10)
    const { chain }: any = useNetwork()
    var getChain = chain
    if (!getChain) {
        getChain = 10
    } else {
        getChain = chain
    }
    const [value, setValue] = React.useState<number | null>(getChain.id)
    const [Nfts, setNft] = React.useState(false)
    const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork()
    const { address } = useAccount()
    const currentChainId = chain?.id
    const [open, setOpen] = React.useState(false)
    const [selectedNetwork, setSelectedNetwork] = React.useState(null)
    const [transferStatus, setTransferStatus] = React.useState(false)
    const [modalOpen, setModalOpen] = React.useState(false)
    const [modalText, setModalText] = React.useState<string>("")
    const [modalTextP, setModalTextP] = React.useState<string>("")

    // Convert chianId to lz id
    var getDestChainId: any = null
    if (rvalue === 5) {
        getDestChainId = 10121
    } else if (rvalue === 80001) {
        getDestChainId = 10109
    } else if (rvalue === 420) {
        getDestChainId = 10132
    } else if (rvalue === 421613) {
        getDestChainId = 10143
    } else if (rvalue === 43113) {
        getDestChainId = 10106
    } else if (rvalue === 97) {
        getDestChainId = 10102
    }

    // Handle Swap Butoon Function
    const handleSwapBtn = async () => {
        if (value === null || rvalue === null) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer)
                    toast.addEventListener("mouseleave", Swal.resumeTimer)
                },
            })

            Toast.fire({
                icon: "warning",
                title: `${error && error.message}`,
            })
        } else {
            await switchNetwork?.(Number(rvalue))
            setValue(rvalue)
            setReciveValue(value)
        }
    }

    // Fatch Nft From Contract

    var contractAddress: any = null
    if (currentChainId === 421613) {
        contractAddress = "0x1ff9eab0a594201b4d04d706c99cfab29053e869"
    } else if (currentChainId === 5) {
        contractAddress = "0x7D2463017ED96471D759cAc533eA46a008362903"
    } else if (currentChainId === 43113) {
        contractAddress = "0xafacD82F9423D362865DbeD36F6403120e2e6746"
    } else if (currentChainId === 97) {
        contractAddress = "0xafacD82F9423D362865DbeD36F6403120e2e6746"
    }
    const nftReadCon = useContractRead({
        address: contractAddress,
        abi: OnftAbi,
        functionName: "getOwnedTokenIds",
        args: [address],
    })
    const getNftName = useContractRead({
        address: contractAddress,
        abi: OnftAbi,
        functionName: "name",
    })
    // console.log(data)
    const nftValues: any = nftReadCon.data

    let itemArray: any = []
    if (nftReadCon.data === undefined) {
        let meta = {
            name: "none nft here",
        }
        itemArray.push(meta)
    } else {
        nftValues.forEach(async (id: any) => {
            const token = parseInt(id, 10)
            // console.log(token)
            const nftName = getNftName.data
            const nftImage =
                "https://ipfs.io/ipfs/QmZeZaXgoHPT6Bt5TybwUj9sDJP3pu6QZ1wjo8KgLFCA89/3.png"
            const nftdesc =
                "Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de Lorem Ipsum va a dar por resultado muchos"
            let meta = {
                name: nftName,
                image: nftImage,
                tokenId: token,
                wallet: address,
                description: nftdesc,
            }
            itemArray.push(meta)
        })
    }

    // find chain name from chain id
    let chainName = chains.find((o) => o.id === rvalue)
    // console.log(chainName)

    // Handle Nft
    const handleNftSelect = (id: any) => {
        // console.log(id)
        setNft(id)
    }

    // Chain id to Image Source
    const handleChianImage = (id: any) => {
        if (id === 5) {
            return ethIcon
        } else if (id === 80001) {
            return polyIcon
        } else if (id === 420) {
            return opIcon
        } else {
            return "/public/ethereumIcon.png"
        }
    }

    // Handle Gas Estimation
    const handleGasEstimation: any = async () => {
        if (rvalue === null || rvalue === 10) {
        } else {
            const adaperParams = ethers.utils.solidityPack(
                ["uint16", "uint256"],
                [1, 200000],
            )
            const gasReadCon = useContractRead({
                address: contractAddress,
                abi: OnftAbi,
                functionName: "estimateSendFee",
                args: [getDestChainId, address, Nfts, false, adaperParams],
            })
            console.log(gasReadCon)

            // const provider = new ethers.providers.Web3Provider(window.ethereum)
            // const signer = await provider.getSigner()
            // const contract = new ethers.Contract(
            //     contractAddress,
            //     OnftAbi,
            //     signer,
            // )
            // try {
            //     const fees = await contract.estimateSendFee(
            //         getDestChainId,
            //         address,
            //         Nfts,
            //         false,
            //         adaperParams,
            //     )
            //     const nativeFee = fees[0]
            //     console.log(`native fees (wei): ${nativeFee}`)
            // } catch (err) {
            //     console.log(err)
            // }
        }
    }
    handleGasEstimation()

    // Handle Transfer Nft
    const handleTransfer = async () => {
        setModalOpen(true)

        setModalText("initializing transfer...")
        setModalTextP("Please Wait")
        await new Promise((r) => setTimeout(r, 4000))

        setModalText("Verifying Details...")
        setModalTextP("Please Wait")
        await new Promise((r) => setTimeout(r, 4000))

        const sendAmount = 1
        const fromSendAddress = address
        const destChainId = getDestChainId
        const fToSendAddress = address
        const nftTokenId = "5"
        const lzRefundAddress = address
        const lzPaymentAddress = "0x0000000000000000000000000000000000000000"

        console.log(destChainId)
        const adaperParams = ethers.utils.solidityPack(
            ["uint16", "uint256"],
            [1, 200000],
        )

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, OnftAbi, signer)

        setModalText("Details Verified!")
        setModalTextP("Processing...")
        await new Promise((r) => setTimeout(r, 2000))

        try {
            const fees = await contract.estimateSendFee(
                destChainId,
                fToSendAddress,
                nftTokenId,
                false,
                adaperParams,
            )
            const nativeFee = fees[0]
            console.log(`native fees (wei): ${nativeFee}`)

            setModalText("Confirmation Needed!")
            setModalTextP("Please Approve, To Transfer Your ONFT")

            const rawTxn = await contract.sendFrom(
                fromSendAddress,
                destChainId,
                fToSendAddress,
                nftTokenId,
                lzRefundAddress,
                lzPaymentAddress,
                adaperParams,
                {
                    value: nativeFee.mul(4).div(3),
                    gasLimit: 350000,
                    nonce: 1 || undefined,
                },
            )
            let signedTxn = await signer.sendTransaction(rawTxn)
            await signedTxn.wait()
        } catch (err: any) {
            setModalText("Approval Received! Processing...")
            setModalTextP("Please Wait, it might take some time...")
            await new Promise((r) => setTimeout(r, 4000))
            const getTxnHash = err.value.hash
            const waitForTransactionHash: any = await waitForTransaction({
                confirmations: 5,
                hash: getTxnHash,
            })
                .then((kds) => {
                    console.log(kds)

                    setModalText("Congrats")
                    setModalTextP("Transfer has been completed")
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
                        title: "ONFT Transfered Successfuly!",
                    })
                })
                .catch((reson: any) => {
                    console.log(reson)
                    setModalText("Transaction Failed")
                    setModalTextP("Execution reverted for an unknown reason.")
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
                            title: "Execution reverted for an unknown reason.",
                        })
                    }
                })
            // console.log(waitForTransactionHash.Details)
        }
    }

    // var getDestChainId = 10106
    // if (rvalue === 5) {
    //     getDestChainId = 10121
    // } else if (rvalue === 80001) {
    //     getDestChainId = 10109
    // } else if (rvalue === 420) {
    //     getDestChainId = 10132
    // } else if (rvalue === 421613) {
    //     getDestChainId = 10143
    // } else if (rvalue === 43113) {
    //     getDestChainId = 10106
    // } else if (rvalue === 97) {
    //     getDestChainId = 10102
    // }

    // const sendAmount = "130000"
    // const fromSendAddress = address
    // const destChainId = getDestChainId
    // const fToSendAddress = address
    // const nftTokenId = Nfts
    // const lzRefundAddress = address
    // const lzPaymentAddress = "0x0000000000000000000000000000000000000000"
    // const adaperParams =
    //     "0x00010000000000000000000000000000000000000000000000000000000000030d40"

    // const { config } = usePrepareContractWrite({
    //     address: contractAddress,
    //     abi: OnftAbi,
    //     args: [
    //         sendAmount,
    //         fromSendAddress,
    //         destChainId,
    //         fToSendAddress,
    //         nftTokenId,
    //         lzRefundAddress,
    //         lzPaymentAddress,
    //         adaperParams,
    //     ],
    //     functionName: "sendFrom",
    // })
    // const { data, write } = useContractWrite(config)

    // const { isLoading, isSuccess } = useWaitForTransaction({
    //     hash: data?.hash,
    // })
    // console.log(write)

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <div className="mainBridge">
                    <div className="cardWrapper">
                        <div className="bridgeCard">
                            <h1>Bridge your NFT</h1>
                            <div className="bridgeNetworks">
                                <div className="singleBridgeCard">
                                    <div className="singleBridgeFilds">
                                        <span className="fildName">
                                            Sender Blockchain
                                        </span>
                                        <CustomSelect
                                            value={chain?.id}
                                            onChange={(_, newValue) =>
                                                setValue(newValue)
                                            }
                                        >
                                            {chains.map((x) => (
                                                <StyledOption
                                                    key={x.id}
                                                    value={x.id}
                                                    onClick={() =>
                                                        switchNetwork?.(x.id)
                                                    }
                                                >
                                                    <div className="kfjldsfjkjfkdsl">
                                                        <Image
                                                            src={handleChianImage(
                                                                x.id,
                                                            )}
                                                            alt="icon"
                                                            width={20}
                                                            height={20}
                                                        />
                                                        <span>{x.name}</span>
                                                    </div>
                                                </StyledOption>
                                            ))}
                                        </CustomSelect>
                                    </div>
                                </div>

                                <div
                                    className="swapBtn"
                                    onClick={handleSwapBtn}
                                >
                                    <SwapHorizIcon />
                                </div>

                                <div className="singleBridgeCard">
                                    <div className="singleBridgeFilds">
                                        <span className="fildName">
                                            Receiver Blockchain
                                        </span>
                                        <CustomSelect
                                            value={rvalue}
                                            onChange={(_, newValue) =>
                                                setReciveValue(newValue)
                                            }
                                        >
                                            {chains.map((x) => (
                                                <StyledOption
                                                    disabled={
                                                        !switchNetwork ||
                                                        x.id === chain?.id
                                                    }
                                                    key={x.id}
                                                    value={x.id}
                                                >
                                                    <div className="kfjldsfjkjfkdsl">
                                                        <Image
                                                            src={handleChianImage(
                                                                x.id,
                                                            )}
                                                            alt="icon"
                                                            width={20}
                                                            height={20}
                                                        />
                                                        <span>{x.name}</span>
                                                    </div>
                                                </StyledOption>
                                            ))}
                                        </CustomSelect>
                                    </div>
                                </div>
                            </div>

                            <div className="singleBridgeCard">
                                {nftReadCon.isLoading ? (
                                    <LoaderSmall />
                                ) : (
                                    <div>
                                        {nftReadCon.data ? (
                                            <div>
                                                {itemArray.length === 0 ? (
                                                    "There are no Nft on this Network"
                                                ) : (
                                                    <div className="nft-wrapper">
                                                        {itemArray.map(
                                                            (
                                                                x: any,
                                                                key: any,
                                                            ) => (
                                                                <label
                                                                    className="single-nft-box"
                                                                    key={key}
                                                                    onClick={() =>
                                                                        handleNftSelect(
                                                                            x.tokenId,
                                                                        )
                                                                    }
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        name="radio"
                                                                    />
                                                                    <div className="left-side-nft-box">
                                                                        <img
                                                                            src={
                                                                                x.image
                                                                            }
                                                                            alt="Nft"
                                                                        />
                                                                        <span className="nft-name">
                                                                            {
                                                                                x.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <span className="tokenId">
                                                                        #
                                                                        {
                                                                            x.tokenId
                                                                        }
                                                                    </span>
                                                                    <p className="label-border"></p>
                                                                </label>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            "There are no Nft on this Network"
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="singleBridgeCard">
                                <div className="bridge-details">
                                    <div className="single-b-d-row">
                                        <span>Source Chain</span>
                                        <span>{chain?.name}</span>
                                    </div>
                                    <div className="single-b-d-row">
                                        <span>Destination Chain</span>
                                        <span>
                                            {rvalue === null
                                                ? "--"
                                                : chainName?.name}
                                        </span>
                                    </div>
                                    <div className="single-b-d-row">
                                        <span>ONFT Token ID</span>
                                        <span>{Nfts ? `#${Nfts}` : "--"}</span>
                                    </div>
                                    <div className="single-b-d-row">
                                        <span>GAS ESTIMATION</span>
                                        <span></span>
                                    </div>
                                    <div className="single-b-d-row">
                                        <span>Transfer Time</span>
                                        <span>2-3 minutes</span>
                                    </div>
                                </div>
                            </div>

                            <div className="singleBridgeCard">
                                <div className="bridge-t-button">
                                    <Button
                                        variant="outlined"
                                        onClick={handleTransfer}
                                    >
                                        Transfer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {modalOpen ? (
                        <>
                            <div className="overlay"></div>
                            <div className="transfer-modal">
                                <div className="transfer-modal-wrapper">
                                    <h2
                                        className="content-text"
                                        id="modalTextTitle"
                                    >
                                        {modalText}
                                    </h2>
                                    <p className="content-text-p">
                                        {modalTextP}
                                    </p>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => setModalOpen(false)}
                                    >
                                        Close
                                    </Button>
                                    <CloseIcon />
                                </div>
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </ThemeProvider>
        </>
    )
}
