'use client';

import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react';
import { getAllEvents } from '@/api/events';
import { SidebarItem } from '@/types/sidebar';
import { EventItem } from '@/types/event'

const EventsSidebar = () => {
  const router = useRouter();
  const [eventItems, setEventItems] = useState<SidebarItem[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getAllEvents();
        const raw = Array.isArray(res) ? res : [];

        const mapped: SidebarItem[] = raw
          .filter((item: EventItem) => item.status !== 'deleted')
          .map((item: any) => {
            const description = item.description || '';
            const textOnly = description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
            const excerpt = textOnly.slice(0, 120) + (textOnly.length > 120 ? '…' : '');

            return {
              id: item._id,
              title: item.title,
              excerpt,
              date: item.date || '',
              time: item.time || '',
              category: item.category || '',
              location: item.location || '',
              type: item.type || '',
              image: Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : null,
            };
          });

        setEventItems(mapped);
      } catch (e) {
        console.error('Failed to fetch events', e);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Sidebar
      title="📅 Upcoming Events"
      items={eventItems}
      isEventSidebar={true}
      onItemClick={(item: SidebarItem) => {
        const eventId = item.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
        router.push(`/events?event=${eventId}`);
      }}
    />
  );
};

export default EventsSidebar;
