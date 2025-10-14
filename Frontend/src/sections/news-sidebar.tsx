'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { getAllNewsBlogs } from '@/api/news-blogs';
import { SidebarItem } from '@/types/sidebar'

const NewsSidebar = () => {
  const router = useRouter();
  const [newsItems, setNewsItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getAllNewsBlogs();
        const raw = Array.isArray(res) ? res : []

        const mapped: SidebarItem[] = raw
          .filter((item: any) => item.status !== 'deleted')
          .map((item: any) => {
            const description = item.description || ''
            const textOnly = description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
            const excerpt = textOnly.slice(0, 120) + (textOnly.length > 120 ? '…' : '')
            return {
              id: item._id,
              title: item.title,
              excerpt,
              date: item.date || '',
              time: item.time || '',
              category: item.category || '',
              author: item.author || '',
              image: Array.isArray(item.images) ? item.images[0] || '' : '',
            }
          })

        setNewsItems(mapped)
      } catch (e) {
        console.error('Failed to fetch news blogs', e)
      }
    }
    fetchNews()
  }, [])

  return (
    <Sidebar
      title="📰 Writer's Hub"
      items={newsItems}
      isEventSidebar={false}
      onItemClick={(item: SidebarItem) => {
        const articleId = item.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
        router.push(`/news-blogs?article=${articleId}`);
      }}
    />
  );
};

export default NewsSidebar;
