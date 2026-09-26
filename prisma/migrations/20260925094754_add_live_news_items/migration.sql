-- CreateTable
CREATE TABLE "live_news_items" (
    "id" SERIAL NOT NULL,
    "provider" VARCHAR(100) NOT NULL,
    "title" VARCHAR(1000) NOT NULL,
    "description" TEXT,
    "link" VARCHAR(1000) NOT NULL,
    "image" VARCHAR(1000),
    "category" VARCHAR(255),
    "published_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "live_news_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "live_news_items_provider_link_key" ON "live_news_items"("provider", "link");
