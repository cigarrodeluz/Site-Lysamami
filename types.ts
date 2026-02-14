
export interface ContentPack {
  id: string;
  title: string;
  price: string;
  items: number;
  image: string;
  tag: string;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: string;
  benefits: string[];
  color: string;
  url?: string;
  logo?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
}

export interface GiftItem {
  id: string;
  title: string;
  price: string;
  image: string;
}
