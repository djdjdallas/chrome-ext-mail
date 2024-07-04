"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { useTemplate } from "@/context/TemplateContext";
import Link from "next/link";
import {
  BicepsFlexed,
  Handshake,
  Smile,
  GraduationCap,
  Star,
} from "lucide-react";

export default function EmailTemplates({ navigateToPage }) {
  const [selectedTone, setSelectedTone] = useState("all");
  const [emailTemplates, setEmailTemplates] = useState([]);
  const supabase = createClientComponentClient();
  const { setSelectedTemplate } = useTemplate();

  useEffect(() => {
    const fetchEmailTemplates = async () => {
      const { data, error } = await supabase
        .from("email_templates")
        .select("id, title, description, subject, body, tone, image_url") // Ensure 'subject' and 'body' are included
        .order("tone", { ascending: true });

      if (error) {
        console.error("Error fetching email templates:", error);
      } else {
        const sortedTemplates = data.sort((a, b) =>
          a.tone === "Popular" ? -1 : b.tone === "Popular" ? 1 : 0
        );
        setEmailTemplates(sortedTemplates);
      }
    };

    fetchEmailTemplates();
  }, [supabase]);

  const filteredTemplates =
    selectedTone === "all"
      ? emailTemplates
      : emailTemplates.filter(
          (template) =>
            template.tone.toLowerCase() === selectedTone.toLowerCase()
        );

  return (
    <div className="container">
      <div className="filter-container">
        <h2>Filter by Tone</h2>
        <div className="filter-buttons">
          <Button
            variant={selectedTone === "all" ? "solid" : "outline"}
            onClick={() => setSelectedTone("all")}
            className="template-button"
          >
            All
          </Button>
          <Button
            variant={selectedTone === "professional" ? "solid" : "outline"}
            onClick={() => setSelectedTone("professional")}
            className="template-button"
          >
            Professional
          </Button>
          <Button
            variant={selectedTone === "confident" ? "solid" : "outline"}
            onClick={() => setSelectedTone("confident")}
            className="template-button"
          >
            Confident
          </Button>
          <Button
            variant={selectedTone === "friendly" ? "solid" : "outline"}
            onClick={() => setSelectedTone("friendly")}
            className="template-button"
          >
            Friendly
          </Button>
          <Button
            variant={selectedTone === "formal" ? "solid" : "outline"}
            onClick={() => setSelectedTone("formal")}
            className="template-button"
          >
            Formal
          </Button>
          <Button
            variant={selectedTone === "popular" ? "solid" : "outline"}
            onClick={() => setSelectedTone("popular")}
            className="template-button"
          >
            Popular
          </Button>
        </div>
      </div>
      <div className="template-grid">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="template-card">
            <div className="template-icon">
              {template.tone === "Confident" && <BicepsFlexed size={48} />}
              {template.tone === "Professional" && <Handshake size={48} />}
              {template.tone === "Friendly" && <Smile size={48} />}
              {template.tone === "Formal" && <GraduationCap size={48} />}
              {template.tone === "Popular" && <Star size={48} />}
            </div>
            <div className="template-content">
              <h3 className="template-title">{template.title}</h3>
              <p className="template-description">{template.description}</p>
              <div className="template-footer">
                <span className="template-tone">{template.tone}</span>
                <Link href={`/customize/${template.id}`} passHref>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTemplate(template)}
                    className="template-button"
                  >
                    Customize
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
