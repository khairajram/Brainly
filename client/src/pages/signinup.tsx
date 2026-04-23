import { useState } from "react";
import { Button } from "../components/Button";
import { Signin } from "./Signin";
import { Signup } from "./Signup";
import { useNavigate } from "react-router-dom";

type SignPageProps = {
  initialMode: "signin" | "signup";
  onAuth: (token: string) => void;
};

export function SignPage({ initialMode, onAuth }: SignPageProps) {
  const [isSignUp, setIsSignUp] = useState(initialMode === "signup");
  const navigate = useNavigate();

  const togglePanel = () => {
    setIsSignUp((prev) => {
      const next = !prev;
      navigate(next ? "/signup" : "/signin");
      return next;
    });
  };

  return (
    <div className="mt-16 bg-gray-200 h-screen w-screen fixed flex justify-center">
      <div className="hidden sm:flex w-screen">
        <div
          className={`w-1/2 gap-4 transition-transform duration-500 ease-in-out ${
            isSignUp ? "translate-x-0" : "translate-x-full"
          } flex justify-center items-center `}
        >
          {isSignUp ? <Signup onAuth={onAuth} /> : <Signin onAuth={onAuth} />}
        </div>
        <div
          className={`w-1/2 transition-transform duration-500 ease-in-out ${
            isSignUp ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Welcome
            isSignUp={isSignUp}
            button={isSignUp ? "SIGN IN" : "SIGN UP"}
            onToggle={togglePanel}
            mainheading={isSignUp ? "Welcome Back!" : "Hello, Friend!"}
            message={
              isSignUp
                ? "Enter your personal details to use all site features"
                : "Register with your personal details to use all of the site features"
            }
          />
        </div>
      </div>

      <div className="sm:hidden flex flex-col justify-center items-center w-full">
        <div>{isSignUp ? <Signup onAuth={onAuth} /> : <Signin onAuth={onAuth} />}</div>
        <div className="flex gap-2">
          <div>{isSignUp ? "Already have an account ?" : "New user ? "}</div>
          <div onClick={togglePanel} className="text-blue-500 cursor-pointer">
            {isSignUp ? "Log in" : " Register Now"}
          </div>
        </div>
      </div>
    </div>
  );
}

type WelcomeProps = {
  onToggle: () => void;
  isSignUp: boolean;
  mainheading: string;
  message: string;
  button: string;
};

function Welcome(props: WelcomeProps) {
  return (
    <section
      className={`bg-blue-800 h-screen flex justify-center items-center p-6 ${
        props.button === "SIGN UP" ? "rounded-r-[120px]" : "rounded-l-[120px]"
      }`}
    >
      <div className="text-center flex flex-col">
        <h1 className="text-3xl text-white font-medium mb-2">{props.mainheading}</h1>
        <p className="text-white">{props.message}</p>
        <div className=" flex justify-center pt-4">
          <Button variant="primary" size="md" text={props.button} onClick={props.onToggle} />
        </div>
      </div>
    </section>
  );
}
