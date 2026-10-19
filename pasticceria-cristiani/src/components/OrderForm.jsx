"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { order } from "@/data/content";
import { whatsappHref } from "@/lib";
import { WhatsAppIcon } from "./Icons";

const cssMs = (n, fb) => {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(n));
  return Number.isFinite(v) ? v : fb;
};
// transitions.dev "error state shake"
function showError(wrap) {
  const input = wrap.querySelector(".t-input");
  wrap.classList.add("is-error");
  input.classList.add("is-error");
  input.classList.remove("is-shaking");
  void input.offsetWidth;
  input.classList.add("is-shaking");
  const shake = cssMs("--shake-dur-a", 80) * 2 + cssMs("--shake-dur-b", 60) * 2;
  setTimeout(() => input.classList.remove("is-shaking"), shake + 20);
  clearTimeout(wrap._t);
  wrap._t = setTimeout(() => {
    wrap.classList.remove("is-error");
    input.classList.remove("is-error");
  }, shake + cssMs("--revert-hold", 3000));
}

function Field({ label, children, error, wrapRef }) {
  return (
    <div ref={wrapRef} className="t-input-wrap">
      <label className="block">
        <span className="label text-[0.72rem] text-cacao">{label}</span>
        <span className="t-input block">{children}</span>
      </label>
      {error ? <p role="alert" className="t-error-msg mt-1 text-sm text-[#a5321c]">{error}</p> : null}
    </div>
  );
}

/** Custom cakes and trays: the form writes the order and opens it in WhatsApp, ready to send. */
export default function OrderForm() {
  const form = useRef(null);
  const nameWrap = useRef(null);
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const d = new FormData(form.current);
    const name = String(d.get("nome") || "").trim();
    if (!name) return showError(nameWrap.current);
    const lines = [
      `Buongiorno! Sono ${name} e vorrei ordinare: ${d.get("tipo")}.`,
      d.get("data") ? `Per il giorno: ${new Date(d.get("data")).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}` : null,
      d.get("persone") ? `Persone: ${d.get("persone")}` : null,
      d.get("note") ? `Dettagli: ${String(d.get("note")).trim()}` : null,
    ].filter(Boolean);
    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener");
    setSent(true);
  };

  return (
    <form ref={form} onSubmit={submit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Il tuo nome *" error="Scrivi il tuo nome, così sappiamo chi sei." wrapRef={nameWrap}>
          <input name="nome" autoComplete="name" className="field" onInput={(e) => e.currentTarget.closest(".t-input-wrap").classList.remove("is-error")} />
        </Field>
        <Field label="Cosa desideri">
          <select name="tipo" className="field" defaultValue={order.kinds[0]}>
            {order.kinds.map((k) => <option key={k}>{k}</option>)}
          </select>
        </Field>
        <Field label="Per quando">
          <input name="data" type="date" className="field" />
        </Field>
        <Field label="Per quante persone">
          <input name="persone" type="number" min="1" inputMode="numeric" className="field" />
        </Field>
      </div>
      <Field label="Dedica, gusti e dettagli">
        <textarea name="note" rows={3} className="field resize-y" placeholder="Es. torta alla crema e fragole, scritta «Auguri Giulia»" />
      </Field>
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button type="submit" className="btn btn-brass">
          Invia l'ordine su WhatsApp
          <span className="btn-fit"><WhatsAppIcon /></span>
        </button>
        <p className="text-sm text-cacao" aria-live="polite">
          {sent ? <span className="inline-flex items-center gap-2 text-mogano"><Check size={16} aria-hidden="true" />Messaggio pronto su WhatsApp: premi invia.</span> : "Ti rispondiamo noi per confermare."}
        </p>
      </div>
    </form>
  );
}
