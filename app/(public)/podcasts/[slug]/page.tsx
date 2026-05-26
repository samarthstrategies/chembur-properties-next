import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PodcastDetailClient from './PodcastDetailClient';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/podcasts/${params.slug}`);
    if (!res.ok) return { title: 'Podcast Not Found | Chembur Properties' };
    const json = await res.json();
    const podcast = json.data;
    if (!podcast) return { title: 'Podcast Not Found | Chembur Properties' };
    return {
      title: `${podcast.title} | Podcasts | Chembur Properties`,
      description: podcast.description?.substring(0, 160) || `Listen to ${podcast.title}.`,
    };
  } catch (e) {
    return { title: 'Podcast Details | Chembur Properties' };
  }
}

export default async function SinglePodcastPage({ params }: { params: { slug: string } }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/podcasts/${params.slug}`, { next: { revalidate: 60 } });
    if (!res.ok) notFound();
    const json = await res.json();
    const podcast = json.data;
    if (!podcast) notFound();

    return <PodcastDetailClient podcast={podcast} />;
  } catch (e) {
    notFound();
  }
}
