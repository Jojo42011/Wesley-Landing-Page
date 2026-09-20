import { useState } from "react";
import { ArrowUpRight, ShieldCheck, House } from "lucide-react";
import { emptyAnswers, type Answers } from "./config";
import { Brand, Action } from "./components/Controls";
import Modal from "./components/Modal";
import Vsl from "./components/Vsl";
import Funnel from "./components/Funnel";

export default function App() {
  const [modal, setModal] = useState<"funnel" | "privacy" | "brokerage" | null>(
    null,
  );
  const [answers, setAnswers] = useState<Answers>({ ...emptyAnswers });
  return (
    <div className="landing" id="home">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header container">
        <Brand />
        <span className="header-location">SAN ANTONIO, TEXAS</span>
      </header>
      <main id="main" className="landing-main container">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">Let’s find out what you’re looking for.</h1>
            <p>
              A few simple questions. A clearer picture of your next home in San
              Antonio.
            </p>
            <Action onClick={() => setModal("funnel")}>Find my home</Action>
          </div>
          <Vsl />
        </section>
      </main>
      <footer className="footer container">
        <span>© {new Date().getFullYear()} Wesley Dulin</span>
        <div className="footer-links">
          <button onClick={() => setModal("privacy")}>Privacy</button>
          <button onClick={() => setModal("brokerage")}>
            Brokerage information
          </button>
          <a
            href="https://www.trec.texas.gov/forms/consumer-protection-notice"
            target="_blank"
            rel="noopener noreferrer"
          >
            TREC Consumer Protection Notice
          </a>
        </div>
        <span className="footer-note">
          Design preview · Equal housing opportunity
        </span>
      </footer>
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
    </div>
  );
}
