import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../confib";
import { Button } from "../components/Button";
import { InputElement } from "../components/InputElement";
import { getErrorMessage } from "../lib/errors";

type SigninProps = {
  onAuth: (token: string) => void;
};

export function Signin({ onAuth }: SigninProps) {
  const inputRef = useRef<(HTMLInputElement | null)[]>(new Array(2).fill(null));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const focusInput = (index: number) => {
    inputRef.current[index]?.focus();
  };

  const handleSignIn = async () => {
    const username = inputRef.current[0]?.value?.trim() ?? "";
    const password = inputRef.current[1]?.value ?? "";

    if (!username) {
      focusInput(0);
      return;
    }
    if (!password) {
      focusInput(1);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });
      onAuth(response.data.token);
      navigate("/dashboard");
    } catch (error: unknown) {
      alert(getErrorMessage(error, "An error occurred."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center p-6 gap-2">
      <div className="text-center flex flex-col gap-5">
        <h1 className="text-3xl text-black font-medium mb-2">Sign In</h1>
        <InputElement
          refre={(el: HTMLInputElement | null) => {
            inputRef.current[0] = el;
          }}
          size="lg"
          placeholder="Username"
        />
        <InputElement
          refre={(el: HTMLInputElement | null) => {
            inputRef.current[1] = el;
          }}
          size="lg"
          placeholder="Password"
          type="password"
        />
        <Button
          text2={"Signing In..."}
          loading={loading}
          variant="primary"
          size="md"
          text="SIGN IN"
          onClick={handleSignIn}
        />
      </div>
    </section>
  );
}
