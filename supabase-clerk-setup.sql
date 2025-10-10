-- Create contacts table with Clerk integration
CREATE TABLE IF NOT EXISTS public.contacts (
  id BIGSERIAL PRIMARY KEY,
  clerk_user_id TEXT, -- Clerk user ID (nullable for anonymous submissions)
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  subject TEXT DEFAULT 'Contact Form Submission',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  user_agent TEXT,
  ip_address INET,
  is_spam BOOLEAN DEFAULT FALSE,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON public.contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS contacts_email_idx ON public.contacts(email);
CREATE INDEX IF NOT EXISTS contacts_status_idx ON public.contacts(status);
CREATE INDEX IF NOT EXISTS contacts_clerk_user_id_idx ON public.contacts(clerk_user_id);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at 
    BEFORE UPDATE ON public.contacts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
