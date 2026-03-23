import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vvhiytfivposjykirmyv.supabase.co'
const supabaseKey = 'sb_publishable_4M26H6OjT0Nfn4Y_yuOo7Q_Sb4hIWvE'

export const supabase = createClient(supabaseUrl, supabaseKey)                                                                                                                                     