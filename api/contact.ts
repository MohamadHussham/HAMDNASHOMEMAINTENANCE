import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { name, phone, email, service, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Name, email, and project details are required.",
      });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is missing");
      return res.status(500).json({
        error: "Email service is not configured.",
      });
    }

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 8000);

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Hamdan's Home Maintenance <onboarding@resend.dev>",
          to: ["hamdanshomemaintenance@gmail.com"],
          reply_to: email,
          subject: `New Estimate Request from ${name}`,
          text: `
New estimate request

Name: ${name}
Phone: ${phone || "Not provided"}
Email: ${email}
Service: ${service || "Not specified"}

Project Details:
${message}
          `,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const data = await response.json();

      console.log("Resend response:", response.status, data);

      if (!response.ok) {
        return res.status(500).json({
          error: data?.message || "Resend failed to send the email.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Email sent successfully",
      });
    } catch (error: any) {
      clearTimeout(timeout);

      console.error("Email request failed:", error);

      if (error?.name === "AbortError") {
        return res.status(504).json({
          error: "Email service timed out. Please try again.",
        });
      }

      return res.status(500).json({
        error: "Unable to connect to email service.",
      });
    }
  } catch (error) {
    console.error("API error:", error);

    return res.status(500).json({
      error: "Server error. Please try again.",
    });
  }
}

