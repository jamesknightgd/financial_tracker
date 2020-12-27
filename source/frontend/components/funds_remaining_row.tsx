import * as React from "react"
import {Box, Grid, Typography, Divider, makeStyles} from "@material-ui/core"

import colors from "../libraries/colors"

import BlockRow from "./blocks/row"
import TextBlock from "./blocks/text"
import ChartBlock from "./blocks/chart"

export default function RemainingRow() : JSX.Element
{
    const [dateToProjectFunds, setDateToProjectFunds] = React.useState<{[key : string] : number}>({})
    const [latestDate, setLatestDate]                 = React.useState<string>("")
    const [latestProjectFund, setLatestProjectFund]   = React.useState<number>(0)
    const [averageWeeklyOutgoingFunds, setAverageWeeklyOutgoingFunds] = React.useState<number>(0)

    const hasInitialized = React.useRef<boolean>(false)
    React.useEffect(()=>
    {
        if(hasInitialized.current) return

        hasInitialized.current = true

        refreshDateToProjectFunds()
        refreshAverageWeeklyOutgoingFunds()
    })

    async function refreshAverageWeeklyOutgoingFunds() : Promise<void>
    {
        const response      = await fetch("/api/OutgoingFunds", {method: "get", headers:{"Accept": "application/json"}})
        const outgoingFunds = (await response.json()) as {[key : string] : number}

        let totalOutgoingFunds      : number = 0
        let totalWeeksOutgoingFunds : number = 0
        for(const date in outgoingFunds)
        {
            totalOutgoingFunds      += outgoingFunds[date]
            totalWeeksOutgoingFunds += 1
        }

        setAverageWeeklyOutgoingFunds(totalOutgoingFunds/totalWeeksOutgoingFunds)
    }

    async function refreshDateToProjectFunds() : Promise<void>
    {
        const response = await fetch("/api/ProjectFundsRemaining", {method: "get", headers:{"Accept": "application/json"}})

        const dateToProjectFunds = await response.json()

        console.log(dateToProjectFunds)
        
        let largestDateStr : string = "1/1/2020"
        let largestDate    : Date   = new Date("1/1/2020")
        for(const dateStr in dateToProjectFunds)
        {
            const date : Date = new Date(dateStr)
            console.log(date)
            if(date.getTime() > largestDate.getTime())
            {
                largestDateStr = dateStr
                largestDate    = date
            }
        }

        if(largestDateStr === "1/1/2020") throw `Expected to find largest date within project funds document.`

        setLatestDate(largestDateStr)
        setLatestProjectFund(dateToProjectFunds[largestDateStr])
        setDateToProjectFunds(dateToProjectFunds)
    }


    return(
        <BlockRow margin="6px" margin_top="0px">

            <TextBlock width="33.33%" margin_left="2px" header={`⏳ Weeks Remaining at 0 income`} content={`${Math.floor(latestProjectFund/averageWeeklyOutgoingFunds)}`}/>

            <TextBlock width="33.33%" margin_left="2px" header={`💰 Project Funds Remaining`} content={`${latestProjectFund}`}/>

            <ChartBlock 
                width="33.33%" margin_left="2px" header={`💰 Project Funds Remaining`} id="project-funds-remaining"
                x_axis_labels={Object.keys(dateToProjectFunds)}
                data={Object.values(dateToProjectFunds)}
                data_label="dollars"
            />

        </BlockRow>
    )
}