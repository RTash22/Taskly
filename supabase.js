import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://elhzbzcjxliapmayuavz.supabase.co'

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsaHpiemNqeGxpYXBtYXl1YXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0MDIxMzQsImV4cCI6MjA1Mjk3ODEzNH0.6lI0VoLIus0M9Y_zGXNue65IVmGRSc3sEajfnw1EF38'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)