--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3 (Debian 16.3-1.pgdg120+1)

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

ALTER TABLE IF EXISTS ONLY "public"."bills" DROP CONSTRAINT IF EXISTS "fk_rails_f5fcc78f42";
ALTER TABLE IF EXISTS ONLY "public"."loans" DROP CONSTRAINT IF EXISTS "fk_rails_c15c911198";
ALTER TABLE IF EXISTS ONLY "public"."accounts" DROP CONSTRAINT IF EXISTS "fk_rails_b1e30bebc8";
ALTER TABLE IF EXISTS ONLY "public"."cards" DROP CONSTRAINT IF EXISTS "fk_rails_8ef7749967";
ALTER TABLE IF EXISTS ONLY "public"."deposits" DROP CONSTRAINT IF EXISTS "fk_rails_88307c7ed2";
ALTER TABLE IF EXISTS ONLY "public"."transactions" DROP CONSTRAINT IF EXISTS "fk_rails_77364e6416";
ALTER TABLE IF EXISTS ONLY "public"."adminloans" DROP CONSTRAINT IF EXISTS "fk_rails_6c1a404829";
ALTER TABLE IF EXISTS ONLY "public"."transfers" DROP CONSTRAINT IF EXISTS "fk_rails_344b52b7fd";
ALTER TABLE IF EXISTS ONLY "public"."otps" DROP CONSTRAINT IF EXISTS "fk_rails_264122a153";
DROP INDEX IF EXISTS "public"."index_users_on_unlock_token";
DROP INDEX IF EXISTS "public"."index_users_on_reset_password_token";
DROP INDEX IF EXISTS "public"."index_users_on_email";
DROP INDEX IF EXISTS "public"."index_users_on_confirmation_token";
DROP INDEX IF EXISTS "public"."index_transfers_on_user_id";
DROP INDEX IF EXISTS "public"."index_transfers_on_slug";
DROP INDEX IF EXISTS "public"."index_transactions_on_user_id";
DROP INDEX IF EXISTS "public"."index_transactions_on_slug";
DROP INDEX IF EXISTS "public"."index_services_on_slug";
DROP INDEX IF EXISTS "public"."index_sections_on_slug";
DROP INDEX IF EXISTS "public"."index_plans_on_slug";
DROP INDEX IF EXISTS "public"."index_packages_on_slug";
DROP INDEX IF EXISTS "public"."index_otps_on_transfer_id";
DROP INDEX IF EXISTS "public"."index_loans_on_user_id";
DROP INDEX IF EXISTS "public"."index_loans_on_slug";
DROP INDEX IF EXISTS "public"."index_feedbacks_on_slug";
DROP INDEX IF EXISTS "public"."index_features_on_slug";
DROP INDEX IF EXISTS "public"."index_faqs_on_slug";
DROP INDEX IF EXISTS "public"."index_deposits_on_user_id";
DROP INDEX IF EXISTS "public"."index_ckeditor_assets_on_type";
DROP INDEX IF EXISTS "public"."index_cards_on_user_id";
DROP INDEX IF EXISTS "public"."index_cards_on_slug";
DROP INDEX IF EXISTS "public"."index_boards_on_slug";
DROP INDEX IF EXISTS "public"."index_blogs_on_slug";
DROP INDEX IF EXISTS "public"."index_bills_on_user_id";
DROP INDEX IF EXISTS "public"."index_bills_on_slug";
DROP INDEX IF EXISTS "public"."index_adminloans_on_user_id";
DROP INDEX IF EXISTS "public"."index_admin_users_on_unlock_token";
DROP INDEX IF EXISTS "public"."index_admin_users_on_reset_password_token";
DROP INDEX IF EXISTS "public"."index_admin_users_on_email";
DROP INDEX IF EXISTS "public"."index_admin_users_on_confirmation_token";
DROP INDEX IF EXISTS "public"."index_active_admin_comments_on_resource_type_and_resource_id";
DROP INDEX IF EXISTS "public"."index_active_admin_comments_on_namespace";
DROP INDEX IF EXISTS "public"."index_active_admin_comments_on_author_type_and_author_id";
DROP INDEX IF EXISTS "public"."index_accounts_on_user_id";
DROP INDEX IF EXISTS "public"."index_accounts_on_slug";
DROP INDEX IF EXISTS "public"."index_abouts_on_slug";
ALTER TABLE IF EXISTS ONLY "public"."welcomes" DROP CONSTRAINT IF EXISTS "welcomes_pkey";
ALTER TABLE IF EXISTS ONLY "public"."users" DROP CONSTRAINT IF EXISTS "users_pkey";
ALTER TABLE IF EXISTS ONLY "public"."transfers" DROP CONSTRAINT IF EXISTS "transfers_pkey";
ALTER TABLE IF EXISTS ONLY "public"."transactions" DROP CONSTRAINT IF EXISTS "transactions_pkey";
ALTER TABLE IF EXISTS ONLY "public"."services" DROP CONSTRAINT IF EXISTS "services_pkey";
ALTER TABLE IF EXISTS ONLY "public"."sections" DROP CONSTRAINT IF EXISTS "sections_pkey";
ALTER TABLE IF EXISTS ONLY "public"."schema_migrations" DROP CONSTRAINT IF EXISTS "schema_migrations_pkey";
ALTER TABLE IF EXISTS ONLY "public"."plans" DROP CONSTRAINT IF EXISTS "plans_pkey";
ALTER TABLE IF EXISTS ONLY "public"."packages" DROP CONSTRAINT IF EXISTS "packages_pkey";
ALTER TABLE IF EXISTS ONLY "public"."otps" DROP CONSTRAINT IF EXISTS "otps_pkey";
ALTER TABLE IF EXISTS ONLY "public"."loans" DROP CONSTRAINT IF EXISTS "loans_pkey";
ALTER TABLE IF EXISTS ONLY "public"."headers" DROP CONSTRAINT IF EXISTS "headers_pkey";
ALTER TABLE IF EXISTS ONLY "public"."feedbacks" DROP CONSTRAINT IF EXISTS "feedbacks_pkey";
ALTER TABLE IF EXISTS ONLY "public"."features" DROP CONSTRAINT IF EXISTS "features_pkey";
ALTER TABLE IF EXISTS ONLY "public"."faqs" DROP CONSTRAINT IF EXISTS "faqs_pkey";
ALTER TABLE IF EXISTS ONLY "public"."deposits" DROP CONSTRAINT IF EXISTS "deposits_pkey";
ALTER TABLE IF EXISTS ONLY "public"."contacts" DROP CONSTRAINT IF EXISTS "contacts_pkey";
ALTER TABLE IF EXISTS ONLY "public"."ckeditor_assets" DROP CONSTRAINT IF EXISTS "ckeditor_assets_pkey";
ALTER TABLE IF EXISTS ONLY "public"."cards" DROP CONSTRAINT IF EXISTS "cards_pkey";
ALTER TABLE IF EXISTS ONLY "public"."boards" DROP CONSTRAINT IF EXISTS "boards_pkey";
ALTER TABLE IF EXISTS ONLY "public"."blogs" DROP CONSTRAINT IF EXISTS "blogs_pkey";
ALTER TABLE IF EXISTS ONLY "public"."bills" DROP CONSTRAINT IF EXISTS "bills_pkey";
ALTER TABLE IF EXISTS ONLY "public"."banners" DROP CONSTRAINT IF EXISTS "banners_pkey";
ALTER TABLE IF EXISTS ONLY "public"."ar_internal_metadata" DROP CONSTRAINT IF EXISTS "ar_internal_metadata_pkey";
ALTER TABLE IF EXISTS ONLY "public"."adminloans" DROP CONSTRAINT IF EXISTS "adminloans_pkey";
ALTER TABLE IF EXISTS ONLY "public"."admin_users" DROP CONSTRAINT IF EXISTS "admin_users_pkey";
ALTER TABLE IF EXISTS ONLY "public"."active_admin_comments" DROP CONSTRAINT IF EXISTS "active_admin_comments_pkey";
ALTER TABLE IF EXISTS ONLY "public"."accounts" DROP CONSTRAINT IF EXISTS "accounts_pkey";
ALTER TABLE IF EXISTS ONLY "public"."abouts" DROP CONSTRAINT IF EXISTS "abouts_pkey";
ALTER TABLE IF EXISTS "public"."welcomes" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."users" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."transfers" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."transactions" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."services" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."sections" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."plans" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."packages" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."otps" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."loans" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."headers" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."feedbacks" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."features" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."faqs" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."deposits" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."contacts" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."ckeditor_assets" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."cards" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."boards" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."blogs" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."bills" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."banners" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."adminloans" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."admin_users" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."active_admin_comments" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."accounts" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."abouts" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE IF EXISTS "public"."welcomes_id_seq";
DROP TABLE IF EXISTS "public"."welcomes";
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
DROP TABLE IF EXISTS "public"."users";
DROP SEQUENCE IF EXISTS "public"."transfers_id_seq";
DROP TABLE IF EXISTS "public"."transfers";
DROP SEQUENCE IF EXISTS "public"."transactions_id_seq";
DROP TABLE IF EXISTS "public"."transactions";
DROP SEQUENCE IF EXISTS "public"."services_id_seq";
DROP TABLE IF EXISTS "public"."services";
DROP SEQUENCE IF EXISTS "public"."sections_id_seq";
DROP TABLE IF EXISTS "public"."sections";
DROP TABLE IF EXISTS "public"."schema_migrations";
DROP SEQUENCE IF EXISTS "public"."plans_id_seq";
DROP TABLE IF EXISTS "public"."plans";
DROP SEQUENCE IF EXISTS "public"."packages_id_seq";
DROP TABLE IF EXISTS "public"."packages";
DROP SEQUENCE IF EXISTS "public"."otps_id_seq";
DROP TABLE IF EXISTS "public"."otps";
DROP SEQUENCE IF EXISTS "public"."loans_id_seq";
DROP TABLE IF EXISTS "public"."loans";
DROP SEQUENCE IF EXISTS "public"."headers_id_seq";
DROP TABLE IF EXISTS "public"."headers";
DROP SEQUENCE IF EXISTS "public"."feedbacks_id_seq";
DROP TABLE IF EXISTS "public"."feedbacks";
DROP SEQUENCE IF EXISTS "public"."features_id_seq";
DROP TABLE IF EXISTS "public"."features";
DROP SEQUENCE IF EXISTS "public"."faqs_id_seq";
DROP TABLE IF EXISTS "public"."faqs";
DROP SEQUENCE IF EXISTS "public"."deposits_id_seq";
DROP TABLE IF EXISTS "public"."deposits";
DROP SEQUENCE IF EXISTS "public"."contacts_id_seq";
DROP TABLE IF EXISTS "public"."contacts";
DROP SEQUENCE IF EXISTS "public"."ckeditor_assets_id_seq";
DROP TABLE IF EXISTS "public"."ckeditor_assets";
DROP SEQUENCE IF EXISTS "public"."cards_id_seq";
DROP TABLE IF EXISTS "public"."cards";
DROP SEQUENCE IF EXISTS "public"."boards_id_seq";
DROP TABLE IF EXISTS "public"."boards";
DROP SEQUENCE IF EXISTS "public"."blogs_id_seq";
DROP TABLE IF EXISTS "public"."blogs";
DROP SEQUENCE IF EXISTS "public"."bills_id_seq";
DROP TABLE IF EXISTS "public"."bills";
DROP SEQUENCE IF EXISTS "public"."banners_id_seq";
DROP TABLE IF EXISTS "public"."banners";
DROP TABLE IF EXISTS "public"."ar_internal_metadata";
DROP SEQUENCE IF EXISTS "public"."adminloans_id_seq";
DROP TABLE IF EXISTS "public"."adminloans";
DROP SEQUENCE IF EXISTS "public"."admin_users_id_seq";
DROP TABLE IF EXISTS "public"."admin_users";
DROP SEQUENCE IF EXISTS "public"."active_admin_comments_id_seq";
DROP TABLE IF EXISTS "public"."active_admin_comments";
DROP SEQUENCE IF EXISTS "public"."accounts_id_seq";
DROP TABLE IF EXISTS "public"."accounts";
DROP SEQUENCE IF EXISTS "public"."abouts_id_seq";
DROP TABLE IF EXISTS "public"."abouts";
-- *not* dropping schema, since initdb creates it
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: SCHEMA "public"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA "public" IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- Name: abouts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."abouts" (
    "id" bigint NOT NULL,
    "abtimg" character varying,
    "title" character varying,
    "sub_title" character varying,
    "body" "text",
    "slug" character varying,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL
);


--
-- Name: abouts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."abouts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: abouts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."abouts_id_seq" OWNED BY "public"."abouts"."id";


--
-- Name: accounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."accounts" (
    "id" bigint NOT NULL,
    "address" character varying,
    "country" character varying,
    "avatar" character varying,
    "zip_code" character varying,
    "ssn" character varying,
    "mmn" character varying,
    "account_pin" integer,
    "account_number" character varying,
    "routine_number" character varying,
    "dob" character varying,
    "slug" character varying,
    "balance" double precision,
    "occupation_address" character varying,
    "user_id" bigint,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL,
    "verified" boolean,
    "status" boolean,
    "account_type" character varying,
    "lbalance" character varying,
    "state" character varying,
    "city" character varying,
    "phone" character varying
);


--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."accounts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."accounts_id_seq" OWNED BY "public"."accounts"."id";


--
-- Name: active_admin_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."active_admin_comments" (
    "id" bigint NOT NULL,
    "namespace" character varying,
    "body" "text",
    "resource_type" character varying,
    "resource_id" bigint,
    "author_type" character varying,
    "author_id" bigint,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL
);


--
-- Name: active_admin_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."active_admin_comments_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: active_admin_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."active_admin_comments_id_seq" OWNED BY "public"."active_admin_comments"."id";


--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."admin_users" (
    "id" bigint NOT NULL,
    "email" character varying DEFAULT ''::character varying NOT NULL,
    "encrypted_password" character varying DEFAULT ''::character varying NOT NULL,
    "reset_password_token" character varying,
    "reset_password_sent_at" timestamp without time zone,
    "remember_created_at" timestamp without time zone,
    "sign_in_count" integer DEFAULT 0 NOT NULL,
    "current_sign_in_at" timestamp without time zone,
    "last_sign_in_at" timestamp without time zone,
    "current_sign_in_ip" "inet",
    "confirmation_token" character varying,
    "confirmed_at" timestamp without time zone,
    "confirmation_sent_at" timestamp without time zone,
    "unconfirmed_email" character varying,
    "failed_attempts" integer DEFAULT 0 NOT NULL,
    "unlock_token" character varying,
    "locked_at" timestamp without time zone,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL
);


--
-- Name: admin_users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."admin_users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."admin_users_id_seq" OWNED BY "public"."admin_users"."id";


--
-- Name: adminloans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."adminloans" (
    "id" bigint NOT NULL,
    "body" "text",
    "status" boolean,
    "verified" boolean,
    "user_id" bigint NOT NULL,
    "title" character varying,
    "loan_id" integer,
    "created_at" timestamp(6) without time zone NOT NULL,
    "updated_at" timestamp(6) without time zone NOT NULL
);


--
-- Name: adminloans_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."adminloans_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: adminloans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."adminloans_id_seq" OWNED BY "public"."adminloans"."id";


--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."ar_internal_metadata" (
    "key" character varying NOT NULL,
    "value" character varying,
    "created_at" timestamp(6) without time zone NOT NULL,
    "updated_at" timestamp(6) without time zone NOT NULL
);


--
-- Name: banners; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."banners" (
    "id" bigint NOT NULL,
    "title" character varying,
    "sub_title" character varying,
    "bannerimg" character varying,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL
);


--
-- Name: banners_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."banners_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: banners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."banners_id_seq" OWNED BY "public"."banners"."id";


--
-- Name: bills; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."bills" (
    "id" bigint NOT NULL,
    "name" character varying,
    "service" character varying,
    "amount" character varying,
    "date" timestamp without time zone,
    "status" boolean,
    "user_id" bigint,
    "slug" character varying,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL
);


--
-- Name: bills_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."bills_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."bills_id_seq" OWNED BY "public"."bills"."id";


--
-- Name: blogs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."blogs" (
    "id" bigint NOT NULL,
    "blogimg" character varying,
    "title" character varying,
    "sub_title" character varying,
    "body" "text",
    "slug" character varying,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL
);


--
-- Name: blogs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."blogs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: blogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."blogs_id_seq" OWNED BY "public"."blogs"."id";


--
-- Name: boards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."boards" (
    "id" bigint NOT NULL,
    "name" character varying,
    "title" character varying,
    "boardimg" character varying,
    "body" character varying,
    "slug" character varying,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL
);


--
-- Name: boards_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."boards_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."boards_id_seq" OWNED BY "public"."boards"."id";


--
-- Name: cards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."cards" (
    "id" bigint NOT NULL,
    "name" character varying,
    "card_number" character varying,
    "cvv" character varying,
    "date" timestamp without time zone,
    "slug" character varying,
    "status" boolean,
    "user_id" bigint,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL,
    "card_type" character varying,
    "card_company" character varying,
    "arrivaltime" timestamp without time zone,
    "cardimg" character varying,
    "address" character varying,
    "zipcode" character varying,
    "phone" character varying
);


--
-- Name: cards_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."cards_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."cards_id_seq" OWNED BY "public"."cards"."id";


--
-- Name: ckeditor_assets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."ckeditor_assets" (
    "id" bigint NOT NULL,
    "data_file_name" character varying NOT NULL,
    "data_content_type" character varying,
    "data_file_size" integer,
    "type" character varying(30),
    "width" integer,
    "height" integer,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL
);


--
-- Name: ckeditor_assets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."ckeditor_assets_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ckeditor_assets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."ckeditor_assets_id_seq" OWNED BY "public"."ckeditor_assets"."id";


--
-- Name: contacts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."contacts" (
    "id" bigint NOT NULL,
    "country" character varying,
    "phone" character varying,
    "address" character varying,
    "footer_mgs" character varying,
    "email" character varying,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL
);


--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."contacts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."contacts_id_seq" OWNED BY "public"."contacts"."id";


--
-- Name: deposits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."deposits" (
    "id" bigint NOT NULL,
    "method" character varying,
    "amount" character varying,
    "status" boolean,
    "date" timestamp without time zone,
    "account_name" character varying,
    "account_number" character varying,
    "swiftcode" character varying,
    "routing_number" character varying,
    "btcw" character varying,
    "ethw" character varying,
    "btcnote" character varying,
    "user_id" bigint NOT NULL,
    "created_at" timestamp(6) without time zone NOT NULL,
    "updated_at" timestamp(6) without time zone NOT NULL
);


--
-- Name: deposits_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."deposits_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: deposits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."deposits_id_seq" OWNED BY "public"."deposits"."id";


--
-- Name: faqs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."faqs" (
    "id" bigint NOT NULL,
    "title" character varying,
    "body" "text",
    "slug" character varying,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL
);


--
-- Name: faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."faqs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: faqs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."faqs_id_seq" OWNED BY "public"."faqs"."id";


--
-- Name: features; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."features" (
    "id" bigint NOT NULL,
    "fimg" character varying,
    "title" character varying,
    "sub_title" character varying,
    "body" "text",
    "slug" character varying,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL
);


--
-- Name: features_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."features_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: features_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."features_id_seq" OWNED BY "public"."features"."id";


--
-- Name: feedbacks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."feedbacks" (
    "id" bigint NOT NULL,
    "icon" character varying,
    "title" character varying,
    "sub_title" character varying,
    "body" "text",
    "slug" character varying,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL
);


--
-- Name: feedbacks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."feedbacks_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: feedbacks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."feedbacks_id_seq" OWNED BY "public"."feedbacks"."id";


--
-- Name: headers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."headers" (
    "id" bigint NOT NULL,
    "abouts_title" character varying,
    "abouts_sub_title" character varying,
    "services_title" character varying,
    "services_sub_title" character varying,
    "boards_title" character varying,
    "boards_sub_title" character varying,
    "features_title" character varying,
    "features_sub_title" character varying,
    "feedbacks_title" character varying,
    "feedbacks_sub_title" character varying,
    "blogs_title" character varying,
    "blogs_sub_title" character varying,
    "projects_title" character varying,
    "projects_sub_title" character varying,
    "cta1" character varying,
    "cta2" character varying,
    "headerimg" character varying,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL,
    "plans_title" character varying,
    "plans_sub_title" character varying,
    "abtsectionimg" character varying,
    "featimg" character varying,
    "plansimg" character varying,
    "featheaderimg" character varying,
    "planscta1" character varying,
    "planscta2" character varying
);


--
-- Name: headers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."headers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: headers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."headers_id_seq" OWNED BY "public"."headers"."id";


--
-- Name: loans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."loans" (
    "id" bigint NOT NULL,
    "business_name" character varying,
    "budget" character varying,
    "amount" character varying,
    "interest" character varying,
    "desc" character varying,
    "project_name" character varying,
    "project_size" character varying,
    "project_desc" character varying,
    "date" timestamp without time zone,
    "name" character varying,
    "first_name" character varying,
    "last_name" character varying,
    "email" character varying,
    "slug" character varying,
    "user_id" bigint NOT NULL,
    "created_at" timestamp(6) without time zone NOT NULL,
    "updated_at" timestamp(6) without time zone NOT NULL,
    "step1_status" boolean,
    "step2_status" boolean,
    "step3_status" boolean,
    "phone" character varying,
    "ssn" character varying,
    "business_address" character varying,
    "buisness_type" character varying,
    "business_years" character varying,
    "loan_type" character varying,
    "bfs" character varying,
    "btr" character varying,
    "cr" character varying,
    "bp" character varying,
    "pfs" character varying,
    "ein_vat" character varying,
    "drivers_lfront" character varying,
    "drivers_lback" character varying,
    "ld" character varying,
    "status" boolean,
    "agreement" boolean
);


--
-- Name: loans_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."loans_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: loans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."loans_id_seq" OWNED BY "public"."loans"."id";


--
-- Name: otps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."otps" (
    "id" bigint NOT NULL,
    "otp" character varying,
    "transfer_id" bigint,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL
);


--
-- Name: otps_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."otps_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: otps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."otps_id_seq" OWNED BY "public"."otps"."id";


--
-- Name: packages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."packages" (
    "id" bigint NOT NULL,
    "title" character varying,
    "pkimg" character varying,
    "sub_title" character varying,
    "body" "text",
    "slug" character varying,
    "duration" timestamp without time zone,
    "rate" character varying,
    "droi" character varying,
    "icon" character varying,
    "created_at" timestamp(6) without time zone NOT NULL,
    "updated_at" timestamp(6) without time zone NOT NULL
);


--
-- Name: packages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."packages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: packages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."packages_id_seq" OWNED BY "public"."packages"."id";


--
-- Name: plans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."plans" (
    "id" bigint NOT NULL,
    "title" character varying,
    "planimg" character varying,
    "sub_title" character varying,
    "body" "text",
    "slug" character varying,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL
);


--
-- Name: plans_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."plans_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."plans_id_seq" OWNED BY "public"."plans"."id";


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."schema_migrations" (
    "version" character varying NOT NULL
);


--
-- Name: sections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."sections" (
    "id" bigint NOT NULL,
    "title" character varying,
    "icon" character varying,
    "sub_title" character varying,
    "body" "text",
    "slug" character varying,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL
);


--
-- Name: sections_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."sections_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."sections_id_seq" OWNED BY "public"."sections"."id";


--
-- Name: services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."services" (
    "id" bigint NOT NULL,
    "title" character varying,
    "sub_title" character varying,
    "body" "text",
    "slug" character varying,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL,
    "serviceimg" character varying
);


--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."services_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."services_id_seq" OWNED BY "public"."services"."id";


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."transactions" (
    "id" bigint NOT NULL,
    "amount" character varying,
    "transac_type" character varying,
    "date" timestamp without time zone,
    "purpose" character varying,
    "sender" character varying,
    "status" boolean,
    "user_id" bigint,
    "slug" character varying,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL,
    "account_id" integer,
    "bal_type" character varying
);


--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."transactions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."transactions_id_seq" OWNED BY "public"."transactions"."id";


--
-- Name: transfers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."transfers" (
    "id" bigint NOT NULL,
    "account_name" character varying,
    "account_number" character varying,
    "routine_number" character varying,
    "swift_code" character varying,
    "user_id" bigint,
    "bank_name" character varying,
    "amount" character varying,
    "status" boolean,
    "account_id" integer,
    "slug" character varying,
    "notes" character varying,
    "country" character varying,
    "otp" character varying,
    "pin" character varying,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL,
    "transfer_type" character varying,
    "confirmed" boolean,
    "tref" character varying
);


--
-- Name: transfers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."transfers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: transfers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."transfers_id_seq" OWNED BY "public"."transfers"."id";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."users" (
    "id" bigint NOT NULL,
    "email" character varying DEFAULT ''::character varying NOT NULL,
    "encrypted_password" character varying DEFAULT ''::character varying NOT NULL,
    "reset_password_token" character varying,
    "reset_password_sent_at" timestamp without time zone,
    "remember_created_at" timestamp without time zone,
    "sign_in_count" integer DEFAULT 0 NOT NULL,
    "current_sign_in_at" timestamp without time zone,
    "last_sign_in_at" timestamp without time zone,
    "current_sign_in_ip" "inet",
    "last_sign_in_ip" "inet",
    "confirmation_token" character varying,
    "confirmed_at" timestamp without time zone,
    "confirmation_sent_at" timestamp without time zone,
    "unconfirmed_email" character varying,
    "failed_attempts" integer DEFAULT 0 NOT NULL,
    "unlock_token" character varying,
    "locked_at" timestamp without time zone,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL,
    "username" character varying,
    "phone" character varying,
    "first_name" character varying,
    "last_name" character varying,
    "status" boolean,
    "verified" boolean,
    "body" "text",
    "balance" integer
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."users_id_seq" OWNED BY "public"."users"."id";


--
-- Name: welcomes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."welcomes" (
    "id" bigint NOT NULL,
    "logoimg" character varying,
    "title" character varying,
    "desc" character varying,
    "whatsapp" character varying,
    "ig" character varying,
    "ln" character varying,
    "section" character varying,
    "link" character varying,
    "footer" character varying,
    "phone" character varying,
    "address" character varying,
    "twitter" character varying,
    "telegram" character varying,
    "created_at" timestamp without time zone NOT NULL,
    "updated_at" timestamp without time zone NOT NULL,
    "youtube" character varying,
    "loantitle" character varying,
    "loansummary" character varying,
    "loandesc" character varying,
    "loanfavimg" character varying
);


--
-- Name: welcomes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."welcomes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: welcomes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."welcomes_id_seq" OWNED BY "public"."welcomes"."id";


--
-- Name: abouts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."abouts" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."abouts_id_seq"'::"regclass");


--
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."accounts" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."accounts_id_seq"'::"regclass");


--
-- Name: active_admin_comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."active_admin_comments" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."active_admin_comments_id_seq"'::"regclass");


--
-- Name: admin_users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."admin_users" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."admin_users_id_seq"'::"regclass");


--
-- Name: adminloans id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."adminloans" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."adminloans_id_seq"'::"regclass");


--
-- Name: banners id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."banners" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."banners_id_seq"'::"regclass");


--
-- Name: bills id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."bills" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."bills_id_seq"'::"regclass");


--
-- Name: blogs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."blogs" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."blogs_id_seq"'::"regclass");


--
-- Name: boards id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."boards" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."boards_id_seq"'::"regclass");


--
-- Name: cards id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."cards" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."cards_id_seq"'::"regclass");


--
-- Name: ckeditor_assets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."ckeditor_assets" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."ckeditor_assets_id_seq"'::"regclass");


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."contacts" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."contacts_id_seq"'::"regclass");


--
-- Name: deposits id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."deposits" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."deposits_id_seq"'::"regclass");


--
-- Name: faqs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."faqs" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."faqs_id_seq"'::"regclass");


--
-- Name: features id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."features" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."features_id_seq"'::"regclass");


--
-- Name: feedbacks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."feedbacks" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."feedbacks_id_seq"'::"regclass");


--
-- Name: headers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."headers" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."headers_id_seq"'::"regclass");


--
-- Name: loans id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."loans" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."loans_id_seq"'::"regclass");


--
-- Name: otps id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."otps" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."otps_id_seq"'::"regclass");


--
-- Name: packages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."packages" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."packages_id_seq"'::"regclass");


--
-- Name: plans id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."plans" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."plans_id_seq"'::"regclass");


--
-- Name: sections id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."sections" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."sections_id_seq"'::"regclass");


--
-- Name: services id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."services" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."services_id_seq"'::"regclass");


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."transactions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."transactions_id_seq"'::"regclass");


--
-- Name: transfers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."transfers" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."transfers_id_seq"'::"regclass");


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."users" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."users_id_seq"'::"regclass");


--
-- Name: welcomes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."welcomes" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."welcomes_id_seq"'::"regclass");


--
-- Data for Name: abouts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."abouts" ("id", "abtimg", "title", "sub_title", "body", "slug", "created_at", "updated_at") FROM stdin;
2	\N	Our Company 	We work as a partner to provide financial products and services that make banking safe, simple and convenient.	<h3 dir="ltr" id="docs-internal-guid-d9b1212d-7fff-0851-ed9b-744cff7453b6">Our partnerships are founded on trust that we create with every conversation every day. Our workers are motivated to do the right thing to ensure that they share the vision of our clients for success. We are here to help negotiate critical milestones and collectively improve the future.</h3>\r\n	our-company	2021-03-28 01:11:58.67938	2021-03-28 01:11:58.67938
3	\N	Our businesses	Through our “Pet Retirement Savings Bank” philosophy, we are able to bring the power of the whole bank to every customer, every single day.	<p>: In providing a reliable, predictable and repeatable financial result year after year, our dynamic market mix is fundamental. Market &amp; Enterprise Finance, corporate &amp; institutional banking, payment processing and asset management &amp; investment services are our main businesses.</p>\r\n	our-businesses	2021-03-28 01:13:49.183935	2021-03-28 01:13:49.183935
1	\N	who we are	We aim to be where the growth is, connecting customers to opportunities, enabling businesses to thrive and economies to prosper, and ultimately helping people to fulfill their hopes and realize their ambitions. 	<p>We are  one of the world’s leading banking and financial services organizations.&nbsp;We serve more than 40 million customers through our global businesses: Wealth and Personal Banking, Commercial Banking, and Global Banking and Markets.&nbsp;Our network covers 64 countries and territories in Europe, Asia, the Middle East and Africa, North America and Latin America.</p>	about-us	2021-03-28 01:11:07.191095	2024-01-15 13:21:24.090678
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."accounts" ("id", "address", "country", "avatar", "zip_code", "ssn", "mmn", "account_pin", "account_number", "routine_number", "dob", "slug", "balance", "occupation_address", "user_id", "created_at", "updated_at", "verified", "status", "account_type", "lbalance", "state", "city", "phone") FROM stdin;
57	hse 1 plot2 winners highway	\N	\N	900105	785484784	mmmm	898434	4659901733	836484416	\N	4659901733	1200000		63	2024-01-15 22:37:33.949392	2024-01-15 22:42:58.906674	f	f	Business Accounts	1,200,000	Federal capital territory	abuja	7084378333
59	680 Hayes st, hazleton, pa	\N	\N	18201	Guggtfgihvh	vyvyj	0	2715615130	110514935	\N	2715615130	0		65	2024-03-05 20:58:37.434628	2024-03-05 20:58:37.434628	\N	f	Online Savings Account	\N	PA	Hazleton	15707908077
58	1404 pixley drive	\N	\N	30296	414036527	Alena	1245	1577351527	611722375	\N	1577351527	4350366		64	2024-01-16 09:15:31.118288	2024-07-01 15:18:40.084366	t	t	Checking Account	4,350,366.00	GA	Riverdale	4703769961
60	137 Function Rd	\N	photo_2024-07-01_10-04-56.jpg	96819	414025762	Billie	1960	9190589613	642791358	\N	9190589613	612377509		67	2024-07-01 14:00:54.985797	2024-07-01 15:35:36.611342	t	t	Checking Account	612,377,509.00	Honolulu	Hilo	5104138387
\.


--
-- Data for Name: active_admin_comments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."active_admin_comments" ("id", "namespace", "body", "resource_type", "resource_id", "author_type", "author_id", "created_at", "updated_at") FROM stdin;
1	admin	Eftspayment	Transaction	58	AdminUser	1	2024-04-06 17:11:22.459017	2024-04-06 17:11:22.459017
\.


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."admin_users" ("id", "email", "encrypted_password", "reset_password_token", "reset_password_sent_at", "remember_created_at", "sign_in_count", "current_sign_in_at", "last_sign_in_at", "current_sign_in_ip", "confirmation_token", "confirmed_at", "confirmation_sent_at", "unconfirmed_email", "failed_attempts", "unlock_token", "locked_at", "created_at", "updated_at") FROM stdin;
1	admin@example.com	$2a$12$zXOBoVY2/K9ur75RB5WqwOtN9HHRABD6ceX2VDgdNNLiT1lzfGpEu	\N	\N	\N	0	\N	\N	\N	\N	\N	\N	\N	0	\N	\N	2021-03-03 22:10:50.349987	2024-07-11 17:10:22.16968
\.


--
-- Data for Name: adminloans; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."adminloans" ("id", "body", "status", "verified", "user_id", "title", "loan_id", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: ar_internal_metadata; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."ar_internal_metadata" ("key", "value", "created_at", "updated_at") FROM stdin;
environment	production	2024-01-02 11:52:44.719113	2024-01-02 11:52:44.719113
\.


--
-- Data for Name: banners; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."banners" ("id", "title", "sub_title", "bannerimg", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: bills; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."bills" ("id", "name", "service", "amount", "date", "status", "user_id", "slug", "created_at", "updated_at") FROM stdin;
2	Billie Oneal	AT&T	$880	2023-12-30 14:18:00	t	64	billie-oneal-cd383c5b-5bac-456c-bf6b-b1681b91d9f3	2024-03-11 14:21:02.874925	2024-03-11 14:22:47.513099
\.


--
-- Data for Name: blogs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."blogs" ("id", "blogimg", "title", "sub_title", "body", "slug", "created_at", "updated_at") FROM stdin;
1	\N	: 5 step guide to review your estate beneficiaries	Regularly confirming beneficiary designations are aligned with your broader estate plan may not seem urgent, but if you let something slide, the repercussions could be unfavorable for your loved ones. 	<p dir="ltr" id="docs-internal-guid-3aa166e5-7fff-bbed-309b-f97d3c2dff00">As part of the routine estate plan analysis, accounting for heirs helps ensure that you&#39;ve accounted for their future. For starters, owing to a beneficiary designation that had not been altered for years, many ex-spouses experienced a surprising windfall.</p>\r\n\r\n<p dir="ltr">To better ensure that all designations are consistent with existing conditions, consult with a financial advisor in the following steps.</p>\r\n\r\n<p dir="ltr">1.&nbsp; Get a handle on your accounts</p>\r\n\r\n<p dir="ltr">Main and secondary beneficiaries are typically called for by health schemes, savings and retirement accounts, such as Roth IRAs, standard IRAs and 401(k) plans. To ensure that they genuinely need recipients, delve into the particulars of these funds, and remember who you&#39;ve named to collect the benefits when you pass.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">You may need extra documentation to set up receivers for more specific assets or non-traditional investments, such as private equity portfolios or specialty securities. Be sure there&#39;s a guide of all the holdings so estate executors may obey.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">2.&nbsp; Run a family roll call</p>\r\n\r\n<p dir="ltr">If it&rsquo;s been a while since you updated your beneficiaries, consider how your family has changed over the past few years. What marriages and births have expanded your family&rsquo;s reach? What deaths and divorces have occurred? How have dynamics and needs changed as the family evolved and aged? As life happens, there&rsquo;s a good chance your estate beneficiary designations will need updating.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">When it comes to gifting to your current or future children or grandchildren, consider the idea that equal shares for everyone may not always be the fairest distribution. One son who has devoted his life to working at a nonprofit may get a different share of your estate than the daughter who became the CFO of a multinational organization. You may want to start communicating those differences now.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">3.&nbsp; Weighing the tax risks</p>\r\n\r\n<p dir="ltr">Any distributions to recipients are occurrences that are taxable. Others do not. Federal inheritance and gift tax laws are a moving target, and a degree of uncertainty is often introduced by individual states. Your well-intentioned donations could reduce considerably if you don&#39;t account for tax issues.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Starting early with your gift will allow you to send your family tax-beneficial annual presents. This may be actual presents, or in the accounts you set up, they may be gifts. Having a concrete strategy early will help reduce the tax strain that the next generation will face, and understanding who the recipients are begins with that plan.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">4.&nbsp; Align your entire estate plan</p>\r\n\r\n<p dir="ltr">Beneficiary designations can play an important role in your overall estate planning efforts. Life insurance and retirement account distributions are generally settled outside of your estate and are frequently completed much quicker. Calibrating between these accounts and other assets can help ensure the execution of your entire estate plan meets your wishes and desires.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">5.&nbsp; Make modifications as needed</p>\r\n\r\n<p dir="ltr">Armed with all the information you&rsquo;ve pulled together in steps one to four, change beneficiaries as needed. Then record the updates to smooth the process for next time.</p>\r\n\r\n<p dir="ltr">A beneficiary review may be challenging both emotionally and logistically, but it&rsquo;s an essential part of any estate checklist.</p>\r\n\r\n<p dir="ltr">As you determine or review your beneficiary designations, consider these 7 common mistakes to avoid.</p>\r\n	5-step-guide-to-review-your-estate-beneficiaries	2021-03-28 02:03:14.205835	2021-03-28 02:03:14.205835
2	registration.jpg	Register for free today			register-for-free-today	2022-07-22 01:54:53.239904	2022-07-22 01:54:53.239904
3	otp.jpg	Security clearance			security-clearance	2022-07-22 01:55:40.515722	2022-07-22 01:55:40.515722
4	activation.jpg	New Account Activation			new-account-activation	2022-07-22 02:00:45.812294	2022-07-22 02:00:45.812294
5	account_update.jpg	Account Update			account-update	2022-07-22 02:01:16.69813	2022-07-22 02:01:16.69813
6	main-1.jpg	How to Build a Top-of-Wallet Card Experience for Holiday Spend			how-to-build-a-top-of-wallet-card-experience-for-holiday-spend	2022-07-23 15:01:14.00446	2022-07-23 15:01:14.00446
\.


--
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."boards" ("id", "name", "title", "boardimg", "body", "slug", "created_at", "updated_at") FROM stdin;
1	4256 Radford Dr	Honolulu, HI  96818	Honolulu.png		honolulu-hi-96818	2024-01-09 21:53:57.348539	2024-01-09 21:53:57.348539
2	5733 PLEASANT PALMS ST	NORTH LAS VEGAS, NV 89081-5227	nevada.png		north-las-vegas-nv-89081-5227	2024-01-09 21:59:50.09872	2024-01-09 21:59:50.09872
3	2000 W Marine View Dr bldg 1950,	Everett, WA 98207, United States	washinton.png		everett-wa-98207-united-states	2024-01-09 22:16:36.766587	2024-01-09 22:16:36.766587
4	1601 Kirkwood Hwy,	Wilmington, DE SC	carolina.png		wilmington-de-sc	2024-01-09 22:18:58.004708	2024-01-09 22:18:58.004708
5	5278 N Nevada Ave Ste	180, Colorado Springs, CO	colorado.png		180-colorado-springs-co	2024-01-09 22:19:50.36299	2024-01-09 22:19:50.36299
6	2178 Vista Way By Bigs	Oceanside, CA 92054	califonia.png		oceanside-ca-92054	2024-01-09 22:20:26.899908	2024-01-15 13:22:43.498289
\.


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."cards" ("id", "name", "card_number", "cvv", "date", "slug", "status", "user_id", "created_at", "updated_at", "card_type", "card_company", "arrivaltime", "cardimg", "address", "zipcode", "phone") FROM stdin;
11	vhtfvyhvh	\N	\N	\N	vhtfvyhvh	\N	65	2024-03-05 21:06:37.288506	2024-03-05 21:06:37.288506	\N	\N	\N	\N	\N	\N	\N
12	divine	\N	\N	\N	divine	\N	65	2024-04-17 15:55:48.353151	2024-04-17 15:55:48.353151	\N	\N	\N	\N	\N	\N	\N
13	divine	\N	\N	\N	divine-adcf444c-e589-4d38-9930-abb80a80d565	\N	65	2024-04-23 13:50:33.464365	2024-04-23 13:50:33.464365	Credit Card	Visa	\N	\N	\N	\N	\N
\.


--
-- Data for Name: ckeditor_assets; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."ckeditor_assets" ("id", "data_file_name", "data_content_type", "data_file_size", "type", "width", "height", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."contacts" ("id", "country", "phone", "address", "footer_mgs", "email", "created_at", "updated_at") FROM stdin;
1	\N	513683886854	\N	\N	l49v1x@mailto.plus	2023-02-28 07:37:27.52496	2023-02-28 07:37:27.52496
2	\N		\N	\N		2024-07-02 10:42:59.681793	2024-07-02 10:42:59.681793
3	\N		\N	\N		2024-07-22 11:15:37.833411	2024-07-22 11:15:37.833411
4	\N		\N	\N		2024-07-22 11:16:49.291271	2024-07-22 11:16:49.291271
\.


--
-- Data for Name: deposits; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."deposits" ("id", "method", "amount", "status", "date", "account_name", "account_number", "swiftcode", "routing_number", "btcw", "ethw", "btcnote", "user_id", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: faqs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."faqs" ("id", "title", "body", "slug", "created_at", "updated_at") FROM stdin;
1	What is a wire transfer	<p dir="ltr" id="docs-internal-guid-aaaa9033-7fff-cc5a-479a-aab06dedafb2">Wire transfer is a method of electronic funds transfer from one person or entity to another. A wire transfer can be made from one bank account to another bank account or through a transfer of cash at a cash office.</p>\r\n	\N	2021-03-28 01:58:40.636609	2021-03-28 01:58:40.636609
3	Is there a service charge or sending a wire transfer	<p>There is a $30 service charge for each outgoing wire transfer sent from your Petroleum Retirement Savings bank account</p>\r\n	\N	2021-03-28 02:00:37.734557	2021-03-28 02:00:37.734557
4	How do I create a new password or find my username	<p>It happens, sometimes you have to change your password or need help finding your username. You can do both at&nbsp; <a data-component-uri="tcm:222-17716" data-page-uri="tcm:222-8837-64" href="https://www.petretirementsavings.com/users/password/new" type="componentlink">Forgot Password/Username</a> or contact support</p>\r\n	\N	2022-07-12 15:17:36.785233	2022-07-12 15:34:24.180018
2	when will my wire transfer be available 	<p dir="ltr" id="docs-internal-guid-e505c9eb-7fff-41c3-0fb9-593fcb7c512e">Some wire transfers may require additional processing time. In those cases, your wire transfer will posted to your account upon completion of processing, with an effective date of the business day the funds were received.&nbsp;</p>\r\n\r\n<p dir="ltr">Wire transfers received after 6:00 PM C A T will be posted to your account the following business day, with an effective date of the business day the funds were received.</p>\r\n	\N	2021-03-28 01:59:11.981453	2022-07-12 15:36:13.725485
5	How do I request a stop payment 	<div aria-hidden="false" aria-labelledby="NID1_e6b16804c331148" class="c16content" id="NID1_9_1_1_4_2" role="region" style="">\r\n<p>You can request a stop payment through&nbsp; pet retirement savings Online<em><sup>&reg;</sup></em>&nbsp; and by&nbsp; speaking with a banker via contacting support.</p>\r\n\r\n<p>Simply sign on to pet retirement savings Online and access <strong>Manage Accounts</strong> through the <strong>Account</strong> tab.</p>\r\n\r\n<p>To place stop payments for any transaction please have the following information available when speaking to a banker: the Name of Payee, Account Number, Paper item number or range of paper item numbers, Paper item date and Amount of item.</p>\r\n\r\n<p><strong>More information about stop payments</strong></p>\r\n\r\n<ul>\r\n\t<li>The stop payment will remain in effect for six months. To remove a stop payment, please contact support.</li>\r\n\t<li>There is a stop payment fee. For fee information for your account, please refer to your Consumer Account Fee and Information Schedule or contact support.</li>\r\n\t<li>There is no fee for placing stop payments on lost or stolen blank checks.</li>\r\n\t<li>Placing a stop payment order does not release you from any contractual agreements. You may still be held to the terms of the agreement.</li>\r\n</ul>\r\n</div>\r\n	\N	2022-07-12 15:33:56.247674	2022-07-12 15:38:04.03407
\.


--
-- Data for Name: features; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."features" ("id", "fimg", "title", "sub_title", "body", "slug", "created_at", "updated_at") FROM stdin;
1	\N	Customized banking strategies	Your finances may be complex, but your banking relationship shouldn’t be. 	<p dir="ltr" id="docs-internal-guid-eb799f04-7fff-31f3-ad16-872ec8ffcab0">In order to maintain, protect and expand your money, your committed banker works with you to build a tailored approach. We deliver a wide range of premier banking goods, creative funding solutions and exclusive rewards to address your particular personal and business goals.</p>\r\n\r\n<p dir="ltr">We&#39;ll help you develop a banking approach that complements your overall financial strategy by knowing your financial priorities and what&#39;s important to you.</p>\r\n	customized-banking-strategies	2021-03-28 01:29:42.985495	2021-03-28 01:29:42.985495
3	\N	Personal guidance	Making sense of your current finances is our starting point for developing your retirement savings plan.	<p dir="ltr" id="docs-internal-guid-7ea10b59-7fff-b6e8-d51c-2268477f1669">We&#39;ll tailor your investment strategy to help you work toward your goals for the retirement lifestyle you envision.</p>\r\n	personal-guidance	2021-03-28 01:32:34.380378	2021-03-28 01:32:34.380378
2	\N	Secure and convenient account access	You have secure access to your accounts, through a variety of digital channels, backed by our dedicated teams.	<p>We are always on guard to anticipate, address and help prevent security threats.</p><p>&nbsp;24/7 account management</p><p>Online and mobile banking</p><p>Bill pay</p><p>Mobile check deposit</p><p>Dedicated service center</p><p>Secure digital monitoring for potential cyber-threats</p>	2-secure-and-convenient-account-access	2021-03-28 01:31:09.92444	2024-07-01 18:41:20.831273
\.


--
-- Data for Name: feedbacks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."feedbacks" ("id", "icon", "title", "sub_title", "body", "slug", "created_at", "updated_at") FROM stdin;
1		Best choice	\N	Petroleum retirement accounts are an obvious option if you want to have fast access to branches and ATMs and you live where the bank works. Katie Q.K Katie Q.K.\r\n		2021-03-28 01:56:35.926892	2021-03-28 01:56:35.926892
2		Competent Expertise	\N	Excellent banking service, Polite & friendly staffs. Petroleum Retirement Savings bank has always been #1 My Personal Opinion!!! Terry Armstrong.\r\n		2021-03-28 01:57:22.634244	2021-03-28 01:57:22.634244
3		Professional Staffs	\N	Lara, the financial broker, is utterly fabulous. She responds to your requests promptly and follows up if appropriate. She's still friendly and not just stuck in her office, she’s there always working with her staff. This is potentially the most effective and undoubtedly the best bank!\r\n		2021-03-28 01:57:56.222626	2021-03-28 01:57:56.222626
\.


--
-- Data for Name: headers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."headers" ("id", "abouts_title", "abouts_sub_title", "services_title", "services_sub_title", "boards_title", "boards_sub_title", "features_title", "features_sub_title", "feedbacks_title", "feedbacks_sub_title", "blogs_title", "blogs_sub_title", "projects_title", "projects_sub_title", "cta1", "cta2", "headerimg", "created_at", "updated_at", "plans_title", "plans_sub_title", "abtsectionimg", "featimg", "plansimg", "featheaderimg", "planscta1", "planscta2") FROM stdin;
1	Our Dedication 	Discover unparalleled financial services and personalized solutions at Navy SEAL Federal Credit Union. As a premier credit union, we pride ourselves on delivering the same level of dedication and precision that defines the elite Navy SEALs.	Our Services				Why Choose Us	 Join Navy SEAL Federal Credit Union and experience banking designed for heroes.  Secure Access Anytime, Anywhere: Deploy your financial control with confidence. Our Online Banking system ensures your accounts are protected with state-of-the-art security measures, allowing you to manage your money securely from the comfort of your home or on the go.	Reviews		News & Innovations 	Join  our information band wagon directly on your hands 			Open An Account With Us Today	Take advantage of our various services & Products, we have made banking work for you, Try Us Out 	\N	2021-07-17 16:52:36.029408	2024-01-15 13:19:37.247624	From savings and checking accounts to loans and credit cards, we offer a full spectrum of financial products designed to empower our members.	Providing Best	mainabt.png	\N	\N	\N		
\.


--
-- Data for Name: loans; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."loans" ("id", "business_name", "budget", "amount", "interest", "desc", "project_name", "project_size", "project_desc", "date", "name", "first_name", "last_name", "email", "slug", "user_id", "created_at", "updated_at", "step1_status", "step2_status", "step3_status", "phone", "ssn", "business_address", "buisness_type", "business_years", "loan_type", "bfs", "btr", "cr", "bp", "pfs", "ein_vat", "drivers_lfront", "drivers_lback", "ld", "status", "agreement") FROM stdin;
1	Unit Luxury Cars	\N	234567890-	\N		\N	\N	\N	\N	\N	mathew	scarlet	daveskeen24@gmail.com	unit-luxury-cars	63	2024-07-21 10:47:34.053691	2024-07-21 10:47:34.053691	\N	\N	\N	789-098765445	445678987654	\N	partnership	6	Term Loans	\N	\N	\N	\N	\N	456789876	\N	\N	\N	\N	t
2	Unit Luxury Cars	\N	234567890-	\N		\N	\N	\N	\N	\N	mathew	scarlet	daveskeen24@gmail.com	unit-luxury-cars-480b8dce-c9a8-4fbe-8746-8ee1da0a2dba	63	2024-07-21 11:06:31.204821	2024-07-21 11:06:31.204821	\N	\N	\N	789-098765445	445678987654	\N	partnership	6	Term Loans	\N	\N	\N	\N	\N	456789876	\N	\N	\N	\N	t
3	SOLOMONCOX LLC	\N	10,000.000	\N	RENOVATION	\N	\N	\N	\N	\N	Solomon	Cox	solomoncox1960@rescueteam.com	solomoncox-llc	67	2024-07-22 11:10:48.87364	2024-07-22 11:10:48.87364	\N	\N	\N	5104138387	7264-39-058	\N	Limited Liability Company (LLC)	17	Commercial Real Estate Loans	MASS_VENDOR_DEPOSIT_AUTHORIZATION_FORM.pdf	MASS_Credit_Card_Form.pdf	W-9.pdf	W-9.pdf	W-9.pdf	859-1023-47	#<ActionDispatch::Http::UploadedFile:0x00007c4ecb001f68>	#<ActionDispatch::Http::UploadedFile:0x00007c4ecb000d70>	W-9.pdf	\N	t
\.


--
-- Data for Name: otps; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."otps" ("id", "otp", "transfer_id", "created_at", "updated_at") FROM stdin;
3	577237	28	2024-01-17 23:25:36.824805	2024-01-17 23:25:36.824805
\.


--
-- Data for Name: packages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."packages" ("id", "title", "pkimg", "sub_title", "body", "slug", "duration", "rate", "droi", "icon", "created_at", "updated_at") FROM stdin;
1	Term Loans	06.jpg	Term loans offered by NavyXSeal Federal Bank come with a fixed repayment schedule, making them a reliable option for businesses needing substantial funding for various purposes.	<p>*<strong>Description</strong>*: Term loans can be categorized into short-term, intermediate-term, and long-term loans. Short-term loans are typically repaid within a year, intermediate-term loans have a repayment period of 1-3 years, and long-term loans are usually repaid over several years. Each type of term loan is tailored to meet specific business needs, whether it's for immediate working capital, equipment purchase, or significant capital investments.</p><p>*<strong>Purpose</strong>*: The primary purpose of term loans is to provide businesses with the necessary capital to achieve their growth and operational goals. Short-term loans are ideal for covering immediate expenses, such as inventory purchases or short-term working capital needs. Intermediate-term loans are suitable for financing larger expenses, like equipment or technology upgrades. Long-term loans are often used for substantial investments, such as real estate acquisitions or extensive renovations.</p><p>*<strong>Advantages</strong>*: One of the key advantages of term loans from NavyXSeal Federal Bank is the predictability of payments. Businesses can plan their budgets and manage cash flow effectively, knowing the exact amount of each installment. Additionally, the structured repayment terms provide clarity and reduce financial uncertainty. Long-term loans also come with the benefit of lower monthly payments, as the repayment period is extended over several years.</p><p><br></p>	term-loans	\N	3%	2.1%		2024-07-01 22:21:44.213074	2024-07-01 22:21:44.213074
2	Lines of Credit	05.jpg	NavyXSeal Federal Bank offers flexible lines of credit that allow businesses to borrow up to a specified limit and repay the funds as needed, providing a valuable financial safety net.	<p><br></p><p><strong>*Description</strong>*: A line of credit functions similarly to a credit card, where businesses can draw funds up to a pre-approved limit. The amount borrowed can be repaid at any time, and funds can be re-borrowed as needed. This revolving credit structure provides businesses with ongoing access to capital, which can be crucial for managing short-term cash flow fluctuations.</p><p>*<strong>Purpose</strong>*: The primary purpose of a line of credit is to help businesses manage their short-term working capital needs. This can include covering payroll, purchasing inventory, or handling unexpected expenses. By having access to a line of credit, businesses can ensure they have the necessary funds to maintain smooth operations even during cash flow shortages.</p><p>*<strong>Advantages</strong>*: The main advantage of a line of credit is its flexibility. Businesses can borrow only what they need, when they need it, and repay it on their terms. This flexibility can be particularly beneficial for seasonal businesses or those with fluctuating revenue streams. Additionally, interest is typically only charged on the amount borrowed, making it a cost-effective financing option.</p><p><br></p>	lines-of-credit	\N	1.7%	0.9%		2024-07-01 22:23:12.499425	2024-07-01 22:23:12.499425
3	SBA Loans	01.jpg	SBA loans provided by NavyXSeal Federal Bank are guaranteed by the Small Business Administration, offering favorable terms to support small businesses.	<p><br></p><p>*<strong>Description</strong>*: SBA loans include a variety of loan programs such as the 7(a) loan program, CDC/504 loan program, and microloans. Each program is designed to cater to different business needs. The 7(a) loan program is the most common and offers general-purpose loans. The CDC/504 loan program is intended for major fixed assets like real estate or equipment. Microloans are smaller loans designed for startups or newly established small businesses.</p><p>*<strong>Purpose</strong>*: The purpose of SBA loans is to provide small businesses with access to capital that they might not qualify for through traditional lending channels. These loans can be used for a wide range of purposes, including working capital, equipment purchases, real estate acquisition, and business expansion.</p><p>*<strong>Advantages</strong>*: One of the key advantages of SBA loans is the favorable terms, which often include lower interest rates and longer repayment periods compared to conventional loans. This makes it easier for small businesses to manage their finances and invest in growth opportunities. Additionally, the SBA guarantee reduces the risk for lenders, making it more likely for businesses to secure the funding they need.</p>	sba-loans	\N	10%	8.9%		2024-07-01 22:24:34.609437	2024-07-01 22:24:34.609437
4	Equipment Financing	Equipment.jpg	NavyXSeal Federal Bank offers equipment financing to help businesses acquire necessary equipment without large upfront costs.	<p>Equipment financing involves a loan specifically designed for purchasing business equipment. The equipment itself serves as collateral for the loan, which can result in more favorable terms. This type of financing is suitable for acquiring machinery, technology, vehicles, or other essential equipment.</p><p><strong>Purpose: </strong>The primary purpose of equipment financing is to enable businesses to invest in the tools and machinery needed to operate efficiently and grow. This type of loan helps businesses avoid the financial strain of making large upfront payments for equipment purchases.</p><p><strong>Advantages: </strong>The main advantage of equipment financing is the ability to spread the cost of expensive equipment over time, preserving cash flow for other business needs. Additionally, because the equipment serves as collateral, these loans often come with lower interest rates and more favorable terms. Businesses can also benefit from potential tax advantages associated with equipment purchases.</p><p><br></p>	equipment-financing	\N	3%	2.3%		2024-07-02 04:01:50.007206	2024-07-02 04:05:33.957381
5	Invoice Financing (Factoring)	Invoicing.jpg	NavyXSeal Federal Bank rprovides invoice financing, allowing businesses to borrow against their accounts receivable and improve cash flow.	<p>Invoice financing, also known as factoring, involves selling unpaid invoices to the bank at a discount in exchange for immediate cash. The bank advances a portion of the invoice amount and collects payment from the customers when the invoices are due.</p><p><strong>Purpose: </strong>The primary purpose of invoice financing is to help businesses manage cash flow by leveraging outstanding invoices. This type of financing is particularly useful for businesses that experience delays in receiving payments from customers, as it provides immediate access to funds.</p><p><strong>Advantages: </strong>One of the key advantages of invoice financing is the ability to convert accounts receivable into immediate cash, improving liquidity and enabling businesses to meet their financial obligations. This type of financing does not require additional collateral, as the invoices themselves serve as security. Additionally, businesses can benefit from faster access to funds compared to traditional loans.</p><p><br></p>	invoice-financing-factoring	\N	4%	1.9%		2024-07-02 04:09:14.994323	2024-07-02 04:09:14.994323
6	Commercial Real Estate Loans	Commercial_Real_Estate.jpg	NavyXSeal Federal Bank offers commercial real estate loans to help businesses purchase, construct, or refinance commercial properties.	<p>Commercial real estate loans are specifically designed for acquiring or improving business properties. These loans can be used to purchase new property, construct new buildings, or refinance existing commercial real estate.</p><p><strong>Purpose: </strong>The primary purpose of commercial real estate loans is to provide businesses with the necessary funds to invest in property that will support their operations and growth. This can include office spaces, retail locations, warehouses, and other commercial property types.</p><p><strong>Advantages: </strong>One of the main advantages of commercial real estate loans is the ability to spread the cost of property investment over an extended period, making it more affordable for businesses. Additionally, owning commercial property can provide long-term financial benefits, including potential property appreciation and tax advantages. These loans often come with favorable interest rates and terms tailored to the specific needs of the business.</p><p><br></p>	commercial-real-estate-loans	\N	3%	2.3%		2024-07-02 04:11:46.791457	2024-07-02 04:11:46.791457
7	Business Credit Cards	Business_Credit_Cards.jpg	NavyXSeal Federal Bank provides business credit cards, offering revolving credit for everyday business expenses with various rewards and benefits.	<p>Business credit cards function similarly to personal credit cards but are tailored for business use. They provide a revolving line of credit that can be used for various business expenses, such as office supplies, travel, and operational costs. These credit cards often come with rewards programs and other benefits designed to support business needs.</p><p><strong>Purpose:</strong> The primary purpose of business credit cards is to offer a convenient and flexible way for businesses to manage their everyday expenses. They can also help businesses track spending, earn rewards, and build business credit.</p><p><strong>Advantages:</strong> One of the key advantages of business credit cards is their flexibility. Businesses can use the cards for a wide range of expenses and benefit from rewards programs that offer cash back, travel points, or other incentives. Additionally, business credit cards can provide valuable perks such as expense management tools, travel insurance, and purchase protection. They also help in building a business credit history, which can be beneficial for future financing needs.</p><p><br></p>	business-credit-cards	\N	2%	2.5%		2024-07-02 04:22:08.460247	2024-07-02 04:22:08.460247
9	Trade Credit	Trade_Credit.jpg	NavyXSeal Federal Bank offers trade credit, providing short-term credit from suppliers for purchasing goods and services.	<p>Trade credit involves suppliers extending credit to businesses, allowing them to purchase goods and services and pay for them at a later date. This type of credit is typically interest-free and is negotiated directly between the business and its suppliers.</p><p><strong>Purpose:</strong> The primary purpose of trade credit is to help businesses manage their cash flow by deferring payment for supplies. This can be especially useful for businesses that need to maintain inventory without immediate payment.</p><p><strong>Advantages:</strong> One of the key advantages of trade credit is the interest-free financing it provides, which can help businesses save on borrowing costs. Additionally, trade credit allows businesses to improve their cash flow management by aligning payments with their revenue cycles. It also helps build strong relationships with suppliers, which can lead to better terms and conditions in the future.</p><p><br></p>	trade-credit	\N	3%	1.9%		2024-07-02 04:37:06.515494	2024-07-02 04:37:06.515494
10	 Bridge Loans	Bridge_Loans.jpg	NavyXSeal Federal Bank offers bridge loans, providing short-term financing to bridge the gap until longer-term funding is secured.	<p>Bridge loans are short-term loans designed to provide immediate funding for businesses that need to cover expenses or take advantage of opportunities while waiting for longer-term financing. These loans are typically repaid within a few months to a year.</p><p><strong>Purpose:</strong> The primary purpose of bridge loans is to offer interim financing for businesses during transitional periods, such as during a property purchase, before securing permanent financing, or while waiting for a major contract payment.</p><p><strong>Advantages: </strong>The main advantage of bridge loans is the quick access to funds, allowing businesses to act promptly on opportunities or cover urgent expenses. These loans can be a critical source of temporary financing, helping businesses avoid cash flow shortages and maintain operations smoothly. Additionally, bridge loans often have flexible terms and can be customized to meet the specific needs of the business.</p><p><br></p>	bridge-loans	\N	2.5%	1.9%		2024-07-02 04:43:49.689155	2024-07-02 04:43:49.689155
11	Franchise Loans	Franchise_Loans.jpg	NavyXSeal Federal Bank provides franchise loans, supporting individuals looking to open a franchise with tailored financing solutions.	<p>Franchise loans are designed specifically for financing the startup costs associated with opening a franchise. These loans can cover expenses such as franchise fees, equipment purchases, real estate, and initial working capital.</p><p><strong>Purpose: </strong>The primary purpose of franchise loans is to support entrepreneurs in launching and operating franchise businesses. By providing the necessary funding, these loans help franchisees overcome the financial barriers to entry and ensure they have the resources needed to succeed.</p><p>A<strong>dvantages: </strong>One of the key advantages of franchise loans is the tailored support they offer for franchise business needs. Lenders often have experience working with franchises and can provide valuable guidance and favorable terms. Franchise loans can also help franchisees take advantage of the brand recognition and established business model of the franchisor, increasing the likelihood of success. Additionally, these loans can cover a wide range of startup expenses, providing comprehensive financial support.</p><p><br></p>	franchise-loans	\N	3%	1.5%		2024-07-02 04:46:37.13136	2024-07-02 04:46:37.13136
12	Working Capital Loans	Working_Capital_Loans.jpg	NavyXSeal Federal Bank offers working capital loans, providing funds to manage day-to-day business operations.	<p>Working capital loans are designed to finance the day-to-day operational needs of a business. These loans can be used for expenses such as payroll, rent, utilities, and other operational costs. Working capital loans are typically short-term and can be secured or unsecured, depending on the business's financial situation.</p><p><strong>Purpose: </strong>The primary purpose of working capital loans is to ensure that businesses have the necessary funds to maintain smooth operations and meet their short-term financial obligations. This type of financing is essential for managing cash flow and addressing temporary financial gaps.</p><p><strong>Advantages:</strong> The main advantage of working capital loans is the ability to maintain business operations smoothly, even during periods of cash flow shortages. These loans provide immediate access to funds, allowing businesses to cover operational expenses without delay. Additionally, working capital loans can be customized to meet the specific needs of the business, providing flexible and targeted financial support. This type of financing also helps businesses take advantage of growth opportunities and manage seasonal fluctuations in revenue.</p>	working-capital-loans	\N	3.5%	2.0%		2024-07-02 04:50:50.123104	2024-07-02 04:50:50.123104
\.


--
-- Data for Name: plans; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."plans" ("id", "title", "planimg", "sub_title", "body", "slug", "created_at", "updated_at") FROM stdin;
1	Online Savings Account	\N	: Save money for something great. The right savings account can help put your goals within reach.	<p dir="ltr" id="docs-internal-guid-add63d7b-7fff-6e09-ad70-fe0c5c626070">We have savings account you can choose from to suit your personnel needs.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Standard savings for easy access</p>\r\n\r\n<p dir="ltr">A basic savings account built for fast, convenient access to your hard earned money.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Standard Savings account benefits&nbsp;</p>\r\n\r\n<p dir="ltr">Earns interest</p>\r\n\r\n<p dir="ltr">Learn how to save money and watch it grow by earning interest on your account balance.</p>\r\n\r\n<p dir="ltr">Platinum select money market savings</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">An exclusive savings account for our top-tier checking customers.</p>\r\n\r\n<p dir="ltr">The Platinum Select Money Market Savings account gives you competitive interest rates and great benefits &ndash; and it&rsquo;s reserved exclusively for our Platinum Checking Package customers.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Platinum Select Money Market Savings account benefits</p>\r\n\r\n<p dir="ltr">No monthly maintenance fee</p>\r\n\r\n<p dir="ltr">Platinum Select Money Market Savings has no monthly maintenance fee &ndash; so your savings can grow even faster.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Features competitive interest</p>\r\n\r\n<p dir="ltr">The Platinum Select Money Market savings account features competitive interest rates for a savings account.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Online and mobile banking</p>\r\n\r\n<p dir="ltr">Secure access to your account makes it easy to stay in control of your finances, wherever you are online.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Automated savings options</p>\r\n\r\n<p dir="ltr">Set up recurring transfers to your savings account from another U.S. Bank account, and see your savings grow.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">E-Statements</p>\r\n\r\n<p dir="ltr">Statements for savings accounts are archived automatically online for fast access anytime &ndash; and best of all, they&#39;re free.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Overdraft protection option</p>\r\n\r\n<p dir="ltr">Your savings account can be linked to your checking account to provide automatic coverage of negative checking balances.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Custom account alerts</p>\r\n\r\n<p dir="ltr">You can set up email or text message reminders about transfers, low balances and other important activity on your account.</p>\r\n	online-savings-account	2021-03-28 01:46:27.608253	2021-03-28 01:46:27.608253
2	Retirement Money Market	\N	Savings for the long term, With a Retirement Money Market account, you can diversify your retirement portfolio with a tax advantage.	<p dir="ltr" id="docs-internal-guid-b81b976f-7fff-2f42-9597-ee9ad43262b5">With a Retirement Money Market account, you can diversify your retirement portfolio with a tax advantage. This account requires an individual retirement account plan.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Retirement Money Market account benefits</p>\r\n\r\n<p dir="ltr">No monthly maintenance fee</p>\r\n\r\n<p dir="ltr">Grow your savings even faster with no monthly maintenance fee.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Competitive interest rates</p>\r\n\r\n<p dir="ltr">Build your retirement savings with competitive, tiered interest rates.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Get an account</p>\r\n\r\n<p dir="ltr">$25 automatic monthly deposit or $100 minimum opening deposit</p>\r\n\r\n<p dir="ltr">$0 monthly maintenance fee</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Online and mobile banking</p>\r\n\r\n<p dir="ltr">Secure access to your account makes it easy to stay in control of your finances, wherever you are online.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Automated savings options</p>\r\n\r\n<p dir="ltr">Set up recurring transfers to your savings account from another U.S. Bank account, and see your savings grow.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">E-Statements</p>\r\n\r\n<p dir="ltr">Statements for savings accounts are archived automatically online for fast access anytime &ndash; and best of all, they&#39;re free.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Overdraft protection option</p>\r\n\r\n<p dir="ltr">Your savings account can be linked to your checking account to provide automatic coverage of negative checking balances.&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Custom account alerts</p>\r\n\r\n<p dir="ltr">You can set up email or text message reminders about transfers, low balances and other important activity on your account.&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Get an account</p>\r\n\r\n<p dir="ltr">$25 minimum opening deposit</p>\r\n\r\n<p dir="ltr">$0 or $4 monthly maintenance fee</p>\r\n\r\n<p dir="ltr">Requirement to waive monthly maintenance fee: $300 minimum daily ledger balance3 OR $1,000 average monthly collected balance4&nbsp; OR account holder(s) under age 185.</p>\r\n	retirement-money-market	2021-03-28 01:49:17.785169	2021-03-28 01:49:17.785169
3	Checking Account	\N	A basic checking account with our standard features	<p>No matter where you are in life, our Checking Account will help bring you closer to your goals; it helps you to quickly transfer funds in your bank account.</p>\r\n\r\n<p>A Pet Retirement Savings checking account is a convenient way to spend your finances with ease, whether you choose to simply tackle daily payments and regular expenses, or discover new opportunities to gain bonuses and incentives.</p>\r\n\r\n<p>&nbsp;Say goodbye to fees.</p>\r\n\r\n<p>No Fees Period. That means you won&#39;t be charged an account fee on our Checking account.&nbsp;</p>\r\n\r\n<p>$0</p>\r\n\r\n<p>Monthly maintenance</p>\r\n\r\n<p>Withdrawals at over 60,000 ATMs nationwide</p>\r\n\r\n<p>Replacement debit card</p>\r\n\r\n<p>Standard checks</p>\r\n\r\n<p>Official bank check</p>\r\n\r\n<p>Online bill pay</p>\r\n\r\n<p>Expedited delivery for debit card replacement</p>\r\n\r\n<p>Expedited delivery for official bank checks</p>\r\n\r\n<p>Deposited item returned</p>\r\n\r\n<p>Stop payment order</p>\r\n\r\n<p>Insufficient funds</p>\r\n\r\n<p>Account closure</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Checking account features and benefits:</p>\r\n\r\n<p>Pet Retirement Savings fees waived on incoming wire transfers, international and domestic&nbsp;</p>\r\n\r\n<p>$25 discount on any size safe deposit box</p>\r\n\r\n<p>Free money orders and official cheque Free&nbsp;</p>\r\n\r\n<p>100-pack of Pet Retirement Savings custom checks or 50% off 1st check order (any style checks)</p>\r\n	checking-account	2021-03-28 01:50:14.439976	2021-03-28 01:50:14.439976
4	Business Accounts	\N	This account was uniquely developed to facilitate account holders to run their accounts at reduced expense while leveraging other resources needed to expand their companies.	<p dir="ltr" id="docs-internal-guid-aa663bfd-7fff-eba8-1262-0fbd0ba862b9">Explore our flexible and cost-efficient business account options to help you manage your day-to-day banking and unique business needs &ndash; from investing, making hitch-free 3rd party transactions, target savings to fast tracking international transactions, we are here to provide the support you need on your journey to success.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Benefits</p>\r\n\r\n<p dir="ltr">Account is online real time&nbsp;</p>\r\n\r\n<p dir="ltr">Zero current account maintenance fee (subject to maintaining minimum balance and maximum turnover covenant)&nbsp;</p>\r\n\r\n<p dir="ltr">Free Financial Advisory Services&nbsp;</p>\r\n\r\n<p dir="ltr">Free Economic and Business Intelligence Reports&nbsp;</p>\r\n\r\n<p dir="ltr">Monitor account activities at the comfort of your home or office through the internet&nbsp;</p>\r\n\r\n<p dir="ltr">Third party withdrawals&nbsp;</p>\r\n\r\n<p dir="ltr">Provides account information updates via SMS/Email alerts.&nbsp;</p>\r\n	business-accounts	2021-03-28 01:51:09.241848	2021-03-28 01:51:09.241848
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."schema_migrations" ("version") FROM stdin;
20200116073828
20200116073906
20200116083824
20200116123928
20200123165739
20200123180106
20200123181039
20200123181410
20200124184336
20200124185228
20200124185559
20200125152652
20200131022934
20200131023824
20200131032932
20200203002814
20200203002953
20200203004054
20200219182423
20200219194149
20200224081215
20200229214657
20200229214921
20200229232734
20200302133128
20200303214519
20200303225523
20200305232417
20200306003539
20200717173237
20200723131042
20201028220300
20201028221823
20201028222359
20201028222612
20201030201454
20201031145415
20201115013528
20201115013722
20201115022432
20210717155431
20230408153527
20230408153528
20230712150805
20230805164543
20230808154706
20240105180834
20240417161141
20240627170019
20240701164703
20240701180225
20240709185321
20240711162348
20240716153756
20240716172641
20240721110420
\.


--
-- Data for Name: sections; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."sections" ("id", "title", "icon", "sub_title", "body", "slug", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."services" ("id", "title", "sub_title", "body", "slug", "created_at", "updated_at", "serviceimg") FROM stdin;
2	Debt Consolidation	We have a variety of programs for debt consolidation that will fit your financial goals. We offer a variety of debt consolidation services that would suit your financial priorities.	<p dir="ltr" id="docs-internal-guid-7f376a3c-7fff-837d-9def-9d4ec39cd793">We have the best program to help you make that easier, if you want to lower your monthly cost or pay off debt quicker.</p>\r\n\r\n<p dir="ltr">What is Debt Consolidation?</p>\r\n\r\n<p dir="ltr">The method of merging several debts from credit cards, high-interest loans, and other bills into one monthly payment is debt restructuring. Debt consolidation options will reduce the interest rate, which can help you save interest money, increase your mortgage costs, and pay off debt more quickly.</p>\r\n\r\n<p dir="ltr">&nbsp;Benefits&nbsp;</p>\r\n\r\n<p dir="ltr">Debt consolidation could help you take control of your finances.</p>\r\n\r\n<ul>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">Helps you Save Money.&nbsp;</p>\r\n\t</li>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">Consolidate Monthly Bills.&nbsp;</p>\r\n\t</li>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">Simplify and streamline your finances.&nbsp;</p>\r\n\t</li>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">&nbsp;Eliminate Debt Faster.&nbsp;</p>\r\n\t</li>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">Pay off debt over time.&nbsp;</p>\r\n\t</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">Here&#39;s how it Works</p>\r\n\r\n<ul>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">Decide which debts to pay off</p>\r\n\t</li>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">Consolidate credit cards, store cards, gas cards, medical bills, and more. Separately, you can also consolidate federal and private student loans.&nbsp;</p>\r\n\t</li>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">Review your loan or balance transfer offers</p>\r\n\t</li>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">Compare debt consolidation programs and apply for the one that&#39;s right for you.</p>\r\n\t</li>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">Start paying down your debt.&nbsp;</p>\r\n\t</li>\r\n</ul>\r\n\r\n<p dir="ltr">We can help you determine a monthly payment you&#39;re comfortable with as you pay down debt.</p>\r\n	debt-consolidation	2021-03-28 01:20:15.077595	2021-03-28 01:20:15.077595	\N
3	Structured Investment Solutions	: The needs of your workers are of vital importance to your business.	<p dir="ltr" id="docs-internal-guid-2cce147d-7fff-23bc-8c19-897adaec4892">Pet Retirement Savings offers individuals seeking job programs with a finely personalized service, serving as both Trustee and Administrator. Our customers are diverse in different industries, ranging from small enterprises to global public corporations, including mining, manufacturing, facility management, retail, technology and transport.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p dir="ltr">We know that you need a dependable and competent service provider when your company needs an employee compensation plan or a pension scheme. We will give you the ideas you need with several years of practice across distinct jurisdictions.</p>\r\n\r\n<p dir="ltr">We deliver a wide selection of strategies tailored to help and improve the company&#39;s employee schemes, including:</p>\r\n\r\n<ul>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">Share incentive plans</p>\r\n\t</li>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">Joint share ownership plans</p>\r\n\t</li>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">Pension schemes</p>\r\n\t</li>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">Share savings</p>\r\n\t</li>\r\n</ul>\r\n	structured-investment-solutions	2021-03-28 01:21:54.342782	2021-03-28 01:21:54.342782	\N
4	Loan	For lifetime investments, we provide dynamic loan solutions.	<h5 dir="ltr" id="docs-internal-guid-cfef3e1e-7fff-28de-8056-872f1200d2f2">This helps consumers to realize their individual aspirations with the solution as an integral part of their overall wealth package by consolidating multiple investments as leverage into one loan provider.</h5>\r\n\r\n<h5 dir="ltr">Customers benefit from personalized options such as home financing (property acquisition, bridging loans, equity release) and Lombard Finance (secured by marketable securities for the purchase of additional assets) through our Specialist Loan Advisors.</h5>\r\n\r\n<h5 dir="ltr">We offer a range of loan including:</h5>\r\n\r\n<ul>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">Property Loans</p>\r\n\t</li>\r\n</ul>\r\n\r\n<p dir="ltr">As part of a wider relationship we offer finance secured either on your home or a residential investment property.</p>\r\n\r\n<ul>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">Lombard Loans</p>\r\n\t</li>\r\n</ul>\r\n\r\n<p dir="ltr">These loans can be used to complement your overall wealth management strategy by providing a facility secured against investment portfolios managed by Pet Retirement Savings with a view to enhancing your overall return. Your portfolio can also be used to secure borrowing required for other purposes.</p>\r\n\r\n<ul>\r\n\t<li aria-level="1" dir="ltr">\r\n\t<p dir="ltr" role="presentation">Yacht or Jet Finance</p>\r\n\t</li>\r\n</ul>\r\n\r\n<p dir="ltr">We can introduce you to specialist teams who will offer you advice, as well as structure and provide the finance required for these acquisitions.</p>\r\n	loan	2021-03-28 01:25:12.613794	2021-03-28 01:25:12.613794	\N
5	 E-banking	At your convenience, you can control your finances.	<p>At Petroleum Retirement Accounts, every time of the day and from everywhere in the world, we aim to ease the way you handle your finances. We deliver a new and reliable eBanking service as part of this continuing devotion.</p>\r\n\r\n<p>For us, nothing is more important than the protection of your cash. There are a variety of authentication procedures you&#39;ll need to complete in order to set up your account. It is easy to do and within a couple of minutes it can be done.&nbsp;</p>\r\n	e-bankingx	2021-03-28 01:26:14.890171	2022-07-12 15:56:06.508047	\N
1	Banking and Deposits	A personalized service for the management of your everyday needs.	<p>: From handling your current account to fixed deposit deposits, we provide a variety of banking services to satisfy your requirements easily and quickly. You will also have access to a foreign exchange transaction and an infinite visa card.</p><ul><li>Current account</li></ul><p>Our current account offers you the flexibility to manage your money, with a personal service, should you need any assistance.</p><ul><li>International money transfer&nbsp;</li><li>Visa Infinite and Visa Debit Cards</li></ul><p>Foreign exchange services in all major currencies.&nbsp;</p><ul><li>Deposit accounts</li></ul><p>Should you have a larger sum of money you would like the potential to grow over varying periods of time, we have a number of deposit accounts you can choose from.</p><ul><li>Instant access deposit accounts</li></ul><p>We offer you quick and easy access to your cash for your day-to-day necessities.</p><ul><li>Fixed deposit accounts</li></ul><p>We offer rates for fixed deposits in a variety of currencies to meet your personal requirements.&nbsp;</p>	banking-and-deposits	2021-03-28 01:18:43.098117	2024-07-01 18:45:59.171916	\N
6	Credit/Debit  Cards	Our dedicated investment expert will guide you depending on your investment needs	<h5>It takes time and experience to handle the finances, as markets and strategies are getting more complex and the flow of knowledge can be daunting.</h5><p>Based on a detailed understanding of your investment needs, risk tolerance, success expectations and investment choice, we are working with you to build an acceptable investment plan that is right for you.</p><p>Advisory Support for Investment</p><p>With guidance given by our consultants, you make the final call on your investments.</p><p>In order to keep in charge of your finances, we provide you with the specialist investing expertise you need to make better portfolio decisions.</p><p>Advice will take several different forms and to help you make investing decisions, we offer a balanced approach:</p><p>Asset allocation: identifying your portfolio's rundown of global asset allocation will allow you to measure your risk tolerance.</p><p>Recommendations: We assist you to develop your tailored portfolio and offer investing advice based on your criteria and our investment convictions until we have established your optimum asset allocation together.</p><p>Risk management: We monitor your portfolio and can propose new investment ideas that are aligned with your investment profile and changing market conditions.</p><p>&nbsp;</p><p>We offer different levels of service depending on how much time you wish to spend on investment decision making and how much involvement and expertise you want.</p>	wealth-management	2021-03-28 01:27:40.658351	2024-01-15 22:06:09.634313	\N
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."transactions" ("id", "amount", "transac_type", "date", "purpose", "sender", "status", "user_id", "slug", "created_at", "updated_at", "account_id", "bal_type") FROM stdin;
30	50,000	Wire Transfer	2019-08-13 13:07:00	Wage	HRO-Taskforce Team 826	t	63	\N	2024-01-15 23:10:43.839777	2024-01-15 23:10:43.839777	\N	Credit
31	12,000	ACH Transfer	2019-10-07 13:03:00	Insurance	Leave Application Fund	t	63	\N	2024-01-15 23:14:49.515264	2024-01-15 23:14:49.515264	\N	Credit
32	5,200	Cash Withdrawal	2019-12-15 05:18:00	debit	NY teller machine	t	63	\N	2024-01-15 23:16:22.786898	2024-01-15 23:16:22.786898	\N	Debit
33	2,700	Cash Withdrawal	2020-01-07 14:07:00	debit	WALMART--store purchase	t	63	\N	2024-01-15 23:18:10.190858	2024-01-15 23:18:10.190858	\N	Debit
34	12,000	ACH Transfer	2020-04-09 15:17:00	Insurance	Leave Application Fund	t	63	\N	2024-01-15 23:19:21.727631	2024-01-15 23:19:21.727631	\N	Credit
35	27,118.00	Wire Transfer	2019-01-15 07:22:00	Private first Class (E3) Basic Pay	Defense Finance Accounting Service (DFAS)	t	64	\N	2024-01-16 09:38:31.614184	2024-01-16 09:42:05.450829	\N	Credit
36	27,118.00	Wire Transfer	2019-02-15 20:03:00	Private first Class (E3) Basic Pay	Defense Finance Accounting Service (DFAS)	t	64	\N	2024-01-16 09:50:13.316094	2024-01-16 09:50:13.316094	\N	Credit
37	2,5000.00	Cash Withdrawal	2019-02-03 12:42:00	purchase	Navyscredit ATM96818	t	64	\N	2024-01-16 10:04:31.331428	2024-01-16 10:05:52.02774	\N	Debit
38	27,118.00	Wire Transfer	2019-03-15 23:50:00	Private first Class (E3) Basic Pay	Defense Finance Accounting Service (DFAS)	t	64	\N	2024-01-16 10:09:35.827211	2024-01-16 10:09:35.827211	\N	Credit
39	27,118.00	Wire Transfer	2019-04-15 03:14:00	Private first Class (E3) Basic Pay	Defense Finance Accounting Service (DFAS)	t	64	\N	2024-01-16 10:12:45.588995	2024-01-16 10:12:45.588995	\N	Credit
41	10,000.00	Cash Withdrawal	2019-05-03 14:08:00	personal expenses	NavyScredit Teller 0023	t	64	\N	2024-01-16 10:29:43.096538	2024-01-16 10:29:55.519865	\N	Debit
43	2,000.00	Cash Withdrawal	2019-05-17 12:55:00	Purchase	Dollar General low price store Hilo-90281	t	64	\N	2024-01-16 10:40:38.413593	2024-01-16 10:40:38.413593	\N	Debit
42	5,550.00	Cash Withdrawal	2019-05-10 23:06:00	Walmart Purchase	Walmart-store Hilo-87351	t	64	\N	2024-01-16 10:34:32.485979	2024-01-16 10:42:19.919411	\N	Debit
44	27,118.00	Wire Transfer	2019-06-20 07:50:00	Private first Class (E3) Basic Pay	Defense Finance Accounting Service (DFAS)	t	64	\N	2024-01-16 10:50:09.014954	2024-01-16 10:52:19.797347	\N	Credit
45	27,118.00	Wire Transfer	2019-07-15 23:15:00	Private first Class (E3) Basic-Pay	Defense Finance Accounting Service (DFAS)	t	64	\N	2024-01-16 10:55:11.7988	2024-01-16 10:55:11.7988	\N	Credit
47	27,118.00	ACH Transfer	2019-08-15 18:11:00	Private first Class (E3) Basic Pay-Automated Clearing House	Defense Finance Accounting Service (DFAS)	t	64	\N	2024-01-16 11:16:14.425284	2024-01-16 11:16:14.425284	\N	Credit
48	27,118.00	ACH Transfer	2019-09-15 23:23:00	Private first Class (E3) Basic Pay-Electronic funds tranfer (EFT)	Defense Finance Accounting Service (DFAS)	t	64	\N	2024-01-16 11:21:03.021481	2024-01-16 11:21:03.021481	\N	Credit
49	27,118.00	ACH Transfer	2019-10-15 20:17:00	Private first Class (E3) Basic Pay	Defense Finance Accounting Service (DFAS)	t	64	\N	2024-01-16 11:29:18.019269	2024-01-16 11:29:18.019269	\N	Credit
51	27,118.00	ACH Transfer	2019-11-15 14:31:00	Private first Class (E3) Basic Pay	Defense Finance Accounting Service (DFAS)	t	64	\N	2024-01-16 11:34:39.775473	2024-01-16 11:34:39.775473	\N	Credit
52	100,000.00	Cash Withdrawal	2019-12-06 02:47:00	Teller	NavyScredit Teller-012	t	64	\N	2024-01-16 11:52:26.916785	2024-01-16 11:52:47.950063	\N	Debit
53	50,000.00	Cash Withdrawal	2019-12-11 18:33:00	Teller	NavyScredit Teller-012	t	64	\N	2024-01-16 11:54:55.605564	2024-01-16 11:54:55.605564	\N	Debit
54	5,000.00	Cash Withdrawal	2019-12-14 20:55:00	purchase	Walmart Hilo-90284	t	64	\N	2024-01-16 11:58:10.761202	2024-01-16 11:58:10.761202	\N	Debit
55	27,118.00	ACH Transfer	2019-12-15 19:53:00	Private first Class (E3) Basic Pay-Electronic funds tranfer (EFT)	Defense Finance Accounting Service (DFAS)	t	64	\N	2024-01-16 12:00:12.466734	2024-01-16 12:00:12.466734	\N	Credit
46	2,000,000.00	Wire Transfer	2019-08-10 16:41:00	Military Special Pay Active Duty 0-10	Defense Finance Accounting Service (DFAS)-Military Special Pay Active Duty 0-10	t	64	\N	2024-01-16 11:05:47.315261	2024-01-16 12:32:05.230478	\N	Credit
40	1,000,000.00	ACH Transfer	2019-05-01 10:50:00	Allowance Pay 0-10	Defense Finance Accounting Service (DFAS) Allowance Pay 0-10	t	64	\N	2024-01-16 10:26:03.120441	2024-01-16 12:36:17.233753	\N	Credit
50	1,200,000.00	ACH Transfer	2019-11-11 14:49:00	Veteran Active Pay 0-10 Electronic Funds Transfer (EFT)	Defense Finance Accounting Service (DFAS) Veteran Active Pay 0-10 Electronic Funds Transfer (EFT)	t	64	\N	2024-01-16 11:32:19.022424	2024-01-16 12:37:59.475191	\N	Credit
56	27,118.00	ACH Transfer	2020-01-15 14:55:00	Private first Class (E3) Basic Pay-Electronic funds tranfer (EFT)	Defense Finance Accounting Service (DFAS)	t	64	\N	2024-01-16 12:08:35.521388	2024-01-16 13:20:58.979948	\N	Credit
69	200,000.00	ACH Transfer	2021-04-26 04:27:00	Private first Class (E3) Basic Pay-Electronic funds tranfer (EFT	Defense Finance Accounting Service (DFAS)	t	67	\N	2024-07-01 15:21:39.424061	2024-07-01 15:21:39.424061	\N	Credit
59	227,118.00	ACH Transfer	2019-01-01 03:17:00	Private first Class (E3) Basic Pay-Electronic funds tranfer (EFT	Defense Finance Accounting Service (DFAS)	t	67	\N	2024-07-01 14:09:36.949191	2024-07-01 14:09:36.949191	\N	Credit
60	750,391.00	ACH Transfer	2019-12-19 04:18:00	Private first Class (E3) Basic Pay-Electronic funds tranfer (EFT	 Defense Finance Accounting Service (DFAS)	t	67	\N	2024-07-01 14:16:13.798435	2024-07-01 14:16:13.798435	\N	Credit
61	2,000,000.00	Wire Transfer	2020-01-31 01:30:00	Private first Class (E3) Basic Pay-Electronic funds tranfer (EFT	Defense Finance Accounting Service (DFAS)	t	67	\N	2024-07-01 14:20:27.717308	2024-07-01 14:20:27.717308	\N	Credit
62	200,000.00	Cash Withdrawal	2020-02-01 04:12:00	Private first Class (E3) Basic Pay-Electronic funds tranfer (EFT	Defense Finance Accounting Service (DFAS)	t	67	\N	2024-07-01 14:22:40.674907	2024-07-01 14:22:40.674907	\N	Debit
63	3,500,000.00	Wire Transfer	2020-04-30 16:15:00	Private first Class (E3) Basic Pay-Electronic funds tranfer (EFT	 Defense Finance Accounting Service (DFAS)	t	67	\N	2024-07-01 14:27:59.103451	2024-07-01 14:27:59.103451	\N	Credit
64	200,000.00	Cash Withdrawal	2020-03-30 05:06:00	Via teller 0039	Debit	t	67	\N	2024-07-01 14:33:21.851092	2024-07-01 14:33:21.851092	\N	Debit
65	600,000,000.00	Wire Transfer	2020-12-21 18:25:00	FOR PEACEKEEPING REWARDS REIMBURSEMENT UNITED NATION(UN)	UNITED NATION(UN)	t	67	\N	2024-07-01 14:50:59.90494	2024-07-01 14:50:59.90494	\N	Credit
66	500,000.00	Cash Withdrawal	2021-01-25 15:00:00	Via teller 0039	Debit	t	67	\N	2024-07-01 14:57:50.036316	2024-07-01 14:57:50.036316	\N	Debit
67	2,500,000.00	Wire Transfer	2021-02-01 14:17:00	Private first Class (E3) Basic Pay-Electronic funds tranfer (EFT	Defense Finance Accounting Service (DFAS)	t	67	\N	2024-07-01 15:02:11.415144	2024-07-01 15:02:11.415144	\N	Credit
68	200,000.00	Direct Deposits	2021-03-30 15:17:00	Private first Class (E3) Basic Pay-Electronic funds tranfer (EFT	Defense Finance Accounting Service (DFAS)	t	67	\N	2024-07-01 15:05:12.0476	2024-07-01 15:05:12.0476	\N	Credit
70	200,000.00	Cash Withdrawal	2021-05-03 10:15:00	Via teller 0039	Debit	t	67	\N	2024-07-01 15:24:17.583967	2024-07-01 15:24:17.583967	\N	Debit
71	500,000.00	ACH Transfer	2021-05-31 04:15:00	Private first Class (E3) Basic Pay-Electronic funds tranfer (EFT	Defense Finance Accounting Service (DFAS)	t	67	\N	2024-07-01 15:25:56.606861	2024-07-01 15:25:56.606861	\N	Credit
72	100,000.00	Cash Withdrawal	2021-06-01 01:14:00	Via teller 0039	Debit	t	67	\N	2024-07-01 15:30:10.001422	2024-07-01 15:30:10.001422	\N	Debit
73	2,500,000.00	Wire Transfer	2021-11-26 02:35:00	FOR PEACEKEEPING REWARDS REIMBURSEMENT UNITED NATION(UN)	Defense Finance Accounting Service (DFAS)	t	67	\N	2024-07-01 15:32:07.381625	2024-07-01 15:32:07.381625	\N	Credit
\.


--
-- Data for Name: transfers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."transfers" ("id", "account_name", "account_number", "routine_number", "swift_code", "user_id", "bank_name", "amount", "status", "account_id", "slug", "notes", "country", "otp", "pin", "created_at", "updated_at", "transfer_type", "confirmed", "tref") FROM stdin;
28	mathew	76776767678	576756567		63	wells fargo	100,000	f	\N	76776767678	food	Aland Islands	577237	1849	2024-01-17 23:16:31.182241	2024-01-17 23:26:37.120417	Wire Transfer	f	622598470
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."users" ("id", "email", "encrypted_password", "reset_password_token", "reset_password_sent_at", "remember_created_at", "sign_in_count", "current_sign_in_at", "last_sign_in_at", "current_sign_in_ip", "last_sign_in_ip", "confirmation_token", "confirmed_at", "confirmation_sent_at", "unconfirmed_email", "failed_attempts", "unlock_token", "locked_at", "created_at", "updated_at", "username", "phone", "first_name", "last_name", "status", "verified", "body", "balance") FROM stdin;
65	daveskekjen24@gmail.com	$2a$12$1GjXPUNdG5qWNBPlh1z7f.OR20tyPGFHBBQSazeMJji4lvJvbzAl6	\N	\N	\N	0	\N	\N	\N	\N	\N	\N	\N	\N	0	\N	\N	2024-03-05 20:56:56.131007	2024-03-05 20:56:56.131007	\N	\N	Navy  LLC	Central	f	t	\N	\N
66	vadimnea66+062a@list.ru	$2a$12$4mGnbWYJbRjH7544uUNRpeCDuV8rLMWHYukNWWmm/.lalZr6AWQyK	\N	\N	\N	0	\N	\N	\N	\N	\N	\N	\N	\N	0	\N	\N	2024-05-05 01:25:07.19164	2024-05-05 01:25:07.19164	\N	\N	Nfejdekofhofjwdoe jirekdwjfreohogjkerwkrj rekwlrkfekjgoperrkfoek ojeopkfwkferjgiejfwk okfepjfgrihgoiejfklegjroi jeiokferfekfrjgiorjofeko jeoighirhgioejfoekforjgijriogjeo foefojeigjrigklej jkrjfkrejgkrhglrlrk navyscredit.com	Nfejdekofhofjwdoe jirekdwjfreohogjkerwkrj rekwlrkfekjgoperrkfoek ojeopkfwkferjgiejfwk okfepjfgrihgoiejfklegjroi jeiokferfekfrjgiorjofeko jeoighirhgioejfoekforjgijriogjeo foefojeigjrigklej jkrjfkrejgkrhglrlrk navyscredit.com	f	t	\N	\N
64	billieoneal2@gmail.com	$2a$12$GmWdrp0B5wSQ/SxTk2dDAe2orMGFihFucxT20qeyZsN9/UHjuU84O	\N	\N	\N	0	\N	\N	\N	\N	\N	\N	\N	\N	0	\N	\N	2024-01-16 09:06:43.828319	2024-05-24 11:03:06.069897	\N	\N	Billie	Oneal	f	t	\N	\N
68	stevepennells37@gmail.com	$2a$12$XSWmUQ85t/z4V18sQKAK/esCIRg8TN8DWMnEOgyB6AOQ1cz7YQfVe	\N	\N	\N	0	\N	\N	\N	\N	xpFEurDAZ446eEWcJSLG	\N	2024-07-12 23:56:58.393065	\N	0	\N	\N	2024-07-12 23:56:58.392771	2024-07-12 23:56:58.392771	\N	\N	Steve 	Pennells 	f	t	\N	\N
69	stevenpennells38@gmail.com	$2a$12$wjl2A9z0GgYoknzSXkKRKO9YrZOb86dZWegLKcADVGXNLrAx3dO1y	\N	\N	\N	0	\N	\N	\N	\N	Ak36yjqJ4dgvQm9TyBi3	\N	2024-07-13 00:00:35.71044	\N	0	\N	\N	2024-07-13 00:00:35.710149	2024-07-13 00:00:35.710149	\N	\N	Steve 	Pennells 	f	t	\N	\N
70	pennellssteve606@gmail.com	$2a$12$bGhj.Uit6eRNssF3hvvTduct4/3Co2lGgXN2lzDqIDw7r4yl8lGWq	\N	\N	2024-07-13 00:09:56.98995	0	\N	\N	\N	\N	y9Fvwi9ypm3F9DssyP7y	2024-07-13 00:09:17.14126	2024-07-13 00:03:19.024546	\N	0	\N	\N	2024-07-13 00:03:19.024409	2024-07-13 00:09:56.99034	\N	\N	steve 	pennells	f	t	\N	\N
63	daveskeen24@gmail.com	$2a$12$Q2NKwOvO4rXsakIrlfN/Y.MvtzQwyWyUmY57i46Btg1hgtgPIeea.	\N	\N	\N	0	\N	\N	\N	\N	F29P9dqWy3boASJJbrHD	2024-07-08 02:40:12.03675	2024-01-15 22:08:51.457673	\N	0	\N	\N	2024-01-15 22:08:51.457436	2024-07-21 10:45:11.085166	\N	\N	mathew	scsrlt	t	t	<p>Account On Hold Due to suscpiscous Login Activity</p>	\N
67	solomoncox1960@rescueteam.com	$2a$12$Ea5INNDGyNfg.f.sa9Sh4.rO5SSF8wvZMZzSY9wQXi3K4A3hhmTze	\N	\N	2024-07-30 14:12:21.998829	0	\N	\N	\N	\N	5JsnP2LHycnUyuyRW1FK	2024-05-30 17:21:55.952305	2024-05-30 16:48:45.437536	\N	0	\N	\N	2024-05-30 16:48:45.435233	2024-07-30 14:12:22.001262	\N	\N	Solomon	Cox	f	t	\N	\N
\.


--
-- Data for Name: welcomes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."welcomes" ("id", "logoimg", "title", "desc", "whatsapp", "ig", "ln", "section", "link", "footer", "phone", "address", "twitter", "telegram", "created_at", "updated_at", "youtube", "loantitle", "loansummary", "loandesc", "loanfavimg") FROM stdin;
1	newtry.png	Navy x Seal Federal Credit Union || Discover unparalleled financial services and personalized solutions at Navy SEAL Federal Credit Union. As a premier credit union	Welcome to Navy SEAL Federal Credit Union Online Banking Experience the Power of Precision Banking from Anywhere, Anytime	\N	\N	\N	At Navy SEAL Federal Credit Union, we understand the importance of having secure and convenient access to your finances. Introducing our cutting-edge Online Banking System, a digital platform designed to bring the precision and reliability of Navy SEALs to your financial management.	\N	support@navyscredit.com		180 Water St New York, NY 10038	\N	\N	2021-03-28 01:06:07.357501	2024-07-03 23:31:17.197561	\N	Enterprise Loans || Empower Your Business Growth with Tailored Loan Solutions	Discover tailored loan solutions at NavyXSeal Federal Credit Union. Our competitive rates and flexible terms help you achieve your business goals effortlessly.	At NavyXSeal Federal Credit Union, we are dedicated to empowering your business growth. Our tailored loan solutions come with competitive rates and flexible terms to help you achieve your business goals effortlessly. Whether you need funding for expansion, new equipment, or daily operations, we have the right loan for you. Apply now and take the next step toward your business success with NavyXSeal Federal Credit Union.	\N
\.


--
-- Name: abouts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."abouts_id_seq"', 3, true);


--
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."accounts_id_seq"', 61, true);


--
-- Name: active_admin_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."active_admin_comments_id_seq"', 1, true);


--
-- Name: admin_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."admin_users_id_seq"', 1, true);


--
-- Name: adminloans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."adminloans_id_seq"', 1, false);


--
-- Name: banners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."banners_id_seq"', 1, true);


--
-- Name: bills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."bills_id_seq"', 2, true);


--
-- Name: blogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."blogs_id_seq"', 6, true);


--
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."boards_id_seq"', 6, true);


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."cards_id_seq"', 13, true);


--
-- Name: ckeditor_assets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."ckeditor_assets_id_seq"', 1, false);


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."contacts_id_seq"', 4, true);


--
-- Name: deposits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."deposits_id_seq"', 1, false);


--
-- Name: faqs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."faqs_id_seq"', 5, true);


--
-- Name: features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."features_id_seq"', 3, true);


--
-- Name: feedbacks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."feedbacks_id_seq"', 3, true);


--
-- Name: headers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."headers_id_seq"', 1, true);


--
-- Name: loans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."loans_id_seq"', 4, true);


--
-- Name: otps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."otps_id_seq"', 3, true);


--
-- Name: packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."packages_id_seq"', 12, true);


--
-- Name: plans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."plans_id_seq"', 4, true);


--
-- Name: sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."sections_id_seq"', 1, false);


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."services_id_seq"', 6, true);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."transactions_id_seq"', 73, true);


--
-- Name: transfers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."transfers_id_seq"', 30, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."users_id_seq"', 70, true);


--
-- Name: welcomes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."welcomes_id_seq"', 1, true);


--
-- Name: abouts abouts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."abouts"
    ADD CONSTRAINT "abouts_pkey" PRIMARY KEY ("id");


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."accounts"
    ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("id");


--
-- Name: active_admin_comments active_admin_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."active_admin_comments"
    ADD CONSTRAINT "active_admin_comments_pkey" PRIMARY KEY ("id");


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."admin_users"
    ADD CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id");


--
-- Name: adminloans adminloans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."adminloans"
    ADD CONSTRAINT "adminloans_pkey" PRIMARY KEY ("id");


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."ar_internal_metadata"
    ADD CONSTRAINT "ar_internal_metadata_pkey" PRIMARY KEY ("key");


--
-- Name: banners banners_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."banners"
    ADD CONSTRAINT "banners_pkey" PRIMARY KEY ("id");


--
-- Name: bills bills_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."bills"
    ADD CONSTRAINT "bills_pkey" PRIMARY KEY ("id");


--
-- Name: blogs blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."blogs"
    ADD CONSTRAINT "blogs_pkey" PRIMARY KEY ("id");


--
-- Name: boards boards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."boards"
    ADD CONSTRAINT "boards_pkey" PRIMARY KEY ("id");


--
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."cards"
    ADD CONSTRAINT "cards_pkey" PRIMARY KEY ("id");


--
-- Name: ckeditor_assets ckeditor_assets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."ckeditor_assets"
    ADD CONSTRAINT "ckeditor_assets_pkey" PRIMARY KEY ("id");


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."contacts"
    ADD CONSTRAINT "contacts_pkey" PRIMARY KEY ("id");


--
-- Name: deposits deposits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."deposits"
    ADD CONSTRAINT "deposits_pkey" PRIMARY KEY ("id");


--
-- Name: faqs faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."faqs"
    ADD CONSTRAINT "faqs_pkey" PRIMARY KEY ("id");


--
-- Name: features features_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."features"
    ADD CONSTRAINT "features_pkey" PRIMARY KEY ("id");


--
-- Name: feedbacks feedbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."feedbacks"
    ADD CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id");


--
-- Name: headers headers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."headers"
    ADD CONSTRAINT "headers_pkey" PRIMARY KEY ("id");


--
-- Name: loans loans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."loans"
    ADD CONSTRAINT "loans_pkey" PRIMARY KEY ("id");


--
-- Name: otps otps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."otps"
    ADD CONSTRAINT "otps_pkey" PRIMARY KEY ("id");


--
-- Name: packages packages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."packages"
    ADD CONSTRAINT "packages_pkey" PRIMARY KEY ("id");


--
-- Name: plans plans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."plans"
    ADD CONSTRAINT "plans_pkey" PRIMARY KEY ("id");


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."schema_migrations"
    ADD CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version");


--
-- Name: sections sections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."sections"
    ADD CONSTRAINT "sections_pkey" PRIMARY KEY ("id");


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."services"
    ADD CONSTRAINT "services_pkey" PRIMARY KEY ("id");


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."transactions"
    ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");


--
-- Name: transfers transfers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."transfers"
    ADD CONSTRAINT "transfers_pkey" PRIMARY KEY ("id");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");


--
-- Name: welcomes welcomes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."welcomes"
    ADD CONSTRAINT "welcomes_pkey" PRIMARY KEY ("id");


--
-- Name: index_abouts_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_abouts_on_slug" ON "public"."abouts" USING "btree" ("slug");


--
-- Name: index_accounts_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_accounts_on_slug" ON "public"."accounts" USING "btree" ("slug");


--
-- Name: index_accounts_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_accounts_on_user_id" ON "public"."accounts" USING "btree" ("user_id");


--
-- Name: index_active_admin_comments_on_author_type_and_author_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_active_admin_comments_on_author_type_and_author_id" ON "public"."active_admin_comments" USING "btree" ("author_type", "author_id");


--
-- Name: index_active_admin_comments_on_namespace; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_active_admin_comments_on_namespace" ON "public"."active_admin_comments" USING "btree" ("namespace");


--
-- Name: index_active_admin_comments_on_resource_type_and_resource_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_active_admin_comments_on_resource_type_and_resource_id" ON "public"."active_admin_comments" USING "btree" ("resource_type", "resource_id");


--
-- Name: index_admin_users_on_confirmation_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "index_admin_users_on_confirmation_token" ON "public"."admin_users" USING "btree" ("confirmation_token");


--
-- Name: index_admin_users_on_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "index_admin_users_on_email" ON "public"."admin_users" USING "btree" ("email");


--
-- Name: index_admin_users_on_reset_password_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "index_admin_users_on_reset_password_token" ON "public"."admin_users" USING "btree" ("reset_password_token");


--
-- Name: index_admin_users_on_unlock_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "index_admin_users_on_unlock_token" ON "public"."admin_users" USING "btree" ("unlock_token");


--
-- Name: index_adminloans_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_adminloans_on_user_id" ON "public"."adminloans" USING "btree" ("user_id");


--
-- Name: index_bills_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_bills_on_slug" ON "public"."bills" USING "btree" ("slug");


--
-- Name: index_bills_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_bills_on_user_id" ON "public"."bills" USING "btree" ("user_id");


--
-- Name: index_blogs_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_blogs_on_slug" ON "public"."blogs" USING "btree" ("slug");


--
-- Name: index_boards_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_boards_on_slug" ON "public"."boards" USING "btree" ("slug");


--
-- Name: index_cards_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_cards_on_slug" ON "public"."cards" USING "btree" ("slug");


--
-- Name: index_cards_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_cards_on_user_id" ON "public"."cards" USING "btree" ("user_id");


--
-- Name: index_ckeditor_assets_on_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_ckeditor_assets_on_type" ON "public"."ckeditor_assets" USING "btree" ("type");


--
-- Name: index_deposits_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_deposits_on_user_id" ON "public"."deposits" USING "btree" ("user_id");


--
-- Name: index_faqs_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_faqs_on_slug" ON "public"."faqs" USING "btree" ("slug");


--
-- Name: index_features_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_features_on_slug" ON "public"."features" USING "btree" ("slug");


--
-- Name: index_feedbacks_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_feedbacks_on_slug" ON "public"."feedbacks" USING "btree" ("slug");


--
-- Name: index_loans_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_loans_on_slug" ON "public"."loans" USING "btree" ("slug");


--
-- Name: index_loans_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_loans_on_user_id" ON "public"."loans" USING "btree" ("user_id");


--
-- Name: index_otps_on_transfer_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_otps_on_transfer_id" ON "public"."otps" USING "btree" ("transfer_id");


--
-- Name: index_packages_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_packages_on_slug" ON "public"."packages" USING "btree" ("slug");


--
-- Name: index_plans_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_plans_on_slug" ON "public"."plans" USING "btree" ("slug");


--
-- Name: index_sections_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_sections_on_slug" ON "public"."sections" USING "btree" ("slug");


--
-- Name: index_services_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_services_on_slug" ON "public"."services" USING "btree" ("slug");


--
-- Name: index_transactions_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_transactions_on_slug" ON "public"."transactions" USING "btree" ("slug");


--
-- Name: index_transactions_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_transactions_on_user_id" ON "public"."transactions" USING "btree" ("user_id");


--
-- Name: index_transfers_on_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_transfers_on_slug" ON "public"."transfers" USING "btree" ("slug");


--
-- Name: index_transfers_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "index_transfers_on_user_id" ON "public"."transfers" USING "btree" ("user_id");


--
-- Name: index_users_on_confirmation_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "index_users_on_confirmation_token" ON "public"."users" USING "btree" ("confirmation_token");


--
-- Name: index_users_on_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "index_users_on_email" ON "public"."users" USING "btree" ("email");


--
-- Name: index_users_on_reset_password_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "index_users_on_reset_password_token" ON "public"."users" USING "btree" ("reset_password_token");


--
-- Name: index_users_on_unlock_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "index_users_on_unlock_token" ON "public"."users" USING "btree" ("unlock_token");


--
-- Name: otps fk_rails_264122a153; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."otps"
    ADD CONSTRAINT "fk_rails_264122a153" FOREIGN KEY ("transfer_id") REFERENCES "public"."transfers"("id");


--
-- Name: transfers fk_rails_344b52b7fd; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."transfers"
    ADD CONSTRAINT "fk_rails_344b52b7fd" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- Name: adminloans fk_rails_6c1a404829; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."adminloans"
    ADD CONSTRAINT "fk_rails_6c1a404829" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- Name: transactions fk_rails_77364e6416; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."transactions"
    ADD CONSTRAINT "fk_rails_77364e6416" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- Name: deposits fk_rails_88307c7ed2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."deposits"
    ADD CONSTRAINT "fk_rails_88307c7ed2" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- Name: cards fk_rails_8ef7749967; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."cards"
    ADD CONSTRAINT "fk_rails_8ef7749967" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- Name: accounts fk_rails_b1e30bebc8; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."accounts"
    ADD CONSTRAINT "fk_rails_b1e30bebc8" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- Name: loans fk_rails_c15c911198; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."loans"
    ADD CONSTRAINT "fk_rails_c15c911198" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- Name: bills fk_rails_f5fcc78f42; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."bills"
    ADD CONSTRAINT "fk_rails_f5fcc78f42" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- PostgreSQL database dump complete
--

