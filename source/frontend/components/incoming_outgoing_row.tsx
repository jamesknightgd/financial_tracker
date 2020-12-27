import * as React from "react"
import {Box, Grid, Typography, Divider, makeStyles} from "@material-ui/core"

import colors from "../libraries/colors"

import BlockRow from "./blocks/row"
import TextBlock from "./blocks/text"
import ChartBlock from "./blocks/chart"

export default function OutgoingRow() : JSX.Element
{
    const [incomingFunds, setIncomingFunds] = React.useState<{[key : string] : number}>({})
    const [outgoingFunds, setOutgoingFunds] = React.useState<{[key : string] : number}>({})

    const hasInitialized = React.useRef<boolean>(false)
    React.useEffect(()=>
    {
        if(hasInitialized.current) return

        hasInitialized.current = true

        refreshIncomingFunds()
        refreshOutgoingFunds()
    })

    async function refreshIncomingFunds() : Promise<void>
    {
        const response = await fetch("/api/IncomingFunds", {method: "get", headers:{"Accept": "application/json"}})
        setIncomingFunds(await response.json())
    }

    async function refreshOutgoingFunds() : Promise<void>
    {
        const response = await fetch("/api/OutgoingFunds", {method: "get", headers:{"Accept": "application/json"}})
        setOutgoingFunds(await response.json())
    }

    return(
        <BlockRow margin="6px" margin_top="0px">
            
            <ChartBlock 
                width="50%" margin_left="2px" header={`🤲 Incoming Funds`} id="incoming-funds"
                x_axis_labels={Object.keys(incomingFunds)}
                data={Object.values(incomingFunds)}
                data_label="dollars"
            />

            <ChartBlock 
                width="50%" margin_left="2px" header={`💸 Outgoing Funds`} id="outgoing-funds"
                x_axis_labels={Object.keys(outgoingFunds)}
                data={Object.values(outgoingFunds)}
                data_label="dollars"
            />

        </BlockRow>
    )
}