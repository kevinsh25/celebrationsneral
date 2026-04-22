import { Compass, PlayCircle, Eye, Play, Film } from 'lucide-react';
import { NavTab, SceneConfig, TabId } from './types';

export const SCENES: Record<TabId, SceneConfig> = {
  overview: {
    id: 'overview',
    src: '/panos/overview/index.html',
    title: 'Overview',
    subtitle: 'A lifestyle that balances nature and progress',
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
};

export const NAV_TABS: NavTab[] = [
  { id: 'overview', label: 'Overview', icon: Compass },
  { id: 'viewfrommyplot', label: 'View from My Plot', icon: Eye },
  { id: 'virtual-tour', label: 'Virtual Tour', icon: PlayCircle },
  { id: 'location-av', label: 'Location AV', icon: Film },
  { id: 'product-av', label: 'Walkthrough AV', icon: Play },
];

export const VIDEO_URLS: Record<string, string> = {
  'location-av': 'https://www.youtube.com/embed/MbeBBPHfxn4',
  'product-av': 'https://www.youtube.com/embed/1zhYYLOgSSk',
};
