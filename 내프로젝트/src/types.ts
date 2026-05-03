export type Platform =
  | 'instagram-post'
  | 'instagram-story'
  | 'kakao'
  | 'linkedin'
  | 'thread';

export type CardPosition = 'hook' | 'context' | 'core' | 'proof' | 'cta';

export interface CardNewsInput {
  slug: string;
  title: string;
  summary: string;
  body: string;
  stat?: {
    value: string;
    label: string;
    source?: string;
  };
  cta: {
    text: string;
    url?: string;
  };
  imagePath?: string;
  platforms: Platform[];
  backgroundColor?: 'primary' | 'secondary';
}

export interface CardData {
  cardId: string;
  position: CardPosition;
  content: string;
  title?: string;
  stat?: { value: string; label: string; source?: string };
  imagePath?: string;
  backgroundColor?: 'primary' | 'secondary';
  index: number;
  total: number;
}

export interface PlatformSpec {
  width: number;
  height: number;
  safeZone: { top: number; bottom: number; horizontal: number };
  maxCards: number;
  format: 'png' | 'jpg';
}

export const PLATFORM_SPECS: Record<Platform, PlatformSpec> = {
  'instagram-post':  { width: 1080, height: 1080, safeZone: { top: 80,  bottom: 100, horizontal: 60 }, maxCards: 10, format: 'png' },
  'instagram-story': { width: 1080, height: 1920, safeZone: { top: 140, bottom: 200, horizontal: 60 }, maxCards: 5,  format: 'png' },
  'kakao':           { width: 800,  height: 800,  safeZone: { top: 60,  bottom: 80,  horizontal: 48 }, maxCards: 8,  format: 'jpg' },
  'linkedin':        { width: 1200, height: 628,  safeZone: { top: 60,  bottom: 80,  horizontal: 60 }, maxCards: 6,  format: 'png' },
  'thread':          { width: 1080, height: 1080, safeZone: { top: 80,  bottom: 100, horizontal: 60 }, maxCards: 10, format: 'png' },
};
