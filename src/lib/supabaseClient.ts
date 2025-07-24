import { createClient } from '@supabase/supabase-js';

type Contact = {
  id: number;
  name: string;
  phone: string;
  created_at: string;
};

type Database = {
  public: {
    Tables: {
      contacts: {
        Row: Contact;
        Insert: Omit<Contact, 'id' | 'created_at'>;
        Update: Partial<Omit<Contact, 'id' | 'created_at'>>;
      };
    };
  };
};

const supabaseUrl = 'https://xlqygozztfmuhmmsaehh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhscXlnb3p6dGZtdWhtbXNhZWhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMDE1NzYsImV4cCI6MjA2ODc3NzU3Nn0.2BNjZtfHnSonfSsDoHApXd0bWDDfVIMbOtsEgegNXok';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
