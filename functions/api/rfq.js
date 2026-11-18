// Cloudflare Pages Function: /api/rfq
// Receives RFQ inquiries and handles notification / logging

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const { name, organization, email, phone, product, sector, details } = data;

    // Validate required fields
    if (!name || !email || !organization) {
      return new Response(JSON.stringify({
        success: false,
        error: "Missing required fields: Name, Organization, and Work Email are required."
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const timestamp = new Date().toISOString();
    const inquiryId = "TC-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    // Log inquiry to edge console / logs
    console.log(`[RFQ Received] ID: ${inquiryId} | Org: ${organization} | Contact: ${name} (${email}) | Product: ${product} | Sector: ${sector}`);

    // If environment variable RESEND_API_KEY or SENDGRID_API_KEY is configured in Cloudflare:
    const env = context.env || {};
    if (env.RESEND_API_KEY && env.NOTIFICATION_EMAIL) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "TimeCubic RFQ Gateway <rfq@timecubic.com>",
          to: [env.NOTIFICATION_EMAIL || "info@timecubic.com"],
          reply_to: email,
          subject: `[RFQ ${inquiryId}] Inquiry from ${organization}: ${product}`,
          html: `
            <h2>New TimeCubic Engineering Inquiry (${inquiryId})</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company/Organization:</strong> ${organization}</p>
            <p><strong>Work Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Target Product:</strong> ${product}</p>
            <p><strong>Application Sector:</strong> ${sector}</p>
            <p><strong>Project Specification & Notes:</strong></p>
            <blockquote style="background:#f1f5f9;padding:12px;border-left:4px solid #2563eb;">${details || "None provided"}</blockquote>
            <p style="color:#64748b;font-size:12px;">Submitted at ${timestamp} via timecubic.com RFQ portal</p>
          `
        })
      });
    }

    return new Response(JSON.stringify({
      success: true,
      inquiryId,
      message: "Engineering inquiry received successfully. A TimeCubic application engineer will contact you within 1 business day."
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message || "Internal server error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
