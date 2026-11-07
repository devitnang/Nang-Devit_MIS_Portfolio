"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface FormState {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Please enter your full name";
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errs.email = "Please enter your email address";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = "Please enter a valid email address (e.g. name@domain.com)";
      }
    }

    if (!formData.subject.trim()) {
      errs.subject = "Please enter a message subject";
    } else if (formData.subject.trim().length < 3) {
      errs.subject = "Subject must be at least 3 characters";
    }

    if (!formData.message.trim()) {
      errs.message = "Please enter your message or project description";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long";
    } else if (formData.message.trim().length > 3000) {
      errs.message = "Message exceeds the maximum limit of 3000 characters";
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
        });
        setErrors({});
      } else {
        setSubmitError(
          data.error ||
          "Unable to transmit your message at this time. Please try again or email directly at devit.nang@gmail.com."
        );
      }
    } catch {
      setSubmitError(
        "Network connection error. Please try again or reach out directly at devit.nang@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-slate-50 dark:bg-[#070D19] border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  placeholder="e.g. Sok Sovan"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${errors.fullName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300 dark:border-slate-700 focus:ring-[#0B2046] dark:focus:ring-blue-400"
                    }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
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
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300 dark:border-slate-700 focus:ring-[#0B2046] dark:focus:ring-blue-400"
                    }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
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
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${errors.subject
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-700 focus:ring-[#0B2046] dark:focus:ring-blue-400"
                  }`}
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-medium">
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
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors resize-y ${errors.message
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-300 dark:border-slate-700 focus:ring-[#0B2046] dark:focus:ring-blue-400"
                  }`}
              />
              <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
                <span>
                  {errors.message ? (
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      {errors.message}
                    </span>
                  ) : (
                    "Minimum 10 characters"
                  )}
                </span>
                <span>{formData.message.length} / 3000</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
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
