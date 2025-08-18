import Header from "./Header"

const CalmSpace = () => {
  return (
    <>
        <Header />
        <div className="w-full h-screen px-4 py-4 bg-gradient-to-b from-[#f9fafb] to-[#4c9acd] flex flex-col items-center gap-6">
            <h1 className="text-3xl font-bold">Calm Space</h1>
            <div className="w-[12rem] h-[12rem] rounded-full bg-white/30 backdrop-blur-lg border-white/20 shadow-lg"></div>

            <h1 className="text-2xl font-bold">Breathe in../Breathe out..</h1>

            <div className="flex gap-1">
                <div className="h-28 w-25 px-2 pb-4">
                    <div className="h-[80%] text-5xl px-2 pt-3 border rounded-md bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">🌧️</div>
                    <p className="text-center pt-2 font-semibold">Rain</p>
                </div>

                <div className="h-28 w-25 px-2 pb-4">
                    <div className="h-[80%] text-5xl px-2 pt-3 border rounded-md bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">🌳</div>
                    <p className="text-center pt-2 font-semibold">Forest</p>
                </div>

                <div className="h-28 w-25 px-2 pb-4">
                    <div className="h-[80%] text-5xl px-2 pt-3 border rounded-md bg-white/30 backdrop-blur-lg border-white/20 shadow-lg">🌊</div>
                    <p className="text-center pt-2 font-semibold">Waves</p>
                </div>
            </div>

            <button type="button"
            className="w-[18rem] px-4 py-4 text-white bg-[#dc2626] rounded-md">
                Emergency Help?
            </button>
        </div>
    </>
  )
}
export default CalmSpace