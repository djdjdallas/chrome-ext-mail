
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."contacts" (
    "id" bigint NOT NULL,
    "name" "text",
    "email" "text",
    "company" "text",
    "phone_number" "text"
);

ALTER TABLE "public"."contacts" OWNER TO "postgres";

ALTER TABLE "public"."contacts" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."contacts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."email_stats" (
    "id" integer NOT NULL,
    "total_emails_sent" integer NOT NULL,
    "open_rate" numeric(5,2) NOT NULL,
    "click_through_rate" numeric(5,2) NOT NULL,
    "conversion_rate" numeric(5,2) NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"()
);

ALTER TABLE "public"."email_stats" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."email_stats_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."email_stats_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."email_stats_id_seq" OWNED BY "public"."email_stats"."id";

CREATE TABLE IF NOT EXISTS "public"."email_templates" (
    "id" integer NOT NULL,
    "title" character varying(255) NOT NULL,
    "description" "text" NOT NULL,
    "subject" character varying(255) NOT NULL,
    "body" "text" NOT NULL,
    "tone" character varying(50),
    "image_url" character varying(255),
    "created_at" timestamp without time zone DEFAULT "now"()
);

ALTER TABLE "public"."email_templates" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."email_templates_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."email_templates_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."email_templates_id_seq" OWNED BY "public"."email_templates"."id";

CREATE TABLE IF NOT EXISTS "public"."new_events" (
    "id" integer NOT NULL,
    "title" "text" NOT NULL,
    "start_time" timestamp without time zone NOT NULL,
    "end_time" timestamp without time zone NOT NULL,
    "description" "text"
);

ALTER TABLE "public"."new_events" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."new_events_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."new_events_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."new_events_id_seq" OWNED BY "public"."new_events"."id";

CREATE TABLE IF NOT EXISTS "public"."recent_campaigns" (
    "id" integer NOT NULL,
    "name" character varying(255) NOT NULL,
    "sent" integer NOT NULL,
    "open_rate" numeric(5,2) NOT NULL,
    "click_through" numeric(5,2) NOT NULL,
    "conversions" numeric(5,2) NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"()
);

ALTER TABLE "public"."recent_campaigns" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."recent_campaigns_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."recent_campaigns_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."recent_campaigns_id_seq" OWNED BY "public"."recent_campaigns"."id";

ALTER TABLE ONLY "public"."email_stats" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."email_stats_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."email_templates" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."email_templates_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."new_events" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."new_events_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."recent_campaigns" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."recent_campaigns_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."contacts"
    ADD CONSTRAINT "contacts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."email_stats"
    ADD CONSTRAINT "email_stats_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."email_templates"
    ADD CONSTRAINT "email_templates_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."new_events"
    ADD CONSTRAINT "new_events_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."recent_campaigns"
    ADD CONSTRAINT "recent_campaigns_pkey" PRIMARY KEY ("id");

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."contacts" TO "anon";
GRANT ALL ON TABLE "public"."contacts" TO "authenticated";
GRANT ALL ON TABLE "public"."contacts" TO "service_role";

GRANT ALL ON SEQUENCE "public"."contacts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."contacts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."contacts_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."email_stats" TO "anon";
GRANT ALL ON TABLE "public"."email_stats" TO "authenticated";
GRANT ALL ON TABLE "public"."email_stats" TO "service_role";

GRANT ALL ON SEQUENCE "public"."email_stats_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."email_stats_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."email_stats_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."email_templates" TO "anon";
GRANT ALL ON TABLE "public"."email_templates" TO "authenticated";
GRANT ALL ON TABLE "public"."email_templates" TO "service_role";

GRANT ALL ON SEQUENCE "public"."email_templates_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."email_templates_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."email_templates_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."new_events" TO "anon";
GRANT ALL ON TABLE "public"."new_events" TO "authenticated";
GRANT ALL ON TABLE "public"."new_events" TO "service_role";

GRANT ALL ON SEQUENCE "public"."new_events_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."new_events_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."new_events_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."recent_campaigns" TO "anon";
GRANT ALL ON TABLE "public"."recent_campaigns" TO "authenticated";
GRANT ALL ON TABLE "public"."recent_campaigns" TO "service_role";

GRANT ALL ON SEQUENCE "public"."recent_campaigns_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."recent_campaigns_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."recent_campaigns_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
