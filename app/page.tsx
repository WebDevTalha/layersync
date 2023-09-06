"use client"
import React from "react"
import { styled } from "@mui/system"
import { Tabs } from "@mui/base/Tabs"
import { TabsList } from "@mui/base/TabsList"
import { TabPanel } from "@mui/base/TabPanel"
import { buttonClasses } from "@mui/base/Button"
import { Tab, tabClasses } from "@mui/base/Tab"
import Button from "@mui/material/Button"

import Navbar from "./Navbar"
import Mintpage from "./Mint"
import Bridge from "./Bridge"
import History from "./History"

const blue = {
    50: "#F0F7FF",
    100: "#C2E0FF",
    200: "#80BFFF",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    700: "#0059B2",
    800: "#004C99",
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
    900: "#24292f",
}

const StyledTab = styled(Tab)`
    font-family: "IBM Plex Sans", sans-serif;
    color: #fff;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: transparent;
    width: 100%;
    margin: 6px;
    border: none;
    border-radius: 7px;
    display: flex;
    justify-content: center;

    &.${tabClasses.selected} {
        background-color: #ffffff1f;
        backdrop-filter: blur(5px);
    }

    &.${buttonClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }
    span {
        display: block;
        width: 100%;
        padding: 10px 12px;
    }
`

const StyledTabPanel = styled(TabPanel)(
    ({ theme }) => `
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: none;
  border-radius: 12px;
  `,
)

const StyledTabsList = styled(TabsList)(
    ({ theme }) => `
  max-width: 750px;
  border-radius: 12px;
  margin: auto;
  margin-bottom: 16px;
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  background-color: #ffffff0d;
  backdrop-filter: blur(10px);
  `,
)

export default function Home() {
    return (
        <>
            <main>
                <Navbar />
                <Tabs defaultValue={0}>
                    <StyledTabsList>
                        <StyledTab value={0}>
                            <span>Mint</span>
                        </StyledTab>
                        <StyledTab value={1}>
                            <span>Bridge</span>
                        </StyledTab>
                        <StyledTab value={2}>
                            <span>History</span>
                        </StyledTab>
                    </StyledTabsList>
                    <StyledTabPanel value={0}>
                        <Mintpage />
                    </StyledTabPanel>
                    <StyledTabPanel value={1}>
                        <Bridge />
                    </StyledTabPanel>
                    <StyledTabPanel value={2}>
                        <History />
                    </StyledTabPanel>
                </Tabs>
            </main>
        </>
    )
}
