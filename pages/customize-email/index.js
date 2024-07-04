import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Webcam } from "lucide-react";

export default function CustomizeEmailView() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [user, setUser] = useState(null);
  const [customContent, setCustomContent] = useState("");
  const [chatgptResponse, setChatgptResponse] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      } else {
        if (error) {
          console.error("Error fetching user or no session:", error?.message);
        }
        router.push("/#");
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          router.push("/#");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, router]);

  const handleContentChange = (e) => {
    setCustomContent(e.target.value);
  };

  const handleChatgptResponseChange = (e) => {
    setChatgptResponse(e.target.value);
  };

  const handleCustomizeWithChatGPT = async () => {
    try {
      const response = await fetch("/api/customize-with-chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailBody: customContent }),
      });

      const data = await response.json();
      if (response.ok) {
        setChatgptResponse(data.customizedEmail);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error customizing with ChatGPT:", error);
    }
  };

  const handleSave = async () => {
    console.log("Customized Content:", customContent);
    console.log("ChatGPT Response:", chatgptResponse);

    const { data, error } = await supabase.from("email_tracking").insert([
      {
        user_id: user.id, // assuming user is available in your state
        email: customContent,
        subject,
        tracked: true,
      },
    ]);

    if (error) {
      console.error("Error saving email:", error);
    } else {
      console.log("Email saved successfully:", data);
      router.push("/template");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-4xl mt-10 mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
          Customize Your Email Template
        </h1>
        <p className="text-muted-foreground md:text-xl">
          Create a personalized email to engage your mobile app users.
        </p>
      </div>
      <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter email subject"
                className="w-full"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="body">Email Body</Label>
            <Textarea
              id="body"
              placeholder="Enter email body"
              rows={10}
              value={customContent}
              onChange={handleContentChange}
            />
          </div>
          <Button
            type="button"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleCustomizeWithChatGPT}
          >
            <Webcam className="w-5 h-5" />
            Customize with ChatGPT
          </Button>
          <div>
            <Label htmlFor="chatgpt-response">ChatGPT Response</Label>
            <Textarea
              id="chatgpt-response"
              placeholder="Enter ChatGPT response"
              rows={10}
              value={chatgptResponse}
              onChange={handleChatgptResponseChange}
            />
          </div>
          <Button type="button" className="w-full" onClick={handleSave}>
            Save Email
          </Button>
          <Link href="/template">
            <Button variant="outline" className="w-full">
              Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}