import React from 'react';
import { Categories, PostCard, Loader } from '../../components';
import { getCategories, getCategoryPost } from '../../services';
import { useRouter } from 'next/router';

const PostsForCategory = ({ posts }: { posts: any }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          <div className="col-span-1 lg:col-span-8">
            {posts?.map((post: { node: any }, index: number) => (
              <PostCard post={post.node} key={index} />
            ))}
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsForCategory;

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const posts = await getCategoryPost(params.slug);
  return {
    props: { posts },
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map((category: { slug: string }) => {
      let slug = category.slug;
      return {
        params: { slug },
      };
    }),
    fallback: true,
  };
}
