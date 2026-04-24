import { Compass, PlayCircle, Gem, Eye, Image } from 'lucide-react';
import { NavTab, SceneConfig, TabId } from './types';

export const SCENES: Record<TabId, SceneConfig> = {
  overview: {
    id: 'overview',
    src: '/panos/overview/index.html',
    title: 'Overview',
    subtitle: 'A lifestyle that balances nature and progress',
  },
  amenities: {
    id: 'amenities',
    src: '/panos/scene-2/index.html',
    title: 'Amenities',
    subtitle: 'Spaces curated for elevated living',
  },
  viewfrommyplot: {
    id: 'viewfrommyplot',
    src: '/panos/viewfromplot/index.html',
    title: 'View from My Plots',
    subtitle: '',
  },
  'virtual-tour': {
    id: 'virtual-tour',
    src: '/panos/virtualtour/index.html',
    title: 'Virtual Tour',
    subtitle: 'Designed for modern luxury',
  },
  gallery: {
    id: 'gallery',
    src: '', // Gallery is a modal, no dedicated pano scene needed
    title: 'Gallery',
    subtitle: 'Moments of celebration',
  },
};

export const NAV_TABS: NavTab[] = [
  { id: 'overview', label: 'Overview', icon: Compass },
  { id: 'viewfrommyplot', label: 'View from My Plot', icon: Eye },
  { id: 'virtual-tour', label: 'Virtual Tour', icon: PlayCircle },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'amenities', label: 'More', icon: Gem },
];
