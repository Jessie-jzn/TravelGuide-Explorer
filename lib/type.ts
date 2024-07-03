import { ExtendedRecordMap } from 'notion-types';
export interface MenuItem {
  id: number;
  slug?: string;
  title: string;
  uri: string;
}
export interface PageError {
  message?: string;
  statusCode: number;
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
export interface Site {
  name: string;
  domain: string;

  rootNotionPageId: string;
  rootNotionSpaceId: string;

  // settings
  html?: string;
  fontFamily?: string;
  darkMode?: boolean;
  previewImages?: boolean;

  // opengraph metadata
  description?: string;
  image?: string;
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
export interface PageProps {
  site?: Site;
  recordMap: ExtendedRecordMap;
  pageId?: string;
  error?: PageError;
}
