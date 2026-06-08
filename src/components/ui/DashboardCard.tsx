'use client';

import { CardConfig } from '@/types/schema';
import { cn } from '@/lib/utils';
import {
  Users, Folder, Building2, Briefcase, DollarSign,
  Activity, TrendingUp, TrendingDown, Minus, BarChart3, Box
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  users: <Users size={22} />,
  folder: <Folder size={22} />,
  building: <Building2 size={22} />,
  briefcase: <Briefcase size={22} />,
  'dollar-sign': <DollarSign size={22} />,
  activity: <Activity size={22} />,
  chart: <BarChart3 size={22} />,
};

export function DashboardCard({ title, value, icon, trend, trendDirection, variant, className }: CardConfig) {
  const trendIcon = trendDirection === 'up'
    ? <TrendingUp size={14} />
    : trendDirection === 'down'
    ? <TrendingDown size={14} />
    : <Minus size={14} />;

  const trendColor = trendDirection === 'up'
    ? 'text-emerald-400'
    : trendDirection === 'down'
    ? 'text-red-400'
    : 'text-white/50';

  const isGradient = variant === 'gradient';

  return (
    <div
      className={cn(
        'group relative rounded-xl border p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
        isGradient
          ? 'border-indigo-500/30 bg-gradient-to-br from-indigo-600/20 via-violet-600/10 to-transparent shadow-indigo-500/10'
          : variant === 'outline'
          ? 'border-white/20 bg-transparent'
          : 'border-white/10 bg-white/[0.03]',
        className
      )}
    >
      {isGradient && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-white/50 font-medium">{title || 'Card'}</p>
          <p className="text-2xl font-bold text-white tracking-tight">{value || '—'}</p>
          {trend && (
            <div className={cn('flex items-center gap-1 text-xs font-medium', trendColor)}>
              {trendIcon}
              <span>{trend}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={cn(
            'p-2.5 rounded-lg',
            isGradient
              ? 'bg-indigo-500/20 text-indigo-300'
              : 'bg-white/5 text-white/40'
          )}>
            {iconMap[icon] || <Box size={22} />}
          </div>
        )}
      </div>
    </div>
  );
}
