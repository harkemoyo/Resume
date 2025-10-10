-- Quick Test SQL for Supabase
-- Run this in Supabase SQL Editor to test your setup

-- 1. Check if table exists
SELECT table_name, table_schema 
FROM information_schema.tables 
WHERE table_name = 'contacts' AND table_schema = 'public';

-- 2. Check RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'contacts' AND schemaname = 'public';

-- 3. Check policies
SELECT policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'contacts' AND schemaname = 'public';

-- 4. Test insert (this should work after creating the table)
INSERT INTO public.contacts (clerk_user_id, name, email, message, subject, user_agent)
VALUES (null, 'Test User', 'test@example.com', 'Test message', 'Test Subject', 'Test Agent');

-- 5. Check the inserted data
SELECT * FROM public.contacts ORDER BY created_at DESC LIMIT 5;
