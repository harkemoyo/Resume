export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: Post;
        Insert: Omit<Post, 'id' | 'created_at'>;
        Update: Partial<Omit<Post, 'id' | 'created_at'>>;
      };
    };
  };
}