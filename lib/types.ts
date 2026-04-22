import { ElementType } from 'react';

export type TabId = 'overview' | 'viewfrommyplot' | 'virtual-tour';
export type ActionId = 'location-av' | 'product-av';

export interface SceneConfig {
  id: TabId;
  src: string;
  title: string;
  subtitle: string;
}

export interface NavTab {
  id: TabId | ActionId;
  label: string;
  icon: ElementType;
}
