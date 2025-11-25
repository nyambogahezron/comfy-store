import { Category } from '@/types';
import bedroomImg from '@/assets/category-bedroom.jpg';
import diningImg from '@/assets/category-dining.jpg';
import officeImg from '@/assets/category-office.jpg';
import lightingImg from '@/assets/category-lighting.jpg';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Living Room',
    slug: 'living-room',
    image: '/placeholder.svg',
    description: 'Sofas, chairs, coffee tables, and more to create your perfect living space',
  },
  {
    id: '2',
    name: 'Bedroom',
    slug: 'bedroom',
    image: bedroomImg,
    description: 'Beds, nightstands, dressers, and bedroom essentials',
  },
  {
    id: '3',
    name: 'Dining Room',
    slug: 'dining-room',
    image: diningImg,
    description: 'Dining tables, chairs, and storage for memorable meals',
  },
  {
    id: '4',
    name: 'Office',
    slug: 'office',
    image: officeImg,
    description: 'Desks, chairs, and storage solutions for productive workspaces',
  },
  {
    id: '5',
    name: 'Lighting',
    slug: 'lighting',
    image: lightingImg,
    description: 'Pendant lights, floor lamps, and table lamps',
  },
  {
    id: '6',
    name: 'Décor',
    slug: 'decor',
    image: '/placeholder.svg',
    description: 'Rugs, mirrors, artwork, and decorative accessories',
  },
];
