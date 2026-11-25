const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || (productionUrl ? `https://${productionUrl}` : "http://localhost:3000");

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
