import { ElementType } from 'react';

export type TabId = 'overview' | 'amenities' | 'viewfrommyplot' | 'virtual-tour';

export interface SceneConfig {
  id: TabId;
  src: string;
  title: string;
  subtitle: string;
}

export interface NavTab {
  id: TabId;
  label: string;
  icon: ElementType;
}
