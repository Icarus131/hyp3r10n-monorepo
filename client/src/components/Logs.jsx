import ScrollToBottom from "react-scroll-to-bottom"

const logs = ["hello","hello","hello","hello","hello","hello","hello","hello","hello","hello"]
function Logs() {
	return (
		<ScrollToBottom className="gap-6 overflow-y-scroll bg-[rgba(17,24,39,0.9)] rounded-lg mx-2 mt-2 sm:mt-0">
			{
				logs.map((i,index)=>{
					return <p key={index} className="my-4 h-14 flex items-center justify-center">{i}</p>
				})
			}
		</ScrollToBottom>
	);
}

export default Logs
