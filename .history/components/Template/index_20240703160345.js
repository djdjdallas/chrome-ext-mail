"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { useTemplate } from "@/context/TemplateContext";
import Link from "next/link";
import styles from "../../styles/Global.css";
import {
  BicepsFlexed,
  Handshake,
  Smile,
  GraduationCap,
  Star,
} from "lucide-react";

export default function EmailTemplates() {
  const [selectedTone, setSelectedTone] = useState("all");
  const [emailTemplates, setEmailTemplates] = useState([]);
  const supabase = createClientComponentClient();
  const { setSelectedTemplate } = useTemplate();

  useEffect(() => {
    const fetchEmailTemplates = async () => {
      const { data, error } = await supabase
        .from("email_templates")
        .select("*")
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
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <h2>Filter by Tone</h2>
        <div className={styles.filterButtons}>
          <Button
            variant={selectedTone === "all" ? "solid" : "outline"}
            onClick={() => setSelectedTone("all")}
            className={styles.templateButton}
          >
            All
          </Button>
          <Button
            variant={selectedTone === "professional" ? "solid" : "outline"}
            onClick={() => setSelectedTone("professional")}
            className={styles.templateButton}
          >
            Professional
          </Button>
          <Button
            variant={selectedTone === "confident" ? "solid" : "outline"}
            onClick={() => setSelectedTone("confident")}
            className={styles.templateButton}
          >
            Confident
          </Button>
          <Button
            variant={selectedTone === "friendly" ? "solid" : "outline"}
            onClick={() => setSelectedTone("friendly")}
            className={styles.templateButton}
          >
            Friendly
          </Button>
          <Button
            variant={selectedTone === "formal" ? "solid" : "outline"}
            onClick={() => setSelectedTone("formal")}
            className={styles.templateButton}
          >
            Formal
          </Button>
          <Button
            variant={selectedTone === "popular" ? "solid" : "outline"}
            onClick={() => setSelectedTone("popular")}
            className={styles.templateButton}
          >
            Popular
          </Button>
        </div>
      </div>
      <div className={styles.templateGrid}>
        {filteredTemplates.map((template) => (
          <div key={template.id} className={styles.templateCard}>
            <div className={styles.templateIcon}>
              {template.tone === "Confident" && <BicepsFlexed size={48} />}
              {template.tone === "Professional" && <Handshake size={48} />}
              {template.tone === "Friendly" && <Smile size={48} />}
              {template.tone === "Formal" && <GraduationCap size={48} />}
              {template.tone === "Popular" && <Star size={48} />}
            </div>
            <div className={styles.templateContent}>
              <h3 className={styles.templateTitle}>{template.title}</h3>
              <p className={styles.templateDescription}>
                {template.description}
              </p>
              <div className={styles.templateFooter}>
                <span className={styles.templateTone}>{template.tone}</span>
                <Link href={`/dashboard/scripts/${template.id}`} passHref>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTemplate(template)}
                    className={styles.templateButton}
                  >
                    Use Template
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
