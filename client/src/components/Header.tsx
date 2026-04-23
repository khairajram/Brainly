import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Button } from "./Button";
import { BACKEND_URL } from "../confib";
import { getErrorMessage } from "../lib/errors";

type HeaderProps = {
  logedIn: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  onLogout: () => void;
};

export function Header({ logedIn, setOpen, onLogout }: HeaderProps) {
  const navigate = useNavigate();

  const handleShare = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        { headers: { Authorization: token ?? "" } }
      );
      const shareUrl = `${window.location.origin}/brain/${response.data.hash}`;
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert(`Share link copied to clipboard:\n${shareUrl}`);
      } catch {
        prompt("Copy this share link:", shareUrl);
      }
    } catch (error: unknown) {
      alert(getErrorMessage(error, "Failed to share"));
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/signin");
  };

  return (
    <div className="bg-gray-100 top-0 left-0 fixed h-16 border-1 border-gray-500 w-screen flex items-center z-20">
      <div className="ml-6 font-extrabold text-blue-400 cursor-pointer text-2xl" onClick={() => navigate("/")}>
        mindNest
      </div>

      {logedIn && (
        <div className="flex justify-end gap-2 fixed top-0 right-0 p-2">
          <Button
            variant={"secondary"}
            size={"md"}
            text={"Share Brain"}
            startIcon={<ShareIcon size={"md"} />}
            onClick={handleShare}
          />
          <Button
            variant={"primary"}
            size={"md"}
            text={"Add Content"}
            startIcon={<PlusIcon size={"md"} />}
            onClick={() => setOpen(true)}
          />
          <Button variant={"secondary"} size={"md"} text={"Logout"} onClick={handleLogout} />
        </div>
      )}

      {!logedIn && (
        <div className="flex justify-end gap-2 fixed top-0 right-0 p-2">
          <Button
            variant={"secondary"}
            size={"md"}
            text={"Sign In"}
            onClick={() => navigate("/signin")}
          />
          <Button
            variant={"primary"}
            size={"md"}
            text={"Sign Up"}
            onClick={() => navigate("/signup")}
          />
        </div>
      )}
    </div>
  );
}
