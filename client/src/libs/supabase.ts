import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  'https://mmghdxcarcrbbrjfremz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDIwMzc5MSwiZXhwIjoxOTQ5Nzc5NzkxfQ.klqs6tWotcvC6DIqpqRgGBTfcUM7WAKRGlKtJaJw-jo'
);
