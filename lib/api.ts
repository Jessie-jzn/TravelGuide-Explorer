import { MenuItem } from './type';

interface ApiResponse {
  data: any;
  errors?: any[];
}

const API_URL = process.env.WORDPRESS_API_URL || 'https://jessietravel69.wpcomstaging.com/graphql';

async function fetchAPI(query: string = '', variables: Record<string, any> = {}): Promise<any> {
  try {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };

    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
    }

    const res = await fetch(API_URL, {
      headers,
      method: 'POST',
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json: ApiResponse = await res.json();
    if (json.errors) {
      console.error(json.errors);
      throw new Error('获取 API 数据失败');
    }
    return json.data;
  } catch (error: any) {
    console.error('获取 API 数据时出错：', error);
    throw new Error('获取 API 数据失败');
  }
}

export async function getAllMenu(preview = false): Promise<MenuItem[]> {
  const data = await fetchAPI(
    `query getMenuQuery {
      pages {
        nodes {
          id
          slug
          title
          uri
        }
      }
    }`,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.pages?.nodes;
}

export async function getAllPosts(): Promise<any[]> {
  const data = await fetchAPI(
    `query getAllPostQuery {
        posts {
          edges {
            node {
              title
              excerpt
              slug
              date
              id
              content
              categories {
                edges {
                  node {
                    name
                  }
                }
              }
              featuredImage {
                node {
                  sourceUrl
                  title
                }
              }
              uri
            }
          }
        }
      }
    `,
    {
      variables: {
        onlyEnabled: true,
        preview: false,
      },
    }
  );
  return data?.posts?.edges;
}

export async function getSinglePost(id: string, preview: boolean): Promise<any> {
  const data = await fetchAPI(
    `query getSinglePost($id: ID!) {
      post(id: $id) {           
        title
        categories {
          edges {
            node {
              name
            }
          }
        }
        excerpt
        content
        slug
        id
        author {
          node {
            name
            firstName
            lastName
          }
        }
      }
    }
  `,
    {
      id,
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.post;
}

export async function getAllPostsWithId(): Promise<any[]> {
  const data = await fetchAPI(`
    query getAllPostsWithId {
      posts(first: 10000) {
        edges {
          node {
            id
          }
        }
      }
    }
  `);
  return data?.posts;
}
