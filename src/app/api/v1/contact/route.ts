import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// 1. Initialize Resend engine using the environment variable token
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // 2. Parse the incoming request payload matrix
    const body = await request.json();
    const { name, email, topic, message } = body;

    // 3. Strict structural validation catch
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing mandatory payload fields (name, email, or message)' },
        { status: 400 }
      );
    }

    // 4. Map client tokens to human-readable intent categories
    const topicLabels: Record<string, string> = {
      general: 'General Platform Inquiry',
      enterprise: 'Enterprise Volumetric Tiers',
      technical: 'Custom Compression Mode Integration',
      security: 'Data Compliance Verification',
    };
    const friendlyTopic = topicLabels[topic] || topicLabels.general;

    // 5. Execute transmission to your personal mailbox
    // NOTE: 'onboarding@resend.dev' is Resend's default free sandbox sending domain.
    const data = await resend.emails.send({
      from: 'SiftPrompt Leads <onboarding@resend.dev>',
      to: process.env.NOTIFICATION_EMAIL || 'buddyhenderson04@gmail.com', 
      subject: `📡 [SiftPrompt Lead] - ${friendlyTopic}`,
      html: `
        <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; background-color: #09090b; color: #f4f4f5; padding: 32px; border: 1px solid #27272a; border-radius: 12px; max-w: 600px; margin: 0 auto;">
          <div style="border-bottom: 1px solid #1c1c1e; padding-bottom: 16px; margin-bottom: 24px;">
            <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #10b981;">// Inbound Routing Hub Pipeline</span>
            <h2 style="font-size: 20px; font-weight: 900; color: #ffffff; margin: 4px 0 0 0;">SiftPrompt.<span style="color: #10b981;">lead</span></h2>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 6px 0; font-size: 11px; color: #71717a; text-transform: uppercase;">// Developer Name</p>
            <p style="margin: 0; font-size: 14px; color: #e4e4e7; font-weight: bold;">${name}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 6px 0; font-size: 11px; color: #71717a; text-transform: uppercase;">// Secure Email Address</p>
            <p style="margin: 0; font-size: 14px; color: #e4e4e7;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
          </div>
          
          <div style="margin-bottom: 24px;">
            <p style="margin: 0 0 6px 0; font-size: 11px; color: #71717a; text-transform: uppercase;">// Inquiry Intent Matrix</p>
            <p style="margin: 0; font-size: 14px; color: #10b981; font-weight: bold;">${friendlyTopic}</p>
          </div>
          
          <div>
            <p style="margin: 0 0 8px 0; font-size: 11px; color: #71717a; text-transform: uppercase;">// Payload Message Context</p>
            <div style="background-color: #000000; border: 1px solid #27272a; border-radius: 8px; padding: 16px; color: #a1a1aa; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('❌ API Contact Routing Failure:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal platform execution fault.' },
      { status: 500 }
    );
  }
}