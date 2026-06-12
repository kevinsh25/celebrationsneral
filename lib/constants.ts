import { Compass, PlayCircle, Gem, Eye, Image } from 'lucide-react';
import { NavTab, SceneConfig, TabId } from './types';

export const ASSET_BASE_URL = process.env.NEXT_PUBLIC_ASSET_BASE_URL || '';

// ─── Villa Visualisation CDN Config ────────────────────────────────────────
// Images should be uploaded to the R2 bucket under the paths below.
// Thumbnails: /villas/{villaId}/thumb-interiors.webp, thumb-exteriors.webp, thumb-walkthrough.webp
// Interiors:  /villas/{villaId}/interiors/01.webp, 02.webp …
// Exteriors:  /villas/{villaId}/exteriors/01.webp, 02.webp …
// Walkthrough: /villas/{villaId}/walkthrough/index.html

export interface VillaGalleryItem {
  src: string;
  label: string;
}

export interface VillaConfig {
  id: string;
  name: string;
  area: string;
  thumbImage: string; // Used on the VillaVisualisationScreen card
  interiorsThumbnail: string;
  exteriorsThumbnail: string;
  walkthroughThumbnail: string;
  floorplanThumbnail: string;
  interiors: VillaGalleryItem[];
  exteriors: VillaGalleryItem[];
  floorplans: VillaGalleryItem[];
  walkthroughUrl: string; // CDN URL for the HTML walkthrough file
}

export const VILLAS: Record<string, VillaConfig> = {
  fiesta: {
    id: 'fiesta',
    name: 'Villa Fiesta',
    area: '2260 sq ft',
    thumbImage: '/villa-fiesta.webp',
    interiorsThumbnail: `${ASSET_BASE_URL}/villas/fiesta/thumb-interiors.webp`,
    exteriorsThumbnail: `${ASSET_BASE_URL}/villas/fiesta/thumb-exteriors.webp`,
    walkthroughThumbnail: `${ASSET_BASE_URL}/villas/fiesta/thumb-walkthrough.webp`,
    floorplanThumbnail: `${ASSET_BASE_URL}/villas/fiesta/thumb-floorplan.webp`,
    interiors: [
      { src: `${ASSET_BASE_URL}/villas/fiesta/interiors/01.1_living.webp`, label: 'Living Room' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/interiors/01.2_living.webp`, label: 'Living Room 2' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/interiors/02.1_kit_din.webp`, label: 'Kitchen & Dining' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/interiors/02.2_kit_din.webp`, label: 'Kitchen & Dining 2' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/interiors/02.3_kit_din.webp`, label: 'Kitchen & Dining 3' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/interiors/03_stair_looby_gf.webp`, label: 'Stair Lobby (GF)' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/interiors/04.1_bedroom_gf.webp`, label: 'Bedroom GF' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/interiors/04.2_bedroom_gf.webp`, label: 'Bedroom GF 2' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/interiors/05._bedroom_1st_floor_rear_left.webp`, label: 'Bedroom 1F Rear' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/interiors/05.2_bedroom_1st_floor_rear_left.webp`, label: 'Bedroom 1F Rear 2' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/interiors/05.3_bedroom_1st_floor_rear_left.webp`, label: 'Bedroom 1F Rear 3' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/interiors/06.1_bedroom_1st_floor_rear_left.webp`, label: 'Bedroom 1F Left' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/interiors/06.2_bedroom_1st_floor_rear_left.webp`, label: 'Bedroom 1F Left 2' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/interiors/07.1_bedroom_1st_floor_front.webp`, label: 'Bedroom 1F Front' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/interiors/07.2_bedroom_1st_floor_front.webp`, label: 'Bedroom 1F Front 2' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/interiors/07.3_bedroom_1st_floor_front.webp`, label: 'Bedroom 1F Front 3' },
    ],
    exteriors: [
      { src: `${ASSET_BASE_URL}/villas/fiesta/exteriors/01._front.webp`, label: 'Front Facade' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/exteriors/02_ent_and_putting_green.webp`, label: 'Entrance & Putting Green' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/exteriors/03.1_rear_setback.webp`, label: 'Rear Setback' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/exteriors/04.1__sitout.webp`, label: 'Sitout' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/exteriors/04.2_sitout.webp`, label: 'Sitout 2' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/exteriors/04.4_sitout.webp`, label: 'Sitout 3' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/exteriors/05_pool.webp`, label: 'Pool' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/exteriors/06_lawn__pool.webp`, label: 'Lawn & Pool' },
    ],
    floorplans: [
      { src: `${ASSET_BASE_URL}/villas/fiesta/floorplan/ground-floor.webp`, label: 'Ground Floor Layout' },
      { src: `${ASSET_BASE_URL}/villas/fiesta/floorplan/first-floor.webp`, label: 'First Floor Layout' },
    ],
    walkthroughUrl: `${ASSET_BASE_URL}/villas/fiesta/walkthrough/index.html`,
  },
  maharaja: {
    id: 'maharaja',
    name: 'Villa Maharaja',
    area: '5000 sq ft',
    thumbImage: '/villa-maharaja.webp',
    interiorsThumbnail: `${ASSET_BASE_URL}/villas/maharaja/thumb-interiors.webp`,
    exteriorsThumbnail: `${ASSET_BASE_URL}/villas/maharaja/thumb-exteriors.webp`,
    walkthroughThumbnail: `${ASSET_BASE_URL}/villas/maharaja/thumb-walkthrough.webp`,
    floorplanThumbnail: `${ASSET_BASE_URL}/villas/maharaja/thumb-floorplan.webp`,
    interiors: [
      { src: `${ASSET_BASE_URL}/villas/maharaja/interiors/01.living__bar.webp`, label: 'Living & Bar' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/interiors/02.living_2.webp`, label: 'Living 2' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/interiors/03._bar.webp`, label: 'Bar' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/interiors/04._kitchen.webp`, label: 'Kitchen' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/interiors/05._kitchen__dining.webp`, label: 'Kitchen & Dining' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/interiors/06._dining_1.webp`, label: 'Dining 1' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/interiors/07.dining_2.webp`, label: 'Dining 2' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/interiors/08._dining_3.webp`, label: 'Dining 3' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/interiors/09.gr_bedroom_1.webp`, label: 'Grand Bedroom 1' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/interiors/10._gr_bedroom_2.webp`, label: 'Grand Bedroom 2' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/interiors/11._gr_bedrrom_2.webp`, label: 'Grand Bedroom 3' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/interiors/12._ff_front_bedroom_1.webp`, label: 'FF Front Bedroom 1' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/interiors/13._ff_front_bedroom_2.webp`, label: 'FF Front Bedroom 2' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/interiors/14._ff_front_bedroom_3.webp`, label: 'FF Front Bedroom 3' },
    ],
    exteriors: [
      { src: `${ASSET_BASE_URL}/villas/maharaja/exteriors/01.01_front.webp`, label: 'Front Facade' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/exteriors/01.02_front.webp`, label: 'Front View 2' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/exteriors/02._entrance_and_putting_green_-_right_setback.webp`, label: 'Entrance & Putting Green' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/exteriors/03.1_rear_setcback.webp`, label: 'Rear Setback' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/exteriors/03.2_rear_setback.webp`, label: 'Rear Setback 2' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/exteriors/04.1_external_sitout.webp`, label: 'External Sitout' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/exteriors/04.2_external_sitout.webp`, label: 'External Sitout 2' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/exteriors/04.3_external_sitout.webp`, label: 'External Sitout 3' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/exteriors/05._kitchen_garden__left_side_setback.webp`, label: 'Kitchen Garden' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/exteriors/06.1_pool_and_verandah.webp`, label: 'Pool & Verandah' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/exteriors/06.2_pool_and_verandah.webp`, label: 'Pool & Verandah 2' },
    ],
    floorplans: [
      { src: `${ASSET_BASE_URL}/villas/maharaja/floorplan/ground-floor.webp`, label: 'Ground Floor Layout' },
      { src: `${ASSET_BASE_URL}/villas/maharaja/floorplan/first-floor.webp`, label: 'First Floor Layout' },
    ],
    walkthroughUrl: `${ASSET_BASE_URL}/villas/maharaja/walkthrough/index.html`,
  },
};

export const SCENES: Record<TabId, SceneConfig> = {
  overview: {
    id: 'overview',
    src: `${ASSET_BASE_URL}/panos/overview/index.html`,
    title: 'Overview',
    subtitle: 'A lifestyle that balances nature and progress',
  },
  amenities: {
    id: 'amenities',
    src: `${ASSET_BASE_URL}/panos/scene-2/index.html`,
    title: 'Amenities',
    subtitle: 'Spaces curated for elevated living',
  },
  viewfrommyplot: {
    id: 'viewfrommyplot',
    src: `${ASSET_BASE_URL}/panos/viewfromplot/index.html`,
    title: 'View from My Plots',
    subtitle: '',
  },
  'virtual-tour': {
    id: 'virtual-tour',
    src: `${ASSET_BASE_URL}/panos/virtualtour/index.html`,
    title: 'Virtual Tour',
    subtitle: 'Designed for modern luxury',
  },
  gallery: {
    id: 'gallery',
    src: '', // Gallery is a modal, no dedicated pano scene needed
    title: 'Gallery',
    subtitle: 'Moments of celebration',
  },
  'villa-visualisation': {
    id: 'villa-visualisation',
    src: '', // Rendered as its own screen component, not a panorama iframe
    title: 'Villa Visualisation',
    subtitle: 'Explore our villa floor plans',
  },
};

export const NAV_TABS: NavTab[] = [
  { id: 'overview', label: 'Overview', icon: Compass },
  { id: 'viewfrommyplot', label: 'View from My Plot', icon: Eye },
  { id: 'virtual-tour', label: 'Virtual Tour', icon: PlayCircle },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'amenities', label: 'More', icon: Gem },
];
