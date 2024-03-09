import LandingPageComponent from "./components/LandingPageComponent"
import Error from "./Error"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { NextUIProvider } from "@nextui-org/react"

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPageComponent/>,
		errorElement: <Error/>,
	}
])

function App() {
	return(
		<NextUIProvider>
			<RouterProvider router={router}/>
		</NextUIProvider>
	)
}

export default App
