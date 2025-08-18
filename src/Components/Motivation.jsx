import image from '../assets/motivation.jpg'

const Motivation = () => {
  return (
    <div className="w-full h-screen px-4 py-4 mt-7 relative">
        <img src={image} alt="motivation image" 
        className="h-[95%] w-full rounded-md relative object-cover lg:max-w-[800px] lg:mx-auto border-2" />
        <p className='absolute top-[9%] left-[2%] md:left-[20%] lg:left-[30%] lg:top-[5%] text-xl px-2 font-bold text-center'>
            "The best way out is always through" <br className='lg:hidden'/>- Robert Frost
        </p>
        <button type="button"
        className='py-4 px-15 border rounded-md absolute bottom-[10%] left-[18%] md:left-[35%] lg:left-[42%] bg-blue-500 text-white font-bold text-lg' 
        >
            Get Started
        </button>
    </div>
  )
}
export default Motivation