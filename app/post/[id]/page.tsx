'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from "next/link";

type Post = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
};

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`).then(async (res) => {
      if (res.status === 404) router.push('/not-found');
      else setPost(await res.json());
    });
  }, [id, router]);

  const handleDelete = async () => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    router.push('/');
  };

  if (!post) return <p className="container mt-4">Loading...</p>;

  return (
    <main className="container mt-4">
        <h1>{post.title}</h1>
        
        <p className="text-muted">
            {new Date(post.createdAt).toLocaleDateString('id-ID')}
        </p>

        <p>{post.content}</p>

        <div className="mt-3">
          <Link href="/" className="btn btn-secondary me-2">
            Home
          </Link>

          <button onClick={handleDelete} className="btn btn-danger me-2">
            Delete
          </button>

          <Link href={`/edit/${post.id}`} className="btn btn-warning">
            Edit
          </Link>
        </div>
    </main>
  );
}
