const NOTION_HOST = 'https://www.notion.so/';
const NOTION_TOKEN = process.env.NOTION_API_KEY as string;
const NOTION_PUBLIC_MENU = process.env.NOTION_PUBLIC_MENU as string;
const NOTION_GUIDE_ID = process.env.NOTION_GUIDE_ID as string;
const PREVIEW_IMAGES_ENABLED = true
export { NOTION_TOKEN, NOTION_HOST, NOTION_PUBLIC_MENU, NOTION_GUIDE_ID,PREVIEW_IMAGES_ENABLED};
