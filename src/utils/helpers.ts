import { Resend } from 'resend'
import { NotificationDto } from './validations'

export const resendEmailService = () => {
  const apiKey = process.env.RESEND_API_KEY
  const resend = new Resend(apiKey)

  const sendEmail = async ({ receiver, subject, html, from }: NotificationDto) => {
    if (receiver) {
      const platform = '"FAST-RELAYS" <onboarding@resend.dev>';

      const {data, error} = await resend.emails.send({
        subject,
        to: receiver,
        html: stripHtml(html),
        from: from || platform,
      })

      if (error) {
        throw error
      }

      return data.id
    }

    return Promise.reject("failed_to_send_email")
  }

  return { sendEmail }
}

function stripHtml(html?: string): string {
  if (html) {
    return html.replace(/<[^>]*>?/gm, "");
  }
  return "";
}
