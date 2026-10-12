/**
 * CHOICE PROPERTIES — SHARED CREDENTIALS CONFIG
 * =============================================
 * This file is COMMITTED to the repo intentionally.
 *
 * It contains:
 *  - The public Supabase URL (safe to share — embedded in site JS)
 *  - The Supabase API key used to READ the shared credentials table.
 *    NOTE: This is the service_role key, which is ALREADY publicly
 *    committed in scraper/.env. It is used here so any fork can
 *    load credentials with zero restrictions.
 *  - A shared WRITE_SECRET that gates writes to the credentials table.
 *
 * The WRITE_SECRET is intentionally public (committed) so that ANY fork,
 * user, or AI can store/update credentials. This is a deliberate trade-off
 * for open collaboration. Do NOT put truly private secrets here.
 *
 * To rotate the WRITE_SECRET, change it here AND in the Supabase
 * `credentials_config` table (key: WRITE_SECRET). All forks must pull
 * the new value.
 */
export const CREDENTIALS_CONFIG = {
  // Public Supabase project URL (safe to share)
  SUPABASE_URL: "https://poqgtsltsziuwvzskgth.supabase.co",

  // Supabase API key for reading the shared credentials table.
  // This is the service_role key — used for server-side management.
  SUPABASE_API_KEY:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDc0NTg3NywiZXhwIjoyMTA2MzIxODc3fQ.9gGmNOV20S7r0mshF5y3lkbbs-4tPjum2RUMIyCNcvA",

  // Shared write-secret — gates writes to the credentials table.
  // Intentionally public so any fork can update credentials.
  WRITE_SECRET: "progress-residential-open-collab-2026",

  // The Edge Function that stores credentials
  STORE_CREDENTIALS_FUNCTION: "store-credentials",
}