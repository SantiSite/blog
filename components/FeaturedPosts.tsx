import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getFeaturedPosts } from '../services';
import Image from 'next/image';
import Link from 'next/link';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const FeaturedPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getFeaturedPosts()
      .then((data) => {
        console.log('Featured Posts:', data);
        setPosts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const customLeftArrow = (
      <div className="absolute arrow-btn left-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </div>
  );

  const customRightArrow = (
      <div className="absolute arrow-btn right-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
  );

  return (
    <div className="mb-8">
      <Carousel infinite customLeftArrow={customLeftArrow} customRightArrow={customRightArrow} responsive={responsive} itemClass="px-4">
        {posts?.length > 0 ? (
          posts.map((post : { node: any }) => (
            <div className="relative h-72">
              <div
                className="absolute inline-block h-72 w-full rounded-lg bg-cover bg-center bg-no-repeat shadow-md"
                style={{
                  backgroundImage: `url('${post.node.featuredImage.url}')`,
                }}
              />
              <div className="absolute h-72 w-full rounded-lg bg-gradient-to-b from-gray-400 via-gray-700 to-black bg-center opacity-50" />
              <div className="absolute flex h-full w-full flex-col items-center justify-center rounded-lg p-4">
                <p className="text-shadow mb-4 text-xs font-semibold text-white">
                  {moment(post.node.createdAt).format('MMM DD, YYYY')}
                </p>
                <p className="text-shadow mb-4 text-center text-2xl font-semibold text-white">
                  {post.node.title}
                </p>
                <div className="absolute bottom-5 flex w-full items-center justify-center">
                  <Image
                    unoptimized
                    alt={post.node.author.name}
                    height="30px"
                    width="30px"
                    className="rounded-full align-middle drop-shadow-lg"
                    src={post.node.author.photo.url}
                  />
                  <p className="text-shadow ml-2 inline align-middle font-medium text-white">
                    {post.node.author.name}
                  </p>
                </div>
              </div>
              <Link href={`/post/${post.node.slug}`}>
                <span className="absolute h-full w-full cursor-pointer" />
              </Link>
            </div>
          ))
        ) : (
          <></>
        )}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;
