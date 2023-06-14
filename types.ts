type UserDetail = {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
};

type Song = {
  id: string;
  title: string;
  author: string;
  user_id: string;
  created_at: string;
  song_path: string;
  image_path: string;
  lyrics_path: string;
};

export type { UserDetail, Song };
