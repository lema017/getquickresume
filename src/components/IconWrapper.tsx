import React from 'react';
import { 
  Gift, 
  Brain, 
  Sparkles, 
  BarChart,
  BarChart2, 
  ShieldCheck, 
  Download, 
  FileText, 
  Award, 
  Target, 
  Globe, 
  UserPlus, 
  Edit3, 
  Zap, 
  CreditCard,
  HelpCircle,
  CheckCircle,
  Shield,
  ArrowRight,
  Star,
  Send,
  Layout,
  QrCode,
  Coins,
  Briefcase,
  SpellCheck,
  LineChart,
  Share2,
  TrendingUp
} from 'lucide-react';

interface IconWrapperProps {
  name: string;
  className?: string;
}

const iconMap = {
  'gift': Gift,
  'brain': Brain,
  'sparkles': Sparkles,
  'chart-bar': BarChart2,
  'bar-chart': BarChart,
  'bar-chart-2': BarChart2,
  'shield-check': ShieldCheck,
  'download': Download,
  'file-text': FileText,
  'award': Award,
  'target': Target,
  'globe': Globe,
  'user-plus': UserPlus,
  'edit-3': Edit3,
  'zap': Zap,
  'credit-card': CreditCard,
  'help-circle': HelpCircle,
  'check-circle': CheckCircle,
  'shield': Shield,
  'arrow-right': ArrowRight,
  'star': Star,
  'send': Send,
  'layout': Layout,
  'qr-code': QrCode,
  'coins': Coins,
  'briefcase': Briefcase,
  'spell-check': SpellCheck,
  'line-chart': LineChart,
  'share-2': Share2,
  'trending-up': TrendingUp,
};

export function IconWrapper({ name, className = "w-6 h-6" }: IconWrapperProps) {
  const IconComponent = iconMap[name as keyof typeof iconMap];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return <div className={className} />;
  }
  
  return <IconComponent className={className} />;
}
