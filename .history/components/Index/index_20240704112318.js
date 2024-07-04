"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Header from "@/components/Header"; // Make sure the import path is correct
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Index({ navigateToPage }) {
  const [user, setUser] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      } else if (error || !session) {
        console.error("Error fetching user or no session:", error?.message);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <div className="flex flex-col min-h-[100dvh] max-w-[350px] mx-auto pt-10">
      <Header />
      <main className="flex-1 mt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none max-w-[350px]">
                    Streamline Your SaaS Email Management
                  </h1>
                  <p className="max-w-[350px] text-muted-foreground md:text-xl">
                    Mail Blitz Email CRM is the all-in-one solution for SaaS
                    owners to manage customer emails, segment your audience, and
                    gain valuable insights.
                  </p>
                </div>
                <div className="flex flex-col gap-2 ">
                  <Link href="#" prefetch={false}>
                    <div className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                      Get Started
                    </div>
                  </Link>
                  <Link href="#" prefetch={false}>
                    <div className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                      Learn More
                    </div>
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Email Management
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline Your Email Workflow
                </h2>
                <p className="max-w-[350px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mail Blitz Email CRM provides a centralized hub to manage all
                  your customer emails, allowing you to respond quickly,
                  automate workflows, and maintain a consistent brand voice.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Email Management"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1 max-w-[335px]">
                      <h3 className="text-xl font-bold">Centralized Inbox</h3>
                      <p className="text-muted-foreground">
                        Manage all your customer emails in one place, with
                        advanced search and filtering capabilities.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Automated Workflows</h3>
                      <p className="text-muted-foreground max-w-[330px]">
                        Create custom email templates and automate repetitive
                        tasks to save time and ensure consistency.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Detailed Analytics</h3>
                      <p className="text-muted-foreground max-w-[350px]">
                        Gain valuable insights into your customer
                        communications, including open rates, response times,
                        and more.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Customer Segmentation
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl max-w-[350px]">
                  Understand Your Customers Better
                </h2>
                <p className="max-w-[350px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mail Blitz Email CRM's advanced segmentation tools allow you
                  to group your customers based on various criteria, enabling
                  personalized communication and targeted campaigns.
                </p>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Customer Segmentation"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Analytics"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Analytics
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Gain Valuable Insights
                </h2>
                <p className="max-w-[350px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mail Blitz Email CRM's comprehensive analytics dashboard
                  provides real-time insights into your email performance,
                  customer engagement, and campaign effectiveness, helping you
                  make data-driven decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Streamline Your SaaS Email Management?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up for Mail Blitz Email CRM and start optimizing your
                customer communications today.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-lg flex-1"
                />
                <Button type="submit">Get Started</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Sign up to start your free trial.{" "}
                <Link
                  href="#"
                  className="underline underline-offset-2"
                  prefetch={false}
                >
                  Terms &amp; Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Mail Blitz Email CRM. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" prefetch={false}>
            <div className="text-xs hover:underline underline-offset-4">
              Terms of Service
            </div>
          </Link>
          <Link href="#" prefetch={false}>
            <div className="text-xs hover:underline underline-offset-4">
              Privacy
            </div>
          </Link>
        </nav>
      </footer>
    </div>
  );
}
