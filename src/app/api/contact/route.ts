import { NextRequest, NextResponse } from "next/server";
import { ContactFormData, ApiResponse } from "@/types";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { fullName, email, subject, message, honeypot } = body;

    // 1. Anti-spam honeypot detection
    if (honeypot && honeypot.trim().length > 0) {
      // Silently accept without sending to avoid alerting the spam bot
      return NextResponse.json<ApiResponse>(
        { success: true, message: "Thank you for reaching out! Your message has been received." },
        { status: 200 }
      );
    }

    // 2. Strict Field Validation
    const cleanName = (fullName || "").trim();
    const cleanEmail = (email || "").trim();
    const cleanSubject = (subject || "").trim();
    const cleanMessage = (message || "").trim();

    const errors: Record<string, string> = {};

    if (!cleanName) {
      errors.fullName = "Full name is required.";
    } else if (cleanName.length < 2) {
      errors.fullName = "Full name must be at least 2 characters.";
    } else if (cleanName.length > 100) {
      errors.fullName = "Full name cannot exceed 100 characters.";
    }

    if (!cleanEmail) {
      errors.email = "Email address is required.";
    } else if (!isValidEmail(cleanEmail)) {
      errors.email = "Please enter a valid email address.";
    } else if (cleanEmail.length > 120) {
      errors.email = "Email address cannot exceed 120 characters.";
    }

    if (!cleanSubject) {
      errors.subject = "Subject is required.";
    } else if (cleanSubject.length < 3) {
      errors.subject = "Subject must be at least 3 characters.";
    } else if (cleanSubject.length > 150) {
      errors.subject = "Subject cannot exceed 150 characters.";
    }

    if (!cleanMessage) {
      errors.message = "Message description is required.";
    } else if (cleanMessage.length < 10) {
      errors.message = "Message must be at least 10 characters long.";
    } else if (cleanMessage.length > 3000) {
      errors.message = "Message cannot exceed 3000 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Please correct the form fields highlighted.",
          error: Object.values(errors).join(" "),
          data: errors,
        },
        { status: 400 }
      );
    }

    // 3. Format Date & Time in Cambodia Time (UTC+7)
    const submissionDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Phnom_Penh",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // 4. Construct Secure HTML Telegram Notification
    const telegramMessage = [
      `🏛️ <b>Portfolio Website - New Contact Message</b>`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Full Name:</b> ${escapeHtml(cleanName)}`,
      `📧 <b>Email:</b> <code>${escapeHtml(cleanEmail)}</code>`,
      `📌 <b>Subject:</b> ${escapeHtml(cleanSubject)}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📝 <b>Description:</b>`,
      `${escapeHtml(cleanMessage)}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🕒 <b>Submitted At:</b> ${submissionDate} (Cambodia Time)`,
      `🌐 <b>Source:</b> <a href="https://www.nangdevit.xyz">www.nangdevit.xyz</a>`,
    ].join("\n");

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // 5. Check if Telegram configuration exists
    if (!botToken || !chatId) {
      console.warn(
        "⚠️ [Telegram Contact API] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in environment variables.\n" +
          "Simulated message receipt:\n" +
          `Name: ${cleanName} | Email: ${cleanEmail} | Subject: ${cleanSubject}\n` +
          `Message: ${cleanMessage}`
      );

      return NextResponse.json<ApiResponse>(
        {
          success: true,
          message:
            "Thank you for contacting Nang Devit! Your message has been received successfully.",
        },
        { status: 200 }
      );
    }

    // 6. Send to Telegram Bot API
    const telegramEndpoint = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const telegramRes = await fetch(telegramEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const telegramData = await telegramRes.json();

    if (!telegramRes.ok || !telegramData.ok) {
      console.error(
        "❌ [Telegram API Error]:",
        telegramData.description || "Failed to deliver message to Telegram."
      );

      // Still provide a graceful response to visitor while logging internally
      return NextResponse.json<ApiResponse>(
        {
          success: true,
          message:
            "Your message was received and registered. Thank you for reaching out!",
        },
        { status: 200 }
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Your message has been delivered to Nang Devit via Telegram. Thank you!",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("❌ [Contact API Unexpected Error]:", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "An unexpected error occurred while sending your message. Please try again or email devit.nang@gmail.com directly.",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
