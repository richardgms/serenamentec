import { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  helper?: string;
  accent?: 'primary' | 'secondary' | 'surface';
}

const accentStyles: Record<NonNullable<StatCardProps['accent']>, string> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/40 text-text-primary',
  surface: 'bg-[var(--surface-card)] text-primary',
};

export function StatCard({
  icon,
  label,
  value,
  helper,
  accent = 'surface',
}: StatCardProps) {
  return (
    <Card className="flex items-center justify-between gap-4 p-5">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accentStyles[accent]}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-text-tertiary">{label}</p>
          <p className="text-xl font-semibold text-text-primary">{value}</p>
        </div>
      </div>
      {helper && (
        <span className="text-xs font-medium text-text-tertiary">{helper}</span>
      )}
    </Card>
  );
}

export default StatCard;
