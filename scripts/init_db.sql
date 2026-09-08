-- Drop existing tables if needed
DROP TABLE IF EXISTS contact_inquiries CASCADE;
DROP TABLE IF EXISTS vision_inquiries CASCADE;
DROP TABLE IF EXISTS candidates CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS videos CASCADE;
DROP TABLE IF EXISTS tech_news CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS article_reviews CASCADE;
DROP TABLE IF EXISTS newsletter_leads CASCADE;
DROP TABLE IF EXISTS portfolio_projects CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- 1. Contact Inquiries Table
CREATE TABLE contact_inquiries (
  id SERIAL PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  service VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  phone VARCHAR(100),
  email VARCHAR(255),
  project_details TEXT,
  need_nda BOOLEAN DEFAULT TRUE,
  status VARCHAR(50) DEFAULT 'PENDING',
  created_at VARCHAR(100) DEFAULT 'Today, 06:45 AM'
);

-- 2. Candidates / Talent Pool Table
CREATE TABLE candidates (
  id SERIAL PRIMARY KEY,
  candidate_name VARCHAR(255) NOT NULL,
  domain_specialty VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  portfolio_github VARCHAR(255) NOT NULL,
  created_at VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL
);

-- 3. Articles Table (Matching Rich Article Studio)
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  category VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  read_time VARCHAR(100) NOT NULL,
  cover_photo_url TEXT,
  video_embed_url TEXT,
  audio_stream_url TEXT,
  editor_note TEXT,
  content TEXT,
  pros JSONB DEFAULT '[]',
  cons JSONB DEFAULT '[]',
  specs JSONB DEFAULT '[]',
  views INT DEFAULT 0,
  status VARCHAR(50) DEFAULT 'PUBLISHED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Seed Contact Inquiries (from screenshots)
INSERT INTO contact_inquiries (client_name, service, company, email, phone, project_details, status, created_at)
VALUES
('Alexander Vance', 'Software Development', 'FinTech Global (Frankfurt)', 'alexander@fintechglobal.de', '+49 69 123456', 'High-frequency transaction engine modernization.', 'PENDING', 'Today, 06:45 AM'),
('Dr. Elena Rostova', 'AI & Automation', 'Neural BioTech Labs (Madrid)', 'elena.rostova@neuralbiotech.es', '+34 91 987654', 'Private LLM document intelligence and clinical trial data.', 'IN_REVIEW', 'Yesterday'),
('Marcus Vance', 'Cloud Infrastructure', 'AeroDefense Systems (London)', 'marcus@aerodefense.co.uk', '+44 20 794609', 'Zero-trust multi-cloud Kubernetes deployment.', 'PENDING', '2 days ago');

-- 5. Seed Candidates (from screenshots)
INSERT INTO candidates (candidate_name, domain_specialty, email, portfolio_github, created_at, status)
VALUES
('Julian Alvarez', 'Rust & Distributed Systems', 'julian.alvarez@dev.io', 'github.com/jalvarez', 'Aug 16, 2026', 'SHORTLISTED'),
('Maya Lin', 'UI/UX & Design Systems (WCAG AAA)', 'maya.lin@uxcraft.org', 'figma.com/@mayalin', 'Aug 15, 2026', 'INTERVIEWING'),
('Priya Sharma', 'AI & Large Language Models (vLLM & CUDA)', 'priya.sharma@ml-research.ai', 'github.com/priya-sharma-ai', 'Aug 14, 2026', 'SHORTLISTED');

-- 6. Seed Sample Article (from Rich Studio screenshot)
INSERT INTO articles (title, category, author, read_time, cover_photo_url, video_embed_url, audio_stream_url, editor_note, content, pros, cons, specs, views)
VALUES (
  'The Best Laptops We''ve Tested for Enterprise AI & Cloud (2026)',
  'HARDWARE & AI WORKSTATIONS',
  'Dr. Sarah Jenkins (Chief Systems Architect)',
  '15 min read',
  'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1000&auto=format&fit=crop',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'August 2026: Our hardware team has vetted 22 workstations for running local 70B LLMs, multi-container Docker clusters, and heavy multi-threaded compilation builds in Creed Tech Labs.',
  'The HP OmniBook 5 14 marks a seismic transition in the Windows laptop ecosystem. Built around Qualcomm''s 4nm Oryon CPU architecture, it eliminates the historical compromise between high-performance computing and true all-day battery life.',
  '["Field-leading battery endurance (21+ hours continuous development)", "Vivid 2.8K OLED 120Hz display with 100% DCI-P3 color gamut", "Whisper-quiet acoustic fan noise below 24 dB under load"]',
  '["Plastic keyboard deck could benefit from internal stiffening", "Soldered RAM and non-expandable secondary storage bay"]',
  '[{"key": "Processor (CPU)", "value": "Qualcomm Snapdragon X Elite (12 Cores, up to 3.8 GHz)"}, {"key": "NPU AI Power", "value": "45 TOPS Hexagon NPU Engine"}]',
  142000
);
