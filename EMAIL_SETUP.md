# Contact Form Email Setup Guide

Your contact form is now configured to send emails! Follow these steps to complete the setup:

## Current Status
✅ Contact form UI with validation
✅ API endpoint created
✅ Success/error messages
✅ Loading states
✅ Form submission handling

## To Receive Emails - Choose One Option:

### Option 1: Resend (Recommended - Easiest Setup) ⭐

1. **Sign up for Resend**
   - Go to https://resend.com
   - Create a free account (100 emails/day free)

2. **Get your API key**
   - After signup, go to API Keys section
   - Create a new API key
   - Copy the key (starts with `re_`)

3. **Install Resend package**
   ```bash
   npm install resend
   ```

4. **Add environment variable**
   - Create a file named `.env.local` in your project root
   - Add this line:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   CONTACT_EMAIL=info@austinwavy.com
   ```

5. **Verify your domain (Optional but recommended)**
   - In Resend dashboard, add your domain (austinwavy.com)
   - Add the DNS records they provide
   - Once verified, update the API route `from` field to use your domain

That's it! Your form will now send emails.

### Option 2: Gmail (Free, but less reliable)

1. **Install nodemailer**
   ```bash
   npm install nodemailer
   ```

2. **Setup Gmail App Password**
   - Go to your Google Account settings
   - Enable 2-factor authentication
   - Generate an App Password for "Mail"

3. **Create alternative API route**
   - Update the API route to use nodemailer with Gmail SMTP

### Option 3: SendGrid (More features)

1. Sign up at https://sendgrid.com
2. Get API key
3. Install: `npm install @sendgrid/mail`
4. Add `SENDGRID_API_KEY` to `.env.local`

## Testing Without Email Service

The form currently works without any email service! It will:
- Log submissions to your terminal/console
- Show success message to users
- Validate all fields

You can test it right now and see the submissions in your dev server console.

## Security Notes

- ✅ Environment variables are used for sensitive keys
- ✅ `.env.local` is automatically ignored by git
- ✅ Email validation is performed
- ✅ Rate limiting recommended for production (add later)

## Next Steps

1. Install Resend: `npm install resend`
2. Create `.env.local` file with your API key
3. Restart your dev server: `npm run dev`
4. Test the form!

## Troubleshooting

**Form submits but no email received?**
- Check your terminal for console logs
- Verify API key in `.env.local`
- Restart dev server after adding env variables
- Check Resend dashboard for delivery status

**Email goes to spam?**
- Verify your domain in Resend
- Add SPF and DKIM records
- Use a real "from" email address

Need help? Check the console logs for detailed error messages.
