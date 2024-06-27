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
  tags?: any;
  cover: string;
  country: string[];
}

export interface Country {
  id: string;
  cover: string | null;
  url: string;
  image: string;
  guide: string[];
  title: string;
  icon: string;
  name: string;
  guides: Post[];
}
