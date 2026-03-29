import { redirect } from "next/navigation";

type SignupPageProps = {
  searchParams: Promise<{ next?: string }>;
};

function sanitizeNextPath(next: string | undefined): string | undefined {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return undefined;
  }
  return next;
}

export default async function SignupPage({ searchParams }: SignupPageProps): Promise<never> {
  const resolved = await searchParams;
  const next = sanitizeNextPath(resolved.next);
  const params = new URLSearchParams();
  params.set("tab", "signup");
  if (next) {
    params.set("next", next);
  }
  redirect(`/login?${params.toString()}`);
}
