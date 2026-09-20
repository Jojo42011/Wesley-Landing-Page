import { useState } from "react";
import { site } from "../config";
import { Action } from "./Controls";
import Modal from "./Modal";
const chapters = [
  {
    eyebrow: "FIRST, THE LIFE YOU WANT",
    title: "Start with what feels like you.",
    copy: "More space for slow mornings. A shorter drive. A place to make your own. The best home search starts with your everyday life.",
    image: "/images/living-room.jpg",
  },
  {
    eyebrow: "THEN, A LITTLE DIRECTION",
    title: "Make room for possibilities.",
    copy: "Share the areas, budget, and timing you have in mind. Still working those out? That is a perfectly good place to begin.",
    image: "/images/home-exterior.jpg",
  },
  {
    eyebrow: "FINALLY, YOUR NEXT CHAPTER",
    title: "Move forward with clarity.",
    copy: "Turn your preferences into a starting point for a conversation with Wesley. A thoughtful search, at a pace that feels right to you.",
    image: "/images/living-room.jpg",
  },
];

export default function Introduction({
  onClose,
  onStart,
}: {
  onClose: () => void;
  onStart: () => void;
}) {
  const [chapter, setChapter] = useState(0);
  return (
    <Modal onClose={onClose} label="The Wesley approach" wide>
      {site.videoUrl && site.captionsUrl ? (
        <div className="video-container">
          <h2>A personal introduction</h2>
          <video controls autoPlay playsInline poster="/images/living-room.jpg">
            <source src={site.videoUrl} />
            <track
              kind="captions"
              src={site.captionsUrl}
              srcLang="en"
              label="English"
              default
            />
          </video>
          <Action onClick={onStart}>Find my home</Action>
        </div>
      ) : (
        <div className="intro-layout">
          <img
            src={chapters[chapter].image}
            alt="Architectural inspiration for your next home"
          />
          <div className="intro-copy" aria-live="polite">
            <span className="eyebrow">{chapters[chapter].eyebrow}</span>
            <h2>{chapters[chapter].title}</h2>
            <p>{chapters[chapter].copy}</p>
            <div
              className="chapter-progress"
              aria-label={`Chapter ${chapter + 1} of 3`}
            >
              {chapters.map((_, index) => (
                <button
                  key={index}
                  className={index === chapter ? "active" : ""}
                  aria-label={`Read chapter ${index + 1}`}
                  aria-current={index === chapter ? "step" : undefined}
                  onClick={() => setChapter(index)}
                />
              ))}
            </div>
            {chapter < 2 ? (
              <Action onClick={() => setChapter(chapter + 1)}>
                Keep exploring
              </Action>
            ) : (
              <Action onClick={onStart}>Find my home</Action>
            )}
            <span className="intro-caption">
              A more personal way to find home.
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
}
