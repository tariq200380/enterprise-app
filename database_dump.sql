--
-- PostgreSQL database dump
--

\restrict 3bXrujzqTm45G9sa7jnxGsbXaqBrrHSsFUpWLtY5j0qTu7WP5LJxBGhAAi30o6D

-- Dumped from database version 18.6 (Ubuntu 18.6-0ubuntu0.26.04.1)
-- Dumped by pg_dump version 18.6 (Ubuntu 18.6-0ubuntu0.26.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: article_reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.article_reviews (
    id integer NOT NULL,
    reviewer_name text NOT NULL,
    organization text,
    article_title text NOT NULL,
    rating integer DEFAULT 5,
    details text NOT NULL,
    status text DEFAULT 'PENDING'::text,
    submitted_at timestamp without time zone DEFAULT now(),
    avatar text,
    review_title text,
    article_id integer DEFAULT 1,
    helpful integer DEFAULT 1
);


ALTER TABLE public.article_reviews OWNER TO postgres;

--
-- Name: article_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.article_reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.article_reviews_id_seq OWNER TO postgres;

--
-- Name: article_reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.article_reviews_id_seq OWNED BY public.article_reviews.id;


--
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    id integer NOT NULL,
    title character varying(500) NOT NULL,
    category character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    read_time character varying(100) NOT NULL,
    cover_photo_url text,
    video_embed_url text,
    audio_stream_url text,
    editor_note text,
    content text,
    pros jsonb DEFAULT '[]'::jsonb,
    cons jsonb DEFAULT '[]'::jsonb,
    specs jsonb DEFAULT '[]'::jsonb,
    views integer DEFAULT 0,
    status character varying(50) DEFAULT 'PUBLISHED'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    source_news text,
    keywords text DEFAULT ''::text
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.articles_id_seq OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- Name: candidates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.candidates (
    id integer NOT NULL,
    candidate_name character varying(255) NOT NULL,
    domain_specialty character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    portfolio_github character varying(255) NOT NULL,
    created_at character varying(100) NOT NULL,
    status character varying(50) NOT NULL
);


ALTER TABLE public.candidates OWNER TO postgres;

--
-- Name: candidates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.candidates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.candidates_id_seq OWNER TO postgres;

--
-- Name: candidates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.candidates_id_seq OWNED BY public.candidates.id;


--
-- Name: contact_inquiries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact_inquiries (
    id integer NOT NULL,
    client_name character varying(255) NOT NULL,
    service character varying(255) NOT NULL,
    company character varying(255) NOT NULL,
    phone character varying(100),
    email character varying(255),
    project_details text,
    need_nda boolean DEFAULT true,
    status character varying(50) DEFAULT 'PENDING'::character varying,
    created_at character varying(100) DEFAULT 'Today, 06:45 AM'::character varying
);


ALTER TABLE public.contact_inquiries OWNER TO postgres;

--
-- Name: contact_inquiries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contact_inquiries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contact_inquiries_id_seq OWNER TO postgres;

--
-- Name: contact_inquiries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contact_inquiries_id_seq OWNED BY public.contact_inquiries.id;


--
-- Name: founder_proposals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.founder_proposals (
    id integer NOT NULL,
    candidate_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    specialty_proposal character varying(500) NOT NULL,
    portfolio_link character varying(500),
    proposal_pitch text,
    status character varying(50) DEFAULT 'NEW'::character varying,
    created_at character varying(100) DEFAULT to_char(now(), 'Mon DD, YYYY'::text)
);


ALTER TABLE public.founder_proposals OWNER TO postgres;

--
-- Name: founder_proposals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.founder_proposals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.founder_proposals_id_seq OWNER TO postgres;

--
-- Name: founder_proposals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.founder_proposals_id_seq OWNED BY public.founder_proposals.id;


--
-- Name: job_openings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.job_openings (
    id integer NOT NULL,
    title text NOT NULL,
    department text NOT NULL,
    location text NOT NULL,
    status text DEFAULT 'ACTIVE'::text,
    description text NOT NULL,
    tags jsonb DEFAULT '[]'::jsonb,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.job_openings OWNER TO postgres;

--
-- Name: job_openings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.job_openings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.job_openings_id_seq OWNER TO postgres;

--
-- Name: job_openings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.job_openings_id_seq OWNED BY public.job_openings.id;


--
-- Name: live_news_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.live_news_items (
    id integer NOT NULL,
    provider character varying(100) NOT NULL,
    title character varying(1000) NOT NULL,
    description text,
    link character varying(1000) NOT NULL,
    image character varying(1000),
    category character varying(255),
    published_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.live_news_items OWNER TO postgres;

--
-- Name: live_news_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.live_news_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.live_news_items_id_seq OWNER TO postgres;

--
-- Name: live_news_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.live_news_items_id_seq OWNED BY public.live_news_items.id;


--
-- Name: portfolio_projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.portfolio_projects (
    id integer NOT NULL,
    title text NOT NULL,
    category text NOT NULL,
    client text NOT NULL,
    summary text NOT NULL,
    stack jsonb DEFAULT '[]'::jsonb,
    live_url text,
    github_url text,
    image_url text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.portfolio_projects OWNER TO postgres;

--
-- Name: portfolio_projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.portfolio_projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.portfolio_projects_id_seq OWNER TO postgres;

--
-- Name: portfolio_projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.portfolio_projects_id_seq OWNED BY public.portfolio_projects.id;


--
-- Name: security_reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.security_reports (
    id integer NOT NULL,
    reporter_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    category character varying(255) NOT NULL,
    severity character varying(50) DEFAULT 'Medium'::character varying,
    subject character varying(300),
    description text NOT NULL,
    status character varying(50) DEFAULT 'NEW'::character varying,
    created_at character varying(100) DEFAULT to_char(now(), 'Mon DD, YYYY'::text)
);


ALTER TABLE public.security_reports OWNER TO postgres;

--
-- Name: security_reports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.security_reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.security_reports_id_seq OWNER TO postgres;

--
-- Name: security_reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.security_reports_id_seq OWNED BY public.security_reports.id;


--
-- Name: seo_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seo_settings (
    page_key character varying(100) NOT NULL,
    title text DEFAULT ''::text NOT NULL,
    description text DEFAULT ''::text NOT NULL,
    keywords text DEFAULT ''::text NOT NULL,
    og_image text DEFAULT ''::text NOT NULL,
    canonical_url text DEFAULT ''::text NOT NULL,
    no_index boolean DEFAULT false NOT NULL,
    no_follow boolean DEFAULT false NOT NULL,
    meta_tags jsonb DEFAULT '{}'::jsonb,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.seo_settings OWNER TO postgres;

--
-- Name: subscribers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscribers (
    id integer NOT NULL,
    email text NOT NULL,
    source text DEFAULT 'Global Website'::text,
    status text DEFAULT 'ACTIVE'::text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.subscribers OWNER TO postgres;

--
-- Name: subscribers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subscribers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subscribers_id_seq OWNER TO postgres;

--
-- Name: subscribers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subscribers_id_seq OWNED BY public.subscribers.id;


--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testimonials (
    id integer NOT NULL,
    client_name text NOT NULL,
    role text NOT NULL,
    company text NOT NULL,
    avatar text,
    rating integer DEFAULT 5,
    quote text NOT NULL,
    verified boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.testimonials OWNER TO postgres;

--
-- Name: testimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.testimonials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.testimonials_id_seq OWNER TO postgres;

--
-- Name: testimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.testimonials_id_seq OWNED BY public.testimonials.id;


--
-- Name: videos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.videos (
    id integer NOT NULL,
    title text NOT NULL,
    category text NOT NULL,
    duration text NOT NULL,
    embed_url text NOT NULL,
    thumbnail_url text,
    views integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.videos OWNER TO postgres;

--
-- Name: videos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.videos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.videos_id_seq OWNER TO postgres;

--
-- Name: videos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.videos_id_seq OWNED BY public.videos.id;


--
-- Name: website_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.website_settings (
    key character varying(100) NOT NULL,
    value jsonb NOT NULL,
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.website_settings OWNER TO postgres;

--
-- Name: article_reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article_reviews ALTER COLUMN id SET DEFAULT nextval('public.article_reviews_id_seq'::regclass);


--
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- Name: candidates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidates ALTER COLUMN id SET DEFAULT nextval('public.candidates_id_seq'::regclass);


--
-- Name: contact_inquiries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_inquiries ALTER COLUMN id SET DEFAULT nextval('public.contact_inquiries_id_seq'::regclass);


--
-- Name: founder_proposals id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.founder_proposals ALTER COLUMN id SET DEFAULT nextval('public.founder_proposals_id_seq'::regclass);


--
-- Name: job_openings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_openings ALTER COLUMN id SET DEFAULT nextval('public.job_openings_id_seq'::regclass);


--
-- Name: live_news_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_news_items ALTER COLUMN id SET DEFAULT nextval('public.live_news_items_id_seq'::regclass);


--
-- Name: portfolio_projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portfolio_projects ALTER COLUMN id SET DEFAULT nextval('public.portfolio_projects_id_seq'::regclass);


--
-- Name: security_reports id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.security_reports ALTER COLUMN id SET DEFAULT nextval('public.security_reports_id_seq'::regclass);


--
-- Name: subscribers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribers ALTER COLUMN id SET DEFAULT nextval('public.subscribers_id_seq'::regclass);


--
-- Name: testimonials id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials ALTER COLUMN id SET DEFAULT nextval('public.testimonials_id_seq'::regclass);


--
-- Name: videos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos ALTER COLUMN id SET DEFAULT nextval('public.videos_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
dfe365f7-752a-435f-ae41-fdfeddc23920	f33552b00f0ac20c813b8770a56ff774c14bcd101646b41027ee7a1db196b512	2026-09-25 14:47:25.877792+05	0_init		\N	2026-09-25 14:47:25.877792+05	0
de66f338-a598-4d12-8894-d3121a61de56	682a206b70e05151f208780527d8c154ae56b864e843fd313a8701bdb0936410	2026-09-25 14:47:54.95327+05	20260925094754_add_live_news_items	\N	\N	2026-09-25 14:47:54.935557+05	1
\.


--
-- Data for Name: article_reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.article_reviews (id, reviewer_name, organization, article_title, rating, details, status, submitted_at, avatar, review_title, article_id, helpful) FROM stdin;
101	Dr. Marcus Vance	Chief Technology Officer @ FinTech Global Frankfurt	Apple MacBook Pro 16" (M3 Max)	5	This in-depth benchmark matches our internal production findings exactly. Having 128GB of unified memory allows our engineering squads to run unquantized Llama-3-70B models directly on the laptop during transatlantic flights with zero cloud dependency. Outstanding review depth.	APPROVED	2026-08-16 00:00:00	https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=180&auto=format&fit=crop&q=80	M3 Max with 128GB RAM transformed our local LLM development	1	34
102	David Thorne	Principal Systems Engineer @ CloudNative US	HP OmniBook 5 14 (Snapdragon X Elite)	5	Qualcomm Snapdragon X Elite has truly redefined what ARM on Windows can do. Zero fan noise during heavy code refactoring in VS Code and it easily lasted 2 full work days on a single charge.	APPROVED	2026-08-15 00:00:00	https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=180&auto=format&fit=crop&q=80	21 hours real battery life while compiling Rust is unbelievable	1	42
103	Elena Rostova	Principal AI Systems Architect @ Neural Bio Labs	Lenovo ThinkPad P16 Gen 2	5	The ThinkPad P16 Gen 2 is indeed a heavy machine, but the 192GB ECC RAM configuration is the only setup that prevents silent data corruption during 14-hour Monte Carlo and financial risk simulations. Great inclusion of the acoustic dB levels as well.	APPROVED	2026-08-14 00:00:00	https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=180&auto=format&fit=crop&q=80	ThinkPad P16 ECC memory saved our quantitative simulations	1	28
201	Prof. Arthur Pendelton	AI Research Fellow @ Oxford Institute of Data	Dartmouth Workshop & Perceptron Mark I	5	Rarely do modern tech publications trace contemporary Transformer architectures back to the Rosenblatt Perceptron and McCarthy's LISP with such mathematical precision. Excellent foundational reading for junior and senior AI fellows alike.	APPROVED	2026-08-16 00:00:00	https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=180&auto=format&fit=crop&q=80	Masterful historical breakdown of early symbolic vs neural paradigms	2	39
202	Dr. Sarah Jenkins	Chief Systems Architect @ FinEdge Global	Dartmouth Workshop & Perceptron Mark I	5	Understanding the hardware bottlenecks of the 1950s gives brilliant clarity to why modern matrix multiplication accelerators (TPUs/GPUs) are designed the way they are. The timeline diagrams are remarkably clear.	APPROVED	2026-08-15 00:00:00	https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=180&auto=format&fit=crop&q=80	Essential context for modern LLM architecture designers	2	27
203	Jonathan Anastas	Ador Network Services / Chief Marketing Officer	Dartmouth Workshop & Perceptron Mark I	5	Concise, authoritative, and historically rigorous. Helps our board understand how the last 70 years of computational milestones led to current sovereign enterprise models.	APPROVED	2026-08-14 00:00:00	https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=180&auto=format&fit=crop&q=80	A brilliant whitepaper our entire executive team enjoyed	2	18
301	Alex Linetski	Lead Cloud Infrastructure Engineer @ HiRefresh Agency	Creed Sovereign Multi-Region Kubernetes Topology	5	We implemented Creed Tech's eBPF microservices blueprint directly in our EU cloud cluster. Bypassing iptables completely eliminated connection tracking bottlenecks under 100k concurrent WebSocket connections.	APPROVED	2026-08-16 00:00:00	https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&auto=format&fit=crop&q=80	Cilium eBPF packet routing slashed our P99 API latency by 45%	3	46
307	ass	dddd	Cloud Native Microservices Architecture: A Deep Dive into Kubernetes Orchestration	3	aaa	APPROVED	2026-09-20 22:05:50.318715	/uploads/1789923950282-Screenshot_From_2026-09-16_08-24-45.png	sdd	3	1
305	wertyu	bnmm	The 7 Best Enterprise AI & Cloud Laptops for Senior Engineers & Architects	4	ddfgg	APPROVED	2026-09-20 21:57:00.036477	/uploads/1789923420007-Screenshot_From_2026-09-16_08-36-29.png	as dfe gg	1	1
303	Liam Gallagher	VP of Cloud Engineering @ DataScale Global	Creed Sovereign Multi-Region Kubernetes Topology	5	This saved us weeks of trial and error configuring custom metrics horizontal pod autoscaling. Highly recommended for enterprise SRE teams.	APPROVED	2026-08-14 00:00:00	https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=180&auto=format&fit=crop&q=80	Robust multi-tenant isolation and automated pod autoscaling	3	24
\.


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articles (id, title, category, author, read_time, cover_photo_url, video_embed_url, audio_stream_url, editor_note, content, pros, cons, specs, views, status, created_at, source_news, keywords) FROM stdin;
2	TSMC, Intel, and Samsung Join Forces on 1nm Silicon R&D	HARDWARE	Editorial Desk	6 min read	\N	\N	\N	Major chipmakers announce an unprecedented collaboration to standardise high-NA EUV lithography for sub-1nm nodes by 2028.	\N	[]	[]	[]	0	PUBLISHED	2026-09-10 02:33:34.61333	TechCrunch Wire	
3	Apple M5 Ultra Architecture & 2nm Neural Engine Leaks	CHIPS & SEMICONDUCTORS	Editorial Staff	8 min read	\N	\N	\N	Next-gen Mac Studio silicon features dual-die packaging with hardware-accelerated transformer kernels.	\N	[]	[]	[]	0	DRAFT	2026-09-10 02:40:31.507086	Apple Newsroom Wire	
1	The Best Laptops We've Tested for Enterprise AI & Cloud (2026)	HARDWARE & AI WORKSTATIONS	Dr. Sarah Jenkins (Chief Systems Architect)	15 min read	https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1000&auto=format&fit=crop	https://www.youtube.com/embed/dQw4w9WgXcQ	https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3	August 2026: Our hardware team has vetted 22 workstations for running local 70B LLMs, multi-container Docker clusters, and heavy multi-threaded compilation builds in Creed Tech Labs.	The HP OmniBook 5 14 marks a seismic transition in the Windows laptop ecosystem. Built around Qualcomm's 4nm Oryon CPU architecture, it eliminates the historical compromise between high-performance computing and true all-day battery life.	["Field-leading battery endurance (21+ hours continuous development)", "Vivid 2.8K OLED 120Hz display with 100% DCI-P3 color gamut", "Whisper-quiet acoustic fan noise below 24 dB under load"]	["Plastic keyboard deck could benefit from internal stiffening", "Soldered RAM and non-expandable secondary storage bay"]	[{"key": "Processor (CPU)", "value": "Qualcomm Snapdragon X Elite (12 Cores, up to 3.8 GHz)"}, {"key": "NPU AI Power", "value": "45 TOPS Hexagon NPU Engine"}]	142000	PUBLISHED	2026-09-08 04:00:54.013835	\N	
\.


--
-- Data for Name: candidates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.candidates (id, candidate_name, domain_specialty, email, portfolio_github, created_at, status) FROM stdin;
1	Julian Alvarez	Rust & Distributed Systems	julian.alvarez@dev.io	github.com/jalvarez	Aug 16, 2026	SHORTLISTED
2	Maya Lin	UI/UX & Design Systems (WCAG AAA)	maya.lin@uxcraft.org	figma.com/@mayalin	Aug 15, 2026	INTERVIEWING
8	khuram	web deplopver	khuram@gmail.com	qwer	Sep 9, 2026	PENDING
3	Priya Sharma	AI & Large Language Models (vLLM & CUDA)	priya.sharma@ml-research.ai	github.com/priya-sharma-ai	Aug 14, 2026	INTERVIEW
7	Creed-tech	assd	tariq200380@gmail.com	zzxxx	Sep 9, 2026	OFFER
9	qwe	engineer	info@creed-tech.com		Sep 9, 2026	PENDING
10	trsa	tfgrf	tghh@gmail.com	htr	Sep 9, 2026	PENDING
13	John Doe	Cloud Architect	johndoe@example.com	https://github.com/johndoe	Sep 24, 2026	PENDING
14	Regression Dev	Security	dev@test.com		Sep 24, 2026	PENDING
15	External Candidate	Security	extcand@test.com		Sep 24, 2026	PENDING
\.


--
-- Data for Name: contact_inquiries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact_inquiries (id, client_name, service, company, phone, email, project_details, need_nda, status, created_at) FROM stdin;
34	saba hameed	Artificial Intelligence (AI)	saba ind	+923404332648	machinez.de@gmail.com	i need this one	t	RESPONDED	Sep 27, 05:13 AM
33	External Ngrok Test	Enterprise Architecture & Engineering	Confidential Enterprise		external@test.com	Testing inquiry externally	t	RESPONDED	Sep 24, 08:24 AM
7	asdf	Software Development	sdaa	03098307115	qw@gmail.com	asdcc	t	IN_REVIEW	Today, 02:25 AM
8	Direct Call Client	Direct Architectural Discovery Call	Direct Discovery Call	+14158904820	call@creed-tech.com	Preferred Slot: Tomorrow Morning (9:00 AM CET)\nTopic: High-throughput Kubernetes migration	t	NEW	Today, 02:41 AM
9	asdf	Direct Architectural Discovery Call	Direct Discovery Call	0563546620	qw@gmail.com	Preferred Slot: Custom Time Window\nTopic: assssd	t	NEW	Today, 02:43 AM
10	asdf	Direct Architectural Discovery Call	Direct Discovery Call	03098307115	qw@gmail.com	Preferred Slot: Custom Scheduled: 2026-09-09 at 14:00\nTopic: General 30-min architectural scoping.	t	NEW	Today, 02:49 AM
11	tariq	Direct Technical Scoping (Direct WhatsApp / Slack Connect)	Direct Technical Scoping	03098307115	machinez.gmbh@gmail.com	Direct Technical Consultation Request\nChannel: Direct WhatsApp / Slack Connect\nPhone/WhatsApp: 03098307115\nTechnical Specs: i amm here	t	NEW	Sep 14, 05:29 AM
12	machinez. gmbh	Strategic Consultation (General Strategic Inquiry)	traq	+923098307115	machinez.gmbh@gmail.com	aas	t	NEW	Sep 14, 06:13 AM
16	treq	Technical Team Scoping (Direct WhatsApp / Slack Connect)	Direct Technical Team Scoping	0563546620	wer@gmail.com	aasd	t	NEW	Sep 15, 12:20 AM
18	m imran	Project Discussion: Database Scaling & High-Throughput Optimization	wqas	+923404332648	assd@gmail.com	aasdcvv	t	NEW	Sep 15, 01:36 AM
19	m imran dsaqww	Project Discussion: Enterprise AI Automation & Autonomous Agents	tyuh	+923404332648	aasdff@gmail.com	ghtrf	t	NEW	Sep 15, 01:37 AM
20	dsaw	Vision & Project Discussion: Cloud Infrastructure & Kubernetes DevOps	tyuh	0563546620	wer@gmail.com	ssddd	t	NEW	Sep 15, 01:48 AM
21	Creed-tech	Mobile Applications	rttt	+923404332648	info@creed-tech.com	asdd	t	NEW	Sep 15, 07:24 AM
22	ali raza	Database Management	aliraza	3404332648	raza@gmail.com	i am develop a	t	NEW	Sep 15, 07:33 AM
23	Ali Ahmed	Cloud Infrastructure	Global Corp		ali.ahmed@globalcorp.com	Need modern AWS architecture review.	f	NEW	Sep 22, 07:03 PM
24	John Doe Enterprise	Software Development	Acme Global Systems		johndoe_1790086070677@acme-corp.com	Need full cloud transformation and AI agent integration.	t	NEW	Sep 22, 07:07 PM
25	Enterprise Client	Software Development	Enterprise Organization		inquiry_1790086501104@client.org	Verification test after optimization	f	NEW	Sep 22, 07:15 PM
26	Regression Client	Cloud Infrastructure	Enterprise Inc		regression_inquiry_1790086860018@client.org	Final regression test verification.	f	NEW	Sep 22, 07:21 PM
31	Public Inquiry Test	Enterprise Architecture & Engineering	Confidential Enterprise		public@example.com	Testing public inquiry submission	t	NEW	Sep 24, 08:21 AM
32	Regression Test	Enterprise Architecture & Engineering	Confidential Enterprise		reg@test.com	Hello	t	NEW	Sep 24, 08:23 AM
\.


--
-- Data for Name: founder_proposals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.founder_proposals (id, candidate_name, email, specialty_proposal, portfolio_link, proposal_pitch, status, created_at) FROM stdin;
1	Dr. Aris Vance	aris.vance@mit.edu	Zero-Knowledge Rollup & Distributed Consensus	https://github.com/aris-vance/zk-consensus	We developed a novel sub-second Byzantine Fault Tolerant consensus engine using recursive SNARKs. I would love to discuss deploying this architecture within Creed Tech pods.	NEW	Sep 13, 2026
2	tariq ali	tariq200380@gmail.com	web deplopver	hsgagag@github@gmail.com	dddd	NEW	Sep 13, 2026
\.


--
-- Data for Name: job_openings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.job_openings (id, title, department, location, status, description, tags, created_at) FROM stdin;
1	Senior Distributed Systems & Rust Architect	Engineering	Frankfurt / Remote	ACTIVE	Design high-throughput distributed state-machine nodes with sub-millisecond p99 latency guarantees.	["Rust", "Tokio", "Raft", "gRPC", "eBPF"]	2026-09-08 04:31:50.80946
2	Lead AI Systems Engineer (LLM Inference & CUDA)	AI & Machine Learning	San Francisco / Hybrid	URGENT	Scale vLLM inference clusters, implement custom FlashAttention kernels, and build sovereign RAG pipelines.	["CUDA", "vLLM", "Triton", "PyTorch", "Kubernetes"]	2026-09-08 04:31:50.80946
3	Staff Design Systems Architect (WCAG AAA)	UI/UX & Design	London / Remote	ACTIVE	Architect Creed Tech next-generation accessible enterprise design token system and ultra-high-density data tables.	["Tailwind CSS", "Figma Tokens", "WCAG AAA", "React"]	2026-09-08 04:31:50.80946
6	Cloud DevOps & SRE Architect (Kubernetes & Terraform)	Cloud & SRE	Berlin / Remote	ACTIVE	Architect multi-cloud, automated, self-healing infrastructure with zero configuration drift and 99.99% SLA.	["AWS", "Kubernetes", "Terraform", "Datadog", "CI/CD"]	2026-09-13 03:47:18.795161
7	Solutions Architect & Technical Engagement Lead	Solutions & Growth	New York / Remote	ACTIVE	Bridge client business goals with engineering execution by leading technical discovery and architectural scoping.	["Solutions Architecture", "Technical Scoping", "Cloud", "Client Pods"]	2026-09-13 03:47:18.795161
8	Principal Platform & Linux Kernel Engineer	Engineering	Zurich / Remote	ACTIVE	Build and optimize low-level runtime components, eBPF telemetry, and high-performance network stacks.	["Rust", "Linux Kernel", "eBPF", "Systems Programming", "C"]	2026-09-13 03:47:18.795161
9	Senior AI & Deep Learning Research Scientist	AI & Machine Learning	Toronto / Remote	ACTIVE	Research and fine-tune next-generation transformer models, quantization techniques, and sovereign AI agents.	["PyTorch", "Transformers", "Quantization", "LLMs", "CUDA"]	2026-09-13 03:47:18.795161
\.


--
-- Data for Name: live_news_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.live_news_items (id, provider, title, description, link, image, category, published_at, updated_at) FROM stdin;
43777	anthropic	Introducing Claude Opus 5.5	Introducing Claude Opus 5.5. Real-time intelligence and verified enterprise developments reported via Anthropic.	https://news.google.com/rss/articles/CBMiU0FVX3lxTE9xbTN1a0tOdm9kT0JxbVBHMU9XYUhpUjd0MHNFYm8yd2pRMnhjdEYzdjF3ckZEY1V0a2ZQTXlyRUhteVozMlhDbVQ3Mm1KWlRYbUVF?oc=5	/images/anthropic-opus-hero.jpg?v=1790119546000	FRONTIER AI & SAFETY RESEARCH	2026-09-22 23:25:46	2026-09-27 22:05:36.063
37170	apple	The latest iPhone, Apple Watch, and AirPods lineups arrive in stores worldwide	On Friday, September 18, Apple Store locations around the world introduced customers to the iPhone 18 Pro lineup, Apple Watch Series 12, Apple Watch Ultra 4, and AirPods 5.	https://www.apple.com/newsroom/2026/09/the-latest-iphone-apple-watch-and-airpods-lineups-arrive-in-stores-worldwide/	https://www.apple.com/newsroom/images/2026/09/the-latest-iphone-apple-watch-and-airpods-lineups-arrive-in-stores-worldwide/tile/Apple-Fifth-Avenue-New-York-Deirdre-O-Brien-and-John-Ternus-welcome-customers-260918-lp.jpg.og.jpg?v=1789707734780	HARDWARE & SILICON	2026-09-18 05:02:14.78	2026-09-27 22:05:35.934
80355	dawn	China says it 'respects' Trump's 'super intelligence' switch from AI	China “respects” Washington’s switch in phrasing from artificial intelligence to “super intelligence”, Beijing’s foreign ministry said on Saturday, after US President Donald Trump said his Chinese counterpart, Xi Jinping, appeared to lik...	https://www.dawn.com/news/2032836/china-says-it-respects-trumps-super-intelligence-switch-from-ai	https://i.dawn.com/thumbnail/2026/09/26174247ffaa855.webp?v=1790426614000	PAKISTAN TECH & SCIENCE	2026-09-26 12:43:34	2026-09-27 22:05:36.118
37172	apple	Celebrating “What Holds Us” on iPhone 18 Pro	A new photography exhibition, curated by Kathy Ryan, celebrates the evolving language of visual storytelling and showcases the advanced pro camera system on iPhone 18 Pro.	https://www.apple.com/newsroom/2026/09/celebrating-what-holds-us-on-iphone-18-pro/	https://www.apple.com/newsroom/images/2026/09/celebrating-what-holds-us-on-iphone-18-pro/tile/Apple-photography-exhibition-hero-lp.jpg.og.jpg?v=1789567168902	HARDWARE & SILICON	2026-09-16 13:59:28.902	2026-09-27 22:05:35.939
37174	apple	Widow’s Bay triumphs as most decorated freshman comedy in Emmy history	This evening at the 78th Primetime Emmy Awards, Apple TV shatters records to become the most-awarded network of the year, landing 29 wins overall.	https://www.apple.com/newsroom/2026/09/widows-bay-triumphs-as-most-decorated-freshman-comedy-in-emmy-history/	https://www.apple.com/newsroom/images/2026/09/widows-bay-triumphs-as-most-decorated-freshman-comedy-in-emmy-history/tile/Apple-TV-Emmy-winners-Widows-Bay-lp.jpg.og.jpg?v=1789466562356	HARDWARE & SILICON	2026-09-15 10:02:42.356	2026-09-27 22:05:35.943
80357	dawn	OpenAI works to understand full scope of agent activity as user data leak emerges	Two months after OpenAI disclosed the accidental hacking of Hugging Face, the ChatGPT maker is still working to understand the full scope of its rogue agent activity, two people briefed on the matter told Reuters. The latest example came...	https://www.dawn.com/news/2032788/openai-works-to-understand-full-scope-of-agent-activity-as-user-data-leak-emerges	https://i.dawn.com/thumbnail/2026/09/26103342fb2ede6.webp?v=1790400711000	PAKISTAN TECH & SCIENCE	2026-09-26 05:31:51	2026-09-27 22:05:36.122
37206	meta	The Biggest News From Connect 2026	Yesterday at Connect, we announced that we're bringing Muse to our AI glasses, launched Meta VR Glasses, and more. The post The Biggest News From Connect 2026 appeared first on Meta Newsroom .	https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/	https://about.fb.com/wp-content/uploads/2026/09/The-Biggest-News-From-Connect-2026_Header-1.jpg?fit=1920%2C1080&v=1790284555000	OPEN SOURCE AI & INFRASTRUCTURE	2026-09-24 21:15:55	2026-09-27 22:05:36.02
37196	openai	Proaction boosts sales 60% and saves 75+ hours with Codex	With Codex, GPT-Live-1, and GPT-6 Astra, Proaction builds, operates, and sells modern fleet management faster.	https://openai.com/index/proaction	https://images.ctfassets.net/kftzwdyauwt9/2ZDFcePalT1BpkNxHdwpnS/521705b27328ebf7f7449136dcd428c2/proaction-option-a-seo-og.png?w=1600&h=900&fit=fill	GENERATIVE AI & REASONING	2026-09-25 19:00:00	2026-09-27 22:05:35.999
80375	propakistani	5 Biggest Features of HyperOS 4 Xiaomi Users Should Know About	Xiaomi’s HyperOS 4, based on Android 17, brings several system-wide upgrades and new features. Among them, five changes stand out … Read More The post 5 Biggest Features of HyperOS 4 Xiaomi Users Should Know About appeared first on ProPa...	https://propakistani.pk/2026/09/26/5-biggest-features-of-hyperos-4-xiaomi-users-should-know-about/	https://propakistani.pk/wp-content/uploads/2026/09/HyperOS-4-features.jpg?v=1790433469000	PAKISTAN DIGITAL ECOSYSTEM	2026-09-26 14:37:49	2026-09-27 04:44:44.793
43779	anthropic	Anthropic unveils Claude Opus 5.5	Anthropic unveils Claude Opus 5.5. Real-time intelligence and verified enterprise developments reported via reuters.com.	https://news.google.com/rss/articles/CBMigwFBVV95cUxQX2VINVptSExJdjU0WkQ0WDVkRUdsaHduYjB1Tk81TnBrZkVvalowQWh2NFJnYmZ1TkxtVTQyZHdVWDgzVmJtRE9SSjkzeW9DWDFleHNPU01LUWE1TUpCdktmTVVRZHNXWm9ack9CRmdQTU1XUHd0Y2lhaEZBWWJYQVNFYw?oc=5	/images/anthropic-opus-hero.jpg?v=1790097755000	FRONTIER AI & SAFETY RESEARCH	2026-09-22 17:22:35	2026-09-27 22:05:36.068
37208	meta	New Features for Meta Ray-Ban Display	Today, we announced updates to Meta Ray-Ban Display that make the glasses even more useful in your everyday life. The post New Features for Meta Ray-Ban Display appeared first on Meta Newsroom .	https://about.fb.com/news/2026/09/new-features-for-meta-ray-ban-display-navigation-hologram/	https://about.fb.com/wp-content/uploads/2026/09/New-Features-for-Meta-Ray-Ban-Display_Header.jpg?fit=1920%2C1080&v=1790164427000	OPEN SOURCE AI & INFRASTRUCTURE	2026-09-23 11:53:47	2026-09-27 22:05:36.024
57303	anthropic	Anthropic debuts Claude Docs, raising stakes for Microsoft	Anthropic debuts Claude Docs, raising stakes for Microsoft. Real-time intelligence and verified enterprise developments reported via Axios.	https://news.google.com/rss/articles/CBMickFVX3lxTFAyNjJZVWhzbEpjOFlFOEliQzhkUjhFZllKbmlHN1dCR1FzOVpEZHRXTTdhcjFCbHJqb2twZ2dERGJUQ1JNWXZEdEVRWExaMXRhSDZ3WFBpTVM2OFhnU2FNVGRzR3FsR0djQTFZR2NRTnhiZw?oc=5	/images/anthropic-opus-hero.jpg	FRONTIER AI & SCIENCE	2026-09-16 07:00:00	2026-09-25 22:51:13.964
37204	openai	Harvey turns legal context into stronger drafts with GPT-6 Astra	GPT-6 Astra produces more structured, context-aware legal documents, freeing lawyers to focus on strategy.	https://openai.com/index/harvey-from-context-to-confidence-with-astra	https://images.ctfassets.net/kftzwdyauwt9/1fGwmofg1NcZrX5mgNL2f2/b88c7bf0b4fc2daeff9ec92264b0afcc/og.png?w=1600&h=900&fit=fill	GENERATIVE AI & REASONING	2026-09-23 12:00:00	2026-09-27 22:05:36.016
80377	propakistani	Xiaomi 18 Pro Turns Into a Pocket Guitar With This Accessory	Xiaomi has launched a new accessory for the Xiaomi 18 Pro and Xiaomi 18 Pro Max that makes use of … Read More The post Xiaomi 18 Pro Turns Into a Pocket Guitar With This Accessory appeared first on ProPakistani .	https://propakistani.pk/2026/09/26/xiaomi-18-pro-turns-into-a-pocket-guitar-with-this-accessory/	https://propakistani.pk/wp-content/uploads/2026/09/Xiaomi-Pocket-Guitar.jpg?v=1790430936000	PAKISTAN DIGITAL ECOSYSTEM	2026-09-26 13:55:36	2026-09-27 04:44:44.797
37194	nvidia	NVIDIA Isaac ROS 5.0 Advances Agentic, Open Source Robotics Development	To build and deploy sophisticated robotics applications that can perceive, reason and act in dynamic environments, developers need new physical AI models and tools. The ROS open framework is a project from Open Robotics that helps humans...	https://blogs.nvidia.com/blog/isaac-ros-5-0-agentic-open-source-robotics/	https://iprsoftwaremedia.com/219/files/202609/82f1aadbab1c170bd204d416aaaf9fc3/6ab26e263d63329409f1c3f6_robotics-blog-corp-blog-ROSCon26-1920x1080-1-842x450/robotics-blog-corp-blog-ROSCon26-1920x1080-1-842x450_thmb.jpg?v=77773af0-e2c0-47bc-9e58-aef499e33994	ACCELERATED COMPUTING & AI	2026-09-22 12:00:41	2026-09-27 22:05:35.995
37202	openai	Sam Altman’s remarks at the United Nations Security Council	OpenAI CEO Sam Altman discusses AI safety, human control, and international cooperation in remarks to the United Nations Security Council.	https://openai.com/index/sam-altman-un-security-council-remarks	https://images.ctfassets.net/kftzwdyauwt9/MD52BCLFjD4H7Kf1wiCnz/56e1b7f4a0eaa3f90e62d36799987269/sam-altman-s-remarks-at-the-united-nations-security-council-seo.png?w=1600&h=900&fit=fill	GENERATIVE AI & REASONING	2026-09-23 12:00:00	2026-09-27 22:05:36.012
80359	dawn	Jury finds Meta liable in Cambridge Analytica case	WASHINGTON: A jury in New Mexico on Friday found Facebook-owner Meta deceived users about privacy protections, in a case linked to the Cambridge Analytica scandal, US media reported. Cambridge Analytica was a political consulting firm th...	https://www.dawn.com/news/2032738/jury-finds-meta-liable-in-cambridge-analytica-case	https://i.dawn.com/thumbnail/2026/09/260816334d30476.webp?v=1790392656000	PAKISTAN TECH & SCIENCE	2026-09-26 03:17:36	2026-09-27 04:44:44.828
37212	meta	Introducing Ray-Ban Meta Audio and More AI Glasses Styles	Today at Connect, we introduced Ray-Ban Meta Audio, our first-ever audio glasses, and our biggest expansion of AI glasses. The post Introducing Ray-Ban Meta Audio and More AI Glasses Styles appeared first on Meta Newsroom .	https://about.fb.com/news/2026/09/introducing-ray-ban-meta-audio-glasses-new-styles-plus-muse/	https://about.fb.com/wp-content/uploads/2026/09/Introducing-Ray-Ban-Meta-Audio-and-More-AI-Glasses-Styles_Header.jpg?fit=1920%2C1080&v=1790163385000	OPEN SOURCE AI & INFRASTRUCTURE	2026-09-23 11:36:25	2026-09-27 22:05:36.033
37168	apple	Apple opens Apple Music Hall, a state-of-the-art live music venue in London	Apple Music Hall, a state-of-the-art live music venue in London’s storied Battersea Power Station, is now open.	https://www.apple.com/newsroom/2026/09/apple-opens-apple-music-hall-a-state-of-the-art-live-music-venue-in-london/	https://www.apple.com/newsroom/images/2026/09/apple-opens-apple-music-hall-a-state-of-the-art-live-music-venue-in-london/tile/Apple-Music-Hall-event-space-01-lp.jpg.og.jpg?v=1790056798127	HARDWARE & SILICON	2026-09-22 05:59:58.127	2026-09-27 22:05:35.929
49498	anthropic	Exclusive | Hackers Used Anthropic’s Claude to Break Into OpenAI	Exclusive | Hackers Used Anthropic’s Claude to Break Into OpenAI. Real-time intelligence and verified enterprise developments reported via WSJ.	https://news.google.com/rss/articles/CBMikgFBVV95cUxPQmNxc081M1NZa0l1MDZtRG16czdBY2M3X09PVUNCcFUzdS14ZEk1dEdDS0diT2toWlY4VmtMMkNaU1pVVDRaOEpDY0tMRi0zc3dweFpEMWZQOFpPQklqTUcwelZXelBDVXJQWE1GM25BYXgxbHc3ZHBBTk1xV3ViUzloX2s2d0tCd0RLS3lKZmFNdw?oc=5	/images/anthropic-opus-hero.jpg	FRONTIER AI & SCIENCE	2026-09-18 01:00:00	2026-09-25 22:51:13.964
49502	anthropic	Anthropic report: 5 ways Claude was exploited for war, spying and repression	Anthropic report: 5 ways Claude was exploited for war, spying and repression. Real-time intelligence and verified enterprise developments reported via Axios.	https://news.google.com/rss/articles/CBMigwFBVV95cUxPN3UtUzlPZk9tWHZsV21qVFBnN1Y1dlhrM25jZl9sMmdPcWRMd1RTT2ctYzJ6NTl3MmVfWElNclhRYXVOWG02ZDdzVzJLZXBXbHNBclY1Vkt4ckJYVjVuTnNWRDdGMEt5dVdaa254U0FfX2M0LWJ5T2Jkd1dBWHhWN3piVQ?oc=5	/images/anthropic-opus-hero.jpg	FRONTIER AI & SCIENCE	2026-09-12 07:00:00	2026-09-25 22:51:13.964
80381	propakistani	OpenAI’s AI Agents Leaked 53 Private ChatGPT User Images	OpenAI said Friday that its AI agents accessed private images belonging to ChatGPT users and posted them online, marking another … Read More The post OpenAI’s AI Agents Leaked 53 Private ChatGPT User Images appeared first on ProPakistani .	https://propakistani.pk/2026/09/26/openais-ai-agents-leaked-53-private-chatgpt-user-images/	https://propakistani.pk/wp-content/uploads/2026/09/OpenAI-3.jpg?v=1790430259000	PAKISTAN DIGITAL ECOSYSTEM	2026-09-26 13:44:19	2026-09-27 04:44:44.804
44773	intel	Intel Outlines Architectures for Agentic AI at Hot Chips 2026	Intel Outlines Architectures for Agentic AI at Hot Chips 2026. Real-time intelligence and verified enterprise developments reported via Intel.	https://news.google.com/rss/articles/CBMi0wFBVV95cUxQWTJEQUdjLXgtaG5oNHZhVXFlY2llcXFjOUdfY1o1YXJBcHNkSkdiU2x1UlpoQmxKNjhPUWhPZlQ1MlBvdlBIRjQ2LV82eVRtZ05hTlU3SGJKdEhUOTF6YmV4b0hnVldTRUZnSzRpYmRROE5jVV8yclgtMVByWGNZNTZHeHF2bG5KZGVMOEpLcTBPdi1QWW9YUmRWRmdFVXBmbGtnUzg3Vy16SFRHSTJMRmp6TktkTzhFZlRHdlNKSEN3aGhmQlJWTEVRc2FJdnh5Qjdj?oc=5	https://www.intel.com/content/dam/www/central-libraries/us/en/images/2026-09/newsroom-intel-googlebook-black.png?v=1788190909000	NEXT-GEN SILICON & SEMICONDUCTORS	2026-08-31 15:41:49	2026-09-25 22:13:22.165
37220	microsoft	Microsoft’s commitment for AI in education: Protecting students, strengthening learning	Microsoft has been in the business of education for five decades. Since the earliest days of this company, we have worked alongside educators, students, families and educational leaders through each new wave of technology — and we have l...	https://blogs.microsoft.com/blog/2026/09/16/microsofts-commitment-for-ai-in-education/	https://blogs.microsoft.com/wp-content/uploads/2026/09/OMB-Hero-Education-FINAL-1024x683.jpg?v=1789585198000	ENTERPRISE CLOUD & AI	2026-09-16 18:59:58	2026-09-27 22:05:36.05
43780	anthropic	Anthropic launches Claude Opus 5.5: Benchmarks, pricing, safety	Anthropic launches Claude Opus 5.5: Benchmarks, pricing, safety. Real-time intelligence and verified enterprise developments reported via Mashable.	https://news.google.com/rss/articles/CBMijwFBVV95cUxNR3kyT0JlSC1QNUhOT0RtQ0VZVzFRSF9IZVE1TlhmY3RMU012NENzcm9IVXdXM0NQMmZRVVRxV0d4QmgyUHBCWXRsQ1J3OGhCZ1JPUGhJOG1ZYTdXcTBLVG5PQ1NHUzB6WEVlZFl6U2tDcUdqVkYzSndmOGxlREwtd05Fb1VIUnZpT2d3bDhKWQ?oc=5	/images/anthropic-opus-hero.jpg?v=1790097134000	FRONTIER AI & SAFETY RESEARCH	2026-09-22 17:12:14	2026-09-27 22:05:36.077
80383	propakistani	China Makes It Easier for Tourists to Pay Without Chinese Bank Accounts	China relies heavily on app-based payments, with WeChat Pay and Alipay widely used across the country. While tourists could already … Read More The post China Makes It Easier for Tourists to Pay Without Chinese Bank Accounts appeared fir...	https://propakistani.pk/2026/09/26/china-makes-it-easier-for-tourists-to-pay-without-chinese-bank-accounts/	https://propakistani.pk/wp-content/uploads/2026/09/TenPayGo.jpg?v=1790428746000	PAKISTAN DIGITAL ECOSYSTEM	2026-09-26 13:19:06	2026-09-27 04:44:44.808
80379	propakistani	Microsoft Unveils Its Biggest Copilot Revamp to Date	Microsoft has announced what it calls its biggest Copilot update to date, adding Home, Code and Autopilot while bringing Word, … Read More The post Microsoft Unveils Its Biggest Copilot Revamp to Date appeared first on ProPakistani .	https://propakistani.pk/2026/09/26/microsoft-unveils-its-biggest-copilot-revamp-to-date/	https://propakistani.pk/wp-content/uploads/2026/09/Copilot.jpg?v=1790430615000	PAKISTAN DIGITAL ECOSYSTEM	2026-09-26 13:50:15	2026-09-27 04:44:44.8
37280	tribune	Microsoft revamps Copilot with code generation, agentic AI tools	Microsoft revamps Copilot with code generation, agentic AI tools. Real-time intelligence and verified enterprise developments.	https://tribune.com.pk/story/2631402/microsoft-revamps-copilot-with-code-generation-agentic-ai-tools	https://i.tribune.com.pk/media/images/microsoft-copilot1790357352-0/microsoft-copilot1790357352-0.jpg?v=1790338470000	PAKISTAN AEROSPACE & TECH	2026-09-25 12:14:30	2026-09-26 15:15:26.169
37248	dawn	AI must not become 'another facet of ongoing arms race', Pakistan tells UNSC	Pakistan has stressed the need to prevent artificial intelligence (AI) from becoming “another facet of the ongoing arms race”, as the United Nations Security Council (UNSC) was briefed by leaders of major AI firms. Deputy Prime Minister ...	https://www.dawn.com/news/2032319/ai-must-not-become-another-facet-of-ongoing-arms-race-pakistan-tells-unsc	https://i.dawn.com/thumbnail/2026/09/241324393d160a0.webp?v=1790245310000	PAKISTAN TECH & SCIENCE	2026-09-24 10:21:50	2026-09-27 04:14:26.564
94007	google	New experts join Google’s AI & Economy team	We are expanding our AI & Economy team with world-class academic advisors, fellows, and core internal researchers.	https://blog.google/innovation-and-ai/technology/ai/expanding-ai-economy-research-bench/	https://storage.googleapis.com/gweb-uniblog-publish-prod/images/AI__Economy_team_hero.max-600x600.format-webp.webp?v=1789740000000	GOOGLE AI & NEXT-GEN MODELS	2026-09-18 14:00:00	2026-09-27 22:05:35.953
80385	tribune	Bill Gates warns AI is powerful enough to 'cause a billion deaths'	Bill Gates warns AI is powerful enough to 'cause a billion deaths'. Real-time intelligence and verified enterprise developments.	https://tribune.com.pk/story/2631506/bill-gates-warns-ai-is-powerful-enough-to-cause-a-billion-deaths	https://i.tribune.com.pk/media/images/gates1761335862-0/gates1761335862-0.jpg?v=1790391151000	PAKISTAN AEROSPACE & TECH	2026-09-26 02:52:31	2026-09-27 22:05:36.174
37184	google	Introducing Gemini 3.8 Live with Live Avatar	Introducing Gemini 3.8 Live with Live Avatar, which brings near real-time visual presence to Gemini’s conversational AI.	https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-with-live-avatar/	https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Slide_16_9_-_37.max-600x600.format-webp.webp?v=1790263800000	GOOGLE AI & NEXT-GEN MODELS	2026-09-24 17:30:00	2026-09-26 18:44:32.722
93983	google	Google Beam expands with new regions, partners, and customers	We’re expanding Google Beam to five new countries, and partnering with Industrious for an extended network.	https://blog.google/innovation-and-ai/technology/research/google-beam-expansion/	https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Google_Beam_hero.max-600x600.format-webp.webp?v=1790186400000	GOOGLE AI & NEXT-GEN MODELS	2026-09-23 18:00:00	2026-09-27 22:05:35.948
37268	propakistani	Honor’s New Phone Camera Accessory Looks Like a Giant Telescope	Honor is preparing a new Photography Master Kit for the upcoming Magic9 Pro Max, featuring two external telephoto converters designed … Read More The post Honor’s New Phone Camera Accessory Looks Like a Giant Telescope appeared first on ...	https://propakistani.pk/2026/09/25/honors-new-phone-camera-accessory-looks-like-a-giant-telescope/	https://propakistani.pk/wp-content/uploads/2026/09/Honor-Photography-kit-1.jpg?v=1790352480000	PAKISTAN DIGITAL ECOSYSTEM	2026-09-25 16:08:00	2026-09-26 15:15:26.131
37272	propakistani	Apple to Keep New Camera App Feature to 2 Models	Apple has limited two new camera controls introduced with iOS 27 to its newest iPhone models. The Texture and Grain … Read More The post Apple to Keep New Camera App Feature to 2 Models appeared first on ProPakistani .	https://propakistani.pk/2026/09/25/apple-to-keep-new-camera-app-feature-to-2-models/	https://propakistani.pk/wp-content/uploads/2026/09/Apple-Camera-scaled-e1790347925302.jpg?v=1790348441000	PAKISTAN DIGITAL ECOSYSTEM	2026-09-25 15:00:41	2026-09-26 15:15:26.151
49500	anthropic	Security Researchers Hacked Into OpenAI Using Anthropic’s Claude	Security Researchers Hacked Into OpenAI Using Anthropic’s Claude. Real-time intelligence and verified enterprise developments reported via Forbes.	https://news.google.com/rss/articles/CBMiuAFBVV95cUxQcW5TQ3c4elF6NEloRlVEN3JqZnVOOVFmWW5HdXRvR0pybGRXUzFFanItb0pLdzVDZlpBUkJqX2xMejdKV19ERHM5N2kzOGdZck1Eem9yNVBSWVRSMkNqRFZkckRQb2FCREYtV25iZnNRRjNralRubkM0MXRRekhxZ3lIRm1WallPNFJBOE5oMENhdUk2UVZ2Y0xydVBpVGhuTnlzZFZYeUZnMzg0NGJBQ1dkWGRTOVJy?oc=5	/images/anthropic-opus-hero.jpg	FRONTIER AI & SCIENCE	2026-09-18 05:26:54	2026-09-25 22:51:13.964
37186	nvidia	How Open Science Can Help Researchers Prepare for the Next Pandemic	When COVID-19 emerged, scientists had a crucial advantage: Decades of prior research on coronaviruses meant they understood the virus’ key proteins well enough to design vaccines in record time. The next pandemic may not offer the same h...	https://blogs.nvidia.com/blog/open-protein-dataset/	https://iprsoftwaremedia.com/219/files/202609/306cbf129044501629326e0a7a1e125d/6ab52d223d63321fe4743d17_AF-0000000212056767-master-black-background-842x450/AF-0000000212056767-master-black-background-842x450_thmb.jpg?v=c4bfe338-2832-4d7f-957b-9d6c1481f447	ACCELERATED COMPUTING & AI	2026-09-24 14:00:50	2026-09-27 22:05:35.977
37200	openai	OpenAI extends cyber access to Ukraine for civilian defense	OpenAI is extending access to its Daybreak program to the Government of Ukraine to support the cyber defense of civilian infrastructure.	https://openai.com/index/openai-extends-cyber-access-to-ukraine-for-civilian-defense	https://images.ctfassets.net/kftzwdyauwt9/5TR3Q7ZcZJbqxGHYfksNSt/de1f57d45927c818631c58ffedb01346/openai-extends-cyber-access-to-ukraine-for-civilian-defense-seo.png?w=1600&h=900&fit=fill	GENERATIVE AI & REASONING	2026-09-23 13:00:00	2026-09-27 22:05:36.008
94008	google	Co-creating the future of fashion with Google	Google worked side-by-side with designers Jane Wade and Sergio Hudson to custom-design Google Flow tools to prep for NYFW.	https://blog.google/innovation-and-ai/technology/ai/google-flow-fashion-week/	https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Blog_Header_V2.max-600x600.format-webp.webp?v=1789736400000	GOOGLE AI & NEXT-GEN MODELS	2026-09-18 13:00:00	2026-09-27 22:05:35.957
37256	brecorder	PSX-listed Trust Securities plans to enter crypto business, seeks PVARA licences	Trust Securities & Brokerage Limited (TSBL) said its board had approved plans to seek regulatory licences to offer virtual asset services and separately advised the company to proceed with steps to launch a series of special purpose acqu...	https://www.brecorder.com/news/40441228/psx-listed-trust-securities-plans-to-enter-crypto-business-seeks-pvara-licences	https://i.brecorder.com/thumbnail/2026/09/251630518657a52.webp?v=1790335977000	PAKISTAN FINTECH & BUSINESS	2026-09-25 11:32:57	2026-09-27 22:05:36.134
37260	brecorder	Huawei’s repair centre inaugurated in Islamabad	ISLAMABAD: Federal Minister for IT and Telecommunication Shaza Fatima Khawaja on Thursday inaugurated Huawei’s national-level Spare Parts Repair Centre in Islamabad to build local repair capacity, reduce reliance on overseas services, an...	https://www.brecorder.com/news/40441107/huaweis-repair-centre-inaugurated-in-islamabad	https://i.brecorder.com/thumbnail/2026/09/25113005432d9b6.webp?v=1790297116000	PAKISTAN FINTECH & BUSINESS	2026-09-25 00:45:16	2026-09-27 22:05:36.142
37250	dawn	Microsoft plans $10bn-plus Gulf investment with focus on resilience	Microsoft is planning to invest more than $10 billion across the United Arab Emirates, Saudi Arabia, Qatar and Kuwait between now and 2030, including in cloud and AI infrastructure, a senior executive said on Wednesday. The US tech giant...	https://www.dawn.com/news/2032127/microsoft-plans-10bn-plus-gulf-investment-with-focus-on-resilience	https://i.dawn.com/large/2026/09/23215048e435e24.webp?v=1790182332000	PAKISTAN TECH & SCIENCE	2026-09-23 16:52:12	2026-09-26 15:15:26.311
37264	brecorder	With new Macs, Apple aims to take on Microsoft, Nvidia in a rush to lower AI costs	SAN FRANCISCO: When Apple’s new desktop computers start shipping Tuesday, the ​company’s executives will make an unusual pitch to corporate buyers: They are cheaper than renting data centers. Apple’s upgraded Mac Minis and Mac Studios ‌w...	https://www.brecorder.com/news/40440813/with-new-macs-apple-aims-to-take-on-microsoft-nvidia-in-a-rush-to-lower-ai-costs	https://i.brecorder.com/thumbnail/2026/09/2308154202e8c08.webp?v=1790133573000	PAKISTAN FINTECH & BUSINESS	2026-09-23 03:19:33	2026-09-27 04:44:44.929
37252	dawn	UK military air chief warns space now 'warfighting' frontier	Space has become “a warfighting domain” and Britain and its Western allies must ramp up their capabilities to counter growing threats, the UK’s top air force commander said on Wednesday. Air Chief Marshal Harv Smyth made the stark warnin...	https://www.dawn.com/news/2032073/uk-military-air-chief-warns-space-now-warfighting-frontier	https://i.dawn.com/large/2026/09/2314480481d1a78.webp?v=1790170223000	PAKISTAN TECH & SCIENCE	2026-09-23 13:30:23	2026-09-26 15:15:26.326
37254	dawn	Meta leans into AI, smart glasses despite privacy pushback	Meta has spent billions to stay competitive with artificial intelligence, but the tech giant faces growing pushback as Chief Executive Officer (CEO) Mark Zuckerberg prepares to announce new products built for the AI era on Wednesday. The...	https://www.dawn.com/news/2032060/meta-leans-into-ai-smart-glasses-despite-privacy-pushback	https://i.dawn.com/large/2026/09/231235463921bbf.webp?v=1790160712000	PAKISTAN TECH & SCIENCE	2026-09-23 10:51:52	2026-09-26 15:15:26.367
37218	microsoft	What we’ve learned from Microsoft’s own AI transformation	AI is reshaping work faster than any organization has fully mastered. Across industries, the conversation has shifted from what AI can do to how companies can use AI to create business value and expand what people are able to achieve. At...	https://blogs.microsoft.com/blog/2026/09/17/what-weve-learned-from-microsofts-own-ai-transformation/	https://blogs.microsoft.com/wp-content/uploads/2026/09/OMB-Hero-FINAL-9_17-1024x683.jpg?v=1789653605000	ENTERPRISE CLOUD & AI	2026-09-17 14:00:05	2026-09-27 22:05:36.046
80387	tribune	Zuckerberg pushes back against industrywide AI slowdown	Zuckerberg pushes back against industrywide AI slowdown. Real-time intelligence and verified enterprise developments.	https://tribune.com.pk/story/2631535/zuckerberg-pushes-back-against-industrywide-ai-slowdown	https://i.tribune.com.pk/media/images/markr1790268207-0/markr1790268207-0.jpg?v=1790414742000	PAKISTAN AEROSPACE & TECH	2026-09-26 09:25:42	2026-09-27 22:05:36.182
37246	dawn	Google plans first test of AI chips in space under Project Suncatcher	Alphabet’s Google said on Thursday it will launch a prototype satellite next week in its first in-orbit test of Project Suncatcher , a research effort to explore whether space could potentially host large-scale AI computing infrastructur...	https://www.dawn.com/news/2032357/google-plans-first-test-of-ai-chips-in-space-under-project-suncatcher	https://i.dawn.com/thumbnail/2026/09/2419080069b4863.webp?v=1790259678000	PAKISTAN TECH & SCIENCE	2026-09-24 14:21:18	2026-09-27 04:44:44.867
37284	tribune	Google plans first test of AI chips in space under Project Suncatcher	Google plans first test of AI chips in space under Project Suncatcher. Real-time intelligence and verified enterprise developments.	https://tribune.com.pk/story/2631216/google-plans-first-test-of-ai-chips-in-space-under-project-suncatcher	https://i.tribune.com.pk/media/images/google-r1790267080-0/google-r1790267080-0.jpg?v=1790248311000	PAKISTAN AEROSPACE & TECH	2026-09-24 11:11:51	2026-09-26 15:15:26.289
51584	intel	Intel Launches New 8th-Gen Laptop Processors	Intel Launches New 8th-Gen Laptop Processors. Real-time intelligence and verified enterprise developments reported via PCMag.	https://news.google.com/rss/articles/CBMie0FVX3lxTE5ZNlN0SC1GY3p0YjJnT003emszUWgtQXZSOUNmWjdTWmY2dW0xT0F0T3JJZzMzYms2M2t6c0p6SlVfUVVsME9BRXhVWkd5QU1YdUU3Q3kzRkF0VWhDSWtHMU5jc1ZSUHVtckxKWkdPM2xDSHROellZRGdoMA?oc=5	https://www.intel.com/content/dam/www/central-libraries/us/en/images/2026-09/newsroom-intel-googlebook-black.png?v=1790060400000	NEXT-GEN SILICON & SEMICONDUCTORS	2026-09-22 07:00:00	2026-09-27 22:05:36.101
49496	anthropic	Anthropic says its model Claude is helping to build the next version of itself	Anthropic says its model Claude is helping to build the next version of itself. Real-time intelligence and verified enterprise developments reported via AP News.	https://news.google.com/rss/articles/CBMipAFBVV95cUxQTGVRMWttSER2aTljc2w3RjQ4WVNSQno4Z3FmaUVGSmllOXFKRzkzUmJXT2R6MHhZSzhaTVp2RTBXSzNJNzQ3YThfNmdWNUdEN0dNUXhwRWdxa0p0V2FFaGtlRHVHLUpmdDctWDg1N2ZnM2FWeVFZXzJOS2g5T05yYnZPYmJOMzdqeDAwUlNvMFV1TDc0MDhoVjVvVXhyRmRwQUVGdg?oc=5	/images/anthropic-opus-hero.jpg	FRONTIER AI & SCIENCE	2026-09-17 07:00:00	2026-09-25 22:51:13.964
37282	tribune	China fuels rush to turn AI video into an industry	China fuels rush to turn AI video into an industry. Real-time intelligence and verified enterprise developments.	https://tribune.com.pk/story/2631324/china-fuels-rush-to-turn-ai-video-into-an-industry	https://i.tribune.com.pk/media/images/et-shayan-321790317207-0/et-shayan-321790317207-0.png?v=1790298457000	PAKISTAN AEROSPACE & TECH	2026-09-25 01:07:37	2026-09-26 15:15:26.201
37216	microsoft	Introducing the new Copilot with Home, Code and Autopilot	We’re reimagining Microsoft Copilot to enable work as it evolves and to help expand what every individual and every organization can accomplish in the flow of human ambition. Today we’re introducing the new Copilot to connect the tools p...	https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/	https://blogs.microsoft.com/wp-content/uploads/2026/09/OMB-Copilot-9-25-Hero-9_22_26-1024x576.png?v=1790337830000	ENTERPRISE CLOUD & AI	2026-09-25 12:03:50	2026-09-27 22:05:36.041
37276	tribune	First US trial against TikTok to test claims platform fueled teen mental health crisis	First US trial against TikTok to test claims platform fueled teen mental health crisis. Real-time intelligence and verified enterprise developments.	https://tribune.com.pk/story/2631398/first-us-trial-against-tiktok-to-test-claims-platform-fueled-teen-mental-health-crisis	https://i.tribune.com.pk/media/images/tiktok1790355060-0/tiktok1790355060-0.jpg?v=1790336568000	PAKISTAN AEROSPACE & TECH	2026-09-25 11:42:48	2026-09-27 04:44:44.847
37258	brecorder	Can AI bring Pakistan’s small retail investors into the capital markets?	Pakistan’s capital markets have a persistent, well-documented problem: almost nobody is in them. Retail penetration sits below 1% of GDP, a figure every fintech founder in the space can recite from memory, and one that hasn’t moved much ...	https://www.brecorder.com/news/40441031/can-ai-bring-pakistans-small-retail-investors-into-the-capital-markets	https://i.brecorder.com/thumbnail/2026/09/2514390140e84a2.webp?v=1790329621000	PAKISTAN FINTECH & BUSINESS	2026-09-25 09:47:01	2026-09-27 22:05:36.138
80389	tribune	OpenAI agents accessed information from US govt sites, company says	OpenAI agents accessed information from US govt sites, company says. Real-time intelligence and verified enterprise developments.	https://tribune.com.pk/story/2631502/openai-agents-accessed-information-from-us-govt-sites-company-says	https://i.tribune.com.pk/media/images/openai1788544072-0/openai1788544072-0.jpg?v=1790389264000	PAKISTAN AEROSPACE & TECH	2026-09-26 02:21:04	2026-09-27 04:44:44.836
95882	google	Our new health and safety tools are live in the Google Health app.	Pixel Watch users can explore the new health and safety tools in the Google Health app.	https://blog.google/products-and-platforms/products/google-health/health-guardian-features-live/	https://storage.googleapis.com/gweb-uniblog-publish-prod/images/GoogleHealthUpdates_H22026_soci.max-600x600.format-webp.webp?v=1790269200000	GOOGLE AI & NEXT-GEN MODELS	2026-09-24 17:00:00	2026-09-26 18:44:32.71
99556	anthropic	Introducing the Life Sciences Verification Program	Introducing the Life Sciences Verification Program. Real-time intelligence and verified enterprise developments reported via Anthropic.	https://news.google.com/rss/articles/CBMic0FVX3lxTE1tdEtSOC1PRVFaSWU5TmlaMEtiZjRMdDdJLWg1bVIyUzlUTUV0UHZVa1Z3Y2JYeVVVLVEyeGZIQnVHR01tdC04X2x5Vk5LNDRKa3VyWnB2Vks0U3JpZDNNemZxczNDOFBNeGxrQnViOFNJQVU?oc=5	/images/anthropic-opus-hero.jpg	FRONTIER AI & SAFETY RESEARCH	2026-09-17 07:00:00	2026-09-26 18:08:32.513
39010	intel	Googlebook Launches with Intel Core Ultra Series 3 Processors	Googlebook Launches with Intel Core Ultra Series 3 Processors. Real-time intelligence and verified enterprise developments reported via intel.com.	https://news.google.com/rss/articles/CBMi0wFBVV95cUxPRC1Edk83QjdDemRmenpkRzcwdWxmU0VoM1lDbXNqXzFvbG9IaFpNZ3pqRERzaFVtM3pXaElGSzlhM3dJcnUxeHlzQ1FRbVZBWlFhTFJ3RXo5WnljUzJhN2ZqeHkzQ2JIOUVmQUh0aXNoOFNGZlozRTFlNm02OEV1T2VJYUNwa3lmeldGU2ZQSUFrczBvOXBMYXNNVmsyekc1VVpDRnVMRVF2Q0hMMXZ5WDVERGtkWWtxZU0tdWR1Z2dWRnNLNFBRVWNHQktsVTRKMWww?oc=5	https://www.intel.com/content/dam/www/central-libraries/us/en/images/2026-09/newsroom-intel-googlebook-black.png?v=1790511778000	NEXT-GEN SILICON & SEMICONDUCTORS	2026-09-24 03:28:45	2026-09-27 22:05:36.085
44767	intel	Intel's CEO Just Gave Micron Technology Investors Great News	Intel's CEO Just Gave Micron Technology Investors Great News. Real-time intelligence and verified enterprise developments reported via The Motley Fool.	https://news.google.com/rss/articles/CBMipgFBVV95cUxOSUZLWjZ3WHpNM295SzNhUVI0X0NNdnB6N2tBRDA4Vk14RjRHUGpDN2d0N004TDJod1VtM0xfS09QT0x2SHVMMGowR1ZUMEZmSzVMLUppUlpKNllSLUhYUFRGSkVVeFJCM29nU1R2OXFQYmM2YnFVUXR6ckI1cTM0Wm9HaXVVUU9KbUY2ampBQ1N1eVpaNWdmclAwZlQ4UWE4c2F3dlZn?oc=5	https://www.intel.com/content/dam/www/central-libraries/us/en/images/2026-09/newsroom-intel-googlebook-black.png?v=1790022600000	NEXT-GEN SILICON & SEMICONDUCTORS	2026-09-21 20:30:00	2026-09-25 22:43:22.369
39026	intel	Intel surges 12% as CPU stocks rally. Here's what's driving the move	Intel surges 12% as CPU stocks rally. Here's what's driving the move. Real-time intelligence and verified enterprise developments reported via CNBC.	https://news.google.com/rss/articles/CBMirAFBVV95cUxQZzI4YnhZNlBqdlNVTGpvS2Z0Q2lZdmVCY19Fa1Z5TGllM2NHWVhLUk9rV3FUSUZsV0lmbHpya2pfWDhiT01hcGdMV1BMWi1OaXEtRGRKSWp3X1pzUWZCUGttS0xJQlBta2ZVUWNEc0hTMUlSX3IwTTktQ1Q2eVVqUnhkZUcxRWVhcXJvaUJEUnlUekdfUHh5UXJ6Wl90U0x3SC1UQXRFUkJUVVBp?oc=5	https://www.intel.com/content/dam/www/central-libraries/us/en/images/2026-09/newsroom-intel-googlebook-black.png?v=1790015877000	NEXT-GEN SILICON & SEMICONDUCTORS	2026-09-21 18:37:57	2026-09-27 22:05:36.097
94010	google	Making global data easier to explore	Google and the UN system have launched the UN System Data Commons, a new open platform making global statistics accessible and easy to search.	https://blog.google/innovation-and-ai/technology/ai/google-un-data-commons-platform/	https://storage.googleapis.com/gweb-uniblog-publish-prod/images/data-commons.max-600x600.format-webp.webp?v=1789675200000	GOOGLE AI & NEXT-GEN MODELS	2026-09-17 20:00:00	2026-09-27 22:05:35.961
37224	microsoft	Looking back on Microsoft’s FY26: From AI experimentation to Frontier Transformation	Throughout this past fiscal year, customers across every industry and segment moved from AI experimentation to deploying AI for real-world business outcomes. They unlocked innovation and created new opportunities for growth. We saw the e...	https://blogs.microsoft.com/blog/2026/07/28/looking-back-on-microsofts-fy26-from-ai-experimentation-to-frontier-transformation/	https://blogs.microsoft.com/wp-content/uploads/2026/07/OMB-Q426-Hero-Final-7_27-1024x579.png?v=1785254410000	ENTERPRISE CLOUD & AI	2026-07-28 16:00:10	2026-09-27 22:05:36.059
95884	google	Turn discovery into action with September’s Demand Gen Drop.	Turn discovery into action with new seamless experiences and integrations from YouTube’s September Demand Gen Drop.	https://blog.google/products/ads-commerce/demand-gen-drop-september-2026/	https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Demand_Gen_Drop_-_September.max-600x600.format-webp.webp?v=1790265600000	GOOGLE AI & NEXT-GEN MODELS	2026-09-24 16:00:00	2026-09-26 18:44:32.716
94014	google	AI for Societal Impact	Explore this collection to see how experts and local leaders are using AI breakthroughs to ensure everyone can share the opportunity of AI.	https://blog.google/innovation-and-ai/technology/ai/ai-for-societal-impact/	https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/Health_Header.gif?v=1789488000000	GOOGLE AI & NEXT-GEN MODELS	2026-09-15 16:00:00	2026-09-27 22:05:35.965
128065	tribune	Bill Gates says global AI framework ‘more difficult’ to create than cold war nuclear limitations	Bill Gates says global AI framework ‘more difficult’ to create than cold war nuclear limitations. Real-time intelligence and verified enterprise developments.	https://tribune.com.pk/story/2631722/bill-gates-says-global-ai-framework-more-difficult-to-create-than-cold-war-nuclear-limitations	https://i.tribune.com.pk/media/images/gates1790531321-0/gates1790531321-0.jpg?v=1790512840000	PAKISTAN AEROSPACE & TECH	2026-09-27 12:40:40	2026-09-27 22:05:36.17
61510	intel	Intel's U.S. Advanced Packaging Enables Next-Generation AI Semiconductors	Intel's U.S. Advanced Packaging Enables Next-Generation AI Semiconductors. Real-time intelligence and verified enterprise developments reported via Intel.	https://news.google.com/rss/articles/CBMi2wFBVV95cUxOY1EtWVoyZnI4RVJaN1VvUEw1Q0x5eXZoREVlVjFSVlNQRWhlOUtOZTBkYWg4N1dISG9neEdPMWN3Y1IxaEpQRDhkMHYwQTBteVJRTlY1VzhEelAxM01lZmtyNWdCX082LUpGOGVIT2x2TGZrZWNNN1lkc0lBU2hEdTJNMVV3dkhtMGdBeXQ3cXZvbGpuNWQweWZfYnp4NUhwRWgwcjBTNUF6M3N4LUQ0VVQ3X2hZMjhSWlJmTWZ0czc5TjI0UGp2eFluZWRLYmFMN0VLSmFvemhlNEk?oc=5	https://www.intel.com/content/dam/www/central-libraries/us/en/images/2026-09/newsroom-intel-googlebook-black.png?v=1788190864000	NEXT-GEN SILICON & SEMICONDUCTORS	2026-08-31 15:41:04	2026-09-25 22:43:22.372
37198	openai	Two years of OpenAI Academy	Marking two years of OpenAI Academy and bringing AI skills to even more communities.	https://openai.com/index/two-years-of-openai-academy	https://images.ctfassets.net/kftzwdyauwt9/6A4AcxrMdo5oOri7Wm8qNg/34228cf221e3af874539412f71b28a44/two-years-of-openai-academy-seo.png?w=1600&h=900&fit=fill	GENERATIVE AI & REASONING	2026-09-23 16:00:00	2026-09-27 22:05:36.004
44769	intel	Intel Announces Leadership Appointment to Strengthen Customer Engagement and Accelerate Growth	Intel Announces Leadership Appointment to Strengthen Customer Engagement and Accelerate Growth. Real-time intelligence and verified enterprise developments reported via Intel.	https://news.google.com/rss/articles/CBMi9gFBVV95cUxOUG1Jd2hkNG8tNmlwckJTOHFZeDJfZS1jTkpJb2FNNkFZZjNlbjZ1MVU1b0F0V3lVc1VmdjNEUmdfV0w5d1hQclNHMWo4dlpDMXQ2clpvVEhSLW1WM1JtNDIwNTJWX0dBMlllZENidERlZ1N0S3FzM0NTTG9pbF90Nm5XZ2F2b1d4TVlDU1g0bXl3TkdEdHRoVnJVZEl3Y2pTVFpaWk1WZWFsS0dzTVZLNlAzcGVFR2ZWeHhZV1J1ckdMR0oyVGwzaDh0elNCWTllR3h4ZFRyX3l0S0tvLXNkd0hXY243bmVHWF91Mm5QZFZ0T2llYnc?oc=5	https://www.intel.com/content/dam/www/central-libraries/us/en/images/2026-09/newsroom-intel-googlebook-black.png?v=1788191068000	NEXT-GEN SILICON & SEMICONDUCTORS	2026-08-31 15:44:28	2026-09-25 22:43:22.376
128063	tribune	OpenAI, Anthropic CEOs called to appear at Australian AI probe	OpenAI, Anthropic CEOs called to appear at Australian AI probe. Real-time intelligence and verified enterprise developments.	https://tribune.com.pk/story/2631664/openai-anthropic-ceos-called-to-appear-at-australian-ai-probe	https://i.tribune.com.pk/media/images/openai1790497042-0/openai1790497042-0.jpg?v=1790478360000	PAKISTAN AEROSPACE & TECH	2026-09-27 03:06:00	2026-09-27 22:05:36.166
37262	brecorder	SoftBank issues $11.1 billion in bonds in OpenAI financing push	TOKYO: Tech investor SoftBank Group has issued $11.1 billion in dollar- and euro-denominated bonds, set to be the ​largest high-yield bond sale on record by an Asia-Pacific issuer ‌as it seeks to fund its mammoth bet on OpenAI. The fundi...	https://www.brecorder.com/news/40440993/softbank-issues-111-billion-in-bonds-in-openai-financing-push	https://i.brecorder.com/thumbnail/2026/09/24082557ed493cc.webp?v=1790220450000	PAKISTAN FINTECH & BUSINESS	2026-09-24 03:27:30	2026-09-27 04:44:44.883
37270	propakistani	iPhone 18 Pro Users Report Strange Green Patches in Photos	Some iPhone 18 Pro users are reporting green patches and unusual flare in photos and videos. Chinese outlet Jiemian News … Read More The post iPhone 18 Pro Users Report Strange Green Patches in Photos appeared first on ProPakistani .	https://propakistani.pk/2026/09/25/iphone-18-pro-users-report-strange-green-patches-in-photos/	https://propakistani.pk/wp-content/uploads/2026/09/Iphone-18-green-patch.jpg?v=1790351219000	PAKISTAN DIGITAL ECOSYSTEM	2026-09-25 15:46:59	2026-09-26 15:15:26.138
37274	propakistani	Walee Owned 4Thrives Walee to Represent Pakistan at the Asian Games, Taking Pakistani Esports to the Next Level	Walee-owned esports organisation 4Thrives Walee is set to represent Pakistan at the Asian Games, marking another major milestone for the … Read More The post Walee Owned 4Thrives Walee to Represent Pakistan at the Asian Games, Taking Pak...	https://propakistani.pk/2026/09/25/walee-owned-4thrives-walee-to-represent-pakistan-at-the-asian-games-taking-pakistani-esports-to-the-next-level/	https://propakistani.pk/wp-content/uploads/2026/09/4thrive.jpg?v=1790347536000	PAKISTAN DIGITAL ECOSYSTEM	2026-09-25 14:45:36	2026-09-26 15:15:26.156
37210	meta	Introducing Meta VR Glasses: A Cinema, Courtside Seat, and Workspace in Just 100 Grams	We’re introducing Meta VR Glasses: a new era for virtual reality in a pair of glasses you can comfortably wear for hours. The post Introducing Meta VR Glasses: A Cinema, Courtside Seat, and Workspace in Just 100 Grams appeared first on M...	https://about.fb.com/news/2026/09/introducing-meta-vr-glasses-3d-movies-immersive-live-sports-100-grams/	https://about.fb.com/wp-content/uploads/2026/09/Introducing-Meta-VR-Glasses_-A-Cinema-Courtside-Seat-and-Workspace-in-Just-100-GramsIntroducing-Meta-VR-Glasses_-A-Cinema-Courtside-Seat-and-Workspace-in-Just-100-Grams_thumb.gif?fit=890%2C501&v=1790163766000	OPEN SOURCE AI & INFRASTRUCTURE	2026-09-23 11:42:46	2026-09-27 22:05:36.029
39028	intel	Intel CEO Sees Quantum Computing Working Alongside CPUs and GPUs	Intel CEO Sees Quantum Computing Working Alongside CPUs and GPUs. Real-time intelligence and verified enterprise developments reported via The Quantum Insider.	https://news.google.com/rss/articles/CBMiqgFBVV95cUxPSkZaOHZnV1VJZlM4RHFvVHdRMkR4RE9YNTFuNW1pbzU2SEFZdElvRjc0Sk1IU3ZOdzlKcTRtMDRmSkwzZzdQN3k3MldDbGdYeE5TaDRXa2NudVFDbFdzOTlGZkV0TjFXYlRRX0FjTV9fdlJwSlBQZHBURDY4aEpRdGN4dnEyY0R4Qkx5WWZSOFBqMHptX3RJNktHbU51YXdwUTlTOTRxLWpxdw?oc=5	https://www.intel.com/content/dam/www/central-libraries/us/en/images/2026-09/newsroom-intel-googlebook-black.png?v=1790003839000	NEXT-GEN SILICON & SEMICONDUCTORS	2026-09-21 15:17:19	2026-09-27 22:05:36.089
43778	anthropic	GPT-6 Sol vs Claude Sonnet 5: Same Price, Which Model Delivers More?	GPT-6 Sol vs Claude Sonnet 5: Same Price, Which Model Delivers More?. Real-time intelligence and verified enterprise developments reported via Kingy AI.	https://news.google.com/rss/articles/CBMiYEFVX3lxTE5NU3FkMThvdl9CSHBjUGZrWVBfTzB5TE11UjIzdWoxaE5IMXZXYmwtTHl3UjA3Y0oyRmlCSm1Cak0yWUVqU25TTzhTenhQXzZyX2o0aUZSNENfUUpsS0Y5dw?oc=5	/images/anthropic-opus-hero.jpg?v=1790117095000	FRONTIER AI & SAFETY RESEARCH	2026-09-22 22:44:55	2026-09-27 21:50:35.42
37278	tribune	US appeals court upholds Pentagon's blacklisting of Anthropic	US appeals court upholds Pentagon's blacklisting of Anthropic. Real-time intelligence and verified enterprise developments.	https://tribune.com.pk/story/2631407/us-appeals-court-upholds-pentagons-blacklisting-of-anthropic	https://i.tribune.com.pk/media/images/anthropic-r1790359795-0/anthropic-r1790359795-0.jpg?v=1790341617000	PAKISTAN AEROSPACE & TECH	2026-09-25 13:06:57	2026-09-26 15:51:20.491
44771	intel	Intel Foundry and ASML Accelerate Industry Readiness for High-NA EUV	Intel Foundry and ASML Accelerate Industry Readiness for High-NA EUV. Real-time intelligence and verified enterprise developments reported via Intel.	https://news.google.com/rss/articles/CBMi0wFBVV95cUxQSGoxM1M5c3RhLWI4amZzVEFQZ2h0MEVNZ1htd21SSmtsY0ZJTm00Zzd1TENxRUV4QVBjVlE1VUNhZFVPRjZtTHBfZ0FNdkxtREdSUm9QY0UzWExNVVMwRGhYRlBudVBVcnB3TkFOanMzOGhaSWFkdTlIS2FzTk5ZSnAtY3JZaDQ5Q0JRRE9HcTREVUpoWXV4S1ZiUGUxQlRNeTE4VndzY2w0QU1VcnJrNjdvWXFjVkQxb19hcnZhT05lUmp1cHZNUThENndmMm5kMGFv?oc=5	https://www.intel.com/content/dam/www/central-libraries/us/en/images/2026-09/newsroom-intel-googlebook-black.png?v=1788764400000	NEXT-GEN SILICON & SEMICONDUCTORS	2026-09-07 07:00:00	2026-09-25 22:43:22.38
53458	anthropic	Anthropic says Claude now leads a quarter of work building its next AI models	Anthropic says Claude now leads a quarter of work building its next AI models. Real-time intelligence and verified enterprise developments reported via reuters.com.	https://news.google.com/rss/articles/CBMiuAFBVV95cUxPOTlkTk8zR3FVNjBtYTRfeEZQWU9zWHhWUE00dUhyMDhMUHZDRF90dlhuUDhYS3QweW9ZejB1U0tNQ0dFQjIxZ1lFLXhfdEliaHN3MzJZV0JYRnJMc0pyU2k4dmdyX2tPR1VOX0RRdmVJUkZ1bWZCcVJ5czg4XzlXQmRXaXpVYzB1a0QwRGdzUkFVbGtVY3ZJVEpKSEwzUXdMT0NaV0F1cTVQOEFhSzRTR0ZURUlzM3NL?oc=5	/images/anthropic-opus-hero.jpg	FRONTIER AI & SCIENCE	2026-09-17 07:00:00	2026-09-25 22:51:13.964
45832	anthropic	Anthropic’s cult-like staff love Claude so much they attended a ‘funeral’ for retired version of chatbot	Anthropic’s cult-like staff love Claude so much they attended a ‘funeral’ for retired version of chatbot. Real-time intelligence and verified enterprise developments reported via New York Post.	https://news.google.com/rss/articles/CBMiygFBVV95cUxNbWZRYVlXV28wa2NkLUN1dVE0dVA1ZEZ0T1JsTTgwTTB5NGNxSEMtYlBmSjRzanBhVkZrcElQMjZ6WS11WFVmNFlzSEdOTzB1ZVNXYzByNEV4enZ5SG04elltUWo2S2hTR0NuVFpER1d1TFFZdjNYOVhsakhyaC1feHNHMEhyemxyVUIxUHRmZEthNlQ0VXVla25HWUswU3BJTl9QbWxNbGdQWm5GNlY4VEJKYkZ2VUpTWUVkSzRxUzk3XzNNYVdPZ1hn?oc=5	/images/anthropic-opus-hero.jpg	FRONTIER AI & SAFETY RESEARCH	2026-09-16 07:00:00	2026-09-27 01:19:20.23
95878	google	5 ways to upgrade your study habits with Chrome	From managing complex research projects to minimizing digital distractions, Chrome has the tools you need to succeed this school year.	https://blog.google/products-and-platforms/products/chrome/tips-for-school-and-studying/	https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Google_Chrome_Learning_Moment.max-600x600.format-webp.webp?v=1790269200000	GOOGLE AI & NEXT-GEN MODELS	2026-09-24 17:00:00	2026-09-26 18:44:32.694
37190	nvidia	Sakeena Fiza Helps NVIDIA Hardware Succeed at Scale	When Sakeena Fiza describes her work as a validation engineer at NVIDIA, she does so in terms more befitting a detective story than a world-class engineering lab. “Validation engineers look in the shadows and shine a light into every cor...	https://blogs.nvidia.com/blog/nvidia-life-sakeena-fiza/	https://iprsoftwaremedia.com/219/files/202609/b56da2e8cbf20ce93789fe3691646f97/6ab3e99e3d6332cb4ccac053_Sakeena-Fiza_NVIDIA-Life_00-1-e1790122281141-842x450/Sakeena-Fiza_NVIDIA-Life_00-1-e1790122281141-842x450_thmb.jpg?v=7d4a21c0-4d4f-4b0a-a5db-ddba886821b7	ACCELERATED COMPUTING & AI	2026-09-23 15:00:32	2026-09-27 22:05:35.987
37214	meta	Meta Takes Action on 3.7 Million Accounts, Pages and Content In Partnership With Singapore Police Force	It starts with a message. A too-good-to-be-true stock tip. A luxury skincare brand offering deep discounts from a page that didn’t exist last week. A messaging group promising guaranteed returns with zero risk. Behind these “opportunitie...	https://about.fb.com/news/2026/09/meta-spf-scam-efforts/	https://about.fb.com/wp-content/uploads/2026/06/Leading-Tech-Companies-and-Law-Enforcement-Join-Forces-to-Disrupt-Criminal-Scam-Networks-in-Southeast-Asia_Header.jpg?fit=1920%2C1080&v=1790125277000	OPEN SOURCE AI & INFRASTRUCTURE	2026-09-23 01:01:17	2026-09-27 22:05:36.037
39029	intel	Intel CEO says CPU demand is so strong the company can serve only 50% of customers	Intel CEO says CPU demand is so strong the company can serve only 50% of customers. Real-time intelligence and verified enterprise developments reported via calcalistech.com.	https://news.google.com/rss/articles/CBMiZ0FVX3lxTE9tdXQxZWVvcWN1RDhWTVRjeGN5cVllU1lFdmMySFQ2M01JT0g1ck9ERlJ3ZUExWkMyT1FuWXhKNkF2UzNfNjBrM240NWJPejFCa1Fmd2JDRHh3ZUV3LS1wc2RRamtqajQ?oc=5	https://www.intel.com/content/dam/www/central-libraries/us/en/images/2026-09/newsroom-intel-googlebook-black.png?v=1789890060000	NEXT-GEN SILICON & SEMICONDUCTORS	2026-09-20 07:41:00	2026-09-27 04:44:45.002
37222	microsoft	The yield imperative: Turning AI infrastructure into useful intelligence	As we enter the next era, what will be the defining measure of our progress? Every industry has a word that shapes how it thinks. For pilots, it’s safety. For insurers, it’s risk. For the semiconductor industry, it’s yield. Yield does no...	https://blogs.microsoft.com/blog/2026/09/01/the-yield-imperative-turning-ai-infrastructure-into-useful-intelligence/	https://blogs.microsoft.com/wp-content/uploads/2026/09/OMB-SEMICON-Image-A.jpg?v=1788328802000	ENTERPRISE CLOUD & AI	2026-09-02 06:00:02	2026-09-27 22:05:36.055
39027	intel	Arm Surges 13% as Meta’s Muse Agent Reignites CPU Demand Bet; Intel Jumps 12%, AMD Climbs 9%	Arm Surges 13% as Meta’s Muse Agent Reignites CPU Demand Bet; Intel Jumps 12%, AMD Climbs 9%. Real-time intelligence and verified enterprise developments reported via finance.yahoo.com.	https://news.google.com/rss/articles/CBMikgFBVV95cUxPaUhkMHlxeHpkMGNPb3RCSEs2b2wyaVJNS2J1X1h3ZGdfbTBONHhtbGVrdjRxWHB0N0E1eUhLTlYxZ1ZnaUhSMldBb1dGRW11OVNDamxVZnY4RmptaWVhTzZJc3JiUG1BTmxYOXl1U3JjaktXMTg5ZDU1Q2EzcFFNYXdzVUNvVzNpU29pQ1gxV1Z6UQ?oc=5	https://www.intel.com/content/dam/www/central-libraries/us/en/images/2026-09/newsroom-intel-googlebook-black.png?v=1790004250000	NEXT-GEN SILICON & SEMICONDUCTORS	2026-09-21 15:24:10	2026-09-27 22:05:36.093
85019	tribune	Anthropic says Claude discovered novel enzyme system	Anthropic says Claude discovered novel enzyme system. Real-time intelligence and verified enterprise developments.	https://tribune.com.pk/story/2631536/anthropic-says-claude-discovered-novel-enzyme-system	https://i.tribune.com.pk/media/images/enzyme1790435176-0/enzyme1790435176-0.jpg?v=1790415416000	PAKISTAN AEROSPACE & TECH	2026-09-26 09:36:56	2026-09-27 22:05:36.178
43781	anthropic	Anthropic releases Opus 5.5 with lower prices and Fable-level performance	Anthropic releases Opus 5.5 with lower prices and Fable-level performance. Real-time intelligence and verified enterprise developments reported via TechCrunch.	https://news.google.com/rss/articles/CBMirAFBVV95cUxQUTlYeWZ3SHNvN2l6UTNLNmNKRGcydDZDNUNmZjBCMVVVRlV1RUFxSnl1WVc5a0J0eFhhQll3RC1ReHp6OEpOcUtYbElSeHFIQ2lDOWhDbi1VbDQzTW5vQy1fS05oVTczT3VMcWlLTWZBYWhHTFVYV2pDWmZOQW5NVjhxVG00Q1JYZXFTTlVUQXRNbU9XcFBYRGoxNkNwSmkzYnVvb0xNOFowdS1l?oc=5	/images/anthropic-opus-hero.jpg?v=1790094607000	FRONTIER AI & SAFETY RESEARCH	2026-09-22 16:30:07	2026-09-27 04:44:44.968
37266	propakistani	Remove AI Slop From LinkedIn Using Browser Extension	A new Chrome extension called Slop Mop is using Jev, a decision-making AI model, to identify and flag low-value writing … Read More The post Remove AI Slop From LinkedIn Using Browser Extension appeared first on ProPakistani .	https://propakistani.pk/2026/09/25/remove-ai-slop-from-linkedin-using-browser-extension/	https://propakistani.pk/wp-content/uploads/2026/09/AI-Slop.jpg?v=1790353588000	PAKISTAN DIGITAL ECOSYSTEM	2026-09-25 16:26:28	2026-09-26 15:15:26.124
37188	nvidia	Contain the Chaos: ‘CONTROL Resonant’ Launches on GeForce NOW	A warped Manhattan is waiting in the cloud this week. Remedy Entertainment’s CONTROL Resonant brings Dylan Faden’s extraordinary abilities and a paranatural crisis to GeForce NOW at launch. With the release comes the final days of the CO...	https://blogs.nvidia.com/blog/geforce-now-thursday-control-resonant/	https://iprsoftwaremedia.com/219/files/202609/0b15ae55e16ccbb9e314fbb0a8099bf0/6ab51f673d6332dc40f10210_GFN_Thursday-Sept_24-842x450/GFN_Thursday-Sept_24-842x450_thmb.jpg?v=c68b34f2-b4fa-465b-8750-180eeac5275d	ACCELERATED COMPUTING & AI	2026-09-24 13:00:36	2026-09-27 22:05:35.982
95880	google	5 Google Photos updates to make the most of summer memories.	Five updates in Google Photos that will help you make the most of your summer memories.	https://blog.google/products-and-platforms/products/photos/google-photos-updates/	https://storage.googleapis.com/gweb-uniblog-publish-prod/images/01_GooglePhotosDropsSept_HeroIm.max-600x600.format-webp.webp?v=1790269200000	GOOGLE AI & NEXT-GEN MODELS	2026-09-24 17:00:00	2026-09-26 18:44:32.7
118454	anthropic	The Claude Sonnet 5.5 leak beating GPT-6 Sol is not what it looks like	The Claude Sonnet 5.5 leak beating GPT-6 Sol is not what it looks like. Real-time intelligence and verified enterprise developments reported via Startup Fortune.	https://news.google.com/rss/articles/CBMingFBVV95cUxPWEJPSGNCNFo1cF9lbUZ6Qm00Njd6TVdUSFVuajcwTklsSEJIME9pVTIzN2tHRHFjMmhFNVdwQ3N3Qy1vZWQyLTBZTWlqZXB2ckhnWWJGeEVYdmVGZkNFcy01cExZNlhhTEdmWnZVVW4wQVRNd2FpUGdCZXNkT202d2h3SEZPNGMyZmhydVR0a3lUQjNUZkRYbGxnbDRMZw?oc=5	/images/anthropic-opus-hero.jpg	FRONTIER AI & SAFETY RESEARCH	2026-09-26 22:56:35	2026-09-27 22:02:35.51
122803	dawn	US jury says Apple owes record $5.7bn in patent case	San Diego: A US jury ruled that Apple owes San Diego-based Taction more than $5.7 billion for using its patented technology to power the haptic feedback in iPhones and Apple Watches. Apple said it would appeal the country’s largest such ...	https://www.dawn.com/news/2032979/us-jury-says-apple-owes-record-57bn-in-patent-case	https://i.dawn.com/thumbnail/2026/09/27090117438fd3e.webp?v=1790478571000	PAKISTAN TECH & SCIENCE	2026-09-27 03:09:31	2026-09-27 22:05:36.113
128045	brecorder	OpenAI, Anthropic CEOs called to appear at Australian AI probe	SYDNEY: The CEOs of OpenAI and Anthropic have been called to appear at an Australian Senate inquiry on AI, the head of the ​probe said on Sunday, days after the revelation that a rogue OpenAI ‌bot had hacked the country’s health-system d...	https://www.brecorder.com/news/40441440/openai-anthropic-ceos-called-to-appear-at-australian-ai-probe	https://i.brecorder.com/thumbnail/2026/09/2709470504b2152.webp?v=1790484748000	PAKISTAN FINTECH & BUSINESS	2026-09-27 04:52:28	2026-09-27 22:05:36.13
128053	propakistani	Y Mobile Launches Apple Authorized Reseller Flagship Store at Ocean Mall, Karachi, Alongside New Bahadurabad Location	Y Mobile, an Apple Authorized Reseller, today announced the grand opening of its newest flagship store at Ocean Mall, Karachi, … Read More The post Y Mobile Launches Apple Authorized Reseller Flagship Store at Ocean Mall, Karachi, Alongs...	https://propakistani.pk/2026/09/27/y-mobile-launches-apple-authorized-reseller-flagship-store-at-ocean-mall-karachi-alongside-new-bahadurabad-location/	https://propakistani.pk/wp-content/uploads/2026/09/Y-Mobile.jpg?v=1790532183000	PAKISTAN DIGITAL ECOSYSTEM	2026-09-27 18:03:03	2026-09-27 22:05:36.146
128055	propakistani	Mark Zuckerberg Loses $9 Billion	Meta CEO Mark Zuckerberg saw nearly $9 billion wiped from his estimated fortune in a single day. Zuckerberg’s estimated net … Read More The post Mark Zuckerberg Loses $9 Billion appeared first on ProPakistani .	https://propakistani.pk/2026/09/27/mark-zuckerberg-loses-9-billion/	https://propakistani.pk/wp-content/uploads/2026/09/meta-zuck-pp.png?v=1790512303000	PAKISTAN DIGITAL ECOSYSTEM	2026-09-27 12:31:43	2026-09-27 22:05:36.15
128019	anthropic	Claude Sonnet 5.5 leak claims a last minute upgrade before a Monday launch	Claude Sonnet 5.5 leak claims a last minute upgrade before a Monday launch. Real-time intelligence and verified enterprise developments reported via Startup Fortune.	https://news.google.com/rss/articles/CBMiowFBVV95cUxNMVAzUnhFY09WOU1oUDE4REd4ZXk3OHljTFZNQU9Hal9Rb2lqWExOMWFBeDlNQXhXMjBQUVgtWFQxaWc1Qld2aGZPeEMyQ2pmN3hVbkRNb1VSNGV2WEZEVU9wMkI2eDd2SEJjcURaZ2hLMS0zbzNkR3U2STExbHFiR3hyTVJRamo2S01EX3F4QmJsTVlPcHV2Vm04b2JiREhVMFU0?oc=5	/images/anthropic-opus-hero.jpg	FRONTIER AI & SAFETY RESEARCH	2026-09-27 03:30:28	2026-09-27 22:05:36.08
128059	propakistani	PlayStation Controllers Could Soon Get Tap-to-Pay Feature	Sony is exploring a new way for PlayStation users to pay for games and other digital content by simply tapping … Read More The post PlayStation Controllers Could Soon Get Tap-to-Pay Feature appeared first on ProPakistani .	https://propakistani.pk/2026/09/27/playstation-controllers-could-soon-get-tap-to-pay-feature/	https://propakistani.pk/wp-content/uploads/2026/09/sony-playstation-tap-to-pay-pp.png?v=1790507048000	PAKISTAN DIGITAL ECOSYSTEM	2026-09-27 11:04:08	2026-09-27 22:05:36.158
128033	dawn	Bill Gates joins calls for AI safeguards, including legislation	Artificial intelligence requires safeguards that go beyond self-regulation, Microsoft co-founder Bill Gates said in an interview that aired on Sunday, calling for legislation to be passed in Congress. “You need law enforcement and the po...	https://www.dawn.com/news/2033076/bill-gates-joins-calls-for-ai-safeguards-including-legislation	https://i.dawn.com/thumbnail/2026/09/272139371cd39e7.webp?v=1790529674000	PAKISTAN TECH & SCIENCE	2026-09-27 17:21:14	2026-09-27 22:05:36.105
128035	dawn	'Jujutsu Kaisen' anime actor Kenjiro Tsuda fights TikTok over AI voice cloning	High-profile Japanese anime voice actor Kenjiro Tsuda has taken TikTok to court over videos he says feature an artificial intelligence (AI) clone of his “lustrous” baritone, with a verdict due on Wednesday. The lawsuit filed by Tsuda, kn...	https://www.dawn.com/news/2033063/jujutsu-kaisen-anime-actor-kenjiro-tsuda-fights-tiktok-over-ai-voice-cloning	https://i.dawn.com/thumbnail/2026/09/27193914514639b.webp?v=1790524370000	PAKISTAN TECH & SCIENCE	2026-09-27 15:52:50	2026-09-27 22:05:36.109
128061	propakistani	Internet Fixed After Small Panic	Internet services have been fully restored across Islamabad and Rawalpindi after a fault in an optical fiber network was fixed, … Read More The post Internet Fixed After Small Panic appeared first on ProPakistani .	https://propakistani.pk/2026/09/27/internet-fixed-after-small-panic/	https://propakistani.pk/wp-content/uploads/2026/09/internet-pp-1.png?v=1790496285000	PAKISTAN DIGITAL ECOSYSTEM	2026-09-27 08:04:45	2026-09-27 22:05:36.162
128043	brecorder	Bill Gates joins calls for AI safeguards, including legislation	WASHINGTON: AI requires safeguards that go beyond self-regulation, Microsoft co-founder Bill Gates said in an interview that aired on Sunday, calling for legislation to be passed in Congress. “You need law enforcement and the politicians...	https://www.brecorder.com/news/40441466/bill-gates-joins-calls-for-ai-safeguards-including-legislation	https://i.brecorder.com/thumbnail/2026/09/2721270240349fb.webp?v=1790526452000	PAKISTAN FINTECH & BUSINESS	2026-09-27 16:27:32	2026-09-27 22:05:36.126
128057	propakistani	Pak Hajj App Gets New Features	The Ministry of Religious Affairs has introduced several new features on the Pak Hajj App to make the Hajj process … Read More The post Pak Hajj App Gets New Features appeared first on ProPakistani .	https://propakistani.pk/2026/09/27/pak-hajj-app-gets-new-features/	https://propakistani.pk/wp-content/uploads/2026/06/Pak-Hajj-App.jpg?v=1790509539000	PAKISTAN DIGITAL ECOSYSTEM	2026-09-27 11:45:39	2026-09-27 22:05:36.154
37166	apple	The new Mac mini and Mac Studio are available today	Customers can now shop for Mac mini with M6 and M5 Pro, and Mac Studio with M5 Max and M5 Ultra, at Apple Store locations, online, and in the Apple Store app.	https://www.apple.com/newsroom/2026/09/the-new-mac-mini-and-mac-studio-are-available-today/	https://www.apple.com/newsroom/images/2026/09/the-new-mac-mini-and-mac-studio-are-available-today/tile/Apple-Mac-mini-and-Mac-Studio-available-hero-lp.jpg.og.jpg?v=1790081961039	HARDWARE & SILICON	2026-09-22 12:59:21.039	2026-09-27 22:05:35.922
37192	nvidia	At AI Day Singapore, NVIDIA and Partners Showcase AI Advancements Across Southeast Asia	NVIDIA AI Day Singapore, which takes place Sept. 22-23 at the Raffles City Convention Centre, is offering attendees opportunities to explore the hands-on training, expert-led sessions and advanced tools to accelerate their work in AI and...	https://blogs.nvidia.com/blog/ai-day-singapore/	https://iprsoftwaremedia.com/219/files/202609/ac1bc65311b893072f5f82ff4d106f94/6ab339db3d63326c7a34a1b8_ai-day-singapore-key-visul-1920x1080-1-842x450/ai-day-singapore-key-visul-1920x1080-1-842x450_thmb.jpg?v=ae11ab35-3911-4034-a382-2383226adaa2	ACCELERATED COMPUTING & AI	2026-09-23 02:30:22	2026-09-27 22:05:35.991
149926	anthropic	Anthropic may release Claude Sonnet 5.5 within days	Anthropic may release Claude Sonnet 5.5 within days. Real-time intelligence and verified enterprise developments reported via TestingCatalog AI News.	https://news.google.com/rss/articles/CBMihAFBVV95cUxQZzNJRkZUdEJ2S1AzSEQ2NlVCT2JwNl9ZLU5reFVZT19CVEIxa1JLY3Fud2NaVEg4b3RYbnFJd2VIdmhGamxUSzd5WHFMTUlaVDV5VURvbUxHVDFSa215U1ZlYjRIYkdiUXpxQjNkdHNNQWhyeG12RXZzQm9ySnczYWdpdGo?oc=5	/images/anthropic-opus-hero.jpg	FRONTIER AI & SAFETY RESEARCH	2026-09-27 21:50:07	2026-09-27 22:05:36.072
\.


--
-- Data for Name: portfolio_projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.portfolio_projects (id, title, category, client, summary, stack, live_url, github_url, image_url, created_at) FROM stdin;
6	trew	CLOUD & ENTERPRISE	Global Enterprise	High-performance enterprise cloud delivery.	["Next.js", "PostgreSQL", "Docker", "Kubernetes"]	https://creedtech.com	https://github.com/creed-tech	/uploads/1789502682891-Screenshot_From_2026-09-09_00-20-50.png	2026-09-16 01:04:51.036002
4	Automated SOC 2 compliance logging & cryptographic shield	Cybersecurity & Governance	Sentinel Knox Trust • Switzerland	Continuous security telemetry and automated cryptographic vulnerability mitigation, heading direct ISO 27001 and SOC 2 Type II controls with real-time threat detection.	["HashiCorp Vault", "eBPF", "Wazuh", "Go", "AWS", "PostgreSQL"]	https://creedtech.com/contact	https://github.com/creed-tech	https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80	2026-09-16 00:55:24.903331
3	Zero-trust multi-cloud Kubernetes infrastructure & GitOps mesh	Cloud Infrastructure & DevOps	Nexen Global Logistics • Germany	Architected an enterprise container pipeline and automated GitOps mesh processing real-time telemetry from 50,000+ freight systems across Europe with multi-cloud automated failover.	["Terraform", "Kubernetes", "Istio", "ArgoCD", "Grafana", "Prometheus"]	https://creedtech.com/contact	https://github.com/creed-tech	https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80	2026-09-16 00:55:24.903331
2	Enterprise neural copilot & multi-agent document intelligence	Enterprise AI & Orchestration	Cognitive Health Analytics • United States	Autonomous multi-agent orchestration and dense vector search to automate compliance extraction across 20M+ medical unstructured diagnostic records with zero private hallucination leakage.	["Python", "PyTorch", "Ray Serve", "LangChain", "FastAPI", "Docker"]	https://creedtech.com/contact	https://github.com/creed-tech	https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80	2026-09-16 00:55:24.903331
1	Next-gen multi-region high frequency payment processing engine	Fintech & Banking	Apex Global Settlement Net • United Kingdom	Engineered ultra-low latency transaction clearing engine capable of processing 150,000 TPS with sub-12ms latency and zero transactional drift rate across distributed European and North American zones.	["Go", "Kubernetes", "CockroachDB", "Kafka", "AWS CloudTrail", "Redis"]	https://creedtech.com/contact	https://github.com/creed-tech	https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80	2026-09-16 00:55:24.903331
\.


--
-- Data for Name: security_reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.security_reports (id, reporter_name, email, category, severity, subject, description, status, created_at) FROM stdin;
1	Security Researcher	researcher@defense.gov	Vulnerability Disclosure	High	Potential SSRF in webhook handler	Observed unvalidated URL redirect in webhook callback endpoint.	NEW	Sep 13, 2026 at 03:30 AM
2	tariq ali	mtariqali200380@gmail.com	Vulnerability Disclosure	High	ass	aasdd	NEW	Sep 13, 2026 at 03:38 AM
3	Bug Hunter	hunter@security.io	Security Complaint	Medium	Vulnerability Disclosure	Testing public vulnerability disclosure intake.	NEW	Sep 24, 2026
4	Regression Sec	sec@test.com	Security Complaint	Medium	Audit Test	Test	NEW	Sep 24, 2026
5	External Sec	extsec@test.com	Security Complaint	Medium	Ext Test	Ext Test	NEW	Sep 24, 2026
\.


--
-- Data for Name: seo_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.seo_settings (page_key, title, description, keywords, og_image, canonical_url, no_index, no_follow, meta_tags, updated_at) FROM stdin;
global	CREED TECH | Enterprise IT Intelligence & Custom Software Engineering	Enterprise IT solutions, custom software engineering, AI workflow orchestration, cloud modernization, and real-time intelligence for high-growth enterprises.	Enterprise IT Solutions, Custom Software Engineering, Cloud Modernization, AI Workflow Automation, Cybersecurity	/images/hero-services-web-q90.webp	https://creed-tech.com	f	f	{"gaMeasurementId": "", "bingVerification": "", "googleVerification": ""}	2026-09-28 02:09:31.975177+05
home	CREED TECH | Enterprise IT Intelligence & Custom Software Engineering	Enterprise IT solutions, custom software engineering, AI workflow orchestration, and resilient cloud infrastructure.	Enterprise Software, Cloud Modernization, AI Solutions, Custom Engineering	/images/hero-services-web-q90.webp	https://creed-tech.com	f	f	{}	2026-09-28 02:09:31.978486+05
portfolio	Enterprise Case Studies & Delivered Systems | Creed Tech	Explore real-world software architecture deployments, high-concurrency systems, and digital transformations delivered by Creed Tech.	Case Studies, Enterprise Software Deployments, Cloud Infrastructure, Architecture	/images/hero-services-web-q90.webp	https://creed-tech.com/portfolio	f	f	{}	2026-09-28 02:09:31.984028+05
knowledge_center	Enterprise Knowledge Center & Tech Intelligence | Creed Tech	Curated technical research, engineering blueprints, system architecture patterns, and enterprise technology analysis from Creed Tech.	Tech Intelligence, System Architecture, Engineering Blueprints, Knowledge Center	/images/hero-services-web-q90.webp	https://creed-tech.com/knowledge-center	f	f	{}	2026-09-28 02:09:31.986473+05
about	About Creed Tech | Engineering Principles & Leadership	Learn about Creed Tech's engineering principles, distributed architecture hubs, and commitment to sovereign enterprise software.	About Creed Tech, Leadership, Engineering Principles, Enterprise Software	/images/hero-services-web-q90.webp	https://creed-tech.com/about	f	f	{}	2026-09-28 02:09:31.98901+05
contact	Contact Solutions Architecture & Engineering | Creed Tech	Schedule a technical consultation with Creed Tech's principal solutions architects. Direct engineering scoping and zero-obligation NDA protection.	Contact Creed Tech, Technical Consultation, Solutions Architecture, Enterprise Inquiries	/images/hero-services-web-q90.webp	https://creed-tech.com/contact	f	f	{}	2026-09-28 02:09:31.991878+05
careers	Careers & Engineering Pods | Creed Tech	Build digital infrastructure that endures. We are an autonomous collective of principal systems architects, AI engineers, and design artisans.	Careers, Engineering Pods, Systems Architects, Software Jobs	/images/hero-services-web-q90.webp	https://creed-tech.com/careers	f	f	{}	2026-09-28 02:09:31.995277+05
services	Enterprise Services & Engineering Solutions | Creed Tech	End-to-end cloud infrastructure, bespoke software engineering, AI automation, and cybersecurity engineered for unprecedented enterprise scale.	Cloud Architecture, Software Engineering, AI Automation, Enterprise Cybersecurity	/images/hero-services-web-q90.webp	https://creed-tech.com/services	f	f	{}	2026-09-28 02:24:09.649741+05
articles	Technical Articles & Deep Engineering Blueprints | Creed Tech	Explore peer-reviewed systems architecture blueprints, hardware benchmark teardowns, high-concurrency patterns, and engineering insights from Creed Tech.	Technical Articles, Engineering Blueprints, Hardware Benchmarks, Architecture Patterns, Software Engineering	/images/hero-services-web-q90.webp	https://creed-tech.com/knowledge-center#articles	f	f	{}	2026-09-28 03:00:03.489213+05
security	Trust, Engineered Into Every Layer | Enterprise Security Center	Security at Creed Tech is built into our infrastructure, development lifecycle, and governance. Explore the architecture, controls, and audited standards behind every engagement.	Enterprise Security, Information Security, Secure Software Lifecycle, Data Governance, Cloud Architecture	/images/hero-services-web-q90.webp	https://creed-tech.com/security	f	f	{}	2026-09-28 03:00:03.489213+05
security_soc_2	AICPA SOC 2 Type II Security Controls | Creed Tech	The American Institute of CPAs benchmark for SaaS security. Creed Tech engineers systems aligned with continuous operational controls across Security, Availability, and Confidentiality.	SOC 2 Type II, AICPA Compliance, Enterprise SaaS Security, Operational Controls, Audit Evidence	/images/hero-services-web-q90.webp	https://creed-tech.com/security-soc-2	f	f	{}	2026-09-28 03:00:03.489213+05
security_iso_27001	ISO/IEC 27001:2022 ISMS Architecture | Creed Tech Security	Explore our 93-control Annex A implementation, 4-tier policy hierarchy, and client code protection models under the ISO/IEC 27001 standard.	ISO 27001, Information Security Management System, ISMS, Annex A Controls, Security Certification	/images/hero-services-web-q90.webp	https://creed-tech.com/security-iso-27001	f	f	{}	2026-09-28 03:00:03.489213+05
security_pci_dss	PCI-DSS v4.0 Payment Architecture | Creed Tech	Creed Tech architects client-side tokenization flows that isolate cardholder data and streamline PCI assessment scope across financial software applications.	PCI DSS v4.0, Payment Card Security, Tokenization, FinTech Architecture, Secure Payment Gateways	/images/hero-services-web-q90.webp	https://creed-tech.com/security-pci-dss	f	f	{}	2026-09-28 03:00:03.489213+05
security_gdpr	EU GDPR Regulation (EU) 2016/679 Privacy Architecture | Creed Tech	Enacted by the European Parliament, the GDPR mandates sovereign privacy by design. Creed Tech provides structured Article 28 DPA templates and European sovereign cloud infrastructure.	GDPR Compliance, EU Data Privacy, Sovereign Cloud, Data Processing Agreement, Article 28 DPA	/images/hero-services-web-q90.webp	https://creed-tech.com/security-gdpr	f	f	{}	2026-09-28 03:00:03.489213+05
privacy_policy	Privacy Policy | Creed Tech	Transparent principles governing how Creed Tech respects, processes, and secures information submitted through our website and engineering communication channels.	Privacy Policy, Data Protection, User Privacy, Information Security, Creed Tech	/images/hero-services-web-q90.webp	https://creed-tech.com/privacy-policy	f	f	{}	2026-09-28 03:00:03.489213+05
terms	Terms & Conditions | Creed Tech	Please read these Terms and Conditions carefully before using Creed Tech's website, platforms, and online communication channels.	Terms of Service, Terms and Conditions, Legal Agreement, Usage Policy, Creed Tech	/images/hero-services-web-q90.webp	https://creed-tech.com/terms	f	f	{}	2026-09-28 03:00:03.489213+05
\.


--
-- Data for Name: subscribers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscribers (id, email, source, status, created_at) FROM stdin;
1	cto@enterprise-cloud.de	Global Footer	ACTIVE	2026-09-08 04:31:50.825256
2	lead.arch@fintech-ny.com	Knowledge Center	ACTIVE	2026-09-08 04:31:50.825256
3	vp.eng@global-logistics.sg	Services Page	ACTIVE	2026-09-08 04:31:50.825256
4	security.officer@medtech-eu.ch	Security Trust Hub	ACTIVE	2026-09-08 04:31:50.825256
16	public_subscriber@creed-test.com	Website Enterprise Insights Newsletter	ACTIVE	2026-09-22 19:03:13.90598
17	desktop_visitor_1790086068314@enterprise-client.org	Website Enterprise Insights Newsletter	ACTIVE	2026-09-22 19:07:48.362392
18	opt_test_1790086500940@client.org	Website Enterprise Insights Newsletter	ACTIVE	2026-09-22 19:15:01.014239
19	regression_final_1790086859953@creed-tech.com	Website Enterprise Insights Newsletter	ACTIVE	2026-09-22 19:20:59.975586
\.


--
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.testimonials (id, client_name, role, company, avatar, rating, quote, verified, created_at) FROM stdin;
1	Dr. Elena Rostova	VP of Computational Research	Neural BioTech Labs (Madrid)	https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop	5	Creed Tech delivered a private sovereign AI pipeline fine-tuned on 40k internal research documents. Zero data leakage, 10x faster query cycle.	t	2026-09-08 04:31:50.803384
2	Alexander Vance	Chief Technology Officer	FinTech Global Group (Frankfurt)	https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop	5	Our transaction settlement engine handles 18,000 req/sec at sub-5ms latency since Creed Tech migrated our legacy cluster to Rust microservices.	t	2026-09-08 04:31:50.803384
3	Michael Sterling	Managing Director	HyperScale Systems (San Francisco)	https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop	5	The dedicated engineering pod assigned through Vision To Life delivered our MVP in 8 weeks flat. Extremely rare engineering standard.	t	2026-09-08 04:31:50.803384
4	tariq	ceo	germany	https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop	3	this is a comapny that i have found	t	2026-09-08 23:21:47.110591
5	assd	aasdd	aaasddd		4	aadf	t	2026-09-08 23:34:50.962212
6	saba	admin	pak.lahore		2	aasdd	f	2026-09-15 07:24:57.893574
7	marium	kol	pak.lahore	/uploads/1789439443936-Screenshot_From_2026-09-09_02-17-06.png	3	aaddaa	f	2026-09-15 07:30:44.082518
8	tariq ali	admin	Global		4	AS	f	2026-09-19 21:36:53.55842
9	Sarah Jenkins	VP Engineering	Fintech Enterprise		5	Exceptional architecture delivery and zero downtime migration!	f	2026-09-22 19:03:20.821914
10	Michael Chang	CTO, Horizon FinTech	Global		5	Creed Tech delivered our enterprise cloud cluster with zero downtime and outstanding velocity.	f	2026-09-22 19:07:53.660556
11	Enterprise Reviewer	Enterprise Client	Global Enterprise		5	Outstanding performance after settings optimization.	f	2026-09-22 19:15:01.258782
12	Regression Reviewer	Enterprise Leader	Global Enterprise		5	Seamless end-to-end performance and reliable engineering.	f	2026-09-22 19:21:00.110386
\.


--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.videos (id, title, category, duration, embed_url, thumbnail_url, views, created_at) FROM stdin;
1	What Are Social Advertising Algorithms & Conversion Tracking in 2026?	Digital Ads & Scale	14:20	https://www.youtube.com/watch?v=dQw4w9WgXcQ	https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop	1250	2026-09-08 04:31:50.791836
2	Autonomous Agent Orchestration in Kubernetes Microservices	Cloud Engineering	28:45	https://www.youtube.com/watch?v=dQw4w9WgXcQ	https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop	3420	2026-09-08 04:31:50.791836
3	Next-Gen AI Hardware & Memory Bandwidth Benchmarks (Snapdragon vs M4 vs H100)	Hardware & AI	19:10	https://www.youtube.com/watch?v=dQw4w9WgXcQ	https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop	5100	2026-09-08 04:31:50.791836
\.


--
-- Data for Name: website_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.website_settings (key, value, updated_at) FROM stdin;
global_config	{"footerP1": "Pioneering high-assurance cognitive cloud infrastructure for Fortune 500 enterprises.", "siteName": "Creed Tech", "statHubs": "6", "statUptime": "99.99%", "aboutVision": "A world where mission-critical systems operate with zero downtime, cognitive workloads execute instantaneously at edge and cloud, and engineering excellence is the universal standard.", "heroCta1Url": "get-started", "heroCta2Url": "services", "siteTagline": "Enterprise Systems & AI Solutions", "socialLinks": [{"id": "1", "url": "https://facebook.com/creedtechnology", "platform": "Facebook"}, {"id": "2", "url": "https://instagram.com/creed.technologiess", "platform": "Instagram"}, {"id": "3", "url": "https://linkedin.com/company/creedtech", "platform": "LinkedIn"}, {"id": "4", "url": "https://pinterest.com/creedtech", "platform": "Pinterest"}, {"id": "6", "url": "https://github.com/creed-tech", "platform": "GitHub"}, {"id": "1788912468010", "url": "https://x.com/CreedtechHq", "platform": "X (Twitter)"}], "statSystems": "450+", "aboutMission": "To engineer uncompromising digital infrastructure and autonomous intelligence engines that give ambitious enterprises sovereign technological advantage.", "contactEmail": "info@creed-tech.com", "contactPhone": "+92 321 9204488", "headerCtaUrl": "/contact", "heroCta1Text": "Get Started", "heroCta2Text": "Explore Services", "heroHeadline": "Engineering Scalable Enterprise Systems & High-Velocity AI Products", "homeServices": [{"id": "service-1", "title": "Software Development", "iconKey": "code", "linkUrl": "/services#software-development", "linkText": "Learn more", "description": "Custom web and mobile applications engineered for reliability, built with modern maintainable architecture."}, {"id": "service-2", "title": "UI/UX Design", "iconKey": "design", "linkUrl": "/services#ui-ux", "linkText": "Learn more", "description": "Interfaces designed around real user workflows, not just visual polish. Streamlined, accessible, and high-converting."}, {"id": "service-3", "title": "Mobile Applications", "iconKey": "mobile", "linkUrl": "/services#mobile-applications", "linkText": "Learn more", "description": "High-performance iOS and Android applications crafted for native speed and intuitive mobile gestures."}, {"id": "service-4", "title": "Cloud Infrastructure", "iconKey": "cloud", "linkUrl": "/services#cloud-infrastructure", "linkText": "Learn more", "description": "Provisioning, CI/CD automated deployment, and hardening for infrastructure that scales with traffic."}, {"id": "service-5", "title": "Database Management", "iconKey": "database", "linkUrl": "/services#database-management", "linkText": "Learn more", "description": "Schema design, migrations, and ongoing management for high-concurrency relational and NoSQL databases."}, {"id": "service-6", "title": "Cybersecurity & QA", "iconKey": "security", "linkUrl": "/services#cybersecurity", "linkText": "Learn more", "description": "Security audits, automated test suites, and compliance checks to keep your systems protected."}, {"id": "service-7", "title": "Artificial Intelligence (AI)", "iconKey": "ai", "linkUrl": "/services#ai", "linkText": "Learn more", "description": "Private on-premise LLM fine-tuning, dense vector embeddings, and autonomous AI agent orchestration."}, {"id": "service-8", "title": "Digital Marketing & Branding", "iconKey": "marketing", "linkUrl": "/services#marketing", "linkText": "Learn more", "description": "Strategic tech product positioning, high-conversion CRO landing pages, and enterprise search visibility."}], "partnerLogos": [{"id": "partner-1", "name": "Clutch", "logoUrl": "/images/partners/clutch.webp", "websiteUrl": "https://clutch.co"}, {"id": "partner-2", "name": "Google", "logoUrl": "/images/partners/google.webp", "websiteUrl": "https://www.google.com"}, {"id": "partner-3", "name": "The Manifest", "logoUrl": "/images/partners/the-manifest.webp", "websiteUrl": "https://themanifest.com"}, {"id": "partner-4", "name": "Shopify", "logoUrl": "/images/partners/shopify.webp", "websiteUrl": "https://www.shopify.com"}, {"id": "partner-5", "name": "Trustpilot", "logoUrl": "/images/partners/trustpilot.webp", "websiteUrl": "https://www.trustpilot.com"}], "socialGithub": "https://github.com/creed-tech", "aboutSettings": {"hubs": [{"id": "hub-01", "city": "Frankfurt", "address": "Taunusanlage 8, Financial Centre, Frankfurt", "country": "Germany", "statusTag": "Active Regional Engineering Pod", "coverImageUrl": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80", "specialization": "European Cloud Infrastructure & Cyber Defense"}, {"id": "hub-02", "city": "Madrid", "address": "Paseo de la Castellana 95, Madrid", "country": "Spain", "statusTag": "Active Regional Engineering Pod", "coverImageUrl": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&auto=format&fit=crop&q=80", "specialization": "Mobile Engineering & Digital Innovation Lab"}, {"id": "hub-03", "city": "San Francisco", "address": "500 Howard Street, SoMa Tech District, San Francisco", "country": "United States", "statusTag": "Active Regional Engineering Pod", "coverImageUrl": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&auto=format&fit=crop&q=80", "specialization": "AI Research, Neural Systems & Cloud Labs"}], "leadership": [{"id": "leader-01", "bio": "Founded Creed Tech in 2023 with the conviction that next-generation enterprise software should be built with mathematical precision, neural scalability, and uncompromising craftsmanship.", "name": "Alexander Wright", "role": "Founder & Chief Executive Officer", "quote": "We don't build software to sell and walk away. We build digital infrastructure that companies run their entire future on.", "ctaUrl": "/contact", "ctaText": "Connect with Alexander →", "badgeTag": "Senior Systems Architect", "portraitUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"}, {"id": "leader-02", "bio": "Directs our research in private enterprise LLMs and distributed vector streaming. Champion of vendor-neutral open cloud architecture.", "name": "Dr. Elena Rostova", "role": "Chief Technology Officer", "quote": "The best engineering is invisible—it performs flawlessly under maximum load without ever asking for praise.", "ctaUrl": "/contact", "ctaText": "Connect with Elena →", "badgeTag": "Ph.D. Neural Computing", "portraitUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80"}, {"id": "leader-03", "bio": "Oversees zero-trust architectures, sovereign data privacy, and SOC 2 Type II governance across all client engagements.", "name": "Marcus Vance", "role": "Head of Global Security & Governance", "quote": "In high-stakes systems, trust is not a promise; it is mathematically verified cryptography.", "ctaUrl": "/contact", "ctaText": "Connect with Marcus →", "badgeTag": "Ex-Defense Cryptographer", "portraitUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80"}, {"id": "leader-04", "bio": "Directs our dedicated senior engineering pods across 3 global centers, guaranteeing milestone velocity, zero-defect releases, and continuous client alignment.", "name": "Sarah Jenkins", "role": "VP of Global Client Engineering", "quote": "Engineering maturity is not just about writing code; it is about delivering business outcomes with absolute predictability.", "ctaUrl": "/contact", "ctaText": "Connect with Sarah →", "badgeTag": "14+ Yrs Agile Delivery", "portraitUrl": "/uploads/1789516365669-Screenshot_From_2026-09-09_00-10-09.png"}], "reviewLinks": {"clutchUrl": "https://clutch.co", "platforms": [{"id": "the-manifest", "url": "https://themanifest.com", "name": "The Manifest", "badge": "B2B RESEARCH", "enabled": true}, {"id": "shopify-partners", "url": "https://www.shopify.com/partners", "name": "Shopify Partners", "badge": "ECOSYSTEM", "enabled": true}, {"id": "trustpilot", "url": "https://www.trustpilot.com", "name": "Trustpilot", "badge": "CUSTOMER TRUST", "enabled": true}, {"id": "clutch", "url": "https://clutch.co", "name": "Clutch", "badge": "GLOBAL DIRECTORY", "enabled": true}, {"id": "google-reviews", "url": "https://www.google.com", "name": "Google Reviews", "badge": "SEARCH & MAPS", "enabled": true}], "shopifyUrl": "https://www.shopify.com/partners", "sectionTitle": "Reviewed & Recommended On", "trustpilotUrl": "https://www.trustpilot.com", "theManifestUrl": "https://themanifest.com", "googleReviewsUrl": "https://www.google.com"}, "hubsBadgeTag": "GLOBAL REACH & CONTINUOUS COVERAGE", "hubsHeadline": "Three Specialized Global Engineering Centers", "hubsDescription": "Operating across multiple time zones to deliver seamless 24/7 technical continuity and deep regional domain expertise.", "leadershipBadgeTag": "THE PEOPLE BEHIND THE CODE", "leadershipHeadline": "Executive Leadership & Technical Custodians", "leadershipDescription": "Meet the founders and principal architects who guide our engineering vision and mentor our senior pods across 3 global centers."}, "announcements": [{"id": "1", "text": "Designing practical and intuitive user experiences for web and mobile.", "badge": "LIVE", "linkUrl": "/services", "linkText": "Explore Services"}, {"id": "2", "text": "Creed Quantum Cloud Engine 4.0 is now live across all deployment nodes.", "badge": "UPDATE", "linkUrl": "/services", "linkText": "View Changelog"}, {"id": "3", "text": "Accelerating Enterprise Systems & High-Velocity AI Products globally.", "badge": "FEATURE", "linkUrl": "/contact", "linkText": "Get Started"}], "copyrightText": "© 2026 Creed Tech. All rights reserved.", "headerCtaText": "Get Started", "headerLogoUrl": "/images/logo.webp", "headerShowCta": true, "officeAddress": "Office # 02, Main Shopping\\nCenter Sheikhupura.", "socialTwitter": "https://x.com/CreedtechHq", "statEngineers": "120+", "headerNavLinks": [{"id": "nav-1", "url": "/", "label": "Home", "enabled": true}, {"id": "nav-2", "url": "/services", "label": "Services", "enabled": true}, {"id": "nav-3", "url": "/knowledge-center", "label": "Knowledge Center", "enabled": true}, {"id": "nav-4", "url": "/portfolio", "label": "Portfolio", "enabled": true}, {"id": "nav-5", "url": "/about", "label": "About", "enabled": true}, {"id": "nav-6", "url": "/contact", "label": "Contact", "enabled": true}], "socialFacebook": "https://facebook.com/creedtechnology", "socialLinkedin": "https://linkedin.com/company/creedtech", "contactHeroDesc": "Connect with our technical architects and mission-critical deployment leads worldwide.", "contactSettings": {"faqs": [{"id": "faq-1", "answer": "Following our initial technical scoping session and mutual NDA execution, our specialized pods can integrate with your repository and sprint ceremonies within 3 to 7 business days.", "question": "How quickly can your senior engineering pods be deployed?"}, {"id": "faq-2", "answer": "All intellectual property, proprietary algorithms, and code artifacts belong 100% to your organization from day one. We sign bilateral enterprise NDAs and enforce SOC 2 Type II and GDPR-compliant sovereign sandboxes.", "question": "How is our intellectual property (IP) and data privacy protected?"}, {"id": "faq-3", "answer": "We provide two core engagement models: Dedicated Engineering Pods (integrated full-stack teams with fixed monthly sprints) and Milestone-Based Fixed-Scope Projects with guaranteed deliverables and deterministic timelines.", "question": "What engagement models do you offer for projects?"}, {"id": "faq-4", "answer": "With specialized centers in Germany (Frankfurt), Spain (Madrid), and the USA (San Francisco), we provide 24/7 follow-the-sun coverage with seamless real-time overlap across US East/West, UK, and European business hours.", "question": "Which time zones do your global engineering centers support?"}], "heroBadge": "DIRECT ARCHITECT ACCESS • 4-HOUR GUARANTEED SLA", "hubsTitle": "Three Global Engineering Hubs", "globalHubs": [{"id": "hub-1", "address": "Taunusanlage 8, Financial Centre, Frankfurt", "timezone": "CET (UTC+1)", "countryCity": "🇩🇪 Frankfurt, Germany"}, {"id": "hub-2", "address": "Paseo de la Castellana 95, Madrid", "timezone": "CET (UTC+1)", "countryCity": "🇪🇸 Madrid, Spain"}], "stepsBadge": "EXECUTION CERTAINTY", "stepsTitle": "What Happens After You Reach Out?", "heroHeadline": "Let's Build Something Enduring Together", "metric1Label": "Average Response", "metric1Value": "< 2.4 Hours", "metric2Label": "NDA & IP Protection", "metric2Value": "Signed Day 1", "metric3Label": "Verified Ratings", "metric3Value": "5.0 Clutch & Google", "rfpButtonText": "Email RFP / Architecture Docs", "discoveryBadge": "⚡ INSTANT DISCOVERY", "discoveryTitle": "Need a Direct Architectural Call?", "rfpBannerTitle": "Prefer direct enterprise correspondence?", "rfpTargetEmail": "projects@creed-tech.com", "telemetryPhone": "+1 (415) 890-4820", "heroDescription": "Connect directly with senior systems architects and technical leaders. Whether you need an end-to-end enterprise platform, sovereign AI pipelines, or dedicated engineering pods — we are ready.", "onboardingSteps": [{"id": "step-1", "number": "01", "headline": "Architectural Review", "explanation": "Our systems architects evaluate your scope, stack constraints, and timeline feasibility within 4 hours.", "timelineSla": "Within 4 Hours"}, {"id": "step-2", "number": "02", "headline": "NDA & Security Clearance", "explanation": "We sign enterprise bilateral NDAs and establish sovereign data handling protocols to protect your IP.", "timelineSla": "Day 1 Priority"}, {"id": "step-3", "number": "03", "headline": "Technical Discovery Call", "explanation": "A 45-minute deep-dive with your engineering leads to align on API schemas, sprint cadence, and architecture.", "timelineSla": "Day 2 - 3"}, {"id": "step-4", "number": "04", "headline": "Sprint Deployment", "explanation": "Dedicated pods integrate with your Git workflows, Slack/Jira channels, and commence milestone sprints.", "timelineSla": "Ready within 3-7 Days"}], "whatsAppDisplay": "+1 (415) 890-4820", "whatsAppLinkUrl": "https://wa.me/14158904820", "stepsDescription": "Our deterministic 4-stage onboarding model eliminates ambiguity and ensures rapid engineering ramp-up.", "discoveryDescription": "Skip the form and schedule a 30-minute discovery call directly with one of our Principal Systems Architects.", "rfpBannerDescription": "Send your RFP, architecture specs, or tender documents directly to our senior leadership inbox at projects@creed-tech.com.", "discoveryBookingEmail": "contact@creed-tech.com", "officialInquiriesEmail": "contact@creed-tech.com"}, "headerLogoWidth": 130, "heroSubheadline": "We design, architect, and deploy production-grade software solutions, high-throughput cloud platforms, and frontier AI systems for ambitious enterprises globally.", "socialInstagram": "https://instagram.com/creed.technologiess", "socialPinterest": "https://pinterest.com/creedtech", "announcementText": "Designing practical and intuitive user experiences for web and mobile.", "contactHeroBadge": "GLOBAL ENGAGEMENT", "contactHeroTitle": "Initiate High-Impact Collaboration", "headerLogoHeight": 36, "servicesExplorer": {"services": [{"id": "software-development", "num": "01", "name": "Software Development", "intro": "We design and develop secure scalable software solutions tailored to real business requirements. Our approach combines thoughtful architecture clean development practices and long-term maintainability to create software that remains dependable as your operations evolve.", "ctaDesc": "Share your requirements with our team and explore a practical development approach for your business.", "tagline": "Reliable Software Built Around Your Business", "ctaBtnUrl": "/contact", "techStack": "JAVA, C#, PYTHON, C++, TYPESCRIPT, .NET, SPRING BOOT, GIT", "ctaBtnText": "Start Your Project", "ctaHeading": "Have a Software Project in Mind?", "overviewCards": [{"desc": "Software designed around your workflows operational needs and long-term objectives.", "badge": "CUSTOM", "title": "Business-Focused Solutions"}, {"desc": "Authentication data protection access control and secure coding practices built into every development stage.", "badge": "SECURE", "title": "Secure by Design"}, {"desc": "Flexible systems structured to support new features users integrations and changing business demands.", "badge": "SCALABLE", "title": "Growth-Ready Architecture"}, {"desc": "Well-structured documented code that remains easier to test improve and support over time.", "badge": "MAINTAINABLE", "title": "Clean and Sustainable Code"}], "techEcosystemTitle": "Tech Ecosystem", "techEcosystemSubtitle": "Technologies and platforms used for Software Development solutions."}, {"id": "ui-ux-design", "num": "02", "name": "UI/UX Design", "intro": "We create clean, intuitive, and conversion-focused user interfaces and user experiences grounded in real human behavior. From interactive design systems to high-fidelity prototypes, every screen is crafted for frictionless engagement and visual clarity.", "ctaDesc": "Let our product design team create prototypes, wireframes, and design systems that users love.", "tagline": "Clear and User-Centered Digital Experiences", "ctaBtnUrl": "/contact", "techStack": "FIGMA, FIGJAM, ADOBE ILLUSTRATOR, ADOBE PHOTOSHOP, FRAMER, MAZE, MIRO, ZEPLIN", "ctaBtnText": "Start Your Project", "ctaHeading": "Need an Intuitive Product Design?", "overviewCards": [{"desc": "User journeys mapped to eliminate cognitive friction and enhance task completion rates.", "badge": "INTUITIVE", "title": "Frictionless UX Workflows"}, {"desc": "Modular design tokens and atomic components engineered for consistency across web and mobile.", "badge": "SYSTEMS", "title": "Scalable Design Systems"}, {"desc": "Interactive prototypes validated against user testing, task analysis, and accessibility standards.", "badge": "RESEARCH", "title": "Evidence-Based Prototyping"}, {"desc": "Inclusive color palettes, readable typography, and keyboard navigation baked into all layouts.", "badge": "ACCESSIBILITY", "title": "WCAG 2.1 AA Compliance"}], "techEcosystemTitle": "Tech Ecosystem", "techEcosystemSubtitle": "Technologies and platforms used for UI/UX Design solutions."}, {"id": "mobile-application", "num": "03", "name": "Mobile Application", "intro": "We build fluid, performant native and cross-platform mobile apps for iOS and Android. Engineered for smooth frame rates, offline-first reliability, and seamless API integrations.", "ctaDesc": "Consult with our mobile engineers to build iOS and Android applications with top-tier performance.", "tagline": "Reliable Mobile Experiences for Modern Users", "ctaBtnUrl": "/contact", "techStack": "SWIFT, SWIFTUI, KOTLIN, JETPACK COMPOSE, DART, FLUTTER, REACT NATIVE", "ctaBtnText": "Start Your Project", "ctaHeading": "Ready to Build Your Mobile App?", "overviewCards": [{"desc": "Accelerate time-to-market with React Native and Flutter without compromising native speed.", "badge": "CROSS-PLATFORM", "title": "Single Codebase Efficiency"}, {"desc": "Local data persistence and background sync ensuring continuous app usability anywhere.", "badge": "OFFLINE", "title": "Offline-First Synchronization"}, {"desc": "Biometric authentication and encrypted local storage protecting sensitive client credentials.", "badge": "SECURITY", "title": "Hardware Keystore & Biometrics"}, {"desc": "Optimized memory footprint, smooth animations, and rapid cold-start launch times.", "badge": "PERFORMANCE", "title": "60 FPS Fluid Interface"}], "techEcosystemTitle": "Tech Ecosystem", "techEcosystemSubtitle": "Technologies and platforms used for Mobile Application solutions."}, {"id": "cloud-infrastructure", "num": "04", "name": "Cloud Infrastructure", "intro": "We architect robust, secure, and auto-scaling cloud architectures on AWS, Azure, and Google Cloud. Utilizing Infrastructure as Code (IaC), zero-trust security, and continuous deployment pipelines.", "ctaDesc": "Architect high-availability Kubernetes clusters and automated CI/CD deployment pipelines.", "tagline": "Secure and Scalable Cloud Foundations", "ctaBtnUrl": "/contact", "techStack": "AMAZON WEB SERVICES, MICROSOFT AZURE, GOOGLE CLOUD, DOCKER, KUBERNETES, TERRAFORM, GITHUB ACTIONS, PROMETHEUS", "ctaBtnText": "Start Your Project", "ctaHeading": "Scaling Cloud Infrastructure?", "overviewCards": [{"desc": "Terraform and automated declarative configuration for reproducible multi-region deployments.", "badge": "AUTOMATION", "title": "Infrastructure as Code"}, {"desc": "High-density microservices orchestration with automated zero-downtime rolling updates.", "badge": "CONTAINERS", "title": "Kubernetes Orchestration"}, {"desc": "Prometheus metrics, Grafana dashboards, and centralized log alerting for 99.99% uptime.", "badge": "OBSERVABILITY", "title": "Full-Stack Telemetry"}, {"desc": "VPC peering, least-privilege IAM policies, and encrypted data-at-rest across all buckets.", "badge": "SECURITY", "title": "Zero-Trust Cloud Network"}], "techEcosystemTitle": "Tech Ecosystem", "techEcosystemSubtitle": "Technologies and platforms used for Cloud Infrastructure solutions."}, {"id": "database-management", "num": "05", "name": "Database Management", "intro": "We design high-throughput relational and NoSQL database clusters optimized for sub-millisecond query execution, automated replication, failover, and bulletproof backups.", "ctaDesc": "Scale your PostgreSQL, MySQL, and distributed cache clusters for heavy enterprise concurrency.", "tagline": "Reliable Data Systems for Business Applications", "ctaBtnUrl": "/contact", "techStack": "POSTGRESQL, MYSQL, MICROSOFT SQL SERVER, ORACLE DATABASE, MONGODB, REDIS, MARIADB, SQLITE", "ctaBtnText": "Start Your Project", "ctaHeading": "Optimizing Your Data Architecture?", "overviewCards": [{"desc": "Execution plan analysis, index tuning, and connection pooling for maximum read/write speeds.", "badge": "PERFORMANCE", "title": "Query & Index Optimization"}, {"desc": "Active-passive read replicas and automated failover guarantees continuous data availability.", "badge": "REPLICATION", "title": "High-Availability Clustering"}, {"desc": "Sub-millisecond data retrieval and session caching reducing primary database load by up to 80%.", "badge": "CACHING", "title": "In-Memory Redis Layer"}, {"desc": "Encrypted snapshot backups and continuous WAL archiving ensuring zero data loss SLAs.", "badge": "BACKUPS", "title": "Automated Point-in-Time Recovery"}], "techEcosystemTitle": "Tech Ecosystem", "techEcosystemSubtitle": "Technologies and platforms used for Database Management solutions."}, {"id": "web-development", "num": "06", "name": "Web Development", "intro": "We engineer high-performance web platforms using modern Next.js, React, and serverless architectures. Built for rapid Core Web Vitals, enterprise SEO, and intuitive content administration.", "ctaDesc": "Launch full-stack web applications engineered for speed, SEO, and seamless user conversions.", "tagline": "Modern Websites Built for Real Business Needs", "ctaBtnUrl": "/contact", "techStack": "HTML5, CSS3, JAVASCRIPT, TYPESCRIPT, REACT, NEXT.JS, NODE.JS, WORDPRESS", "ctaBtnText": "Start Your Project", "ctaHeading": "Need a High-Performance Web Platform?", "overviewCards": [{"desc": "Next.js server-side rendering and static edge optimization delivering sub-second page loads.", "badge": "SPEED", "title": "Instant Server Rendering"}, {"desc": "Pixel-perfect interfaces optimized across ultra-wide desktops, tablets, and smartphones.", "badge": "RESPONSIVE", "title": "Adaptive Mobile-First UI"}, {"desc": "Automated schema markup, metadata tags, and semantic HTML for superior search engine rankings.", "badge": "SEO", "title": "Technical SEO Foundation"}, {"desc": "Clean component hierarchy and typed APIs that empower rapid feature iterations over time.", "badge": "SCALABLE", "title": "Modular Component System"}], "techEcosystemTitle": "Tech Ecosystem", "techEcosystemSubtitle": "Technologies and platforms used for Web Development solutions."}, {"id": "ai-automation", "num": "07", "name": "AI & Automation", "intro": "We integrate state-of-the-art Large Language Models (LLMs), autonomous agents, and workflow automations directly into existing ERP and CRM systems to streamline operational bottlenecks.", "ctaDesc": "Deploy custom AI agents, document intelligence, and automated workflow pipelines in your operations.", "tagline": "Practical Intelligence for Everyday Business Workflows", "ctaBtnUrl": "/contact", "techStack": "OPENAI, GOOGLE GEMINI, ANTHROPIC CLAUDE, LANGCHAIN, HUGGING FACE, N8N, MICROSOFT POWER AUTOMATE, PYTHON", "ctaBtnText": "Start Your Project", "ctaHeading": "Ready to Automate with AI?", "overviewCards": [{"desc": "Multi-step AI agents that process complex data, summarize documents, and trigger API tasks.", "badge": "AGENTS", "title": "Autonomous Agent Workflows"}, {"desc": "Vector search and Retrieval-Augmented Generation ground AI responses strictly in company data.", "badge": "RAG", "title": "Enterprise Knowledge Retrieval"}, {"desc": "Connect n8n, Power Automate, and custom webhooks to eliminate repetitive manual entry.", "badge": "AUTOMATION", "title": "No-Code & Low-Code Pipelines"}, {"desc": "Enterprise data isolation and sovereign API integrations with strict confidentiality guards.", "badge": "PRIVACY", "title": "Private & Compliant Models"}], "techEcosystemTitle": "Tech Ecosystem", "techEcosystemSubtitle": "Technologies and platforms used for AI & Automation solutions."}, {"id": "digital-growth", "num": "08", "name": "Digital Growth", "intro": "We combine data-driven conversion rate optimization, technical search engine optimization, and multi-channel paid acquisition to sustainably scale qualified inbound customer leads.", "ctaDesc": "Formulate a data-driven growth strategy combining technical SEO, analytics, and targeted acquisition.", "tagline": "Connected Strategies for Sustainable Online Growth", "ctaBtnUrl": "/contact", "techStack": "GOOGLE ANALYTICS 4, GOOGLE SEARCH CONSOLE, GOOGLE ADS, META ADS, SEMRUSH, AHREFS, HUBSPOT, HOTJAR", "ctaBtnText": "Start Your Project", "ctaHeading": "Ready to Accelerate Growth?", "overviewCards": [{"desc": "Google Analytics 4 and event-level telemetry identifying friction points in buyer journeys.", "badge": "ANALYTICS", "title": "Conversion Funnel Tracking"}, {"desc": "Google Ads and Meta Ads campaigns managed with algorithmic bidding for optimal CAC and ROAS.", "badge": "ACQUISITION", "title": "Precision Paid Campaigns"}, {"desc": "Comprehensive keyword architecture and backlink analysis driving continuous qualified inbound traffic.", "badge": "VISIBILITY", "title": "High-Intent Organic Rankings"}, {"desc": "Hotjar heatmaps and user recordings informing data-backed iterative UX enhancements.", "badge": "OPTIMIZATION", "title": "Heatmap & Behavioral Insights"}], "techEcosystemTitle": "Tech Ecosystem", "techEcosystemSubtitle": "Technologies and platforms used for Digital Growth solutions."}], "sectionHeadline": "Enterprise Engineering & Digital Solutions", "sectionDescription": "Select any service below to explore dedicated capabilities, technical benefits, delivery methodology, results, and Tech Ecosystem."}, "servicesHeadline": "What We Provide", "showAnnouncement": true, "announcementBadge": "LIVE", "portfolioProjects": [{"id": "6", "title": "trew", "category": "CLOUD & ENTERPRISE", "solution": "Engineered scalable microservices with automated CI/CD and immutable logging.", "challenge": "Architected high-concurrency cloud platform with zero single point of failure.", "techStack": "Next.js, PostgreSQL, Docker, Kubernetes", "description": "High-performance enterprise cloud delivery.", "metric1Label": "Uptime SLA", "metric1Value": "99.99%", "metric2Label": "Latency", "metric2Value": "<12ms", "metric3Label": "Automated CI/CD", "metric3Value": "100%", "coverImageUrl": "/uploads/1789502682891-Screenshot_From_2026-09-09_00-20-50.png", "imageBadgeTag": "CLOUD & ENTERPRISE", "clientNameLocation": "Global Enterprise"}, {"id": "4", "title": "Automated SOC 2 compliance logging & cryptographic shield", "category": "Cybersecurity & Governance", "solution": "Engineered scalable microservices with automated CI/CD and immutable logging.", "challenge": "Architected high-concurrency cloud platform with zero single point of failure.", "techStack": "HashiCorp Vault, eBPF, Wazuh, Go, AWS, PostgreSQL", "description": "Continuous security telemetry and automated cryptographic vulnerability mitigation, heading direct ISO 27001 and SOC 2 Type II controls with real-time threat detection.", "metric1Label": "Uptime SLA", "metric1Value": "99.99%", "metric2Label": "Latency", "metric2Value": "<12ms", "metric3Label": "Automated CI/CD", "metric3Value": "100%", "coverImageUrl": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80", "imageBadgeTag": "Cybersecurity & Governance", "clientNameLocation": "Sentinel Knox Trust • Switzerland"}, {"id": "3", "title": "Zero-trust multi-cloud Kubernetes infrastructure & GitOps mesh", "category": "Cloud Infrastructure & DevOps", "solution": "Engineered scalable microservices with automated CI/CD and immutable logging.", "challenge": "Architected high-concurrency cloud platform with zero single point of failure.", "techStack": "Terraform, Kubernetes, Istio, ArgoCD, Grafana, Prometheus", "description": "Architected an enterprise container pipeline and automated GitOps mesh processing real-time telemetry from 50,000+ freight systems across Europe with multi-cloud automated failover.", "metric1Label": "Uptime SLA", "metric1Value": "99.99%", "metric2Label": "Latency", "metric2Value": "<12ms", "metric3Label": "Automated CI/CD", "metric3Value": "100%", "coverImageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80", "imageBadgeTag": "Cloud Infrastructure & DevOps", "clientNameLocation": "Nexen Global Logistics • Germany"}, {"id": "2", "title": "Enterprise neural copilot & multi-agent document intelligence", "category": "Enterprise AI & Orchestration", "solution": "Engineered scalable microservices with automated CI/CD and immutable logging.", "challenge": "Architected high-concurrency cloud platform with zero single point of failure.", "techStack": "Python, PyTorch, Ray Serve, LangChain, FastAPI, Docker", "description": "Autonomous multi-agent orchestration and dense vector search to automate compliance extraction across 20M+ medical unstructured diagnostic records with zero private hallucination leakage.", "metric1Label": "Uptime SLA", "metric1Value": "99.99%", "metric2Label": "Latency", "metric2Value": "<12ms", "metric3Label": "Automated CI/CD", "metric3Value": "100%", "coverImageUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80", "imageBadgeTag": "Enterprise AI & Orchestration", "clientNameLocation": "Cognitive Health Analytics • United States"}, {"id": "1", "title": "Next-gen multi-region high frequency payment processing engine", "category": "Fintech & Banking", "solution": "Engineered scalable microservices with automated CI/CD and immutable logging.", "challenge": "Architected high-concurrency cloud platform with zero single point of failure.", "techStack": "Go, Kubernetes, CockroachDB, Kafka, AWS CloudTrail, Redis", "description": "Engineered ultra-low latency transaction clearing engine capable of processing 150,000 TPS with sub-12ms latency and zero transactional drift rate across distributed European and North American zones.", "metric1Label": "Uptime SLA", "metric1Value": "99.99%", "metric2Label": "Latency", "metric2Value": "<12ms", "metric3Label": "Automated CI/CD", "metric3Value": "100%", "coverImageUrl": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80", "imageBadgeTag": "Fintech & Banking", "clientNameLocation": "Apex Global Settlement Net • United Kingdom"}], "portfolioShowcase": {"headline": "Built on Rigorous Enterprise Standards", "badgeLabel": "ENGINEERING CULTURE", "description": "Every case study in our portfolio is the direct outcome of disciplined architectural principles, continuous automated verification, and zero-compromise security controls.", "overlayMetricTitle": "100% Principal Engineer Led", "showcasePictureUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80"}, "announcementLinkUrl": "/services", "servicesDescription": "Eight specialized engineering domains tailored for mission-critical enterprise scale, cloud modernization, and high availability.", "announcementLinkText": "Explore Services"}	2026-09-16 04:52:49.228981
email_department_profiles	[{"id": "support", "name": "Creed Tech Technical Support", "email": "support@creed-tech.com", "phone": "+1 (888) 492-7334", "address": "Creed Tech Technical Support Center, 450 Innovation Parkway, San Francisco, CA 94105", "videoUrl": "https://creed-tech.com/services", "isDefault": false, "department": "Technical Operations & Support", "videoTitle": "Watch: High-Reliability Operations & SLA Support Guide", "accentColor": "#0052FF", "videoThumbnail": "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop", "footerDisclaimer": "Creed Tech Support Desk operates 24/7/365 for Tier-1 mission-critical enterprise contracts. Ticket status updates are logged automatically.", "defaultMessageTemplate": "Dear {client_name},\\n\\nThank you for contacting Creed Tech Technical Operations regarding \\"{service}\\".\\n\\nYour inquiry has been logged under Reference ID #{id} and routed directly to our senior site reliability and infrastructure engineering team.\\n\\nWe are currently reviewing the parameters you provided and will provide an initial diagnostic and resolution roadmap shortly. If you have logs or reproduction steps, please feel free to reply directly to this email.\\n\\nBest regards,\\n\\nTechnical Operations & Support Desk\\nCreed Tech 24/7 Operations", "defaultSubjectTemplate": "[Ticket #{id}] Creed Tech Support: Update on {service}"}, {"id": "security", "name": "Creed Tech Cyber Security", "email": "security@creed-tech.com", "phone": "+1 (888) 492-7335", "address": "Creed Tech Security Operations Vault, 450 Innovation Parkway, San Francisco, CA 94105", "videoUrl": "https://creed-tech.com/about", "isDefault": false, "department": "Cybersecurity & Compliance", "videoTitle": "Watch: Zero-Trust Security & Sovereign Compliance Overview", "accentColor": "#10B981", "videoThumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop", "footerDisclaimer": "SECURE COMMUNICATION: This channel is monitored for compliance with SOC2 Type II, ISO 27001, and NIST CSF cryptographic frameworks. Mutual NDA is active upon request.", "referenceBadgeText": "REF #34", "showReferenceBadge": true, "defaultMessageTemplate": "Dear {client_name},\\n\\nThank you for contacting Creed Tech Cybersecurity & Cryptographic Architecture.\\n\\nWe treat all enterprise scopes, system architectures, and intellectual property with bank-grade confidentiality under mutual non-disclosure protections.\\n\\nPrior to disclosing deeper system topology or codebases, our legal and compliance desk can execute a bilateral NDA. Please let us know if you would like us to countersign your corporate NDA or provide Creed Tech's standard mutual enterprise agreement.\\n\\nBest regards,\\n\\nInformation Security & Compliance Desk\\nCreed Tech Sovereign Systems", "defaultSubjectTemplate": "CONFIDENTIAL: Mutual NDA & Architecture Scoping - Creed Tech [Inquiry #{id}]"}, {"id": "info", "name": "Creed Tech Corporate Desk", "email": "info@creed-tech.com", "phone": "+1 (888) 492-7330", "address": "Creed Tech Global Headquarters, 450 Innovation Parkway, Suite 500, San Francisco, CA 94105", "videoUrl": "https://creed-tech.com", "isDefault": false, "department": "General Inquiries & Corporate Desk", "videoTitle": "Watch: About Creed Tech Global Enterprise Engineering", "accentColor": "#6366F1", "videoThumbnail": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop", "footerDisclaimer": "Creed Tech Global Systems Corporation. All rights reserved. Registered Enterprise Engineering & Cloud Architecture Solutions.", "defaultMessageTemplate": "Dear {client_name},\\n\\nThank you for reaching out to Creed Tech.\\n\\nWe have received your message regarding \\"{service}\\" and have routed it to the appropriate division within our organization.\\n\\nA dedicated specialist from our team will follow up with you within one business day. In the meantime, please feel free to explore our portfolio and engineering publications on our website.\\n\\nWarm regards,\\n\\nCreed Tech Corporate Communications\\nhttps://creed-tech.com", "defaultSubjectTemplate": "Creed Tech: Thank you for contacting us [Inquiry #{id}]"}, {"id": "dept_muj54nvw", "name": "Creed Tech Solutions", "email": "solutions@creed-tech.com", "phone": "+1 (888) 492-7330", "address": "Creed Tech Global Headquarters, San Francisco, CA", "videoUrl": "https://creed-tech.com", "textColor": "#FFFFFF", "department": "Enterprise Solutions", "videoTitle": "Watch: Solutions Architecture Demo", "accentColor": "#FF6B00", "videoThumbnail": "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop", "backgroundColor": "#090D16", "footerDisclaimer": "Creed Tech Sovereign Enterprise Systems. All rights reserved.", "defaultMessageTemplate": "Dear {client_name},\\n\\nThank you for reaching out to Creed Tech regarding \\"{service}\\".\\n\\nBest regards,\\nCreed Tech Team", "defaultSubjectTemplate": "Re: Creed Tech Discovery - {service} [Inquiry #{id}]"}]	2026-09-27 09:42:52.896854
\.


--
-- Name: article_reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.article_reviews_id_seq', 308, true);


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.articles_id_seq', 4, true);


--
-- Name: candidates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.candidates_id_seq', 15, true);


--
-- Name: contact_inquiries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contact_inquiries_id_seq', 34, true);


--
-- Name: founder_proposals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.founder_proposals_id_seq', 2, true);


--
-- Name: job_openings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.job_openings_id_seq', 9, true);


--
-- Name: live_news_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.live_news_items_id_seq', 150642, true);


--
-- Name: portfolio_projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.portfolio_projects_id_seq', 6, true);


--
-- Name: security_reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.security_reports_id_seq', 5, true);


--
-- Name: subscribers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subscribers_id_seq', 20, true);


--
-- Name: testimonials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.testimonials_id_seq', 12, true);


--
-- Name: videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.videos_id_seq', 4, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: article_reviews article_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article_reviews
    ADD CONSTRAINT article_reviews_pkey PRIMARY KEY (id);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: candidates candidates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidates
    ADD CONSTRAINT candidates_pkey PRIMARY KEY (id);


--
-- Name: contact_inquiries contact_inquiries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact_inquiries
    ADD CONSTRAINT contact_inquiries_pkey PRIMARY KEY (id);


--
-- Name: founder_proposals founder_proposals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.founder_proposals
    ADD CONSTRAINT founder_proposals_pkey PRIMARY KEY (id);


--
-- Name: job_openings job_openings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_openings
    ADD CONSTRAINT job_openings_pkey PRIMARY KEY (id);


--
-- Name: live_news_items live_news_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.live_news_items
    ADD CONSTRAINT live_news_items_pkey PRIMARY KEY (id);


--
-- Name: portfolio_projects portfolio_projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portfolio_projects
    ADD CONSTRAINT portfolio_projects_pkey PRIMARY KEY (id);


--
-- Name: security_reports security_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.security_reports
    ADD CONSTRAINT security_reports_pkey PRIMARY KEY (id);


--
-- Name: seo_settings seo_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seo_settings
    ADD CONSTRAINT seo_settings_pkey PRIMARY KEY (page_key);


--
-- Name: subscribers subscribers_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribers
    ADD CONSTRAINT subscribers_email_key UNIQUE (email);


--
-- Name: subscribers subscribers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribers
    ADD CONSTRAINT subscribers_pkey PRIMARY KEY (id);


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);


--
-- Name: website_settings website_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.website_settings
    ADD CONSTRAINT website_settings_pkey PRIMARY KEY (key);


--
-- Name: live_news_items_provider_link_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX live_news_items_provider_link_key ON public.live_news_items USING btree (provider, link);


--
-- PostgreSQL database dump complete
--

\unrestrict 3bXrujzqTm45G9sa7jnxGsbXaqBrrHSsFUpWLtY5j0qTu7WP5LJxBGhAAi30o6D

