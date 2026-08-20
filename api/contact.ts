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
    const body = await req.json();

    console.log("Contact form received:", {
      name: body.name,
      email: body.email,
      service: body.service,
    });

    const { name, phone, email, service, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          error: "Please fill in all required fields.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing");

      return new Response(
        JSON.stringify({
          error: "Email service is not configured.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const result = await resend.emails.send({
      from: "Hamdan's Home Maintenance <onboarding@resend.dev>",
      to: ["hamdanshomemaintenance@gmail.com"],
      replyTo: email,
      subject: `New Estimate Request - ${name}`,
      html: `
        <h2>New Estimate Request</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service || "Not specified"}</p>

        <h3>Project Details</h3>
        <p>${message}</p>
      `,
    });

    console.log("Resend result:", result);

    if (result.error) {
      console.error("Resend error:", result.error);

      return new Response(
        JSON.stringify({
          error: result.error.message || "Email failed to send.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("API error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to send email.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

