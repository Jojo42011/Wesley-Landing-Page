# Next phase: live launch

The current build is intentionally a UI preview. Nothing is posted, emailed, or sent to Brivity.

## Content inputs

- Wesley's approved contact details, verified license information, and confirmation from Shawn that Dulin Real Estate is an approved advertising name. The verified brokerage name is The Branch Real Estate Group Inc.
- Wesley's completed agent specific Information About Brokerage Services document. Add its URL to `src/config.ts` and render the exact required homepage link text at the required size.
- Actual VSL and an English caption file; configure both URLs in `src/config.ts`.
- Approved headshot and genuine local photography. Current image is only inspiration.
- Wesley's calendar booking URL, social profile URLs, and a dedicated new construction search URL if one exists.
- Two or three client reviews with names and permission to display them.
- Approved response timing, final inquiry consent wording, and final marketing copy.
- Supabase project and server credentials, verified Brivity ingestion path, Wesley notification destination, and analytics or ad platform IDs.

The site currently links to the [TREC Consumer Protection Notice](https://www.trec.texas.gov/forms/consumer-protection-notice). TREC requires a homepage link to a [completed IABS](https://www.trec.texas.gov/information-about-brokerage-services-form) with specified wording and minimum text size. The preview dialog is not a substitute for a completed disclosure.

## Delivery architecture

Add a Vercel server function at `/api/leads`. The browser should send one validated payload to this endpoint. Keep all email and Brivity credentials in Vercel environment variables, never in client side `VITE_` variables or the repository.

Use the exported `Answers` type as the starting contract, then validate it independently on the server. Check length limits, email format, allowed choice values for the multiple choice steps, the free text location answer, and affirmative live contact consent. Add abuse controls, origin checks, and rate limiting. Do not log contact details.

Confirm the actual Brivity account's supported lead ingestion method before implementing it. This repository does not assume or invent a Brivity API endpoint. The owner's account may support an API, integration, or lead routing email workflow; choose from verified account capabilities.

The server should track delivery state and use idempotency so retries cannot create duplicate CRM leads or email notifications. Send success only after accepted delivery or durable queueing. Use an honest retry state on failure. Do not rely on two uncoordinated browser requests for email and CRM.

Review the draft inquiry call and text consent with Shawn before live collection. Separate any optional marketing permissions from an inquiry response. Replace the completion preview notice with the actual response process and timing once confirmed.

## Release steps

1. Connect and verify delivery to an authorized test inbox and Brivity test lead destination.
2. Test failure, retry, duplicate submission, mobile, and keyboard paths.
3. Publish an accurate privacy policy describing the real processors and retention practices.
4. Supply real brokerage disclosures and verified content.
5. Remove the preview labels only once the experience is genuinely live.
6. Remove `noindex, nofollow` from `index.html`; add the production canonical URL and absolute social sharing image URL.
7. Run a production performance and accessibility review on Vercel before sending paid traffic.
