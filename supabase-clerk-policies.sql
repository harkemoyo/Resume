-- RLS Policies for Clerk + Supabase Integration
-- Run this in Supabase SQL Editor after creating the contacts table

-- 1. Allow anonymous contact form submissions
-- This allows anyone (including unauthenticated users) to submit contact forms
CREATE POLICY "contacts_public_insert" ON public.contacts
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 2. Allow authenticated users to see their own contact submissions
-- This works with Clerk authentication - the clerk_user_id will be populated
CREATE POLICY "contacts_select_own" ON public.contacts
FOR SELECT
TO authenticated
USING (
  clerk_user_id IS NOT NULL 
  AND clerk_user_id = (auth.jwt() ->> 'sub')::text
);

-- 3. Allow users to update their own contact submissions (if needed)
CREATE POLICY "contacts_update_own" ON public.contacts
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

-- 4. Admin policies (for managing all contacts)
-- Create a function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if user has admin role in Clerk metadata
  RETURN COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin can see all contacts
CREATE POLICY "contacts_admin_select" ON public.contacts
FOR SELECT
TO authenticated
USING (is_admin());

-- Admin can update contact status
CREATE POLICY "contacts_admin_update" ON public.contacts
FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Admin can delete contacts
CREATE POLICY "contacts_admin_delete" ON public.contacts
FOR DELETE
TO authenticated
USING (is_admin());

-- 5. Optional: Allow public to read contact count (for analytics)
CREATE POLICY "contacts_public_count" ON public.contacts
FOR SELECT
TO anon, authenticated
USING (false); -- This effectively blocks public reads but allows the policy structure

-- 6. Create a view for public contact statistics (if needed)
CREATE OR REPLACE VIEW public.contact_stats AS
SELECT 
  COUNT(*) as total_contacts,
  COUNT(*) FILTER (WHERE status = 'new') as new_contacts,
  COUNT(*) FILTER (WHERE status = 'replied') as replied_contacts,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as contacts_last_30_days
FROM public.contacts
WHERE NOT is_spam;

-- Grant access to the view
GRANT SELECT ON public.contact_stats TO anon, authenticated;
