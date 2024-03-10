import ScrollToBottom from "react-scroll-to-bottom"
import { socket } from "../socket";
import { useEffect,useState } from "react";

function Logs() {
	const [logs, setLogs] = useState([])

	useEffect(() => {
		socket.off("receieve_message").on("receieve_message", (log) => {
			setLogs(logs => [...logs, log])
		})
	},[socket])

	const truncateStr = (str) => {
		let maxLength = 60;  
		let truncatedStr = str.length>maxLength ? str.substring(0, maxLength) + "..." : str;  
		return truncatedStr
	}

	return (
		<ScrollToBottom className="overflow-y-scroll bg-[rgba(17,24,39,0.9)] rounded-lg mx-2 mt-2 sm:mt-0">
			{
				logs.map((i,index)=>{
					return <p key={index} className="h-14 flex items-center justify-center">{truncateStr(JSON.stringify(i))}</p>
				})
			}
		</ScrollToBottom>
	);
}

export default Logs
