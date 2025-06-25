import { redirect } from 'next/navigation';

/**
 * Redirect /docs routes to the documentation subdomain
 * This ensures that any links to /docs on the main site
 * properly redirect to docs.formerlyincarcerated.org
 */
export async function GET() {
  redirect('https://docs.formerlyincarcerated.org');
}

// Handle all HTTP methods
export const POST = GET;
export const PUT = GET;
export const DELETE = GET;
export const PATCH = GET;
export const HEAD = GET;
export const OPTIONS = GET;
