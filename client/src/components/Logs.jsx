const logs = ["hello","hello","hello","hello","hello","hello","hello","hello","hello","hello"]
export default function Logs() {
	return (
		<div className="gap-6 h-[95%] grow overflow-y-scroll bg-slate-900 rounded-lg mx-2">
			{
				logs.map((i,index)=>{
					return <p key={index} className="my-4 h-14 flex items-center justify-center">{i}</p>
				})
			}
		</div>
	);
}
