// Cloudflare Pages Function: /api/rfq
// Receives RFQ inquiries from contact.html and dispatches transactional emails via Resend

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
}

export async function onRequestPost(context) {
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };

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
        headers: corsHeaders
      });
    }

    const timestamp = new Date().toISOString();
    const inquiryId = "TC-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    // Read environment variables securely (never hardcoded in code)
    const env = context.env || {};
    const resendApiKey = env.RESEND_API_KEY;
    const recipientEmail = env.NOTIFICATION_EMAIL || "info@timecubic.com";
    const configuredFrom = env.RESEND_FROM || "TimeCubic RFQ Gateway <onboarding@resend.dev>";

    let emailSent = false;
    let emailError = null;

    if (resendApiKey) {
      // Build clean HTML notification email
      const emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; color: #1e293b;">
          <div style="background-color: #0f172a; padding: 24px; color: #ffffff;">
            <div style="font-size: 11px; font-family: monospace; letter-spacing: 0.1em; color: #38bdf8; text-transform: uppercase;">TimeCubic Engineering Gateway</div>
            <h1 style="margin: 6px 0 0 0; font-size: 20px; font-weight: bold; color: #ffffff;">New Request For Quotation (RFQ)</h1>
            <div style="margin-top: 4px; font-size: 13px; color: #94a3b8;">Inquiry Reference: <span style="font-family: monospace; color: #f8fafc; font-weight: 600;">${inquiryId}</span></div>
          </div>
          
          <div style="padding: 24px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 140px; font-weight: 600;">Contact Name:</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Organization:</td>
                <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(organization)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Work Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone Number:</td>
                <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(phone || 'Not provided')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Target Model:</td>
                <td style="padding: 8px 0; color: #0f172a;"><span style="background-color: #eff6ff; color: #1d4ed8; padding: 2px 8px; border-radius: 4px; font-weight: 600; font-family: monospace;">${escapeHtml(product || 'General')}</span></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Application Sector:</td>
                <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(sector || 'Not specified')}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
              <div style="font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px;">Specifications &amp; Quantities:</div>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #2563eb; border-radius: 6px; padding: 14px; font-size: 13px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${escapeHtml(details || 'No additional specifications provided.')}</div>
            </div>

            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${escapeHtml(email)}?subject=Re:%20[TimeCubic%20RFQ%20${inquiryId}]%20Follow-up%20for%20${encodeURIComponent(organization)}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 20px; font-size: 13px; font-weight: bold; border-radius: 6px;">
                Reply to Client (${escapeHtml(email)}) &rarr;
              </a>
            </div>
          </div>

          <div style="background-color: #f8fafc; padding: 16px 24px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; text-align: center;">
            Transmitted at ${timestamp} via TimeCubic RFQ Edge Portal &bull; North Andover, MA
          </div>
        </div>
      `;

      const plainText = 
        `TimeCubic Engineering Inquiry (${inquiryId})\n` +
        `-----------------------------------------\n` +
        `Contact Name:  ${name}\n` +
        `Organization:  ${organization}\n` +
        `Work Email:    ${email}\n` +
        `Phone:         ${phone || 'Not provided'}\n` +
        `Target Model:  ${product || 'General'}\n` +
        `Sector:        ${sector || 'Not specified'}\n\n` +
        `Specifications:\n${details || 'No additional specifications provided.'}\n\n` +
        `Submitted:     ${timestamp}`;

      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: configuredFrom,
            to: [recipientEmail],
            reply_to: email,
            subject: `[RFQ ${inquiryId}] Inquiry from ${organization} (${product || 'General'})`,
            html: emailHtml,
            text: plainText
          })
        });

        const resendData = await resendRes.json();

        if (resendRes.ok) {
          emailSent = true;
          console.log(`[RFQ ${inquiryId}] Email delivered via Resend. Resend ID: ${resendData.id}`);
        } else {
          emailError = resendData.message || "Failed to dispatch via Resend";
          console.error(`[RFQ ${inquiryId}] Resend error:`, resendData);
        }
      } catch (sendErr) {
        emailError = sendErr.message;
        console.error(`[RFQ ${inquiryId}] Network error sending email:`, sendErr);
      }
    } else {
      console.warn(`[RFQ ${inquiryId}] RESEND_API_KEY environment variable is not configured.`);
    }

    return new Response(JSON.stringify({
      success: true,
      inquiryId,
      emailSent,
      emailError,
      message: emailSent 
        ? "Engineering inquiry received and emailed to engineering desk." 
        : "Engineering inquiry logged successfully."
    }), {
      status: 200,
      headers: corsHeaders
    });

  } catch (err) {
    console.error("RFQ Handler Exception:", err);
    return new Response(JSON.stringify({
      success: false,
      error: err.message || "Internal server error"
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// Simple HTML escaper to sanitize user inputs in email templates
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
