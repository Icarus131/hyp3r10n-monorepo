import Charts from "./Charts"
import { socket } from "../socket"
import { useState } from "react"
import Logs from "./Logs"

function MainComponent(){
	return(
		<div className="flex w-screen h-svh items-center justify-center">
			<Charts/>
			<Logs/>
		</div>
	)
}

export default MainComponent
