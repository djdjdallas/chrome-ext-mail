import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
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
    <div className="container">
      <h1>Customize Email Template</h1>
      <h2>{emailTemplate.title}</h2>
      <p>{emailTemplate.subject}</p>
      <textarea
        value={customContent}
        onChange={handleContentChange}
        className="customize-textarea"
      />
      <div className="button-container">
        <Button onClick={handleSave} className="save-button">
          Save
        </Button>
        <Link href="/template">
          <Button className="back-button">Back</Button>
        </Link>
      </div>
    </div>
  );
}
