# Supabase Integration Guide

## Setup

1. Install the Supabase client library:
```bash
npm install @supabase/supabase-js
```

2. Create a Supabase client configuration file at `src/lib/supabaseClient.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Usage

### Fetching Data
```typescript
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .order('created_at', { ascending: false })
```

### Inserting Data
```typescript
const { error } = await supabase
  .from('table_name')
  .insert({
    column1: value1,
    column2: value2,
    created_at: new Date().toISOString()
  })
```

### Environment Variables

Add these to your `.env` file:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Error Handling

Always check for errors in Supabase operations:
```typescript
try {
  const { data, error } = await supabase.from('table_name').select('*')
  if (error) throw error
  // Handle success
} catch (err) {
  // Handle error
}
```

## Styling

Use the existing color scheme:
- Primary color: #0a2472 (Dark navy blue)
- Text color: #0a2472
- Background alt: #f0f4f8
- Border color: #cad5e2

## Example Component

Check `src/components/SupabaseTest.tsx` for a complete example of:
- Data fetching
- Data insertion
- Error handling
- Styling with the app theme
