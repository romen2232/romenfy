import { Song } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/dist/client/components/headers';

const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  }); // create a new supabase client

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false }); // select all columns from songs table

  if (error) {
    console.log(error);
  }

  return (data as Song[]) || [];
};

export default getSongs;
