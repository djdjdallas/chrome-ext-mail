// lib/withAuth.js
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
      const checkUser = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          router.push("/login"); // Redirect to login page if not authenticated
        }
      };

      checkUser();
    }, [router, supabase]);

    return <Component {...props} />;
  };
}
