import { ReactElement, useEffect, useRef } from "react";
import { Button } from "./Button";
import { DeleteIcon } from "../icons/deleteIcon";

export type CardContentType = "image" | "video" | "article" | "audio" | "twitt";

export interface CardProps {
  mainIcon?: ReactElement;
  title: string;
  contentTypes?: CardContentType;
  link: string;
  onDelete?: () => void;
}

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: (el?: HTMLElement) => void;
      };
    };
  }
}

function youtubeEmbedUrl(link: string): string {
  try {
    const url = new URL(link);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    }
    if (host.endsWith("youtube.com")) {
      const v = url.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
      if (url.pathname.startsWith("/embed/")) return link;
    }
  } catch {
    // fall through
  }
  return link;
}

export function Card(props: CardProps) {
  const tweetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.contentTypes === "twitt" && window.twttr?.widgets && tweetRef.current) {
      window.twttr.widgets.load(tweetRef.current);
    }
  }, [props.contentTypes, props.link]);

  return (
    <div className="bg-white rounded-md border-[#e6ebe9] border max-w-72 p-2 gap-2">
      <div>
        <div className="flex justify-between gap-4 m-2">
          <div className="flex items-center text-sm">
            {props.mainIcon && (
              <div className="text-gray-500 pr-1 items-center">{props.mainIcon}</div>
            )}
            <div>{props.title}</div>
          </div>
          <div className="flex items-center gap-1">
            <a
              href={props.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 underline"
            >
              open
            </a>
            {props.onDelete && (
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={props.onDelete}
                startIcon={<DeleteIcon />}
              />
            )}
          </div>
        </div>

        <div className="m-3" ref={tweetRef}>
          {props.contentTypes === "video" && (
            <iframe
              className="w-full h-40 shadow-sm ring-1 ring-gray-300 shadow-gray-200"
              src={youtubeEmbedUrl(props.link)}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}

          {props.contentTypes === "twitt" && (
            <blockquote className="twitter-tweet">
              <a href={props.link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}

          {props.contentTypes === "image" && (
            <img src={props.link} alt={props.title} className="w-full h-40 object-cover" />
          )}

          {props.contentTypes === "audio" && (
            <audio controls src={props.link} className="w-full" />
          )}

          {props.contentTypes === "article" && (
            <a
              href={props.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 break-all"
            >
              {props.link}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
