import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Check,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import {
  areas,
  timelines,
  budgets,
  financing,
  representation,
  type Answers,
} from "../config";
import Modal from "./Modal";
function Choices({
  options,
  value,
  onChange,
  name,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}) {
  return (
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
            onChange={() => onChange(option)}
            required
          />
          <span>{option}</span>
          <span className="choice-check" aria-hidden="true">
            {value === option && <Check size={13} />}
          </span>
        </label>
      ))}
    </div>
  );
}

const stepCopy = [
  [
    "YOUR TIMING",
    "When does your next chapter begin?",
    "A clear plan starts with your pace. Exploring is welcome, too.",
  ],
  [
    "YOUR NEIGHBORHOOD",
    "Where do you feel drawn to?",
    "Choose a starting point. There is plenty of room to explore.",
  ],
  [
    "YOUR COMFORT ZONE",
    "What budget feels right?",
    "Think about a range that feels comfortable for you.",
  ],
  [
    "YOUR STARTING POINT",
    "Where are you in the process?",
    "A little context helps make the next conversation more useful.",
  ],
  [
    "YOUR NEXT STEP",
    "Let’s make it personal.",
    "Add your details to see how your home brief comes together.",
  ],
];

export default function Funnel({
  onClose,
  answers,
  setAnswers,
}: {
  onClose: () => void;
  answers: Answers;
  setAnswers: (answers: Answers) => void;
}) {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers({ ...answers, [key]: value });
  useEffect(() => {
    heading.current?.focus();
  }, [step, complete]);
  const valid = [
    Boolean(answers.timeline),
    Boolean(answers.area),
    Boolean(answers.budget),
    Boolean(answers.financing && answers.representation),
    true,
  ][step];
  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!valid) return;
    if (step === 4) setComplete(true);
    else setStep(step + 1);
  }
  return (
    <Modal label="Your home brief" onClose={onClose} wide>
      <div className="funnel-layout">
        <aside className="funnel-aside">
          <span className="monogram">
            W<span>.</span>
          </span>
          <div>
            <span className="eyebrow">HOME IS MORE THAN A PLACE</span>
            <h2>
              It’s where your
              <br />
              <em>life unfolds.</em>
            </h2>
            <p>Let’s find a starting point that feels like you.</p>
          </div>
          <span className="aside-bottom">
            <MapPin size={14} /> San Antonio & the surrounding Hill Country
          </span>
        </aside>
        <div className="funnel-main">
          {complete ? (
            <div className="completion">
              <span className="success-icon">
                <Check />
              </span>
              <span className="eyebrow">A LITTLE MORE CLARITY</span>
              <h2 ref={heading} tabIndex={-1}>
                Your next chapter,
                <br />
                <em>taking shape.</em>
              </h2>
              <p>
                Here is your home brief, {answers.name.trim().split(" ")[0]}.
              </p>
              <dl className="brief">
                <div>
                  <dt>Where</dt>
                  <dd>{answers.area}</dd>
                </div>
                <div>
                  <dt>When</dt>
                  <dd>{answers.timeline}</dd>
                </div>
                <div>
                  <dt>Budget</dt>
                  <dd>{answers.budget}</dd>
                </div>
                <div>
                  <dt>Financing</dt>
                  <dd>{answers.financing}</dd>
                </div>
                <div>
                  <dt>Representation</dt>
                  <dd>{answers.representation}</dd>
                </div>
              </dl>
              {answers.representation === representation[1] && (
                <p className="small-note">
                  Already represented? Keep working with your agent. This brief
                  can help you clarify your preferences together.
                </p>
              )}
              <div className="preview-note">
                <ShieldCheck size={19} />
                <p>
                  <strong>This is an experience preview.</strong> Your
                  information has not been sent or saved. Email and CRM delivery
                  will be connected later.
                </p>
              </div>
              <button
                className="button"
                onClick={() => {
                  setComplete(false);
                  setStep(4);
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
                  <span className="muted">/ 05</span>
                </span>
              </div>
              <div
                className="progress-track"
                aria-label={`Step ${step + 1} of 5`}
              >
                {stepCopy.map((_, index) => (
                  <span key={index} className={index <= step ? "filled" : ""} />
                ))}
              </div>
              <form onSubmit={next}>
                <span className="eyebrow">{stepCopy[step][0]}</span>
                <h2 ref={heading} tabIndex={-1}>
                  {stepCopy[step][1]}
                </h2>
                <p className="step-description">{stepCopy[step][2]}</p>
                {step === 0 && (
                  <fieldset>
                    <legend className="sr-only">
                      Moving timeline, required
                    </legend>
                    <Choices
                      name="timeline"
                      options={timelines}
                      value={answers.timeline}
                      onChange={(value) => set("timeline", value)}
                    />
                  </fieldset>
                )}
                {step === 1 && (
                  <fieldset>
                    <legend className="sr-only">
                      Preferred area, required
                    </legend>
                    <Choices
                      name="area"
                      options={areas}
                      value={answers.area}
                      onChange={(value) => set("area", value)}
                    />
                  </fieldset>
                )}
                {step === 2 && (
                  <fieldset>
                    <legend className="sr-only">Budget, required</legend>
                    <Choices
                      name="budget"
                      options={budgets}
                      value={answers.budget}
                      onChange={(value) => set("budget", value)}
                    />
                  </fieldset>
                )}
                {step === 3 && (
                  <>
                    <fieldset>
                      <legend>
                        Financing <span>(required)</span>
                      </legend>
                      <Choices
                        name="financing"
                        options={financing}
                        value={answers.financing}
                        onChange={(value) => set("financing", value)}
                      />
                    </fieldset>
                    <fieldset className="representation">
                      <legend>
                        Are you working with an agent? <span>(required)</span>
                      </legend>
                      <Choices
                        name="representation"
                        options={representation}
                        value={answers.representation}
                        onChange={(value) => set("representation", value)}
                      />
                    </fieldset>
                  </>
                )}
                {step === 4 && (
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
                        Phone <span>(optional)</span>
                        <input
                          name="phone"
                          autoComplete="tel"
                          type="tel"
                          value={answers.phone}
                          onChange={(event) => set("phone", event.target.value)}
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
                    <label className="consent">
                      <input
                        type="checkbox"
                        checked={answers.consent}
                        required
                        onChange={(event) =>
                          set("consent", event.target.checked)
                        }
                      />
                      <span>
                        I understand this is a preview and my details will not
                        be sent. <span>(required)</span>
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
                      <ShieldCheck size={14} /> Your pace. Your choice.
                    </span>
                  )}
                  <button className="button" type="submit" disabled={!valid}>
                    {step === 4 ? "Preview my home brief" : "Continue"}
                    <ArrowRight size={17} />
                  </button>
                </div>
                <p className="form-footnote">
                  {step === 4
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
