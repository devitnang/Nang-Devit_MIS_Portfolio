"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { personalInfo } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon, TelegramIcon } from "@/components/ui/Icons";
import {
  Mail,
  Phone,
  Send,
  Globe,
  MapPin,
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
      errs.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = "Full name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address (e.g. name@domain.com).";
    }

    if (!formData.subject.trim()) {
      errs.subject = "Subject is required.";
    } else if (formData.subject.trim().length < 3) {
      errs.subject = "Subject must be at least 3 characters.";
    }

    if (!formData.message.trim()) {
      errs.message = "Message description is required.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(null);
    setSubmitError(null);

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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(
          data.message ||
            "Your message has been sent successfully. Thank you for getting in touch!"
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
          data.message ||
            "Unable to deliver your message. Please check the fields or email devit.nang@gmail.com directly."
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Direct Inquiries & Collaboration"
          title="Contact Nang Devit"
          subtitle="Reach out directly for career opportunities, consulting inquiries, technical collaboration, or general discussions regarding systems analysis and software engineering."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Contact Channels (Line-based, no bulky card box) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-base font-bold text-[#0B2046] dark:text-white uppercase tracking-wider mb-2">
                Contact Channels
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Reach out directly through official communication channels.
              </p>

              <div className="divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800">
                {/* Website */}
                <a
                  href={personalInfo.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 py-3.5 hover:translate-x-1 transition-transform group"
                >
                  <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-[#0B2046] dark:text-blue-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                      Official Website
                    </span>
                    <span className="text-sm font-bold text-[#0B2046] dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      {personalInfo.contact.displayWebsite}
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${personalInfo.contact.email}`}
                  className="flex items-start gap-3.5 py-3.5 hover:translate-x-1 transition-transform group"
                >
                  <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-[#0B2046] dark:text-blue-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                      Email Address
                    </span>
                    <span className="text-sm font-bold text-[#0B2046] dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      {personalInfo.contact.email}
                    </span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${personalInfo.contact.phone.replace(/\s+/g, "")}`}
                  className="flex items-start gap-3.5 py-3.5 hover:translate-x-1 transition-transform group"
                >
                  <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                      Phone Number
                    </span>
                    <span className="text-sm font-bold text-[#0B2046] dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      {personalInfo.contact.displayPhone}
                    </span>
                  </div>
                </a>

                {/* Telegram */}
                <a
                  href={personalInfo.contact.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 py-3.5 hover:translate-x-1 transition-transform group"
                >
                  <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400">
                    <TelegramIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                      Telegram Contact
                    </span>
                    <span className="text-sm font-bold text-[#0B2046] dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      @{personalInfo.contact.telegramUsername}
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-3.5 py-3.5">
                  <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                      Location
                    </span>
                    <span className="text-sm font-bold text-[#0B2046] dark:text-white">
                      Phnom Penh, Cambodia
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="pt-4 flex items-center gap-3">
                <a
                  href={personalInfo.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded text-xs font-semibold text-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0B2046] dark:text-blue-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded text-xs font-semibold text-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Telegram Notification Notice Box */}
            <div className="py-3 px-4 rounded border-l-2 border-[#0B2046] dark:border-blue-400 bg-slate-50 dark:bg-slate-900/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3">
              <Send className="w-4 h-4 text-[#0B2046] dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#0B2046] dark:text-white mb-0.5">
                  Telegram Bot Notification Active
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                  Messages submitted through this form are instantly verified and dispatched directly to your Telegram Group topic via the Telegram Bot API.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (No outer card outline) */}
          <div className="lg:col-span-7">
            <div>
              <div className="mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-[#0B2046] dark:text-white">
                  Send a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Please fill out the form below. All fields marked with * are required.
                </p>
              </div>

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
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${
                        errors.fullName
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
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${
                        errors.email
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
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${
                      errors.subject
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
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors resize-y ${
                      errors.message
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
                <div className="pt-2">
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
                        <span>Send Message to Telegram</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
