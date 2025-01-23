import { Twitter, Youtube, Linkedin, Link as LinkIcon, X } from "lucide-react";
import { INotes } from "../store/types/types";
import { dividerClasses, Icon } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface NoteCardProps {
  note: INotes;
  onEdit: () => void;
}

export enum iconOptions {
  twitter = "Twitter",
  youtube = "Youtube",
  linkedin = "Linkedin",
  link = "LinkIcon",
}

export const icon = {
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
  link: LinkIcon,
};

function generateEmbedLink(link: string): string | null {
  try {
    // Check if the link contains "youtu.be" or "youtube.com"
    const url = new URL(link);

    if (url.hostname === "youtu.be") {
      // For short URLs like "https://youtu.be/aE4G6UttnRg"
      return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    } else if (
      url.hostname === "www.youtube.com" ||
      url.hostname === "youtube.com"
    ) {
      // For full URLs like "https://www.youtube.com/watch?v=aE4G6UttnRg"
      const videoId = url.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    return null; // Return null if the link format is unsupported
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}

function generateTwitterEmbedLink(tweetUrl: string): string | null {
  try {
    // Parse the input URL
    const url = new URL(tweetUrl);

    // Check if the hostname is x.com and replace it with twitter.com
    if (url.hostname === "x.com") {
      url.hostname = "twitter.com";
    }

    // Check if it's a valid Twitter URL
    if (url.hostname === "twitter.com") {
      // Generate the embed link
      return `https://publish.twitter.com/oembed?url=${url.toString()}`;
    }

    return null; // Return null if it's not a valid Twitter or X link
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}

function NoteCard({ note, onEdit }: NoteCardProps) {
  const exp = (note.type as string) || "link";
  //@ts-ignore
  const Icon = icon[exp];
  return (
    <div className="card cursor-pointer" onClick={onEdit}>
      <div className="flex items-center space-x-2 mb-3">
        <Icon className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold">{note.title}</h3>
      </div>

      <div className="mb-4">
        <Link
          to={note.link as string}
          className="text-blue-600 hover:underline break-all"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {note.link}
        </Link>

        <div className=" mx-auto my-4">
          {note.type == iconOptions.youtube.toLowerCase() && (
            <iframe
              className="w-full rounded-lg "
              src={`${generateEmbedLink(note.link as string) || null}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {note.type == iconOptions.twitter.toLowerCase() && (
            <blockquote
              className="twitter-tweet"
              data-cards="hidden"
              data-conversation="none"
            >
              <a
                href={`${
                  generateTwitterEmbedLink(note.link as string) || null
                }`}
              ></a>
            </blockquote>
          )}
          {note.type == iconOptions.linkedin.toLowerCase() && (
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7287198308345724928"
              height="500"
              width="100%"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>

      <div className="prose prose-sm">
        <p className="text-gray-600 line-clamp-3">{note.text}</p>
      </div>
    </div>
  );
}

export default React.memo(NoteCard);
// export default NoteCard;
