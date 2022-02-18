import { request, gql } from 'graphql-request';
import { token, graphqlAPI } from '../utils/consts';

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  if (graphqlAPI != null) {
    const result = await request(graphqlAPI, query, null, {
      authorization: `Bearer ${token}`,
    });
    return result.postsConnection.edges;
  }
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  if (graphqlAPI != null) {
    const result = await request(graphqlAPI, query, null, {
      authorization: `Bearer ${token}`,
    });
    return result.posts;
  }
};

export const getSimilarPosts = async (
  categories: Array<any> | undefined,
  slug: string
) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  if (graphqlAPI != null) {
    const result = await request(
        graphqlAPI,
        query,
        {slug, categories},
        {
          authorization: `Bearer ${token}`,
        }
    );
    return result.posts;
  }
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  if (graphqlAPI != null) {
    const result = await request(graphqlAPI, query, null, {
      authorization: `Bearer ${token}`,
    });
    return result.categories;
  }
};

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;

  if (graphqlAPI != null) {
    const result = await request(
        graphqlAPI,
        query,
        {slug},
        {
          authorization: `Bearer ${token}`,
        }
    );
    return result.post;
  }
};

export const submitComment = async (obj: any) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  return result.json();
};

export const getComments = async (slug: string) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  if (graphqlAPI != null) {
    const result = await request(
        graphqlAPI,
        query,
        {slug},
        {
          authorization: `Bearer ${token}`,
        }
    );
    return result.comments;
  }
};

export const getCategoryPost = async (slug: string) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              name
              photo {
                url
              }
              id
              bio
            }
            createdAt
            excerpt
            featuredImage {
              url
            }
            slug
            title
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  if (graphqlAPI != null) {
    const result = await request(
        graphqlAPI,
        query,
        {slug},
        {
          authorization: `Bearer ${token}`,
        }
    );
    return result.postsConnection.edges;
  }
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection(where: { featuredPost: true }) {
        edges {
          node {
            author {
              name
              photo {
                url
              }
              id
            }
            createdAt
            slug
            title
            featuredImage {
              url
            }
          }
        }
      }
    }
  `;

  if (graphqlAPI != null) {
    const result = await request(graphqlAPI, query, null, {
      authorization: `Bearer ${token}`,
    });
    return result.postsConnection.edges;
  }
};
