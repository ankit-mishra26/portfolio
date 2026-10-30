"use client";

import { useId, useState, type FormEvent } from "react";
import { socials } from "@/data/socials";
import { CONTACT_LIMITS, type ContactField } from "@/lib/validation";
import { cn, isRecord } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";
type FieldErrors = Partial<Record<ContactField, string>>;

const inputClass =
  "w-full rounded-md border border-line bg-bg px-3 py-2.5 text-sm text-fg placeholder:text-muted focus:border-flow/60";

export function ContactForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");
    setErrors({});
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const data: unknown = await response.json().catch(() => null);

      if (response.ok) {
        form.reset();
        setStatus("success");
        return;
      }

      if (isRecord(data) && isRecord(data.errors)) {
        const next: FieldErrors = {};
        for (const field of ["name", "email", "message"] as const) {
          const value = data.errors[field];
          if (typeof value === "string") next[field] = value;
        }
        setErrors(next);
        const firstInvalid = (["name", "email", "message"] as const).find((field) => next[field]);
        const target = firstInvalid ? form.elements.namedItem(firstInvalid) : null;
        if (target instanceof HTMLElement) target.focus();
      }
      setMessage(
        isRecord(data) && typeof data.error === "string" ? data.error : "Something went wrong. Please try again.",
      );
      setStatus("error");
    } catch {
      setMessage("Could not reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-xl border border-ok/40 bg-ok/5 p-6">
        <p className="font-medium">Message sent.</p>
        <p className="mt-1 text-sm text-muted">Thanks for reaching out. I will reply by email.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-muted underline underline-offset-4 transition-colors hover:text-fg"
        >
          Send another message
        </button>
      </div>
    );
  }

  const fields: Array<{ name: ContactField; label: string; type: string; max: number }> = [
    { name: "name", label: "Name", type: "text", max: CONTACT_LIMITS.name },
    { name: "email", label: "Email", type: "email", max: CONTACT_LIMITS.email },
  ];

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={`${id}-${field.name}`} className="mb-1.5 block text-sm font-medium">
            {field.label}
          </label>
          <input
            id={`${id}-${field.name}`}
            name={field.name}
            type={field.type}
            required
            maxLength={field.max}
            autoComplete={field.name === "email" ? "email" : "name"}
            aria-invalid={errors[field.name] ? true : undefined}
            aria-describedby={errors[field.name] ? `${id}-${field.name}-error` : undefined}
            className={inputClass}
          />
          {errors[field.name] ? (
            <p id={`${id}-${field.name}-error`} className="mt-1.5 text-sm text-warm">
              {errors[field.name]}
            </p>
          ) : null}
        </div>
      ))}

      <div>
        <label htmlFor={`${id}-message`} className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={5}
          maxLength={CONTACT_LIMITS.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          className={cn(inputClass, "resize-y")}
        />
        {errors.message ? (
          <p id={`${id}-message-error`} className="mt-1.5 text-sm text-warm">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-11 items-center justify-center rounded-md bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-fg/85 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" ? (
          <p role="alert" className="text-sm text-warm">
            {message}{" "}
            <a href={socials.email.href} className="underline underline-offset-4">
              Email me directly
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
