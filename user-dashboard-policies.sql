-- User Dashboard Security Policies
-- Run this in Supabase SQL Editor to enable secure user access

-- First, make sure the Contacts table has the clerk_user_id column
ALTER TABLE public."Contacts" 
ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;

-- Add other useful columns if they don't exist
ALTER TABLE public."Contacts" 
ADD COLUMN IF NOT EXISTS subject TEXT DEFAULT 'Contact Form Submission';

ALTER TABLE public."Contacts" 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived'));

ALTER TABLE public."Contacts" 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Enable RLS if not already enabled
ALTER TABLE public."Contacts" ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "contacts_public_insert" ON public."Contacts";
DROP POLICY IF EXISTS "contacts_public_select" ON public."Contacts";
DROP POLICY IF EXISTS "Allow public inserts" ON public."Contacts";
DROP POLICY IF EXISTS "Allow public selects" ON public."Contacts";

-- 1. Allow anonymous users to insert contacts (for contact form)
CREATE POLICY "contacts_anonymous_insert" ON public."Contacts"
FOR INSERT
TO anon
WITH CHECK (true);

-- 2. Allow authenticated users to insert contacts (for contact form)
CREATE POLICY "contacts_authenticated_insert" ON public."Contacts"
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 3. Users can only see their own contacts
CREATE POLICY "contacts_user_select_own" ON public."Contacts"
FOR SELECT
TO authenticated
USING (
  clerk_user_id IS NOT NULL 
  AND clerk_user_id = (auth.jwt() ->> 'sub')::text
);

-- 4. Users can only update their own contacts
CREATE POLICY "contacts_user_update_own" ON public."Contacts"
FOR UPDATE
TO authenticated
USING (
  clerk_user_id IS NOT NULL 
  AND clerk_user_id = (auth.jwt() ->> 'sub')::text
)
WITH CHECK (
  clerk_user_id IS NOT NULL 
  AND clerk_user_id = (auth.jwt() ->> 'sub')::text
);

-- 5. Users can only delete their own contacts
CREATE POLICY "contacts_user_delete_own" ON public."Contacts"
FOR DELETE
TO authenticated
USING (
  clerk_user_id IS NOT NULL 
  AND clerk_user_id = (auth.jwt() ->> 'sub')::text
);

-- 6. Admin policies (if you want to keep admin access)
-- Create admin function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN COALESCE(
    (auth.jwt() -> 'public_metadata' ->> 'role') = 'admin',
    false
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin can see all contacts
CREATE POLICY "contacts_admin_select_all" ON public."Contacts"
FOR SELECT
TO authenticated
USING (is_admin());

-- Admin can update all contacts
CREATE POLICY "contacts_admin_update_all" ON public."Contacts"
FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Admin can delete all contacts
CREATE POLICY "contacts_admin_delete_all" ON public."Contacts"
FOR DELETE
TO authenticated
USING (is_admin());

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS contacts_clerk_user_id_idx ON public."Contacts"(clerk_user_id);
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON public."Contacts"(created_at DESC);
CREATE INDEX IF NOT EXISTS contacts_status_idx ON public."Contacts"(status);

-- Test the policies
-- This should show all policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'Contacts' AND schemaname = 'public'
ORDER BY policyname;
