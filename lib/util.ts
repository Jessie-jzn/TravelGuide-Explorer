import { LANG } from './constants';
/**
 * 格式化日期
 * @timestampString 2024-02-22T15:22:31
 * @returns 格式化后的日期字符串，例如：2024年02月22日
 */
export const formatTimestampToDate = (timestampString: string): string => {
  if (!timestampString) return '';
  const timestamp = new Date(timestampString);
  const year = timestamp.getFullYear();
  const month =
    (timestamp.getMonth() + 1 < 10 ? '0' : '') + (timestamp.getMonth() + 1);
  const day = (timestamp.getDate() < 10 ? '0' : '') + timestamp.getDate();
  return `${year}年${month}月${day}日`;
};
/**
 * 格式化日期
 * @param date 日期字符串或日期对象
 * @param locale 本地化字符串
 * @returns 格式化后的日期字符串
 */
export const formatDate = (
  date: string | Date,
  locale: string = 'zh-CN',
): string => {
  if (!date || !locale) return date ? date.toString() : '';

  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const res = d.toLocaleDateString(locale, options);

  // 如果格式是中文日期，则转为横杆
  const format =
    locale.slice(0, 2).toLowerCase() === 'zh'
      ? res.replace('年', '-').replace('月', '-').replace('日', '')
      : res;

  return format;
};
/**
 * 深拷贝对象
 * 根据源对象类型深度复制，支持object和array
 * @param {*} obj
 * @returns
 */
export const deepClone = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    // If obj is an array, create a new array and deep clone each element
    return obj.map((item) => deepClone(item)) as unknown as T;
  } else if (obj && typeof obj === 'object') {
    const newObj: { [key: string]: any } = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (value instanceof Date) {
          newObj[key] = new Date(value.getTime());
        } else {
          newObj[key] = deepClone(value);
        }
      }
    }
    return newObj as T;
  } else {
    return obj;
  }
};
/**
 * // 将从 Notion 数据库获取的结果格式化为表格样式
 * @param pages
 * @returns
 */
export const formatDatabase = (pages: any) => {
  return pages.map((page: any) => {
    // 提取 properties 的值
    const properties = page.properties;

    // 遍历 properties 并提取每个属性的值
    const extractedProperties = Object.keys(properties).reduce(
      (acc, key) => {
        const property = properties[key];

        let value;

        switch (property.type) {
          case 'title':
            value = property.title[0]?.plain_text || '';
            break;
          case 'rich_text':
            value = property.rich_text[0]?.plain_text || '';
            break;
          case 'date':
            value = property.date?.start || '';
            break;
          case 'multi_select':
            value = property.multi_select.map((tag: any) => tag.name);
            break;
          case 'relation':
            value = property.relation.map((rel: any) => rel.id);
            break;
          default:
            value = null;
        }

        acc[key] = value;
        return acc;
      },
      {} as { [key: string]: any },
    );

    const cover = page?.cover?.external?.url || null;

    return {
      id: page.id,
      cover,
      url: page.url,
      image:
        'https://cdn.aglty.io/blog-starter-2021-template/posts/virtual-tour_20210331171226_0.jpg?format=auto&w=480',
      ...extractedProperties,
    };
  });
};

export const formatPostBlock = (blockMap: any, pageId: string) => {
  const postInfo = blockMap?.block?.[pageId].value;
  return {
    id: pageId,
    type: postInfo.type,
    category: '',
    tags: [],
    title: postInfo?.properties?.title?.[0]?.[0],
    status: 'Published',
    createdTime: formatDate(new Date(postInfo.created_time).toString(), LANG),
    lastEditedDay: formatDate(
      new Date(postInfo?.last_edited_time).toString(),
      LANG,
    ),
    fullWidth: postInfo?.fullWidth || false,
    date: {
      start_date: formatDate(
        new Date(postInfo?.last_edited_time).toString(),
        LANG,
      ),
    },
    blockMap,
  };
};
