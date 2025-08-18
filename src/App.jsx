import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router-dom"
import CalmSpace from './Components/CalmSpace';
import CompanionAI from './Components/CompanionAI';
import CrisisCompanionMain from './Components/CrisisCompanionMain';
import Introduction from './Components/Introduction';
import Motivation from './Components/Motivation';
import SignIn from './Components/SignIn';
import SignUp from "./Components/SignUp";

const router = createBrowserRouter([
  {
      path: "/",
      element:
      <div className="h-screen overflow-hidden ">
        <CrisisCompanionMain/>
      </div>
  },
  {
      path: "/crisis-companion",
      element:
      <div className="h-screen overflow-hidden ">
        <CrisisCompanionMain />
      </div>
  },
  {
      path: "/calmSpace",
      element:
      <div className="h-screen overflow-hidden ">
        <CalmSpace />
      </div>
  },
  {
      path: "/introduction",
      element:
      <div className="h-screen overflow-hidden ">
        <Introduction />
      </div>
  },
  {
      path: "/sign-in",
      element:
      <div className="h-screen overflow-hidden ">
        <SignIn />
      </div>
  },
  {
      path: "/sign-up",
      element:
      <div className="h-screen overflow-hidden ">
        <SignUp />
      </div>
  },
  {
      path: "/motivational-quotes",
      element:
      <div className="h-screen overflow-hidden ">
        <Motivation />
      </div>
  },
  {
      path: "/ai-companion",
      element:
      <div className="h-screen overflow-hidden ">
        <CompanionAI />
      </div>
  },
])


function App() {

  return (
    <>
      <RouterProvider router={router} />
      {/* <Introduction />
      <hr></hr>
      <SignIn />
      <hr></hr>
      {/* <SignUp /> */}
      {/*<hr></hr>
      <Motivation />
      <hr></hr>
      <CrisisCompanionMain />
      <hr></hr>
      <CalmSpace />
      <hr />
      <CompanionAI /> */}
    </>
  )
}

export default App
