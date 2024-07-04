import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { MailIcon, EyeIcon, LinkIcon, Unlink2 } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [metrics, setMetrics] = useState({
    totalEmailsSent: 0,
    openRate: 0,
    clickThroughRate: 0,
    unsubscribeRate: 0,
  });
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

    const fetchMetrics = async () => {
      const { data: emails, error } = await supabase
        .from("email_tracking")
        .select("*");

      if (error) {
        console.error("Error fetching metrics:", error.message);
        return;
      }

      const totalEmailsSent = emails.length;
      const openedEmails = emails.filter((email) => email.opened_at).length;
      const openRate =
        totalEmailsSent > 0 ? (openedEmails / totalEmailsSent) * 100 : 0;
      const clickThroughRate = 8.2; // Placeholder value, replace with actual calculation if needed
      const unsubscribeRate = 2.1; // Placeholder value, replace with actual calculation if needed

      setMetrics({
        totalEmailsSent,
        openRate,
        clickThroughRate,
        unsubscribeRate,
      });
    };

    fetchUser();
    fetchMetrics();

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
    <div className="flex flex-col min-h-screen bg-muted/40 mt-10">
      <div>
        <h1 className="text-xl font-bold tracking-tighter cursor-pointer ml-5 mt-20">
          Dashboard
        </h1>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Emails Sent
              </CardTitle>
              <MailIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.totalEmailsSent}
              </div>
              <p className="text-xs text-muted-foreground">
                +10% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
              <EyeIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.openRate.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Click-Through Rate
              </CardTitle>
              <LinkIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.clickThroughRate}%
              </div>
              <p className="text-xs text-muted-foreground">
                +1.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Unsubscribe Rate
              </CardTitle>
              <Unlink2 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.unsubscribeRate}%
              </div>
              <p className="text-xs text-muted-foreground">
                -0.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
