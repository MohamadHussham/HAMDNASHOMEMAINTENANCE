import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const { name, phone, email, service, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          error: "Name, email, and project details are required.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { error } = await resend.emails.send({
      from: "Hamdan's Home Maintenance <onboarding@resend.dev>",
      to: ["hamdanshomemaintenance@gmail.com"],
      replyTo: email,
      subject: `New Estimate Request - ${name}`,
      html: `
        <h2>New Estimate Request</h2>

        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Service:</strong> ${escapeHtml(
          service || "Not specified"
        )}</p>

        <h3>Project Details</h3>
        <p style="white-space: pre-wrap;">
          ${escapeHtml(message)}
        </p>
      `,
    });

    if (error) {
      console.error(error);

      return new Response(
        JSON.stringify({ error: "Email could not be sent." }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({ error: "Something went wrong." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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

