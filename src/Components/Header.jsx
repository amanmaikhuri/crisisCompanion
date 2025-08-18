import { LuLogOut, LuMenu, LuMoon, LuSun } from "react-icons/lu"
import { NavLink, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";


function Header() {

  const body = document.querySelector("#root");
  //hndle logout
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      navigate("/sign-in"); // redirect to sign-in page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  // sidebar toggle function 
  function showSidebar(){
    const sidebar = document.querySelector("#sidebar");
    if (sidebar.classList.contains("hidden")){
      sidebar.classList.replace("hidden", "visible");
    } else {sidebar.classList.replace("visible", "hidden");}
  } 

  // theme toggle function
  function handleMode(){
    const light = document.querySelector("#light");
    const dark = document.querySelector("#dark");
    if(body.classList.contains("dark-mode")){
      body.classList.replace("dark-mode", "light-mode");
      if (dark.classList.contains("hidden")){
        dark.classList.replace("hidden", "visible");
        light.classList.replace("visible", "hidden");
      }
    } else {
      body.classList.replace("light-mode", "dark-mode");
      if (light.classList.contains("hidden")){
        light.classList.replace("hidden", "visible");
        dark.classList.replace("visible", "hidden");
      }
    }
  }

  return (
    <div>
      <nav className="px-4 py-2 flex justify-between items-center md:hidden border-b-2 mb-1">
        <div ><LuMenu size={31} onClick={showSidebar}/></div>
        <div className="text-2xl pt-2" onClick={handleMode}> 
          <LuSun  id="light" className="visible"/>
          <LuMoon id="dark" className="hidden"/>
        </div>
      </nav>
      <aside id="sidebar" className="px-4 py-2 h-screen w-[60%] md:w-[30%] border-r hidden ">
        <ul className="flex flex-col gap-6 mt-4">
          <NavLink to={"/"}
          className={"p-2 hover:border transition-200 hover:rounded-md"}>Crisis Companion</ NavLink>
          <NavLink to={"/calmSpace"}
          className={"p-2 hover:border rounded-md"}>Calm Space</ NavLink>
          <NavLink to={"/https://amanmaikhuri.github.io/growth-snap/"}
          className={"p-2 hover:border rounded-md"}>Growth Snap</ NavLink>
          <NavLink to={"https://mood-tracker-xi.vercel.app/"}
          className={"p-2 hover:border rounded-md"}>Mood Logger</ NavLink>
                   <NavLink to={"https://growth-snap.vercel.app/growthSnap"}
          className={"p-2 hover:border rounded-md"}>Habit Tracker</ NavLink>
                   <NavLink to={"https://amanmaikhuri.github.io/expenseTracker/"}
          className={"p-2 hover:border rounded-md"}>Expense Tracker</ NavLink>
                   {/* <NavLink to={"https://amanmaikhuri.github.io/find-recipe/"}
          className={"p-2 hover:border rounded-md"}>Recipe Website</ NavLink> */}
        </ul>
        <NavLink
        onClick={handleLogout}
          className={"py-2 px-11 hover:border flex gap-2 items-center text-lg border-t-2 absolute bottom-2"}><LuLogOut /> Log Out</ NavLink>
      </aside>
    </div>
  )
}
export default Header