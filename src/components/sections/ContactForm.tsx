"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, requirements, propertyTypes, type LeadInput } from "@/lib/validators";
import { leadToWhatsApp } from "@/lib/whatsapp";

type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full border-b border-black/25 bg-transparent py-2 text-base text-carbon placeholder:text-black/35 transition-colors focus-visible:border-black focus-visible:outline-none";

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block pb-2 text-xs text-muted-light">{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [sent, setSent] = useState<LeadInput | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "", phone: "", email: "", requirement: "Buy", propertyType: "Residential",
      budget: "", location: "", message: "", company: "",
    },
  });

  const onSubmit = async (values: LeadInput) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean };
      if (!res.ok || !data.ok) throw new Error("Request failed");
      setSent(values);
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent" && sent) {
    return (
      <div role="status" className="py-10">
        <h3 className="text-3xl font-light">Thanks, {sent.name.split(" ")[0]}. Your enquiry is in.</h3>
        <p className="mt-3 max-w-md text-muted-light">
          We will call you on {sent.phone} shortly. For the fastest reply, send the same details on WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={leadToWhatsApp(sent)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-black px-6 py-3 text-sm font-normal text-white transition-colors hover:bg-black/80"
          >
            Continue on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="rounded-full border border-black/30 px-6 py-3 text-sm font-normal transition-colors hover:bg-black/5"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-7">
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register("company")} />

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="name" label="Full name *" error={errors.name?.message}>
          <input id="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={inputCls} {...register("name")} />
        </Field>
        <Field id="phone" label="Mobile number *" error={errors.phone?.message}>
          <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} className={inputCls} {...register("phone")} />
        </Field>
      </div>

      <Field id="email" label="Email" error={errors.email?.message}>
        <input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={inputCls} {...register("email")} />
      </Field>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="requirement" label="I want to">
          <select id="requirement" className={inputCls} {...register("requirement")}>
            {requirements.map((r) => (<option key={r} value={r}>{r}</option>))}
          </select>
        </Field>
        <Field id="propertyType" label="Property type">
          <select id="propertyType" className={inputCls} {...register("propertyType")}>
            {propertyTypes.map((p) => (<option key={p} value={p}>{p === "Plot" ? "Plot / land" : p}</option>))}
          </select>
        </Field>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="budget" label="Budget" error={errors.budget?.message}>
          <input id="budget" placeholder="e.g. 50 to 70 Lakh" className={inputCls} {...register("budget")} />
        </Field>
        <Field id="location" label="Preferred location" error={errors.location?.message}>
          <input id="location" placeholder="e.g. Jhunsi" className={inputCls} {...register("location")} />
        </Field>
      </div>

      <Field id="message" label="Anything else we should know?" error={errors.message?.message}>
        <textarea id="message" rows={3} className={`${inputCls} resize-none`} {...register("message")} />
      </Field>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          We could not send your enquiry. Please try again, or message us directly on WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-black px-8 py-3 text-sm font-normal text-white transition-colors hover:bg-black/80 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send enquiry"}
      </button>
    </form>
  );
}
