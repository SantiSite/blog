import React, { useState, useEffect } from 'react';
import moment from 'moment/moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }: { categories?: Array<any>, slug?: string }) => {
  const [relatedPosts, setRelatedPost] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPost(result)
      );
    } else {
      getRecentPosts().then((result) => {
        setRelatedPost(result);
      });
    }
  }, [slug]);

  return (
    <div className="mb-8 rounded-lg bg-white p-4 shadow-lg max-h-64 overflow-auto">
      <h3 className="pg-4 mb-8 border-b text-xl font-semibold">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post: any) => (
        <div key={post.title} className="mb-4 flex w-full items-center">
          <div className="w-16 flex-none">
            <img
              src={post.featuredImage.url}
              alt={post.title}
              height="60px"
              width="60px"
              className="rounded-full align-middle"
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="font-xs text-gray-500">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link
              href={`/post/${post.slug}`}
              key={post.title}
              // @ts-ignore
              className="text-md"
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
