import Link from 'next/link';

const About = () => {
  return (
    <div className="flex-auto mx-auto w-full px-4 sm:px-8 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-5xl flex ">
        <div>
          <div className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            👋 Hi, I’m Jessie.
          </div>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p className="font-medium">
              大家好，我是Jessie，一个热爱旅行的旅行博主。
            </p>
            <p>我很高兴有机会与你分享我的旅行经历和见闻。</p>
            <p>
              我曾旅行过中国的每一个省份，感受了这个古老而多彩的国家的文化和风景。
              从北方的冰雪世界到南方的热带天堂，我一路穿越，留下了无数珍贵的回忆。
              除了中国，我还曾踏足日本、泰国、马来西亚、菲律宾、哈萨克斯坦、乌兹别克斯坦和土耳其等国家。
            </p>
            <p>
              每一次旅行都是一次新的冒险，我喜欢探索不同国家的文化、历史和美食，与当地人交流，感受他们的生活方式。
              作为一名旅行博主，我专注于分享旅行攻略和经验。
            </p>
            <p>
              我致力于为旅行者提供实用的建议和有趣的故事，帮助他们规划和享受自己的旅程。
              我相信，旅行不仅是探索未知，更是发现自我，我希望通过我的博客，能够激励更多的人踏上旅程，探索这个美丽而神奇的世界。
              感谢你们的关注和支持，让我们一起共享旅行的乐趣，开启新的冒险之旅！
            </p>
            <p>
              如果你有任何旅行上的疑问或者想要了解更多信息，欢迎随时联系我。
              期待与你们一起分享更多精彩的旅行故事！
            </p>
          </div>
        </div>
        <div className="ml-10">
          <Link
            href="/about"
            className="group mt-3 flex items-center text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
            >
              <path d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"></path>
            </svg>
            <span className="ml-4">znchenjiax@foxmain.com</span>
          </Link>
          <Link
            href="/"
            className="group mt-3 flex items-center text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
            >
              <path d="M20.055 7.983c.011.174.011.347.011.523 0 5.338-3.92 11.494-11.09 11.494v-.003A10.755 10.755 0 0 1 3 18.186c.308.038.618.057.928.058a7.655 7.655 0 0 0 4.841-1.733c-1.668-.032-3.13-1.16-3.642-2.805a3.753 3.753 0 0 0 1.76-.07C5.07 13.256 3.76 11.6 3.76 9.676v-.05a3.77 3.77 0 0 0 1.77.505C3.816 8.945 3.288 6.583 4.322 4.737c1.98 2.524 4.9 4.058 8.034 4.22a4.137 4.137 0 0 1 1.128-3.86A3.807 3.807 0 0 1 19 5.274a7.657 7.657 0 0 0 2.475-.98c-.29.934-.9 1.729-1.713 2.233A7.54 7.54 0 0 0 22 5.89a8.084 8.084 0 0 1-1.945 2.093Z"></path>
            </svg>
            <span className="ml-4">Follow on Twitter</span>
          </Link>

          <a
            href="https://github.com/Jessie-jzn"
            className="group mt-3 flex items-center text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
            >
              <path d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"></path>
            </svg>
            <span className="ml-4">Follow on GitHub</span>
          </a>
          <a
            href="https://github.com/Jessie-jzn"
            className="group mt-3 flex items-center text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
            >
              <path d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"></path>
            </svg>
            <span className="ml-4">Follow on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};
export default About;
