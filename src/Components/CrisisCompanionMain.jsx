import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { auth } from "../firebase/firebase";
import { LuMessageCircle } from "react-icons/lu";

const CrisisCompanionMain = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const body = document.querySelector("#crisis-companion");

  function redirectToAi(path){
   return navigate(path);
  }

  //handle mood selection
  const handleMoodSelection = (mood) => {
    switch (mood) {
      case 'sad': body.style.backgroundColor = '#f87171';
                body.style.color ="#1e293b"; // red
                break; // red
      case 'neutral': body.style.backgroundColor = '#9ca3af';
      body.style.color ="#1e293b"; break; // gray
      case 'happy': body.style.backgroundColor = '#34d399';
      body.style.color ="#1e293b"; break; // green
      case 'excited': body.style.backgroundColor = '#fbbf24';
      body.style.color ="#1e293b"; break; // yellow
      default: body.style.backgroundColor = '#60a5fa';
              body.style.color ="#1e293b"; // default gray
    }
  };

  return (
    <>
    <Header />
    <div className="w-full max-w-[800px] mx-auto h-screen py-4 px-6 flex flex-col gap-1 md:gap-6" id="crisis-companion">
      <h1 className="text-3xl font-bold text-[#1e293b]">
        Hi { user?.displayName ? user.displayName : "Guest"} 👋
      </h1>
      <p className="text-[1.2rem] md:text-[1.5rem] text-[#64748b]">
        How are you feeling today?
      </p>

      <div className="flex flex-wrap items-center gap-6 justify-evenly md:justify-items-start pr-9 py-2">
        <button className="h-[4rem] w-[4rem] text-5xl pt-2 text-center border rounded-lg" onClick={() => handleMoodSelection('sad')}>
          😞
        </button>
        <button className="h-[4rem] w-[4rem] text-5xl pt-2 text-center border rounded-lg" onClick={() => handleMoodSelection('neutral')}>
          😑
        </button>
        <button className="h-[4rem] w-[4rem] text-5xl pt-2 text-center border rounded-lg" onClick={() => handleMoodSelection('happy')}>
          😊
        </button>
        <button className="h-[4rem] w-[4rem] text-5xl pt-2 text-center border rounded-lg" onClick={() => handleMoodSelection('excited')}>
          😀
        </button>
        <button className="h-[4rem] w-[4rem] text-5xl pt-2 text-center border rounded-lg" onClick={() => handleMoodSelection('other')}>
          🤩
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex gap-9 mt-4 ">
          <div className="w-[20rem] h-[9rem] md:h-[11rem] border rounded-md px-4 py-4 bg-gradient-to-l from-[#6366f1] to-[#06b6d4] relative">
            <p className="text-lg md:text-2xl grid place-content-center mt-6 text-white">
              Remember, deep breaths help slow your heartbeat.
            </p>
            <div className="absolute bottom-[12%] right-[11%] px-2 py-1 rounded-md text-white"
            onClick={() => redirectToAi("/ai-companion")}>
              <LuMessageCircle size={28}/>
            </div>
          </div>
        </div>
        <div className="md:flex gap-9 mt-4 hidden"
        onClick={redirectToAi}>
          <div className="w-[20rem] h-[9rem] md:h-[11rem] border rounded-md px-4 py-4 bg-gradient-to-l from-[#6366f1] to-[#06b6d4]">
            <p className="text-2xl grid place-content-center mt-11 text-white">
              Chat with AI
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="w-[18rem] lg:w-[20rem] h-[4rem] px-9 py-4 border rounded-md bg-[#dc2626] text-white font-bold mt-4"
      >
        Call Emergency Contact
      </button>
    </div>
    </>
  );
};

export default CrisisCompanionMain;
