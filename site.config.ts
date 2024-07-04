// 这个对象包含了网站的元数据信息，比如标题、作者、描述等。可以在 Next.js 网站中使用这些信息
const SiteConfig = {
  // 网站基础信息（必填）
  // basic site info (required)
  title: "Jessie's Travel Blog",
  author: {
    name: 'Jessie', // 作者姓名
    summary: '记录旅行与日常生活', // 作者简介
    link: 'https://github.com/Jessie-jzn', // 作者链接
  },
  fullName: 'Jessie Chen',
  headerTitle: "Jessie's Travel Blog",
  description:
    'Learn more about Jessie, a passionate travel blogger who has explored many countries and shares travel tips and stories.',
  language: 'zh-CN',
  theme: 'system',
  email: 'znjessie858@gmail.com',
  locale: 'zh-CN',
  siteUrl: 'www.jessieontheroad.com/',
  domain: 'jessieontheroad.com',

  // 导航栏（必填）
  // navigation（required）
  navigationLinks: [
    {
      id: 1,
      title: '🏠首页',
      uri: '/',
    },
    {
      id: 2,
      title: '🌊攻略',
      uri: '/guide',
    },
    {
      id: 3,
      title: '☎️联系',
      uri: '/about',
    },
  ],

  // 社交媒体地址（可选）
  // social (optional)
  twitter: '',
  newsletter: '',
  linkedin: '',
  youtube: '@jessie6450',
  github: 'Jessie-jzn',

  // 默认 notion 图标和封面图像，以实现全站一致性（可选）
  // default notion icon and cover images for site-wide consistency (optional)
  defaultPageIcon: undefined,
  defaultPageCover: undefined,
  defaultPageCoverPosition: 0.5,
};
export default SiteConfig;
