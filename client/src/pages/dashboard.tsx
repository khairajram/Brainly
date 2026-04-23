import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContentType } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { Sidebar } from "../components/Sidebar";
import { YoutubeIcon } from "../icons/youtube";
import { TwitterIcon } from "../icons/twitter";
import { DocumentIcon } from "../icons/documentIcon";
import { ReactElement } from "react";
import { BACKEND_URL } from "../confib";
import { getErrorMessage } from "../lib/errors";

type ContentItem = {
  _id: string;
  title: string;
  link: string;
  type: "image" | "video" | "article" | "audio";
  tags?: { _id: string; title: string }[];
};

export type DashboardProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

function iconFor(link: string, type: ContentItem["type"]): ReactElement {
  try {
    const host = new URL(link).hostname.replace(/^www\./, "");
    if (host === "x.com" || host === "twitter.com") return <TwitterIcon />;
    if (host.endsWith("youtube.com") || host === "youtu.be") return <YoutubeIcon />;
  } catch {
    // ignore
  }
  if (type === "video") return <YoutubeIcon />;
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

export function Dashboard({ open, setOpen }: DashboardProps) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: token },
      });
      setItems(response.data.content ?? []);
    } catch (e: unknown) {
      setError(getErrorMessage(e, "Failed to load content"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
        headers: { Authorization: token },
      });
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (e: unknown) {
      alert(getErrorMessage(e, "Failed to delete"));
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 pt-20 sm:ml-56 bg-[#f9fbfc] min-h-screen ease-in-out transition-all duration-700">
        <CreateContentModel
          open={open}
          onClose={() => setOpen(false)}
          onCreated={fetchContent}
        />

        {loading && <div className="flex justify-center pt-10 text-gray-500">Loading...</div>}
        {error && <div className="flex justify-center pt-10 text-red-500">{error}</div>}

        {!loading && !error && items.length === 0 && (
          <div className="flex flex-col justify-center items-center pt-10 gap-3 text-gray-500">
            <div>No content yet. Click "Add Content" to get started.</div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center sm:justify-start pt-4">
          {items.map((item) => (
            <Card
              key={item._id}
              title={item.title}
              link={item.link}
              contentTypes={cardTypeFor(item.link, item.type)}
              mainIcon={iconFor(item.link, item.type)}
              onDelete={() => handleDelete(item._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
