'use client';

import Link from 'next/link';
import React from 'react';
import { listPosts } from '@/lib/s3';

export default async function BlogIndex() {
  const bucket = process.env.BLOG_S3_BUCKET;
  if (!bucket) {
    return (
      <main className='mx-auto p-8'>
        <h1 className='text-2xl font-bold'>Blog</h1>
        <p className='mt-4 text-red-600'>Please set the BLOG_S3_BUCKET environment variable.</p>
      </main>
    );
  }

  let posts: string[] = [];
  try {
    posts = await listPosts(bucket);
  } catch (err) {
    return (
      <main className='mx-auto p-8'>
        <h1 className='text-2xl font-bold'>Blog</h1>
        <p className='mt-4 text-red-600'>Failed to list posts: {String(err)}</p>
      </main>
    );
  }

  return (
    <main className='mx-auto p-8'>
      <h1 className='text-2xl font-bold'>Blog</h1>
      <ul className='mt-6 space-y-3'>
        {posts.length === 0 && <li>No posts found in S3 bucket.</li>}
        {posts.map((key) => (
          <li key={key}>
            <Link href={`/blog/${encodeURIComponent(key)}`} className='text-blue-600 underline'>
              {key}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
