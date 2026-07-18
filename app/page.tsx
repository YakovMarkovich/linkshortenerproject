import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="w-full max-w-5xl space-y-12">
        <section className="space-y-6 text-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-[0.2em]">
            Link Shortener
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Create clean, trackable links in seconds
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            Shorten long URLs, keep everything organized in one dashboard, and
            share links that are simple to remember.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <form action="/sign-up">
              <Button size="lg" type="submit">
                Get Started for Free
              </Button>
            </form>
            <form action="/sign-in">
              <Button variant="outline" size="lg" type="submit">
                Sign In
              </Button>
            </form>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold">Instant Short Links</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Turn long URLs into concise links your audience can trust and
              remember.
            </p>
          </article>
          <article className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold">Centralized Dashboard</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage and review your links from one place with a simple,
              focused workspace.
            </p>
          </article>
          <article className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold">Secure Account Access</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Use Clerk-powered authentication to keep your links and account
              protected.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
