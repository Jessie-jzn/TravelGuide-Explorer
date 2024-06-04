export interface MenuItem {
  id: number;
  slug?: string;
  title: string;
  uri: string;
}

export interface Post {
  id: string;
  description?: string;
  name?: string;
  published?: boolean;
  url: string;
  date?: string;
  image: string;
}
