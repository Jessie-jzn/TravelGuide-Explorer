// 这个对象包含了网站的元数据信息，比如标题、作者、描述等。可以在 Next.js 网站中使用这些信息
export const SiteMetaData = {
  title: "Jessie's Blog", // 网站标题
  author: {
    name: 'Jessie', // 作者姓名
    summary: '记录旅行与日常生活', // 作者简介
    link: 'https://github.com/Jessie-jzn', // 作者链接
  },
  description: 'A blog created with Next.js and Tailwind.css', // 网站描述
  siteUrl: 'https://nextjs-starter-blog-new-demo.vercel.app/', // 网站链接
  language: 'Chinese', // 语言
  social: {
    GitHub: 'Jessie', // Twitter 账号
  },
};

export const NavBarData = [
  {
    title: '👩关于我',
    href:'/about',
  },
  {
    title: '🇨🇳中国',
    href:'/travel',
  },
  {
    title: '🇯🇵日本',
    href:'/travel',
  },
  {
    title: '🇲🇾马来西亚',
    href:'/travel',
  },
  {
    title: '🇵🇭菲律宾',
    href:'/travel',
  },
  {
    title: '☎️联系',
    href:'/contact',
  },
];
