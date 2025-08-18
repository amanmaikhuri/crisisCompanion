import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { doSignInWithGoogle } from "../firebase/auth"; // Ensure this function is defined in your firebase setup

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (data) => {
    setAuthError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("User signed in:", userCredential.user);
      navigate("/"); // redirect after login
    } catch (error) {
      console.error("Error signing in:", error);
      setAuthError(error.message);
    }
  };

   // Handle login using Google
const handleGoogleSignIn = async () => {
  try {
    //const userCredential = 
    await doSignInWithGoogle(); 
    // signInWithGoogle should return user info from Firebase

    // const user = userCredential.user;
    // console.log("Google sign-in successful:", user);
    navigate("/");  
  } catch (error) {
    console.error("Google sign-in failed:", error);
    setAuthError(error.message); // show error in UI instead of console.log
  }
};


  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-4xl mb-8">Sign In</h1>

      <form
        className="flex flex-col gap-4 w-80"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email address",
            },
          })}
          className="border rounded-md py-2 px-4 text-lg"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="border rounded-md py-2 px-4 text-lg"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {authError && (
          <p className="text-red-600 text-sm text-center">{authError}</p>
        )}

        <Link to="/reset-password" className="text-sm text-blue-600">
          Forgot password?
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="font-bold py-3 px-6 border rounded-md text-white bg-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <button
        className="mt-4 font-bold py-3 px-6 border rounded-md bg-red-500 text-white disabled:opacity-50"
        onClick={() => {
          handleGoogleSignIn();
          console.log("Google Sign In button clicked");
        }}
      >
        Sign In with Google
      </button>

      <div className="mt-8 flex flex-col items-center">
        <p className="text-lg">New to Crisis Companion?</p>
        <Link
          to="/sign-up"
          className="font-bold text-xl py-1 px-6 text-blue-600"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
