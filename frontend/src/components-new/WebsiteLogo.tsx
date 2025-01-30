import { useState } from "react";

export default function WebsiteLogo({url}:{url: string}) {
  const [error, setError] = useState(false);
  const getWebsiteLogo = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      console.log(hostname);
      return `https://logo.clearbit.com/${hostname}`;
    } catch {
      return "https://cdn-icons-png.flaticon.com/512/4906/4906292.png"; // Fallback image
    }
  };
  return (
    <>
      <img
        src={error ? "https://cdn-icons-png.flaticon.com/512/4906/4906292.png" : getWebsiteLogo(url)}
        alt="Website Logo"
        className="w-8 h-8 rounded-full hover:shadow-md"
        onError={() => setError(true)}
      />
    </>
  );
}
