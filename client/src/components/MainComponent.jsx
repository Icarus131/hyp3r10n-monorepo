import Charts from "./Charts"
import { socket } from "../socket"
import { useState } from "react"

function MainComponent(){
	const send = async () => {
		await socket.emit("chat message","hello nigga")
	}
	return(
		<>
			<Charts/>
			<button onClick={send}>send</button>
		</>
	)
}

export default MainComponent
