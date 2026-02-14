
import { SubscriptionTier, SocialLink, ServiceItem, GiftItem } from './types';

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Instagram', url: '#', icon: '📸', color: 'bg-gradient-to-r from-purple-400 to-pink-500' },
  { name: 'Twitter / X', url: '#', icon: '🐦', color: 'bg-black text-white' },
  { name: 'Telegram', url: '#', icon: '✈️', color: 'bg-sky-500 text-white' },
  { name: 'TikTok', url: '#', icon: '🎵', color: 'bg-slate-900 text-white' },
];

export const PLATFORM_LINKS = [
  { 
    name: 'Privacy', 
    url: 'https://privacy.com.br/checkout/lysamami', 
    icon: '🍑', 
    logo: 'https://i.ibb.co/KcWP8zbk/como-ganhar-dinheiro-no-privacy.png',
    description: 'Conteúdo exclusivo nacional', 
    color: 'from-orange-400 to-rose-400' 
  },
  { 
    name: 'OnlyFans', 
    url: 'https://onlyfans.com/u153746507', 
    icon: '💎', 
    logo: 'https://i.ibb.co/0RzhPJZf/onlyfans-logo-on-transparent-isolated-background-free-vector.png',
    description: 'Exclusive international feed', 
    color: 'from-sky-400 to-blue-500' 
  },
  { 
    name: 'Telegram VIP', 
    url: 'https://t.me/+QA1dJ3MScNdiZmRh', 
    icon: '✈️', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png',
    description: 'Grupo de avisos e mimos', 
    color: 'from-cyan-400 to-blue-400' 
  },
  { 
    name: 'Livepix', 
    url: 'https://livepix.gg/privacylysamami', 
    icon: '💸', 
    logo: 'https://i.ibb.co/wZ78k6q5/unnamed-2-1.png',
    description: 'Mande um mimo ou desafio', 
    color: 'from-green-400 to-emerald-500' 
  },
  { 
    name: 'Wise', 
    url: 'https://wise.com/pay/me/isabelac337', 
    icon: '🌍', 
    logo: 'https://d21buns5ku92am.cloudfront.net/69645/images/470451-Frame%2039321-0745ed-medium-1677657684.png',
    description: 'Pagamentos internacionais', 
    color: 'from-indigo-400 to-purple-500' 
  },
  { 
    name: 'Discord', 
    url: 'https://discord.gg/5NDcQfvF', 
    icon: '👾', 
     logo: 'https://static.vecteezy.com/system/resources/thumbnails/018/930/718/small/discord-logo-discord-icon-transparent-free-png.png',
    description: 'Comunidade e Chat', 
    color: 'from-indigo-500 to-indigo-700' 
  },
];

export const SUBSCRIPTIONS: SubscriptionTier[] = [
  { 
    id: 'privacy', 
    name: 'Privacy', 
    price: 'R$ 19,90/mês', 
    benefits: [
      'Conteúdo em Português', 
      'Acesso ao feed completo', 
      'Pagamento via PIX',
      'Chat para assinantes'
    ], 
    color: 'border-orange-100',
    url: 'https://privacy.com.br/checkout/lysamami',
    logo: 'https://i.ibb.co/KcWP8zbk/como-ganhar-dinheiro-no-privacy.png'
  },
  { 
    id: 'onlyfans', 
    name: 'OnlyFans', 
    price: '$ 5,99/mês', 
    benefits: [
      'International Content', 
      'Full HD Videos', 
      'Priority DM access', 
      'Exclusive Photos'
    ], 
    color: 'border-sky-100',
    url: 'https://onlyfans.com/u153746507',
    logo: 'https://i.ibb.co/0RzhPJZf/onlyfans-logo-on-transparent-isolated-background-free-vector.png'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  { id: 's1', title: 'Chamada de Vídeo', description: '15 minutos de conexão real e privada comigo via app.', price: 'R$ 150,00', icon: '📹' },
  { id: 's2', title: 'Sexting Experience', description: '30 minutos de chat intenso com fotos e áudios exclusivos.', price: 'R$ 80,00', icon: '🔞' },
  { id: 's3', title: 'Close Friends', description: 'Acesso vitalício aos meus stories mais íntimos e secretos.', price: 'R$ 50,00', icon: '⭐️' },
];

export const GIFTS_DATA: GiftItem[] = [
  { id: 'g1', title: 'Cafézinho de Manhã', price: 'R$ 15,00', image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=400&h=500&fit=crop' },
  { id: 'g2', title: 'Conjunto Lingerie', price: 'R$ 130,00', image: 'https://images.unsplash.com/photo-1582232014285-13936611417f?w=400&h=500&fit=crop' },
  { id: 'g3', title: 'Jantar Romântico', price: 'R$ 200,00', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=500&fit=crop' },
];
