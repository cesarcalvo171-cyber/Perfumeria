import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bjfzjbwrrmqnlmfbxmeg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZnpqYndycm1xbmxtZmJ4bWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3MzAzMTIsImV4cCI6MjEwMDMwNjMxMn0.p1zomWoXLSLPCUlD_0u9RoKUnHFXma1Cpx2JsyjkHAg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
