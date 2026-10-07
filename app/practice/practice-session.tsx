"use client";

import { useEffect, useRef, useState } from "react";
import type { StudioLesson } from "../../lib/lesson-practice";
import { practices } from "../../lib/practices";

const stages = ["Arrive", "Choose", "Set intention", "Practice", "Reflect", "Close"];
const attentionStates = ["Scattered", "Tired", "Intermittent", "Steady"];
const arrivalNotes: Record<string, string> = {
  Scattered: "Try a small task and remove one optional distraction. You can begin again as often as you need.",
  Tired: "Consider taking a break first. If you continue, choose something small and manageable.",
  Intermittent: "Choose a clear next step. When your attention wanders, return gently.",
  Steady: "Choose one worthwhile task and give it the attention available to you.",
};

export default function PracticeSession({ initialChoice = 0, origin }: { initialChoice?: number; origin?: StudioLesson }) {
  const [stage, setStage] = useState(0);
  const [attention, setAttention] = useState("");
  const [choice, setChoice] = useState(initialChoice);
  const [intention, setIntention] = useState("");
  const [reflection, setReflection] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const deadline = useRef(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const practice = practices[choice];

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    heading.current?.focus();
  }, [stage]);

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const seconds = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) setRunning(false);
    };
    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [running]);

  function toggleTimer() {
    if (running) {
      setRemaining(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)));
      setRunning(false);
    } else {
      const seconds = remaining || minutes * 60;
      setRemaining(seconds);
      deadline.current = Date.now() + seconds * 1000;
      setRunning(true);
    }
  }
  function move(next: number) { setRunning(false); setStage(next); }
  function restart() {
    setAttention(""); setChoice(initialChoice); setIntention(""); setReflection("");
    setMinutes(0); setRemaining(0); setRunning(false); setStage(0);
  }

  return <section className="school-section session" aria-label="Guided AI practice">
    {origin && <aside className="studio-origin" aria-labelledby="origin-title">
      <p className="section-kicker">From your lesson</p>
      <h2 id="origin-title">Lesson {origin.number}: {origin.title}</h2>
      <p>This session pairs the lesson’s contemporary exercise with a Studio practice. You can choose a different practice and still return to your lesson.</p>
      <h3>Contemporary exercise · digital-edition adaptation</h3>
      <p>{origin.practice}</p>
      <p className="editorial-note">Developed with AI assistance for this digital edition; separate from Alex Julian’s original 2024 source teaching.</p>
      <a className="text-link" href={`/lessons/${origin.slug}`}>← Return to Lesson {origin.number}: {origin.title}</a>
    </aside>}
    <ol className="session-progress" aria-label="Session stages">
      {stages.map((name, i) => <li key={name} aria-current={stage === i ? "step" : undefined} className={i <= stage ? "reached" : ""}><span>{i + 1}</span>{name}</li>)}
    </ol>
    <div className="session-card">
      <p className="section-kicker">Step {stage + 1} of {stages.length}</p>
      <h2 ref={heading} tabIndex={-1}>{stage === 0 ? "How is your attention right now?" : stage === 1 ? "Choose your practice." : stage === 2 ? "What do you want to accomplish?" : stage === 3 ? practice.title : stage === 4 ? "Notice what happened." : "Your session is complete."}</h2>

      {stage === 0 && <>
        <p>These are descriptions for reflection. There is no right answer.</p>
        <fieldset className="session-options"><legend>Your attention</legend>{attentionStates.map(state => <label key={state}><input type="radio" name="attention" value={state} checked={attention === state} onChange={() => setAttention(state)} />{state}</label>)}</fieldset>
        {attention && <p className="arrival-note" role="status">{arrivalNotes[attention]}</p>}
        <button className="button primary" onClick={() => move(1)}>Continue →</button>
      </>}

      {stage === 1 && <>
        <fieldset className="practice-choices"><legend>Available practices</legend>{practices.map((p, i) => <label key={p.title}><input type="radio" name="practice" checked={choice === i} onChange={() => setChoice(i)} /><span><strong>{p.title}</strong><small>{p.description}</small></span></label>)}</fieldset>
        <button className="button primary" onClick={() => move(2)}>Choose this practice →</button>
      </>}

      {stage === 2 && <>
        <p>{practice.prepare}</p>
        <label className="session-field" htmlFor="intention">My intention <span>(optional)</span><textarea id="intention" rows={3} maxLength={1200} value={intention} onChange={e => setIntention(e.target.value)} placeholder="In this session, I want to…" /></label>
        <label className="session-field" htmlFor="duration">Optional timer<select id="duration" value={minutes} onChange={e => { const value = Number(e.target.value); setMinutes(value); setRemaining(value * 60); }}><option value={0}>No timer · work at your own pace</option><option value={2}>2 minutes</option><option value={5}>5 minutes</option><option value={10}>10 minutes</option><option value={15}>15 minutes</option></select></label>
        <button className="button primary" onClick={() => move(3)}>Begin practicing →</button>
      </>}

      {stage === 3 && <>
        {intention.trim() && <div className="intention-reminder"><p className="section-kicker">Your intention</p><p>{intention}</p></div>}
        <ol className="practice-cues">{practice.cues.map(cue => <li key={cue}>{cue}</li>)}</ol>
        {minutes > 0 ? <div className="session-timer">
          <p className="timer-digits" role="timer" aria-label="Time remaining" aria-live="off">{Math.floor(remaining / 60).toString().padStart(2, "0")}:{(remaining % 60).toString().padStart(2, "0")}</p>
          <p role="status">{remaining === 0 ? "Your time is complete. You can reflect whenever you are ready." : running ? "Your timer is running. Work in your AI tool and return here when ready." : "Start when you are ready, or resume after a pause."}</p>
          <button className="button ghost" onClick={toggleTimer}>{running ? "Pause timer" : remaining === 0 ? "Restart timer" : remaining === minutes * 60 ? "Start timer" : "Resume timer"}</button>
        </div> : <p className="arrival-note">No timer. Work at your own pace and return here when you are ready to reflect.</p>}
        <button className="button primary" onClick={() => move(4)}>Finish and reflect →</button>
      </>}

      {stage === 4 && <>
        <label className="session-field" htmlFor="reflection">{origin?.reflection ?? practice.reflection}<textarea id="reflection" rows={4} maxLength={2400} value={reflection} onChange={e => setReflection(e.target.value)} placeholder="A few words are enough. You can also reflect without writing." /></label>
        <p>Notice one thing you want to carry into your next session. You can leave this blank.</p>
        <button className="button primary" onClick={() => move(5)}>Close my practice →</button>
      </>}

      {stage === 5 && <>
        <p>You practiced {practice.title.toLowerCase()}. Take a moment to step away from the screen and re-enter the rest of your life.</p>
        {(intention.trim() || reflection.trim()) && <dl className="session-summary">{intention.trim() && <><dt>Your intention</dt><dd>{intention}</dd></>}{reflection.trim() && <><dt>Your reflection</dt><dd>{reflection}</dd></>}</dl>}
        <button className="button primary" onClick={restart}>Clear and begin a new practice</button>
        {origin ? <nav className="session-lessons" aria-label="Continue after your practice">
          <a className="text-link" href={`/lessons/${origin.slug}`}>Return to Lesson {origin.number}: {origin.title} →</a>
          {origin.nextLesson ? <a className="text-link" href={`/lessons/${origin.nextLesson.slug}`}>Next: Lesson {origin.nextLesson.number}: {origin.nextLesson.title} →</a> : <a className="text-link" href="/practices">Explore the Practice Library →</a>}
        </nav> : <a className="text-link" href="/">Return to the school →</a>}
      </>}

      {stage > 0 && stage < 5 && <button className="session-back text-link" onClick={() => move(stage - 1)}>← Back</button>}
      <p className="session-privacy">Your words stay in this page. They are not sent or saved; refreshing clears them.</p>
    </div>
    <aside className="session-lessons"><h3>Go deeper in the book</h3>{practice.lessons.map(lesson => <a className="text-link" key={lesson.slug} href={`/lessons/${lesson.slug}`}>{lesson.title} →</a>)}</aside>
    <noscript><p>The guided session needs JavaScript. You can still practice: choose one task, remove one optional distraction, work with attention, return gently when you wander, and reflect afterward.</p></noscript>
  </section>;
}
