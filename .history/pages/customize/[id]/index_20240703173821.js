import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function CustomizeEmail() {
  const router = useRouter();
  const { id } = router.query;
  const supabase = createClientComponentClient();
  const [emailTemplate, setEmailTemplate] = useState(null);
  const [customContent, setCustomContent] = useState("");

  useEffect(() => {
    if (id) {
      const fetchEmailTemplate = async () => {
        const { data, error } = await supabase
          .from("email_templates")
          .select("title, subject, body") // Ensure 'subject' and 'body' are included
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching email template:", error);
        } else {
          setEmailTemplate(data);
          setCustomContent(data.body.replace(/\\n/g, "\n")); // Format the content
        }
      };

      fetchEmailTemplate();
    }
  }, [id, supabase]);

  const handleContentChange = (e) => {
    setCustomContent(e.target.value);
  };

  const handleSave = async () => {
    // Handle saving the customized content
    console.log("Customized Content:", customContent);
  };

  if (!emailTemplate) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
          Customize Your Email Template
        </h1>
        <p className="text-muted-foreground md:text-xl">
          Create a personalized email to engage your mobile app users.
        </p>
      </div>
      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter email subject"
                className="w-full"
                value={emailTemplate.subject}
                onChange={(e) =>
                  setEmailTemplate({
                    ...emailTemplate,
                    subject: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div>
            <Label htmlFor="body">Email Body</Label>
            <Textarea
              id="body"
              placeholder="Enter email body"
              rows={6}
              value={customContent}
              onChange={handleContentChange}
            />
          </div>
          <Button type="button" className="w-full" onClick={handleSave}>
            Save Email
          </Button>
          <Link href="/email-templates">
            <Button variant="outline" className="w-full">
              Back
            </Button>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-[300px] aspect-[9/16] rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/placeholder.svg"
              alt="Mobile Email Preview"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-b from-transparent to-black/50 text-white">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">New Feature Release</h3>
                <p className="text-sm text-muted-foreground">
                  Check out the latest updates to our mobile app.
                </p>
              </div>
              <Button variant="outline" className="w-full">
                Download Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
