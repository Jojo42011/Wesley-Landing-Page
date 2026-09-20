# Research and conversion rationale

Researched September 20, 2026. These sources guide design decisions. They do not establish an optimal funnel or predict a conversion rate for this agent. Several findings come from general usability or ecommerce contexts; applying them to real estate lead generation is a design hypothesis to test with actual traffic.

## First impressions and perceived quality

[Nielsen Norman Group: First Impressions Matter](https://www.nngroup.com/articles/first-impressions-human-automaticity/) describes how immediate visual impressions influence perceptions of aesthetics, usability, and credibility. The implementation uses two type families, a restrained palette, consistent spacing, and a recognizable page hierarchy.

[Nielsen Norman Group: The Aesthetic Usability Effect](https://www.nngroup.com/articles/aesthetic-usability-effect/) explains that appealing visual design can make interfaces seem easier to use. Beauty does not excuse usability failures. The page therefore pairs editorial styling with ordinary buttons, visible labels, clear focus indicators, and a native modal dialog.

## Trust and clarity

[Nielsen Norman Group: Trustworthiness in Web Design](https://www.nngroup.com/articles/trustworthy-design/) identifies visual quality, disclosure, comprehensive and current content, and connection to the outside web as credibility factors. The page states what the preview does, labels inspiration images, and avoids unsupported social proof. Full brokerage identity and live privacy practices remain required inputs before lead collection.

## Lower cognitive effort

[Baymard: Required and Optional Form Fields](https://baymard.com/research-articles/required-optional-form-fields) shows that visitors can misinterpret unlabeled optional fields. The contact step explicitly marks every field. Phone and preferred call time are optional. Name is one field rather than separate first and last inputs.

[Baymard: Drop Down Usability](https://baymard.com/research-articles/drop-down-usability) supports choosing controls appropriate to the number of options. Short preference lists are visible radio choices. A small optional call time list uses a select control.

The five step format, progress indicator, optional exploratory answers, and preservation of previous answers are implementation decisions intended to reduce perceived effort. These are hypotheses, not claims that more steps always increase conversions.

## Performance and mobile

[Google: Mobile Page Speed Benchmarks](https://www.thinkwithgoogle.com/_qs/documents/57/mobile-page-speed-new-industry-benchmarks.pdf) reports associations between mobile performance and abandonment. This older study supports prioritizing speed, not promising a specific lift today. This build serves local fonts and images, defers the lower image, uses a high priority hero image, and loads no video before intent is expressed.

## Message strategy

The lead promise is about finding a home that fits the visitor's life. This is a relevance and emotional framing hypothesis: readers can picture their own next chapter without being told how they should live. Copy remains inclusive and does not steer buyers using demographic assumptions. Geographic choices describe areas only; no unsupported safety, school, appreciation, or investment claims are made.

The page has one primary destination: the buyer brief. Following the design review, supporting website sections were removed to keep the page focused on a headline, a small VSL, and the questionnaire. The first step asks for timing rather than contact information. Contact details come after preferences, with no fake success message or hidden submission.

## Next phase experiments

After the actual VSL, brokerage disclosures, and lead delivery are connected:

1. Compare the lifestyle headline against a more direct search benefit headline.
2. Compare VSL engagement and qualified lead completion. Do not treat video plays alone as success.
3. Measure entry and abandonment per questionnaire step, without recording names or contact details in analytics.
4. Test one form length change at a time. Watch lead quality, not only raw submissions.
5. Segment findings by traffic source and device. Keep ad promises consistent with the page.

Use a defined primary metric, enough traffic, and a predetermined evaluation window. No tracking is installed in this preview.
