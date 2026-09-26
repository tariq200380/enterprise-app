-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "article_reviews" (
    "id" SERIAL NOT NULL,
    "reviewer_name" TEXT NOT NULL,
    "organization" TEXT,
    "article_title" TEXT NOT NULL,
    "rating" INTEGER DEFAULT 5,
    "details" TEXT NOT NULL,
    "status" TEXT DEFAULT 'PENDING',
    "submitted_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "avatar" TEXT,
    "review_title" TEXT,
    "article_id" INTEGER DEFAULT 1,
    "helpful" INTEGER DEFAULT 1,

    CONSTRAINT "article_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "read_time" VARCHAR(100) NOT NULL,
    "cover_photo_url" TEXT,
    "video_embed_url" TEXT,
    "audio_stream_url" TEXT,
    "editor_note" TEXT,
    "content" TEXT,
    "pros" JSONB DEFAULT '[]',
    "cons" JSONB DEFAULT '[]',
    "specs" JSONB DEFAULT '[]',
    "views" INTEGER DEFAULT 0,
    "status" VARCHAR(50) DEFAULT 'PUBLISHED',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "source_news" TEXT,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidates" (
    "id" SERIAL NOT NULL,
    "candidate_name" VARCHAR(255) NOT NULL,
    "domain_specialty" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "portfolio_github" VARCHAR(255) NOT NULL,
    "created_at" VARCHAR(100) NOT NULL,
    "status" VARCHAR(50) NOT NULL,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_inquiries" (
    "id" SERIAL NOT NULL,
    "client_name" VARCHAR(255) NOT NULL,
    "service" VARCHAR(255) NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(100),
    "email" VARCHAR(255),
    "project_details" TEXT,
    "need_nda" BOOLEAN DEFAULT true,
    "status" VARCHAR(50) DEFAULT 'PENDING',
    "created_at" VARCHAR(100) DEFAULT 'Today, 06:45 AM',

    CONSTRAINT "contact_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_openings" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT DEFAULT 'ACTIVE',
    "description" TEXT NOT NULL,
    "tags" JSONB DEFAULT '[]',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_openings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_projects" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "stack" JSONB DEFAULT '[]',
    "live_url" TEXT,
    "github_url" TEXT,
    "image_url" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "portfolio_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscribers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "source" TEXT DEFAULT 'Global Website',
    "status" TEXT DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" SERIAL NOT NULL,
    "client_name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "avatar" TEXT,
    "rating" INTEGER DEFAULT 5,
    "quote" TEXT NOT NULL,
    "verified" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "embed_url" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "views" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "website_settings" (
    "key" VARCHAR(100) NOT NULL,
    "value" JSONB NOT NULL,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "website_settings_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "founder_proposals" (
    "id" SERIAL NOT NULL,
    "candidate_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "specialty_proposal" VARCHAR(500) NOT NULL,
    "portfolio_link" VARCHAR(500),
    "proposal_pitch" TEXT,
    "status" VARCHAR(50) DEFAULT 'NEW',
    "created_at" VARCHAR(100) DEFAULT to_char(now(), 'Mon DD, YYYY'::text),

    CONSTRAINT "founder_proposals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security_reports" (
    "id" SERIAL NOT NULL,
    "reporter_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "severity" VARCHAR(50) DEFAULT 'Medium',
    "subject" VARCHAR(300),
    "description" TEXT NOT NULL,
    "status" VARCHAR(50) DEFAULT 'NEW',
    "created_at" VARCHAR(100) DEFAULT to_char(now(), 'Mon DD, YYYY'::text),

    CONSTRAINT "security_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscribers_email_key" ON "subscribers"("email");

