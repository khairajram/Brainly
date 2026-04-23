import { useRef, useState } from "react";
import axios from "axios";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { BACKEND_URL } from "../confib";
import { getErrorMessage } from "../lib/errors";

type ModelProps = {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

type ContentType = "image" | "video" | "article" | "audio";

const TYPES: ContentType[] = ["image", "video", "article", "audio"];

function guessType(link: string): ContentType {
  try {
    const url = new URL(link);
    const host = url.hostname.replace(/^www\./, "");
    if (host.endsWith("youtube.com") || host === "youtu.be") return "video";
    if (host === "x.com" || host === "twitter.com") return "article";
  } catch {
    // ignore
  }
  return "article";
}

export function CreateContentModel(props: ModelProps) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);
  const tagsRef = useRef<HTMLInputElement | null>(null);
  const [type, setType] = useState<ContentType>("article");
  const [loading, setLoading] = useState(false);

  if (!props.open) return null;

  const handleSubmit = async () => {
    const title = titleRef.current?.value?.trim() ?? "";
    const link = linkRef.current?.value?.trim() ?? "";
    const tagsRaw = tagsRef.current?.value?.trim() ?? "";

    if (!title) {
      titleRef.current?.focus();
      return;
    }
    if (!link) {
      linkRef.current?.focus();
      return;
    }

    const tags = tagsRaw
      .split(/[\s,]+/)
      .map((t) => t.replace(/^#/, "").trim())
      .filter((t) => t.length > 0);

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { title, link, type, tags },
        { headers: { Authorization: token ?? "" } }
      );
      props.onCreated?.();
      props.onClose();
    } catch (error: unknown) {
      alert(getErrorMessage(error, "Failed to create content"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/30 z-30">
      <div className="bg-white p-6 rounded-2xl shadow-lg relative min-w-[320px]">
        <div
          onClick={props.onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black ease-in-out transition-all duration-500 cursor-pointer"
        >
          <CrossIcon size="lg" />
        </div>
        <div className="pt-4">
          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-col justify-center gap-4 items-center">
              <input
                ref={(el) => {
                  titleRef.current = el;
                }}
                className="border-2 border-gray-400 p-2 rounded-xl w-64"
                type="text"
                placeholder="Title"
              />
              <input
                ref={(el) => {
                  linkRef.current = el;
                }}
                className="border-2 border-gray-400 p-2 rounded-xl w-64"
                type="url"
                placeholder="Link (https://...)"
                onBlur={(e) => {
                  const v = e.target.value.trim();
                  if (v) setType(guessType(v));
                }}
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ContentType)}
                className="border-2 border-gray-400 p-2 rounded-xl w-64"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input
                ref={(el) => {
                  tagsRef.current = el;
                }}
                className="border-2 border-gray-400 p-2 rounded-xl w-64"
                type="text"
                placeholder="tags (comma or space separated)"
              />
            </div>

            <div className="flex justify-center">
              <Button
                variant={"primary"}
                size={"sm"}
                text={"Add Content"}
                text2={"Adding..."}
                loading={loading}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
