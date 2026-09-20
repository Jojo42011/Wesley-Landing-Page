import { useState } from "react";
import { Play } from "lucide-react";
import { site } from "../config";

export default function Vsl() {
  const [showNotice, setShowNotice] = useState(false);
  return (
    <div className="vsl-block">
      {site.videoUrl && site.captionsUrl ? (
        <video
          className="vsl-screen"
          controls
          playsInline
          preload="none"
          aria-label="Home buying video"
        >
          <source src={site.videoUrl} />
          <track
            kind="captions"
            src={site.captionsUrl}
            srcLang="en"
            label="English"
            default
          />
        </video>
      ) : (
        <button
          className="vsl-screen vsl-placeholder"
          aria-label="VSL preview"
          onClick={() => setShowNotice(true)}
        >
          <span className="vsl-play">
            <Play size={23} fill="currentColor" strokeWidth={1} />
          </span>
          <span className="vsl-notice" role="status">
            {showNotice ? "Your VSL will appear here." : ""}
          </span>
        </button>
      )}
      <span className="vsl-caption">
        {site.videoUrl && site.captionsUrl
          ? "A LITTLE CLARITY BEFORE YOUR NEXT MOVE"
          : "VSL PREVIEW"}
      </span>
    </div>
  );
}
