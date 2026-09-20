import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Play,
  MapPin,
  Compass,
  KeyRound,
  Heart,
  ShieldCheck,
  Plus,
  Minus,
  House,
} from "lucide-react";
import { site, areas, emptyAnswers, type Answers } from "./config";
import { Brand, Action } from "./components/Controls";
import Modal from "./components/Modal";
import Introduction from "./components/Introduction";
import Funnel from "./components/Funnel";

const faqs = [
  [
    "Do I need to know exactly what I want?",
    "Not at all. You can start with a general area, a comfortable budget, or simply a feeling about what comes next. There is an option to keep exploring in the home brief.",
  ],
  [
    "What if I am moving from outside San Antonio?",
    "Start with what matters to your everyday life: your commute, the kind of home you enjoy, and the places you want to be close to. Your home brief gives that conversation a useful starting point.",
  ],
  [
    "Do I need to be preapproved first?",
    "You can explore your preferences before you have a preapproval. Understanding financing early can help you set a comfortable budget. Select your current stage in the home brief.",
  ],
  [
    "What happens after I complete the home brief?",
    "In this preview, you will see a summary of your preferences. Your information stays in this page session and is not sent. Direct follow up with Wesley will be available once the live experience is connected.",
  ],
];

export default function App() {
  const [modal, setModal] = useState<
    "intro" | "funnel" | "privacy" | "brokerage" | null
  >(null);
  const [answers, setAnswers] = useState<Answers>({ ...emptyAnswers });
  const [faq, setFaq] = useState<number | null>(0);
  function start(area?: string) {
    if (area) setAnswers((previous) => ({ ...previous, area }));
    setModal("funnel");
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="home" />
      <header className="site-header container">
        <Brand />
        <nav aria-label="Main navigation">
          <a href="#approach">The approach</a>
          <a href="#san-antonio">Life in San Antonio</a>
        </nav>
        <button className="header-cta" onClick={() => start()}>
          Let’s find your place <ArrowUpRight size={16} />
        </button>
      </header>
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="location-label">
              <span /> SAN ANTONIO, TEXAS & BEYOND
            </div>
            <h1 id="hero-title">
              A place for
              <br />
              your{" "}
              <em>
                next
                <br className="desktop-break" /> chapter.
              </em>
            </h1>
            <p>
              A home that fits your life.
              <br />A search that feels like you.
            </p>
            <p className="hero-description">
              Find your way home in San Antonio with a more personal approach
              from Wesley Dulin.
            </p>
            <Action onClick={() => start()}>Let’s find my home</Action>
            <div className="hero-reassurance">
              <span>
                <Check size={13} /> Your priorities first
              </span>
              <span>
                <Check size={13} /> No pressure
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-corner">
              <span className="tiny-star">✳</span>
              <span>
                GOOD THINGS
                <br />
                START AT HOME.
              </span>
            </div>
            <img
              className="hero-image"
              src="/images/living-room.jpg"
              fetchPriority="high"
              alt="Sunlight falling across a warm, thoughtfully furnished living room"
              width="1200"
              height="900"
            />
            <div className="hero-image-shade" />
            <div className="image-topline">
              <span>THE WESLEY APPROACH</span>
              <span>01 / 03</span>
            </div>
            <button
              className="play-button"
              onClick={() => setModal("intro")}
              aria-label={
                site.videoUrl && site.captionsUrl
                  ? "Watch Wesley’s introduction"
                  : "Explore the Wesley approach"
              }
            >
              <Play size={24} fill="currentColor" strokeWidth={1} />
            </button>
            <div className="image-bottomline">
              <div>
                <span className="eyebrow">A MORE PERSONAL WAY HOME</span>
                <h2>It starts with you.</h2>
              </div>
              <button onClick={() => setModal("intro")}>
                {site.videoUrl && site.captionsUrl
                  ? "Watch the introduction"
                  : "Explore the approach"}
                <ArrowUpRight size={17} />
              </button>
            </div>
            <div className="image-caption">
              <span>ROOM TO LIVE. SPACE TO BECOME.</span>
              <span>Architectural inspiration</span>
            </div>
          </div>
        </section>
        <div className="value-strip container">
          <div>
            <Compass />
            <span>A search shaped around you</span>
          </div>
          <span className="strip-dot">✦</span>
          <div>
            <MapPin />
            <span>San Antonio & the Hill Country</span>
          </div>
          <span className="strip-dot">✦</span>
          <div>
            <KeyRound />
            <span>Clarity at every step</span>
          </div>
        </div>
        <section className="approach-section container section" id="approach">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="eyebrow-line" /> THOUGHTFUL FROM THE START
              </span>
              <h2>
                Less searching.
                <br />
                <em>More finding your place.</em>
              </h2>
            </div>
            <p>
              You are choosing more than an address.
              <br />
              Let’s start with the life you want to live there.
            </p>
          </div>
          <div className="approach-grid">
            {[
              {
                n: "01",
                Icon: Heart,
                title: "Your life comes first.",
                text: "The space you need. The mornings you imagine. The little things that make a house feel like yours.",
              },
              {
                n: "02",
                Icon: Compass,
                title: "A clearer sense of direction.",
                text: "Bring your timing, budget, and favorite areas together in one simple home brief.",
              },
              {
                n: "03",
                Icon: KeyRound,
                title: "A next step that feels right.",
                text: "Start a more meaningful conversation, whether you are ready to move or just opening the door.",
              },
            ].map(({ n, Icon, title, text }) => (
              <article className="approach-card" key={n}>
                <div className="card-top">
                  <span>{n}</span>
                  <Icon size={25} strokeWidth={1.25} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="local-section" id="san-antonio">
          <div className="container local-grid">
            <div className="local-photo">
              <img
                loading="lazy"
                src="/images/home-exterior.jpg"
                alt="Contemporary home with an open lawn, shown as architectural inspiration"
                width="1800"
                height="1510"
              />
              <span className="photo-label">
                <House size={15} /> A LITTLE INSPIRATION FOR WHAT COMES NEXT
              </span>
            </div>
            <div className="local-copy">
              <span className="eyebrow">ROOTED IN POSSIBILITY</span>
              <h2>
                Big city energy.
                <br />
                Room to <em>exhale.</em>
              </h2>
              <p>
                From an established neighborhood to a little more space beyond
                the city, your version of home belongs here.
              </p>
              <p className="local-secondary">
                Start with a place you are curious about. We can take it from
                there.
              </p>
              <div className="area-chips" aria-label="Explore an area">
                {areas.slice(0, 5).map((area) => (
                  <button key={area} onClick={() => start(area)}>
                    {area}
                    <ArrowUpRight size={13} />
                  </button>
                ))}
              </div>
              <button
                className="text-button"
                onClick={() => start("Still exploring")}
              >
                Help me find my fit <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </section>
        <section className="personal-section container section">
          <div className="personal-mark" aria-hidden="true">
            W<span>.</span>
          </div>
          <div>
            <span className="eyebrow">A NOTE FROM WESLEY</span>
            <h2>
              Your next move deserves
              <br />
              <em>a personal conversation.</em>
            </h2>
            <p>
              There is a story behind every move. More room. A fresh start. A
              place closer to what matters. Let’s start with yours.
            </p>
            <div className="signature">Wesley Dulin</div>
            <span className="signature-caption">
              YOUR SAN ANTONIO HOME SEARCH STARTS HERE
            </span>
          </div>
          <Action onClick={() => start()}>Tell me what home looks like</Action>
        </section>
        <section className="faq-section container section">
          <div className="faq-intro">
            <span className="eyebrow">A LITTLE CLARITY</span>
            <h2>
              Good questions.
              <br />
              <em>Honest answers.</em>
            </h2>
            <p>
              You do not need to have it all figured out to take the first step.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <div
                className={`faq-item ${faq === index ? "open" : ""}`}
                key={question}
              >
                <h3>
                  <button
                    aria-expanded={faq === index}
                    aria-controls={`faq-${index}`}
                    onClick={() => setFaq(faq === index ? null : index)}
                  >
                    {question}
                    {faq === index ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                </h3>
                <div id={`faq-${index}`} hidden={faq !== index}>
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="final-section">
          <div className="container final-inner">
            <span className="eyebrow">THE NEXT CHAPTER IS YOURS</span>
            <h2>
              Let’s find where
              <br />
              <em>you belong.</em>
            </h2>
            <p>
              Tell me a little about your plans.
              <br />
              We’ll start with what matters to you.
            </p>
            <Action light onClick={() => start()}>
              Let’s find my home
            </Action>
            <span className="final-note">
              A few simple questions. A more thoughtful beginning.
            </span>
            <div className="arch arch-one" aria-hidden="true" />
            <div className="arch arch-two" aria-hidden="true" />
          </div>
        </section>
      </main>
      <footer className="container footer">
        <div className="footer-top">
          <Brand />
          <span>A more personal way home.</span>
          <a href="#home">
            Back to top <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Wesley Dulin. All rights reserved.
          </span>
          <div>
            <button onClick={() => setModal("privacy")}>Privacy</button>
            <button onClick={() => setModal("brokerage")}>
              Brokerage information
            </button>
            <a
              href="https://www.trec.texas.gov/forms/consumer-protection-notice"
              target="_blank"
              rel="noopener noreferrer"
            >
              TREC Consumer Protection Notice <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <p className="preview-footer">
          Design preview · Equal housing opportunity · Photography is
          architectural inspiration, not available listings.
        </p>
      </footer>
      <div className="mobile-bottom">
        <span>
          Your next chapter
          <br />
          <strong>starts with you.</strong>
        </span>
        <Action onClick={() => start()}>Find my home</Action>
      </div>
      {modal === "intro" && (
        <Introduction
          onClose={() => setModal(null)}
          onStart={() => setModal("funnel")}
        />
      )}
      {modal === "funnel" && (
        <Funnel
          onClose={() => setModal(null)}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {modal === "privacy" && (
        <Modal label="Privacy" onClose={() => setModal(null)}>
          <div className="policy-content">
            <ShieldCheck size={28} strokeWidth={1.4} />
            <span className="eyebrow">YOUR INFORMATION</span>
            <h2>A private preview.</h2>
            <p>
              This design preview does not send your answers or contact details
              to Wesley, an email service, or a CRM. Answers remain in this
              page’s memory and disappear when you refresh or close it.
            </p>
            <p>
              No advertising trackers or analytics have been added. The hosting
              provider may process basic request information to serve this site.
              External links follow the destination’s privacy practices.
            </p>
            <p>
              A complete privacy notice and contact preferences will be provided
              before live lead collection begins.
            </p>
          </div>
        </Modal>
      )}
      {modal === "brokerage" && (
        <Modal label="Brokerage information" onClose={() => setModal(null)}>
          <div className="policy-content">
            <House size={28} strokeWidth={1.4} />
            <span className="eyebrow">BROKERAGE INFORMATION</span>
            <h2>The details matter.</h2>
            <p>
              This is a design preview for Wesley Dulin. Brokerage details,
              verified license information, and the completed Information About
              Brokerage Services notice will be added before the site begins
              accepting inquiries.
            </p>
            <a
              className="text-button"
              href="https://www.trec.texas.gov/forms/consumer-protection-notice"
              target="_blank"
              rel="noopener noreferrer"
            >
              TREC Consumer Protection Notice <ArrowUpRight size={17} />
            </a>
          </div>
        </Modal>
      )}
    </>
  );
}
