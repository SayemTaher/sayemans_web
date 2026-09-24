import {
  ArrowRight, ArrowUpRight, Sparkles, Layers, Code2, Smartphone, Rocket, Palette, LineChart, ShieldCheck,
  Menu, X, Sun, Moon, Monitor, Check, Mail, MapPin, Building2, Cloud, Cpu, Workflow, Boxes, Gauge, Globe,
  Apple, Flame, Star, BookOpen, Headphones, Trophy, LogOut, Loader2, Plus, Minus, Compass, PenTool, Server,
  LifeBuoy, BarChart3, Users, Zap, Lock, Clock, Calendar, ChevronDown, Inbox, MousePointerClick, Eye,
} from 'lucide-react';

const Instagram = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);
const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const icons = {
  ArrowRight, ArrowUpRight, Sparkles, Layers, Code2, Smartphone, Rocket, Palette, LineChart, ShieldCheck,
  Menu, X, Sun, Moon, Monitor, Check, Mail, MapPin, Building2, Cloud, Cpu, Workflow, Boxes, Gauge, Globe,
  Apple, Flame, Star, BookOpen, Headphones, Trophy, LogOut, Loader2, Plus, Minus, Compass, PenTool, Server,
  LifeBuoy, BarChart3, Users, Zap, Lock, Clock, Calendar, ChevronDown, Inbox, MousePointerClick, Eye,
  Instagram, Linkedin,
};

export default function Icon({ name, size = 20, className = '', strokeWidth = 1.75, ...rest }) {
  const Cmp = icons[name] ?? Sparkles;
  return <Cmp width={size} height={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" {...rest} />;
}
