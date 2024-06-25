const NOTION_HOST = 'https://www.notion.so/';
const NOTION_TOKEN = process.env.NOTION_API_KEY as string;
const NOTION_PUBLIC_MENU = process.env.NOTION_PUBLIC_MENU as string;
const NOTION_GUIDE_ID = process.env.NOTION_GUIDE_ID as string;
const NOTION_COUNTRY_ID = process.env.NOTION_COUNTRY_ID as string;
const PREVIEW_IMAGES_ENABLED = true;
const LANG = process.env.NEXT_PUBLIC_LANG || 'zh-CN'; // zh-CN,'n-U

export {
  NOTION_TOKEN,
  NOTION_HOST,
  NOTION_PUBLIC_MENU,
  NOTION_GUIDE_ID,
  PREVIEW_IMAGES_ENABLED,
  NOTION_COUNTRY_ID,
  LANG,
};
