import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';

export const notion = new NotionAPI({
  //   apiBaseUrl: process.env.NOTION_API_BASE_URL,
});

// const getNavigationLinkPages = pMemoize(
//   async (): Promise<ExtendedRecordMap[]> => {
//     const navigationLinkPageIds = (navigationLinks || [])
//       .map((link) => link.pageId)
//       .filter(Boolean);

//     if (navigationStyle !== 'default' && navigationLinkPageIds.length) {
//       return pMap(
//         navigationLinkPageIds,
//         async (navigationLinkPageId) =>
//           notion.getPage(navigationLinkPageId, {
//             chunkLimit: 1,
//             fetchMissingBlocks: false,
//             fetchCollections: false,
//             signFileUrls: false,
//           }),
//         {
//           concurrency: 4,
//         },
//       );
//     }

//     return [];
//   },
// );
export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  let recordMap = await notion.getPage(pageId);

  //   if (navigationStyle !== 'default') {
  //     // ensure that any pages linked to in the custom navigation header have
  //     // their block info fully resolved in the page record map so we know
  //     // the page title, slug, etc.
  //     const navigationLinkRecordMaps = await getNavigationLinkPages();

  //     if (navigationLinkRecordMaps?.length) {
  //       recordMap = navigationLinkRecordMaps.reduce(
  //         (map, navigationLinkRecordMap) =>
  //           mergeRecordMaps(map, navigationLinkRecordMap),
  //         recordMap,
  //       );
  //     }
  //   }

  //   if (isPreviewImageSupportEnabled) {
  //     const previewImageMap = await getPreviewImageMap(recordMap);
  //     (recordMap as any).preview_images = previewImageMap;
  //   }

  return recordMap;
}
