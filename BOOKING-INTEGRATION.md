# Tracks 4 Treats custom booking

The `/booking/` route is a design preview of the intended native booking interface. It uses only Tracks 4 Treats branding. The existing homepage booking remains operational while account connections are pending.

## Implemented

- Four service choices matching the public booking prices and appointment durations.
- Date and time selection with prominent example-availability labels.
- Customer, arrival-address and per-dog intake fields, held only in page memory.
- Editable visit summary and review screen.
- Disabled payment/confirmation control. No customer data is submitted; no booking is created and no payment is taken.
- Responsive keyboard-accessible flow; sample details use reserved example email and fictional contact information.

## Required for activation

1. Confirm Setmore Pro and approved API access. Setmore supplies a refresh token after approval. Configure credentials server-side through the hosting provider's secrets manager, never in frontend source, chat, or Shopify theme settings.
2. Confirm the merchant's Square account, application access and location. The current Setmore–Square embed connection must not be assumed to provide a payment API for a new custom frontend.
3. Build authenticated server-side adapters for services, staff, real slots, customers and appointments. Use provider-returned IDs; public Booking Page link IDs are not assumed to be API identifiers. Derive prices and durations on the server.
4. Verify service-area rules, timezone, booking lead time, travel buffers, intake requirements, cancellation/rescheduling policy and notification behavior for API-created appointments.
5. Integrate Square Web Payments SDK tokenization with a server-side Payments API flow. Never accept raw card numbers in our fields or server. Confirm the provider-supported payment/booking ordering, recheck slot availability, use idempotency keys and durable reconciliation, and handle conflicts or partial failures without presenting false confirmations.
6. Test with a separate Setmore account (their API documentation says there is no sandbox) and Square sandbox before enabling live payments. Verify reminders, duplicate prevention, failed-payment recovery, cancellations/refunds, mobile wallets and keyboard access.
7. Once proven, replace the homepage iframe with the native component and expose it as a Shopify section backed by a secure server endpoint. Keep secrets out of Liquid and JavaScript. Do not switch the domain or Shopify theme until store access is available and the live flow has passed verification.

## Official references

- https://www.setmore.com/developers
- https://developers.setmore.com/
- https://support.setmore.com/en/articles/491017-remove-setmore-branding-from-your-booking-page
- https://developer.squareup.com/docs/web-payments/overview

Setmore Pro also has a native 'Hide Setmore’s Branding' setting for the existing embed. That is an alternative to a fully custom interface; it does not make this preview live.
