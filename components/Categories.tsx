import React, { useState, useEffect } from 'react';
import { getCategories } from '../services';
import Link from 'next/link';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
  }, []);

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-4 shadow-lg max-h-64 overflow-auto">
      <h3 className="pg-4 mb-8 border-b text-xl font-semibold">Categories</h3>
      {categories?.map((category: any) => (
        <Link href={`/category/${category.slug}`} key={category.slug}>
          <span className="mb-3 block cursor-pointer pb-3">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
