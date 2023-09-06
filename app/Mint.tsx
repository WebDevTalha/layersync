import React from "react"
import Button from "@mui/material/Button"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import OmnichainNftAbi from "../utils/OmnichainNftAbi.json"
import { LoaderMini } from "./Loader"
import LoadingButton from "@mui/lab/LoadingButton"
import SaveIcon from "@mui/icons-material/Save"
import { goeNFT } from "../utils/configuration"
import MintConfig from "./MintConfig"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const numbGen = Math.floor(Math.random() * 4 + 1)
const imgPrefix =
    "https://ipfs.io/ipfs/QmZeZaXgoHPT6Bt5TybwUj9sDJP3pu6QZ1wjo8KgLFCA89/"
const imgExtention = ".png"
const genImage = imgPrefix + numbGen + imgExtention

export default function Mint() {
    const { isConnected } = useAccount()
    if (isConnected) {
        console.log("hi")
    } else {
        console.log("by")
    }

    return (
        <>
            <div className="mainBridge">
                <div className="cardWrapper">
                    <div className="bridgeCard">
                        <div className="singleMintCard">
                            <div className="mintWrapper">
                                <div className="nftImage">
                                    <img src={genImage} alt="nft" />
                                    {/* <div className="nftImageText">
                                        <div>LayerSync NFT</div>
                                        <div>0.001 ETH</div>
                                    </div> */}
                                    <div className="mintBtn">
                                        {isConnected ? (
                                            <MintConfig />
                                        ) : (
                                            <ConnectButton />
                                        )}
                                    </div>
                                </div>
                                <div className="nftContent">
                                    <div className="contentTitle">
                                        <span>LayerSync NFT</span>
                                        <h2>
                                            Mint is <span>Live</span>
                                        </h2>
                                        <div>
                                            <p>
                                                Lorem Ipsum como su texto por
                                                defecto, y al hacer una búsqueda
                                                de Lorem Ipsum va a dar por
                                                resultado muchos sitios web que
                                                usan este texto si se encuentran
                                                en estado de desarrollo. Muchas
                                                versiones han evolucionado a
                                                través de los años, algunas
                                                veces por accidente, otras veces
                                                a propósito por ejemplo
                                                insertándole humor y cosas por
                                                el estilo.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="nftGridBox">
                                        <div className="mintSupply">
                                            <h4>TOTAL NFT SUPPLY</h4>
                                            <span>∞</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
