# Tracks 4 Treats — Shopify theme

This is an installable custom Shopify Online Store 2.0 theme. It preserves the original logo, orange, blue, warm cream, and green. The homepage includes an interactive five-phase dog confidence journey, real business photography, an illustrative progress chart, pricing, FAQs, and an invitation to the dedicated branded booking page. No Setmore widget or branding appears in the storefront files.

## Included

- `tracks4treats-theme.zip`: uploadable theme, with Liquid sections, JSON templates, theme settings, app blocks, native product forms and cart.
- `membership-products.csv`: one **draft, unpublished** membership product with 12 variants: 1–4 dogs × Biweekly, Weekly, Twice a week.
- `theme/`: editable theme source.
- `theme-check.json`: Shopify Theme Check output (empty array means no issues).

## Install as a draft theme

1. In Shopify, open Online Store → Themes → Add theme → Upload zip file. Upload `tracks4treats-theme.zip` and keep it unpublished while configuring.
2. Import `membership-products.csv` as a new draft product. Review prices, taxes, and policies before publishing. Do not overwrite an existing product with the same handle without reviewing the changes.
3. Install Shopify Subscriptions or another compatible subscription app. Configure a supported payment provider, attach selling plans to all membership variants, and make the product subscription-only. The CSV does not create selling plans or enable recurring charges.
4. Assign the **product.membership** template to the membership product. Configure the membership product pickers in the homepage Memberships section and Branded booking section. The native product page lets customers independently choose dog count and visit frequency, then submits Shopify's actual variant and selling-plan IDs to the cart. Cart checkout remains Shopify checkout.
5. Create a page with handle **booking**, assign **page.booking**, and choose it in the theme's global Booking page setting. Create a Memberships page with **page.memberships** if desired. Update menus and all service-area, waitlist, policy, and customer portal links.
6. Set logo, colors, fonts, photography, navigation, and contact information in the theme editor. The Dog confidence journey section supports an editable heading, introduction, and real session image. The example chart is educational; it does not display actual customer records.

## Visit frequency and renewal billing

| Customer choice | Visits per four weeks | Example 1-dog amount per four weeks |
| --- | ---: | ---: |
| Biweekly (every other week) | 2 | $120 |
| Weekly | 4 | $220 |
| Twice a week | 8 | $400 |

The draft uses rates from the business's published plans, multiplied by visits in a **four-week** period. Four weeks is not a calendar month. The example renewal cadence is every four weeks; confirm this with the merchant and configure the matching actual selling plan before launch. Live checkout prices and renewal terms come from Shopify. Subscription purchase does not itself schedule appointments or create visit credits.

## Booking connection still required

The branded four-step interface is currently a **design preview**. It does not fetch real slots, reserve appointments, collect payments, save customer details, or create subscription contracts. Public Shopify mode defaults to a call-to-book message until a connection exists; the theme editor can show the example interface. There is no hidden fallback to a Setmore iframe.

For live service scheduling, implement and host the private booking service and connect it through a branded booking app/app block. A Shopify theme alone cannot securely store private scheduling credentials. Setmore API access, account approval and store access are still needed if Setmore remains the scheduling backend. The server must validate service area and customer input, fetch current services/staff/slots, recheck availability before appointment creation, handle duplicate requests and API failures, and return confirmed appointments. Keep tokens out of theme assets/settings.

For memberships, connect verified Shopify subscription/order events to visit entitlements and scheduling. Renewal payments do not automatically reserve recurring slots; cancellation, failed payments, visit redemption, and rescheduling need backend handling. Square arrangements do not migrate automatically to Shopify subscriptions.

## Verification and launch

- Shopify Theme Check: zero errors and warnings.
- JavaScript syntax checked.
- Local browser checks: five-stage selection, pause control, no homepage iframe, and branded booking navigation.
- Local selling-plan fixture: selected variants and prices update; missing selling plans and sold-out variants disable purchase. No transactions submitted.
- Actual Shopify rendering, subscription checkout, renewal/cancellation behavior, customer portal, and scheduling API cannot be tested until store/app access is provided.

Before publishing, configure real selling plans and gateway, confirm merchant pricing/policies, test a purchase in the store's supported test mode, verify appointment creation and entitlement handling, check phone/mobile layouts and app blocks, and establish redirects from the previous site. This package has not been published to Shopify and is not a Shopify Theme Store certification.
