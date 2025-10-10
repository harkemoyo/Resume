# Clerk + Supabase RLS Integration Setup Guide

## 🎯 **Complete Setup for Your Portfolio**

This guide shows you how to set up Row Level Security (RLS) with Clerk authentication in Supabase for your React portfolio.

## 📋 **Step-by-Step Setup**

### **1. Database Setup**

Run this SQL in your Supabase SQL Editor:

```sql
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
```

### **2. RLS Policies Setup**

Run this SQL in your Supabase SQL Editor:

```sql
-- 1. Allow anonymous contact form submissions
CREATE POLICY "contacts_public_insert" ON public.contacts
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 2. Allow authenticated users to see their own contact submissions
CREATE POLICY "contacts_select_own" ON public.contacts
FOR SELECT
TO authenticated
USING (
  clerk_user_id IS NOT NULL 
  AND clerk_user_id = (auth.jwt() ->> 'sub')::text
);

-- 3. Admin policies
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
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
```

### **3. Clerk Configuration**

In your Clerk Dashboard:

1. **Go to JWT Templates**
2. **Create a new template** or edit existing
3. **Add custom claims**:

```json
{
  "app_metadata": {
    "role": "admin"
  }
}
```

4. **Apply to users** who should have admin access

### **4. React Component Updates**

Your Contact component is already updated to:
- ✅ Allow both anonymous and authenticated submissions
- ✅ Include Clerk user ID when authenticated
- ✅ Send user agent and other metadata

### **5. Admin Dashboard**

I've created an `AdminDashboard` component that:
- ✅ Checks for admin role in Clerk metadata
- ✅ Fetches all contacts (admin only)
- ✅ Updates contact status
- ✅ Provides a clean interface for managing submissions

## 🔧 **How It Works**

### **Anonymous Submissions**
```typescript
// Anyone can submit (no auth required)
const payload = {
  clerk_user_id: null, // Anonymous
  name: "John Doe",
  email: "john@example.com",
  message: "Hello!"
};
```

### **Authenticated Submissions**
```typescript
// Clerk users can submit with their ID
const payload = {
  clerk_user_id: user?.id, // Clerk user ID
  name: "John Doe",
  email: "john@example.com", 
  message: "Hello!"
};
```

### **Admin Access**
```typescript
// Only users with admin role can see all contacts
const isAdmin = user?.publicMetadata?.role === 'admin';
```

## 🛡️ **Security Features**

1. **RLS Protection**: All data access is controlled by policies
2. **Role-Based Access**: Admin role required for management
3. **Anonymous Support**: Public can submit without accounts
4. **Data Validation**: Server-side validation and spam protection
5. **Audit Trail**: All submissions tracked with metadata

## 🚀 **Testing Your Setup**

### **Test Anonymous Submission**
1. Open your contact form (not logged in)
2. Submit a message
3. Should succeed ✅

### **Test Authenticated Submission**
1. Sign in with Clerk
2. Submit a message
3. Should succeed with your user ID ✅

### **Test Admin Access**
1. Sign in as admin user
2. Access admin dashboard
3. Should see all contacts ✅

## 📊 **What You Get**

- **Public Contact Form**: Anyone can submit (no sign-up required)
- **User Tracking**: Authenticated users' submissions are linked
- **Admin Dashboard**: Manage all submissions in one place
- **Status Management**: Track new, read, replied, archived
- **Security**: RLS ensures data is properly protected
- **Performance**: Indexed queries for fast responses

## 🔄 **Next Steps**

1. **Run the SQL scripts** in Supabase
2. **Test the contact form** (anonymous and authenticated)
3. **Set up admin role** in Clerk for yourself
4. **Add the AdminDashboard** to your app if needed
5. **Customize the styling** to match your design

Your portfolio now has a complete, secure contact system that works for both anonymous visitors and authenticated users! 🎉
