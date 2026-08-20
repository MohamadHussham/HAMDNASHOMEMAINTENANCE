import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { name, phone, email, service, message } = req.body;

    console.log("Contact form received:", {
      name,
      email,
      service,
    });

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Name, email, and project details are required.",
      });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing");

      return res.status(500).json({
        error: "Email service is not configured.",
      });
    }

    const result = await resend.emails.send({
      from: "Hamdan's Home Maintenance <onboarding@resend.dev>",
      to: ["hamdanshomemaintenance@gmail.com"],
      replyTo: email,
      subject: `New Estimate Request - ${name}`,
      html: `
        <h2>New Estimate Request</h2>

        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Service:</strong> ${escapeHtml(service || "Not specified")}</p>

        <h3>Project Details</h3>
        <p style="white-space: pre-wrap;">
          ${escapeHtml(message)}
        </p>
      `,
    });

    console.log("Resend result:", result);

    if (result.error) {
      console.error("Resend error:", result.error);

      return res.status(500).json({
        error: result.error.message || "Email failed to send.",
      });
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("API error:", error);

    return res.status(500).json({
      error: "Failed to send email.",
    });
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

