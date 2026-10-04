# Tracks 4 Treats website

Branded website preview and an installable Shopify Online Store 2.0 theme.

- `dist/`: static website, interactive five-stage dog experience, and branded booking preview.
- `shopify/theme/`: Shopify theme source.
- `shopify/tracks4treats-theme.zip`: uploadable theme package.
- `shopify/membership-products.csv`: draft membership import, with Biweekly, Weekly, and Twice a week options for 1–4 dogs.
- [Shopify setup instructions](shopify/README.md).

## Preview locally

Run `python3 -m http.server 4317 --directory dist` and open http://localhost:4317/.

## Integration status

The old Setmore footer embed has been removed. Booking is a branded on-site design preview: it does not reserve appointments or take payments. Shopify products support native selling plans, but store configuration, subscription app setup, and a secure scheduling backend remain necessary for live transactions. The confidence chart uses illustrative data, not actual customer records.

## Validation

Shopify Theme Check passed without errors or warnings. Interactive stages, animation pause, booking navigation, and local selling-plan price/availability behavior were browser-tested. Live Shopify checkout and scheduling require account access before end-to-end verification.
