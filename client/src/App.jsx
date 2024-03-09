import LandingPageComponent from "./components/LandingPageComponent"
import Error from "./Error"
import MainComponent from "./components/MainComponent"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { NextUIProvider } from "@nextui-org/react"

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPageComponent/>,
		errorElement: <Error/>,
	},
	{
		path: "/app",
		element: <MainComponent/>,
	},
])

function App() {
	return(
		<NextUIProvider>
			<RouterProvider router={router}/>
		</NextUIProvider>
	)
}

export default App
