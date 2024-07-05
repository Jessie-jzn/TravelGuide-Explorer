import { ExtendedRecordMap } from 'notion-types';
export interface MenuItem {
  id: number;
  slug?: string;
  title: string;
  url: string;
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
  created_time?: string;
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

export interface PropertyLastEditedTimeValueProps {
  block: Block;
  pageHeader: boolean;
  defaultFn: () => React.ReactNode;
}
export interface PropertyDateValueProps {
  data: DataItem[];
  schema: Schema;
  pageHeader: boolean;
  defaultFn: () => React.ReactNode;
}
// types.ts
export interface Block {
  id: string;
  version: number;
  type: string;
  properties: {
    [key: string]: Array<Array<string>>;
  };
  content: string[];
  format: {
    page_font: string;
    page_icon: string;
    page_cover: string;
    page_full_width: boolean;
    page_small_text: boolean;
    page_cover_position: number;
    social_media_image_preview_url: string;
  };
  created_time: number;
  last_edited_time: number;
  parent_id: string;
  parent_table: string;
  alive: boolean;
  file_ids: string[];
  created_by_table: string;
  created_by_id: string;
  last_edited_by_table: string;
  last_edited_by_id: string;
  space_id: string;
}
export interface Schema {
  name?: string;
}

export interface DataItem {
  [key: string]: any;
}
