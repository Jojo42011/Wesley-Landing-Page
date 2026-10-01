import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import {
  budgets,
  financing,
  intents,
  representation,
  site,
  timelines,
  type Answers,
} from "../config";
import Modal from "./Modal";

type ChoiceKey =
  "intent" | "budget" | "financing" | "representation" | "timeline";
type OtherKey =
  | "intentOther"
  | "budgetOther"
  | "financingOther"
  | "representationOther"
  | "timelineOther";

const steps = [
  {
    eyebrow: "YOUR PLANS",
    title: "What brings you here?",
    description: "Start with what is on your mind today.",
  },
  {
    eyebrow: "YOUR LOCATION",
    title: "Where are you looking?",
    description:
      "A city, neighborhood, school, or ISD is a good starting point.",
  },
  {
    eyebrow: "YOUR COMFORT ZONE",
    title: "What budget feels right?",
    description: "Choose a range that feels comfortable for you.",
  },
  {
    eyebrow: "YOUR STARTING POINT",
    title: "Where are you with financing?",
    description:
      "Whatever stage you are in, Wesley can understand the next step.",
  },
  {
    eyebrow: "YOUR REPRESENTATION",
    title: "Are you working with an agent?",
    description: "This helps Wesley respect any relationship you already have.",
  },
  {
    eyebrow: "YOUR TIMING",
    title: "When are you hoping to move?",
    description: "Your timing can be definite or still taking shape.",
  },
  {
    eyebrow: "YOUR DETAILS",
    title: "How can Wesley reach you?",
    description: "Add your details to finish your home brief.",
  },
];

function display(value: string, other: string) {
  return value === "Other" ? other.trim() : value;
}

function Choices({
  name,
  options,
  value,
  otherValue,
  onChoose,
  onOther,
}: {
  name: ChoiceKey;
  options: string[];
  value: string;
  otherValue: string;
  onChoose: (value: string) => void;
  onOther: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Choose one answer</legend>
      <div className="choices">
        {options.map((option) => (
          <label
            className={`choice ${value === option ? "selected" : ""}`}
            key={option}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChoose(option)}
            />
            <span>{option}</span>
            <span className="choice-check" aria-hidden="true">
              {value === option && <Check size={16} />}
            </span>
          </label>
        ))}
      </div>
      {value === "Other" && (
        <label className="location-field other-field">
          Tell us more <span>(required)</span>
          <textarea
            name={`${name}Other`}
            value={otherValue}
            onChange={(event) => onOther(event.target.value)}
            placeholder="Tell Wesley what fits your situation"
            maxLength={160}
            rows={3}
            required
          />
        </label>
      )}
    </fieldset>
  );
}

export default function Funnel({
  onClose,
  answers,
  setAnswers,
}: {
  onClose: () => void;
  answers: Answers;
  setAnswers: Dispatch<SetStateAction<Answers>>;
}) {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((previous) => ({ ...previous, [key]: value }));

  useEffect(() => {
    heading.current?.focus();
  }, [step, complete]);

  const valid = [
    Boolean(
      answers.intent &&
      (answers.intent !== "Other" || answers.intentOther.trim()),
    ),
    Boolean(answers.area.trim()),
    Boolean(
      answers.budget &&
      (answers.budget !== "Other" || answers.budgetOther.trim()),
    ),
    Boolean(
      answers.financing &&
      (answers.financing !== "Other" || answers.financingOther.trim()),
    ),
    Boolean(
      answers.representation &&
      (answers.representation !== "Other" ||
        answers.representationOther.trim()),
    ),
    Boolean(
      answers.timeline &&
      (answers.timeline !== "Other" || answers.timelineOther.trim()),
    ),
    Boolean(
      answers.name.trim() &&
      answers.email.trim() &&
      answers.phone.replace(/\D/g, "").length >= 10 &&
      answers.phone.replace(/\D/g, "").length <= 15 &&
      answers.contactConsent,
    ),
  ][step];

  function choose(key: ChoiceKey, value: string) {
    set(key, value);
    if (value !== "Other") setStep((current) => current + 1);
  }

  function choiceStep(key: ChoiceKey, otherKey: OtherKey, options: string[]) {
    return (
      <Choices
        name={key}
        options={options}
        value={answers[key]}
        otherValue={answers[otherKey]}
        onChoose={(value) => choose(key, value)}
        onOther={(value) => set(otherKey, value)}
      />
    );
  }

  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!valid) return;
    if (step === steps.length - 1) setComplete(true);
    else setStep(step + 1);
  }

  const locationTitle =
    answers.intent === intents[1]
      ? "Where is the property?"
      : answers.intent === intents[2]
        ? "Where are you buying or selling?"
        : steps[1].title;
  const budgetTitle =
    answers.intent === intents[1]
      ? "What price range are you considering?"
      : steps[2].title;
  const financingDescription =
    answers.intent === intents[1]
      ? "If you are only selling, choose Not applicable yet."
      : steps[3].description;

  return (
    <Modal label="Your home brief" onClose={onClose} wide>
      <div className="funnel-layout">
        <aside className="funnel-aside">
          <span className="monogram">
            W<span>.</span>
          </span>
          <div>
            <span className="eyebrow">LOCAL KNOWLEDGE, PERSONAL PLAN</span>
            <h2>
              Good moves start with <em>a conversation.</em>
            </h2>
            <p>
              Tell Wesley what matters to you. He serves Boerne, San Antonio,
              and the Hill Country.
            </p>
          </div>
          <span className="aside-bottom">
            <MapPin size={16} /> Boerne · San Antonio · Hill Country
          </span>
        </aside>
        <div className="funnel-main">
          {complete ? (
            <div className="completion">
              <span className="success-icon">
                <Check />
              </span>
              <span className="eyebrow">YOUR HOME BRIEF</span>
              <h2 ref={heading} tabIndex={-1}>
                A clearer place to start.
              </h2>
              <p>
                Here is what you shared, {answers.name.trim().split(" ")[0]}.
              </p>
              <dl className="brief">
                <div>
                  <dt>Plans</dt>
                  <dd>{display(answers.intent, answers.intentOther)}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{answers.area.trim()}</dd>
                </div>
                <div>
                  <dt>Budget</dt>
                  <dd>{display(answers.budget, answers.budgetOther)}</dd>
                </div>
                <div>
                  <dt>Financing</dt>
                  <dd>{display(answers.financing, answers.financingOther)}</dd>
                </div>
                <div>
                  <dt>Agent</dt>
                  <dd>
                    {display(
                      answers.representation,
                      answers.representationOther,
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Timing</dt>
                  <dd>{display(answers.timeline, answers.timelineOther)}</dd>
                </div>
              </dl>
              {answers.representation === representation[1] && (
                <p className="small-note">
                  Already represented? Continue working with your agent. This
                  brief can help clarify your preferences together.
                </p>
              )}
              <div className="preview-note">
                <ShieldCheck size={20} />
                <p>
                  <strong>This is a design preview.</strong> Your information
                  has not been sent or saved. Lead delivery and calendar booking
                  will be connected before launch.
                </p>
              </div>
              {site.calendarUrl && (
                <a
                  className="button completion-calendar"
                  href={site.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a time with Wesley <ArrowUpRight size={18} />
                </a>
              )}
              <button
                className="button"
                onClick={() => {
                  setComplete(false);
                  setStep(steps.length - 1);
                }}
              >
                <ArrowLeft size={17} /> Review my details
              </button>
              <button className="text-button" onClick={onClose}>
                Back to the page <ArrowUpRight size={16} />
              </button>
            </div>
          ) : (
            <>
              <div className="step-top">
                <span>YOUR HOME BRIEF</span>
                <span>
                  {String(step + 1).padStart(2, "0")}{" "}
                  <span className="muted">
                    / {String(steps.length).padStart(2, "0")}
                  </span>
                </span>
              </div>
              <div
                className="progress-track"
                aria-label={`Step ${step + 1} of ${steps.length}`}
              >
                {steps.map((item, index) => (
                  <span
                    key={item.eyebrow}
                    className={index <= step ? "filled" : ""}
                  />
                ))}
              </div>
              <form onSubmit={next}>
                <span className="eyebrow">{steps[step].eyebrow}</span>
                <h2 ref={heading} tabIndex={-1}>
                  {step === 1
                    ? locationTitle
                    : step === 2
                      ? budgetTitle
                      : steps[step].title}
                </h2>
                <p className="step-description">
                  {step === 3 ? financingDescription : steps[step].description}
                </p>
                {step === 0 && choiceStep("intent", "intentOther", intents)}
                {step === 1 && (
                  <label className="location-field">
                    City, area, school, or ISD <span>(required)</span>
                    <textarea
                      name="area"
                      value={answers.area}
                      onChange={(event) => set("area", event.target.value)}
                      placeholder="Tell us where you have in mind"
                      maxLength={160}
                      rows={4}
                      required
                    />
                  </label>
                )}
                {step === 2 && choiceStep("budget", "budgetOther", budgets)}
                {step === 3 &&
                  choiceStep("financing", "financingOther", financing)}
                {step === 4 &&
                  choiceStep(
                    "representation",
                    "representationOther",
                    representation,
                  )}
                {step === 5 &&
                  choiceStep("timeline", "timelineOther", timelines)}
                {step === 6 && (
                  <div className="contact-fields">
                    <label>
                      Full name <span>(required)</span>
                      <input
                        name="name"
                        autoComplete="name"
                        value={answers.name}
                        onChange={(event) => set("name", event.target.value)}
                        required
                        maxLength={100}
                        pattern=".*\S.*"
                        placeholder="Your name"
                      />
                    </label>
                    <label>
                      Email address <span>(required)</span>
                      <input
                        name="email"
                        autoComplete="email"
                        type="email"
                        value={answers.email}
                        onChange={(event) => set("email", event.target.value)}
                        required
                        maxLength={254}
                        placeholder="you@example.com"
                      />
                    </label>
                    <div className="field-pair">
                      <label>
                        Phone <span>(required)</span>
                        <input
                          name="phone"
                          autoComplete="tel"
                          type="tel"
                          value={answers.phone}
                          onChange={(event) => set("phone", event.target.value)}
                          required
                          maxLength={24}
                          pattern="[+\(\)0-9 .\-]{7,24}"
                          placeholder="Your phone number"
                        />
                      </label>
                      <label>
                        Best time to call <span>(optional)</span>
                        <select
                          name="time"
                          value={answers.time}
                          onChange={(event) => set("time", event.target.value)}
                        >
                          <option value="">Choose a time</option>
                          <option>Morning</option>
                          <option>Afternoon</option>
                          <option>Evening</option>
                          <option>Anytime</option>
                        </select>
                      </label>
                    </div>
                    <label className="contact-consent">
                      <input
                        type="checkbox"
                        checked={answers.contactConsent}
                        onChange={(event) =>
                          set("contactConsent", event.target.checked)
                        }
                        required
                      />
                      <span>
                        I agree that Wesley Dulin and The Branch Real Estate
                        Group Inc. may call or text me about my inquiry. Message
                        and data rates may apply.
                      </span>
                    </label>
                  </div>
                )}
                <div className="form-navigation">
                  {step > 0 ? (
                    <button
                      className="back-button"
                      type="button"
                      onClick={() => setStep(step - 1)}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : (
                    <span className="privacy-micro">
                      <ShieldCheck size={16} /> Your pace. Your choice.
                    </span>
                  )}
                  <button className="button" type="submit" disabled={!valid}>
                    {step === steps.length - 1
                      ? "Preview my home brief"
                      : "Continue"}
                    <ArrowRight size={17} />
                  </button>
                </div>
                <p className="form-footnote">
                  {step === steps.length - 1
                    ? "Preview only. Nothing is submitted or stored."
                    : "No obligation. Just a thoughtful place to start."}
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
