"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import "styles/globals.css";

export default function EmailTemplates({ navigateToPage }) {
  const [selectedTone, setSelectedTone] = useState("all");
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { setSelectedTemplate } = useTemplate();

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
        router.push("/"); // Redirect to home if no user is logged in
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          router.push("/"); // Redirect to home if user signs out
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, router]);

  const fetchEmailTemplates = async () => {
    const { data, error } = await supabase
      .from("email_templates")
      .select("id, title, description, subject, body, tone, image_url")
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

  useEffect(() => {
    if (user) {
      fetchEmailTemplates();
    }
  }, [user]);

  const filteredTemplates =
    selectedTone === "all"
      ? emailTemplates
      : emailTemplates.filter(
          (template) =>
            template.tone.toLowerCase() === selectedTone.toLowerCase()
        );

  if (!user) {
    return null; // Optionally, return a loading indicator while checking auth status
  }

  return (
    <div className="container mt-20">
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
          <div
            key={template.id}
            className="template-card group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="template-icon">
              {template.tone === "Confident" && <BicepsFlexed size={48} />}
              {template.tone === "Professional" && <Handshake size={48} />}
              {template.tone === "Friendly" && <Smile size={48} />}
              {template.tone === "Formal" && <GraduationCap size={48} />}
              {template.tone === "Popular" && <Star size={48} />}
            </div>
            <div className="template-content">
              <h3 className="template-title text-xl font-bold text-center">
                {template.title}
              </h3>
              <p className="template-description text-md font-bold text-center text-gray-700">
                {template.description}
              </p>
              <div className="template-footer">
                <span className="template-tone bg-slate-200">
                  {template.tone}
                </span>
                <Link href={`/customize/${template.id}`} passHref>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTemplate(template)}
                    className="template-button bg-slate-100"
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
