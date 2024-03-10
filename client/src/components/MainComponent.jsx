import Charts from "./Charts"
import { socket } from "../socket"
import { useState } from "react"
import Logs from "./Logs"
import BlockedTable from "./BlockedTable"

function MainComponent(){
	return(
		<div className="flex sm:flex-row flex-col w-screen h-svh items-center justify-center g-black bg-grid-white/[0.2] gap-4 sm:gap-0">
			<Charts/>
			<div className="h-[95%] grow flex flex-col justify-center gap-4 sm:w-auto w-[95%]">
				<Logs/>
				<BlockedTable/>
			</div>
		</div>
	)
}

export default MainComponent
