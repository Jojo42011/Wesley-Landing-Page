import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ShieldCheck, House } from "lucide-react";
import { emptyAnswers, site, type Answers } from "./config";
import { Action } from "./components/Controls";
import Modal from "./components/Modal";
import Vsl from "./components/Vsl";
import Funnel from "./components/Funnel";
import CalendarBooking from "./components/CalendarBooking";

const sales = [
  {
    address: "600 Leland",
    city: "Kerrville",
    role: "Seller",
    date: "August 2026",
  },
  {
    address: "7604 Forest Moon",
    city: "Live Oak",
    role: "Buyer",
    date: "July 2026",
  },
  {
    address: "3911 Valencia Peak",
    city: "San Antonio",
    role: "Seller",
    date: "July 2026",
  },
  {
    address: "320 Frontier Ln",
    city: "Bandera",
    role: "Seller",
    date: "January 2026",
  },
  {
    address: "207 Cherokee",
    city: "Lakehills",
    role: "Seller",
    date: "December 2025",
  },
];

export default function App() {
  const [modal, setModal] = useState<
    "funnel" | "calendar" | "sales" | "privacy" | "brokerage" | null
  >(null);
  const [answers, setAnswers] = useState<Answers>({ ...emptyAnswers });
  const heroActionRef = useRef<HTMLDivElement>(null);
  const [showMobileAction, setShowMobileAction] = useState(true);

  useEffect(() => {
    const node = heroActionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setShowMobileAction(!entry.isIntersecting);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="landing" id="home">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header container">
        <a
          className="site-brand"
          href="#home"
          aria-label="Dulin Real Estate home"
        >
          <span className="site-brand-mark" aria-hidden="true">
            DRE
          </span>
          <span className="site-brand-subtitle">Dulin Real Estate</span>
        </a>
      </header>
      <main id="main" className="landing-main container">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">
              Buying or selling in Texas?
              <span>Start here.</span>
            </h1>
          </div>
          <Vsl />
          <div className="hero-action-wrap" ref={heroActionRef}>
            <Action onClick={() => setModal("funnel")} className="hero-action">
              Get started
            </Action>
          </div>
          <button
            className="hero-proof"
            type="button"
            onClick={() => setModal("sales")}
          >
            <span className="proof-mark" aria-hidden="true">
              05
            </span>
            <span>
              <strong>See Wesley’s recent sales</strong>
              <small>View recent transactions here</small>
            </span>
            <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </section>
      </main>
      {modal === null && showMobileAction && (
        <div className="mobile-action">
          <Action onClick={() => setModal("funnel")}>Get started</Action>
        </div>
      )}
      <footer className="footer container">
        <span className="footer-identity">
          © {new Date().getFullYear()} Wesley Dulin
          <span>Brokerage: {site.brokerage}</span>
        </span>
        <div className="footer-links">
          <button onClick={() => setModal("privacy")}>Privacy</button>
          {site.iabsUrl ? (
            <a href={site.iabsUrl} target="_blank" rel="noopener noreferrer">
              TREC Information About Brokerage Services
            </a>
          ) : (
            <button onClick={() => setModal("brokerage")}>
              Brokerage information
            </button>
          )}
          {site.socialLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
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
          onFinished={() => setModal("calendar")}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {modal === "calendar" && (
        <CalendarBooking onClose={() => setModal(null)} />
      )}
      {modal === "sales" && (
        <Modal label="Wesley’s recent sales" onClose={() => setModal(null)}>
          <div className="sales-content">
            <span className="eyebrow">RECENT TRANSACTIONS</span>
            <h2>Experience you can see.</h2>
            <p>
              A selection of Wesley’s buyer and seller transactions listed on
              HAR. Details were checked in September 2026.
            </p>
            <ul className="sales-list">
              {sales.map((sale) => (
                <li key={sale.address}>
                  <div>
                    <strong>{sale.address}</strong>
                    <span>{sale.city}, Texas</span>
                  </div>
                  <div className="sale-meta">
                    <span>Represented {sale.role.toLowerCase()}</span>
                    <span>{sale.date}</span>
                  </div>
                </li>
              ))}
            </ul>
            <a
              className="text-button"
              href="https://www.har.com/realestatepro/sold-by-agent/sa-836365"
              target="_blank"
              rel="noopener noreferrer"
            >
              Verify these sales on HAR <ArrowUpRight size={17} />
            </a>
          </div>
        </Modal>
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
              If you choose to book a call, Calendly processes the details you
              enter there under its own privacy practices. External links follow
              the destination’s privacy practices.
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
              Wesley Dulin is affiliated with The Branch Real Estate Group Inc.
              Verified license information and the completed Information About
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
