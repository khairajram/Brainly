import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContentType } from "../components/Card";
import { BACKEND_URL } from "../confib";
import { getErrorMessage } from "../lib/errors";
import { YoutubeIcon } from "../icons/youtube";
import { TwitterIcon } from "../icons/twitter";
import { DocumentIcon } from "../icons/documentIcon";
import { ReactElement } from "react";

type ContentItem = {
  _id: string;
  title: string;
  link: string;
  type: "image" | "video" | "article" | "audio";
  tags?: { _id: string; title: string }[];
};

function iconFor(link: string): ReactElement {
  try {
    const host = new URL(link).hostname.replace(/^www\./, "");
    if (host === "x.com" || host === "twitter.com") return <TwitterIcon />;
    if (host.endsWith("youtube.com") || host === "youtu.be") return <YoutubeIcon />;
  } catch {
    // ignore
  }
  return <DocumentIcon />;
}

function cardTypeFor(link: string, type: ContentItem["type"]): CardContentType {
  try {
    const host = new URL(link).hostname.replace(/^www\./, "");
    if (host === "x.com" || host === "twitter.com") return "twitt";
  } catch {
    // ignore
  }
  return type;
}

export function SharedBrain() {
  const { hash } = useParams();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hash) return;
    (async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
        setItems(response.data.content ?? []);
        setUsername(response.data.username ?? null);
      } catch (e: unknown) {
        setError(getErrorMessage(e, "Failed to load shared brain"));
      } finally {
        setLoading(false);
      }
    })();
  }, [hash]);

  return (
    <div className="pt-20 px-4 min-h-screen bg-[#f9fbfc]">
      {loading && <div className="flex justify-center pt-10 text-gray-500">Loading...</div>}
      {error && <div className="flex justify-center pt-10 text-red-500">{error}</div>}
      {!loading && !error && (
        <>
          <div className="text-xl font-semibold pb-4">
            {username ? `${username}'s brain` : "Shared brain"}
          </div>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            {items.map((item) => (
              <Card
                key={item._id}
                title={item.title}
                link={item.link}
                contentTypes={cardTypeFor(item.link, item.type)}
                mainIcon={iconFor(item.link)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
