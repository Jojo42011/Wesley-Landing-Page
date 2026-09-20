# Next phase: live launch

The current build is intentionally a UI preview. Nothing is posted, emailed, or sent to Brivity.

## Content inputs

- Wesley's approved contact details, brokerage name, and verified license information.
- Completed agent specific Information About Brokerage Services document.
- Actual VSL and a WebVTT English caption file; configure both URLs in `src/config.ts`.
- Approved headshot or local property photography if desired. Current images are explicitly inspiration.
- Final approval of draft first person copy.

The site currently links to the [TREC Consumer Protection Notice](https://www.trec.texas.gov/forms/consumer-protection-notice). Before conducting brokerage activities, provide the completed IABS and other broker required disclosures. Review the applicable requirements using [TREC's official materials](https://www.trec.texas.gov/sites/default/files/2024-2025%20Legal%20Update%20Student%20Manual_edition11.1.pdf). The preview dialog is not a substitute for a completed disclosure.

## Delivery architecture

Add a Vercel server function at `/api/leads`. The browser should send one validated payload to this endpoint. Keep all email and Brivity credentials in Vercel environment variables, never in client side `VITE_` variables or the repository.

Use the exported `Answers` type as the starting contract, then validate it independently on the server. Check length limits, email format, allowed choice values, and affirmative live contact consent. Add abuse controls, origin checks, and rate limiting. Do not log contact details.

Confirm the actual Brivity account's supported lead ingestion method before implementing it. This repository does not assume or invent a Brivity API endpoint. The owner's account may support an API, integration, or lead routing email workflow; choose from verified account capabilities.

The server should track delivery state and use idempotency so retries cannot create duplicate CRM leads or email notifications. Send success only after accepted delivery or durable queueing. Use an honest retry state on failure. Do not rely on two uncoordinated browser requests for email and CRM.

Replace the preview acknowledgment with approved live contact language. Separate any optional marketing permissions from an inquiry response. Replace the completion preview notice with the actual response process and timing once confirmed.

## Release steps

1. Connect and verify delivery to an authorized test inbox and Brivity test lead destination.
2. Test failure, retry, duplicate submission, mobile, and keyboard paths.
3. Publish an accurate privacy policy describing the real processors and retention practices.
4. Supply real brokerage disclosures and verified content.
5. Remove the preview labels only once the experience is genuinely live.
6. Remove `noindex, nofollow` from `index.html`; add the production canonical URL and absolute social sharing image URL.
7. Run a production performance and accessibility review on Vercel before sending paid traffic.
