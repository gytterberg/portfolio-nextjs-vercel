'use client';

import React from 'react';
import { getPost } from '@/lib/s3';

type Props = {
  params: { key: string[] };
};

export default async function PostPage({ params }: Props) {
  const bucket = process.env.BLOG_S3_BUCKET;
  if (!bucket) {
    return (
      <main className='mx-auto p-8'>
        <h1 className='text-2xl font-bold'>Blog</h1>
        <p className='mt-4 text-red-600'>Please set the BLOG_S3_BUCKET environment variable.</p>
      </main>
    );
  }

  const key = params.key.join('/');

  let content = '';
  try {
    content = await getPost(bucket, key);
  } catch (err) {
    return (
      <main className='mx-auto p-8'>
        <h1 className='text-2xl font-bold'>{key}</h1>
        <p className='mt-4 text-red-600'>Failed to fetch post: {String(err)}</p>
      </main>
    );
  }

  return (
    <main className='mx-auto p-8'>
      <h1 className='text-2xl font-bold'>{key}</h1>
      <article className='mt-4 rounded bg-slate-50 p-6 whitespace-pre-wrap'>
        <pre className='whitespace-pre-wrap'>{content}</pre>
      </article>
    </main>
  );
}
