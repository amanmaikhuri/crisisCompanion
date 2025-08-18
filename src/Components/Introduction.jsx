const Introduction = () => {
  return (
    <>
        <div className="flex flex-col items-center h-screen p-4 gap-6">
            <h1 className="font-sans text-4xl font-bold text-center mt-11">Crisis <br />Companion</h1>
            <img src="/src/assets/crisis.png" 
            alt="Crisis Companion Logo" 
            className="h-[180px] w-[180px] rounded-full" />
            <p className="font-sans text-md text-center max-w-md">
                Here to support you through life's challenges.
                <br />
                Whether you're facing a crisis or just need someone to talk to, we're here for you.
                <br />
                Let's take the first step together.
            </p>
            <button className="mt-4 px-15 py-3 bg-blue-500 text-white rounded-md font-bold text-md hover:bg-blue-600 transition duration-300">
                Get Started
            </button>
        </div>
    </>
  )
}
export default Introduction