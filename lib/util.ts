export const formatHtml = (htmlString: string): string[] => {
  const listItems: string[] = [];

  // 使用 DOMParser 解析 HTML 字符串
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // 获取 ul 元素
  const ulElement = doc.querySelector('ul');

  if (ulElement) {
    // 遍历 ul 下的所有 li 元素，提取文本内容并存入数组
    ulElement.querySelectorAll('li').forEach((li) => {
      listItems.push(li.textContent?.trim() || '');
    });
  }

  return listItems;
};


/**
 * @timestampString 2024-02-22T15:22:31
 * @returns 格式化后的日期字符串，例如：2024年02月22日
 */
export const formatTimestampToDate = (timestampString: string): string => {
  if (!timestampString) return '';
  const timestamp = new Date(timestampString);
  const year = timestamp.getFullYear();
  const month = (timestamp.getMonth() + 1 < 10 ? '0' : '') + (timestamp.getMonth() + 1);
  const day = (timestamp.getDate() < 10 ? '0' : '') + timestamp.getDate();
  return `${year}年${month}月${day}日`;
};
