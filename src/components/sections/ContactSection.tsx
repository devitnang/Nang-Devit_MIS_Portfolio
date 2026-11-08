"use client";

import React, { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { ParallaxBackground } from "@/components/ui/Parallax";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          action: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

interface FormState {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
  turnstileToken: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactSection() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
    turnstileToken: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileContainer.current) return;

    let cancelled = false;
    const renderWidget = () => {
      if (cancelled || turnstileWidgetId.current || !turnstileContainer.current || !window.turnstile) return;
      turnstileWidgetId.current = window.turnstile.render(turnstileContainer.current, {
        sitekey: turnstileSiteKey,
        action: "contact",
        callback: (token) => {
          setFormData((previous) => ({ ...previous, turnstileToken: token }));
          setCaptchaError(null);
        },
        "expired-callback": () => {
          setFormData((previous) => ({ ...previous, turnstileToken: "" }));
        },
        "error-callback": () => {
          setFormData((previous) => ({ ...previous, turnstileToken: "" }));
          setCaptchaError("The anti-spam check could not load. Please refresh and try again.");
        },
      });
      setCaptchaError(null);
    };
    const handleScriptError = () => {
      if (!cancelled) setCaptchaError("The anti-spam check could not load. Please refresh and try again.");
    };

    const scriptUrl = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    let script = document.querySelector<HTMLScriptElement>(`script[src="${scriptUrl}"]`);
    if (window.turnstile) {
      renderWidget();
    } else if (script) {
      script.addEventListener("load", renderWidget, { once: true });
      script.addEventListener("error", handleScriptError, { once: true });
    } else {
      script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", renderWidget, { once: true });
      script.addEventListener("error", handleScriptError, { once: true });
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", renderWidget);
      script?.removeEventListener("error", handleScriptError);
    };
  }, [turnstileSiteKey]);

  const validateForm = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Please enter your full name";
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = "Full name must be at least 2 characters";
    } else if (formData.fullName.trim().length > 100) {
      errs.fullName = "Full name cannot exceed 100 characters";
    } else if (/[\u0000-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/u.test(formData.fullName)) {
      errs.fullName = "Full name contains invalid characters";
    }

    if (!formData.email.trim()) {
      errs.email = "Please enter your email address";
    } else {
      const email = formData.email.trim();
      const [local, domain, ...extraParts] = email.split("@");
      const labels = domain?.split(".") ?? [];
      const validLocal = Boolean(
        local &&
        local.length <= 64 &&
        !local.startsWith(".") &&
        !local.endsWith(".") &&
        !local.includes("..") &&
        /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local),
      );
      const validDomain =
        labels.length >= 2 &&
        labels[labels.length - 1].length >= 2 &&
        labels.every((label) =>
          label.length <= 63 && /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label),
        );
      if (
        email.length > 254 ||
        /[\u0000-\u001F\u007F-\u009F]/u.test(formData.email) ||
        extraParts.length > 0 ||
        !validLocal ||
        !validDomain
      ) {
        errs.email = "Please enter a valid email address (e.g. name@domain.com)";
      }
    }

    if (!formData.subject.trim()) {
      errs.subject = "Please enter a message subject";
    } else if (formData.subject.trim().length < 3) {
      errs.subject = "Subject must be at least 3 characters";
    } else if (formData.subject.trim().length > 150) {
      errs.subject = "Subject cannot exceed 150 characters";
    } else if (/[\u0000-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/u.test(formData.subject)) {
      errs.subject = "Subject contains invalid characters";
    }

    if (!formData.message.trim()) {
      errs.message = "Please enter your message or project description";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long";
    } else if (formData.message.trim().length > 3000) {
      errs.message = "Message exceeds the maximum limit of 3000 characters";
    } else if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/u.test(formData.message)) {
      errs.message = "Message contains invalid characters";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(null);
    setSubmitError(null);

    // Spam Honeypot verification
    if (formData.honeypot) {
      setSubmitSuccess(
        "Thank you! Your message has been received successfully."
      );
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
        honeypot: "",
        turnstileToken: "",
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          honeypot: formData.honeypot,
          turnstileToken: formData.turnstileToken,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(
          "Thank you! Your inquiry has been delivered directly. Nang Devit will review your message and reply promptly."
        );
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
          honeypot: "",
          turnstileToken: "",
        });
        setErrors({});
      } else {
        const serverErrors = data?.data;
        if (serverErrors && typeof serverErrors === "object") {
          const fieldErrors: FormErrors = {};
          for (const field of ["fullName", "email", "subject", "message"] as const) {
            if (typeof serverErrors[field] === "string") fieldErrors[field] = serverErrors[field];
          }
          setErrors(fieldErrors);
        }
        setSubmitError(
          data.message ||
            "Unable to transmit your message at this time. Please try again or email directly at devit.nang@gmail.com."
        );
      }
    } catch {
      setSubmitError(
        "Network connection error. Please try again or email devit.nang@gmail.com directly."
      );
    } finally {
      if (turnstileSiteKey && turnstileWidgetId.current) {
        window.turnstile?.reset(turnstileWidgetId.current);
        setFormData((previous) => ({ ...previous, turnstileToken: "" }));
      }
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (!["fullName", "email", "subject", "message", "honeypot"].includes(name)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 md:py-24 bg-slate-50 dark:bg-[#070D19] border-b border-slate-200 dark:border-slate-800 transition-colors overflow-hidden"
    >
      {/* Ambient Parallax Multi-Plane Depth Background */}
      <ParallaxBackground />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            badge="Direct Inquiries & Collaboration"
            title="Contact Nang Devit"
            center={true}
          />
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100} className="max-w-2xl mx-auto">
          {/* Success Notification Alert */}
          {submitSuccess && (
            <div className="mb-6 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-start gap-3 text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Message Dispatched Successfully</p>
                <p className="mt-0.5">{submitSuccess}</p>
              </div>
            </div>
          )}

          {/* Error Notification Alert */}
          {submitError && (
            <div className="mb-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 flex items-start gap-3 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 text-[#0B2046] dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Submission Notice</p>
                <p className="mt-0.5">{submitError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Honeypot field (hidden from legitimate users) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="honeypot">Leave this field empty</label>
              <input
                type="text"
                id="honeypot"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Full Name <span className="text-[#0B2046] dark:text-blue-400">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="e.g. Nang Devit"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  aria-required="true"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${errors.fullName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-700 focus:ring-[#0B2046] dark:focus:ring-blue-400"
                    }`}
                />
                {errors.fullName && (
                  <p id="fullName-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Email Address <span className="text-[#0B2046] dark:text-blue-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g. name@company.com"
                  required
                  minLength={3}
                  maxLength={254}
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-700 focus:ring-[#0B2046] dark:focus:ring-blue-400"
                    }`}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Subject <span className="text-[#0B2046] dark:text-blue-400">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="e.g. Project Inquiry / Collaboration"
                required
                minLength={3}
                maxLength={150}
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-required="true"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${errors.subject
                  ? "border-red-500 focus:ring-red-500"
                  : "border-slate-300 dark:border-slate-700 focus:ring-[#0B2046] dark:focus:ring-blue-400"
                  }`}
              />
              {errors.subject && (
                <p id="subject-error" role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Message / Description */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Description / Message <span className="text-[#0B2046] dark:text-blue-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Please describe your project, inquiry, or discussion topic in detail..."
                required
                minLength={10}
                maxLength={3000}
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby="message-hint"
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors resize-y ${errors.message
                  ? "border-red-500 focus:ring-red-500"
                  : "border-slate-300 dark:border-slate-700 focus:ring-[#0B2046] dark:focus:ring-blue-400"
                  }`}
              />
              <div id="message-hint" className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
                <span>
                  {errors.message ? (
                    <span role="alert" className="text-red-600 dark:text-red-400 font-medium">
                      {errors.message}
                    </span>
                  ) : (
                    "Minimum 10 characters"
                  )}
                </span>
                <span>{formData.message.length} / 3000</span>
              </div>
            </div>

            {turnstileSiteKey && (
              <div className="flex flex-col items-center gap-1" aria-live="polite">
                <div ref={turnstileContainer} />
                {captchaError && <p role="alert" className="text-xs text-red-600 dark:text-red-400">{captchaError}</p>}
              </div>
            )}

            <p className="text-center text-[11px] text-slate-500 dark:text-slate-400">
              Your contact details and message are sent to a private Telegram inbox so Nang Devit can reply. They are not stored on this website.
            </p>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting || Boolean(turnstileSiteKey && !formData.turnstileToken)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#0B2046] hover:bg-[#07152E] dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-xs hover:shadow transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Validating & Dispatching...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
