import { Client } from '@notionhq/client';
// import { NotionAPI } from 'notion-client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionAPI } from './NotionAPI';

import { NOTION_TOKEN, NOTION_GUIDE_ID } from '../constants';
if (!NOTION_TOKEN) {
  throw new Error('NOTION_TOKEN is not defined');
}

class NotionService {
  private client: Client;
  private notionAPI: NotionAPI;

  constructor() {
    this.client = new Client({ auth: NOTION_TOKEN });
    this.notionAPI = new NotionAPI({
      apiBaseUrl: process.env.NOTION_API_BASE_URL,
    });
  }
  /**
   * 获取指定数据库的条目
   * @param databaseId - 数据库 ID
   * @returns Promise<QueryDatabaseResponse['results']>
   */
  async getDatabase(
    databaseId: string,
  ): Promise<QueryDatabaseResponse['results']> {
    try {
      const response = await this.client.databases.query({
        database_id: databaseId,
      });
      return response.results;
    } catch (error: any) {
      console.error('Error fetching database:', error.body || error);
      throw new Error('Failed to fetch database');
    }
  }
  /**
   * 搜索数据库
   * @param databaseId
   * @returns
   */
  async searchNotionByTitle(params: any) {
    try {
      // params = {
      //   query: 'External tasks',
      //   filter: {
      //     value: 'database',
      //     property: 'object',
      //   },
      //   sort: {
      //     direction: 'ascending',
      //     timestamp: 'last_edited_time',
      //   },
      // };
      const body = {
        type: 'BlocksInAncestor',
        source: 'quick_find_public',
        // ancestorId: parsePageId(params.ancestorId),
        ancestorId: '',
        // sort: {
        //   field: 'relevance',
        // },
        limit: params.limit || 20,
        query: params.query,
        filters: {
          isDeletedOnly: false,
          isNavigableOnly: false,
          excludeTemplates: true,
          requireEditPermissions: false,
          ancestors: [],
          createdBy: [],
          editedBy: [],
          lastEditedTime: {},
          createdTime: {},
          ...params.filters,
        },
      };
      const response = await this.client.search({ ...body, ...params });
      console.log('搜索searchNotionByTitle的response', response);
      return response;
    } catch (error: any) {
      console.error('Error fetching database:', error.body || error);
      throw new Error('Failed to fetch database');
    }
  }
  /**
   * 搜索数据库
   * @param databaseId
   * @returns
   */
  async searchNotionByDataBases(params: any) {
    try {
      const response = await this.client.databases.query({
        database_id: '89e05ac475f248a583b8d46d6a0caaed',
        filter: {
          property: '土耳其',
          checkbox: {
            equals: true,
          },
        },
      });
      console.log('搜索searchNotionByDataBases的response', response);
      return response.results;
    } catch (error: any) {
      console.error('Error fetching database:', error.body || error);
      throw new Error('Failed to fetch database');
    }
  }
  /**
   * 获取指定页面的内容
   * @param pageId - 页面 ID
   * @returns Promise<PageObjectResponse>
   */
  async getPage(pageId: string) {
    try {
      const page = await this.notionAPI.getPage(pageId);

      return page;
    } catch (error: any) {
      console.error('Error fetching page:', error.body || error);
      throw new Error('Failed to fetch page');
    }
  }
  async searchNotion(params: any) {
    try {
      console.log('执行searchNotion');
      const page = await this.notionAPI.search(params);
      console.log('page', page);

      return page;
    } catch (error: any) {
      console.error('Error fetching page:', error.body || error);
      throw new Error('Failed to fetch page');
    }
  }
}
export default NotionService;
