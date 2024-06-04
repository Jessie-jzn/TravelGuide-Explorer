import rpc from '../rpc';

// 定义 LoaderOptions 接口，用于描述 loader 参数的类型
interface LoaderOptions {
  type: string;
  reducers: {
    [key: string]: {
      type: string;
      limit?: number;
      loadContentCover?: boolean;
    };
  };
  searchQuery: string;
  userTimeZone: string;
}

// 定义 QueryCollectionOptions 接口，描述 queryCollection 函数的参数类型
interface QueryCollectionOptions {
  collectionId: string;
  collectionViewId: string;
  loader?: Partial<LoaderOptions>; // loader 参数为 LoaderOptions 的部分类型
  query?: any; // query 参数的类型暂时设定为 any，可根据实际情况更改
}

// 定义 queryCollection 函数，用于查询集合数据
export default function queryCollection({
  collectionId,
  collectionViewId,
  loader = {}, // 默认为空对象
  query = {}, // 默认为空对象
}: QueryCollectionOptions) {
  // 默认的 loader 选项
  const queryCollectionBody: { loader: LoaderOptions } = {
    loader: {
      type: 'reducer',
      reducers: {
        collection_group_results: {
          type: 'results',
          limit: 999, // 默认限制为 999 条
          loadContentCover: true,
        },
        'table:uncategorized:title:count': {
          type: 'aggregation',
          aggregation: {
            property: 'title',
            aggregator: 'count',
          },
        },
      },
      searchQuery: '', // 默认搜索查询为空字符串
      userTimeZone: 'America/Phoenix', // 默认用户时区为 'America/Phoenix'
      ...loader, // 将传入的 loader 参数与默认选项合并
    },
  };

  // 调用 rpc 函数进行远程过程调用，传入 queryCollection 和查询选项
  return rpc('queryCollection', {
    collectionId,
    collectionViewId,
    ...queryCollectionBody,
  });
}
