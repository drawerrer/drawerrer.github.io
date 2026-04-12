import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://khwqazhqlezfydrenljk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtod3FhemhxbGV6ZnlkcmVubGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTA2NTEsImV4cCI6MjA4NzY4NjY1MX0.XLgNzh4WJEG5r40Zus-iNC-4ZGqqHJR2zIYSzoyP4h0'

export const supabase = createClient(supabaseUrl, supabaseKey)
console.log("Supabase Initialized");
