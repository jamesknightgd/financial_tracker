import * as express from "express"
import {promisify} from "util"
import * as fs from "fs"
import * as path from "path"

/* 
    Responsibility
        Handles requests for all days work time for a day, i.e. get all records of work times for Monday.
*/
export default function handleRequestGetTodaysWorkTime(app: express.Express) : void
{
    app.get("/api/OutgoingFunds", async (request, response)=>
    {
        const pathToDataRoot      : string = path.resolve("..", "..", "data")
        const pathToOutgoingFunds : string = path.resolve(pathToDataRoot, "outgoing_funds.json")

        const dateToOutgoingFunds : {[key : string] : number} = JSON.parse((await promisify(fs.readFile)(pathToOutgoingFunds)).toString())
        
        response.type(`application/json`).status(200).send(JSON.stringify(dateToOutgoingFunds))
    })
}