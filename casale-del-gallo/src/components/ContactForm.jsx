"use client";

import { useRef, useState } from "react";
import { Mail, Check } from "lucide-react";
import { contact, l } from "@/data/content";
import { whatsappHref, mailHref } from "@/lib/links";
import { WhatsAppIcon } from "./Buttons";

const cssMs = (name, fb) => {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
  return Number.isFinite(v) ? v : fb;
};

// transitions.dev "error state shake": shake, show the message, revert after a hold.
function showError(wrap) {
  const input = wrap.querySelector(".t-input");
  wrap.classList.add("is-error");
  input.classList.add("is-error");
  input.classList.remove("is-shaking");
  void input.offsetWidth;
  input.classList.add("is-shaking");
  const shakeMs = cssMs("--shake-dur-a", 80) * 2 + cssMs("--shake-dur-b", 60) * 2;
  setTimeout(() => input.classList.remove("is-shaking"), shakeMs + 20);
  if (wrap._revertTimer) clearTimeout(wrap._revertTimer);
  wrap._revertTimer = setTimeout(() => {
    wrap._revertTimer = null;
    wrap.classList.remove("is-error");
    input.classList.remove("is-error");
  }, shakeMs + cssMs("--revert-hold", 3000));
}
function clearError(wrap) {
  if (!wrap) return;
  if (wrap._revertTimer) clearTimeout(wrap._revertTimer);
  wrap._revertTimer = null;
  wrap.classList.remove("is-error");
  wrap.querySelector(".t-input")?.classList.remove("is-error");
}

function Field({ name, label, type = "text", required, error, lang, textarea, wrapRef, autoComplete }) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div ref={wrapRef} className="t-input-wrap">
      <label className="block">
        <span className="cue text-xs text-[var(--soft)]">
          {l(label, lang)}
          {required ? <span aria-hidden="true"> *</span> : null}
        </span>
        <span className="t-input block">
          <Tag
            name={name}
            type={textarea ? undefined : type}
            required={required}
            rows={textarea ? 4 : undefined}
            autoComplete={autoComplete}
            aria-describedby={error ? `${name}-err` : undefined}
            onInput={(e) => clearError(e.currentTarget.closest(".t-input-wrap"))}
            className={`field ${textarea ? "resize-y" : ""}`}
          />
        </span>
      </label>
      {error ? (
        <p id={`${name}-err`} role="alert" className="t-error-msg mt-1 text-sm text-[#ffb59b]">{l(error, lang)}</p>
      ) : null}
    </div>
  );
}

/**
 * The original Wix form (Name, Email, Phone, Subject, Message), rebuilt without a server:
 * it composes the enquiry and opens it in WhatsApp or in the visitor's email app.
 */
export default function ContactForm({ lang }) {
  const form = useRef(null);
  const nameWrap = useRef(null);
  const emailWrap = useRef(null);
  const [sent, setSent] = useState(false);
  const f = contact.form;

  const compose = () => {
    const d = new FormData(form.current);
    const name = String(d.get("name") || "").trim();
    const email = String(d.get("email") || "").trim();
    let ok = true;
    if (!name) { showError(nameWrap.current); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError(emailWrap.current); ok = false; }
    if (!ok) return null;
    const subject = String(d.get("subject") || "").trim() || "Casale del Gallo";
    const lines = [
      String(d.get("message") || "").trim(),
      "",
      `${l(f.name, lang)}: ${name}`,
      `${l(f.email, lang)}: ${email}`,
      d.get("phone") ? `${l(f.phone, lang)}: ${String(d.get("phone")).trim()}` : null,
    ].filter((x) => x !== null);
    return { subject, body: lines.join("\n").trim() };
  };

  const send = (via) => (e) => {
    e.preventDefault();
    const msg = compose();
    if (!msg) return;
    const url = via === "wa" ? whatsappHref(`${msg.subject}\n\n${msg.body}`) : mailHref(msg.subject, msg.body);
    if (via === "wa") window.open(url, "_blank", "noopener");
    else window.location.href = url;
    setSent(true);
  };

  return (
    <form ref={form} noValidate onSubmit={send("wa")} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label={f.name} required lang={lang} error={f.errName} wrapRef={nameWrap} autoComplete="name" />
        <Field name="email" type="email" label={f.email} required lang={lang} error={f.errEmail} wrapRef={emailWrap} autoComplete="email" />
        <Field name="phone" type="tel" label={f.phone} lang={lang} autoComplete="tel" />
        <Field name="subject" label={f.subject} lang={lang} />
      </div>
      <Field name="message" label={f.message} lang={lang} textarea />
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button type="submit" className="btn btn-primary">
          {l(f.sendWhatsapp, lang)}
          <span className="btn-chip"><WhatsAppIcon /></span>
        </button>
        <button type="button" onClick={send("mail")} className="btn btn-ghost">
          {l(f.sendEmail, lang)}
          <span className="btn-chip"><Mail size={17} strokeWidth={1.6} aria-hidden="true" /></span>
        </button>
      </div>
      <p className="text-sm text-[var(--soft)]" aria-live="polite">
        {sent ? (
          <span className="inline-flex items-center gap-2 text-[var(--ink)]"><Check size={16} aria-hidden="true" /> {l(f.sent, lang)}</span>
        ) : (
          l(f.note, lang)
        )}
      </p>
    </form>
  );
}
