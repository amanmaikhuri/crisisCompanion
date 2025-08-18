import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form"
import { auth } from "../firebase/firebase"; // Adjust the import path as necessary

const SignUp = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const name = watch("name");
  errors.name && console.log(errors.name.message);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, FormData.email, FormData.password)
        .then((userCredential) => {
          // Signed in 
          const user1 = auth.currentUser;
          const userName = name;
          console.log("User signed up:", user1, userName);
          const user = userCredential.user;
          console.log("User signed up:", user);
          // You can also save the user's name to your database here
        })
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error.message);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <h1 className="font-bold text-4xl mt-18">Sign Up</h1>

      <form
      onSubmit={() => {handleSubmit(handleSignUp)}}
        className="md:w-[30%] px-9 flex flex-col gap-4 mt-13"
      >
        <input
          type="text"
          name="name"
          {...register("name", { required: true })}
          className="border-b py-2 pr-4 pl-2 text-lg focus:outline-0"
          placeholder="Full Name"
          required
        />

        <input
          type="email"
          name="email"
          {...register("email", { required: true })}
          className="border-b py-2 pr-4 pl-2 text-lg focus:outline-0"
          placeholder="Email"
          required
        />

        <input
          type="password"
          name="password"
          {...register("password", { required: true })}
          className="border-b py-2 pr-4 pl-2 text-lg focus:outline-0"
          placeholder="Password"
          required
        />

        <input
          value="Sign Up"
          type="submit"
          className="font-bold py-3 px-6 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition"
        />
      </form>

      <div className="mt-11 flex flex-col items-center">
        <p className="font-sans text-lg">Already have an account?</p>
        <Link
          to="/sign-in"
          className="font-sans font-bold text-xl py-1 px-6 text-blue-500"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
