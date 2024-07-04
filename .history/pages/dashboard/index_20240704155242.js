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
// import { MailIcon, EyeIcon, LinkIcon, UnlinkIcon } from "@/components/ui/icons";
import { MailIcon, EyeIcon, LinkIcon, Unlink2 } from "lucide-react";

export default function Dashboard() {
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
    <div className="flex flex-col min-h-screen bg-muted/40 mt-20">
      <div>
        <h1>Dashboard</h1>
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
              <div className="text-2xl font-bold">12,345</div>
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
              <div className="text-2xl font-bold">24.5%</div>
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
              <div className="text-2xl font-bold">8.2%</div>
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
              <div className="text-2xl font-bold">2.1%</div>
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
