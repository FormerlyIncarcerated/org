/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Social Media Links
  readonly VITE_SOCIAL_GITHUB?: string;
  readonly VITE_SOCIAL_TWITTER?: string;
  readonly VITE_SOCIAL_LINKEDIN?: string;
  readonly VITE_SOCIAL_DISCORD?: string;
  readonly VITE_SOCIAL_YOUTUBE?: string;

  // Company Information
  readonly VITE_COMPANY_NAME?: string;
  readonly VITE_COMPANY_URL?: string;
  readonly VITE_COMPANY_EMAIL?: string;

  // Donation Information
  readonly VITE_DONATION_SOLANA_ADDRESS?: string;
  readonly VITE_DONATION_MESSAGE?: string;

  // Analytics (Optional)
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_SENTRY_DSN?: string;

  // API Configuration (if needed)
  readonly VITE_API_URL?: string;
  readonly VITE_API_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
