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
  secondary: 'bg-secondary/40 text-gray-800',
  surface: 'bg-surface text-primary',
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
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
      {helper && (
        <span className="text-xs font-medium text-gray-400">{helper}</span>
      )}
    </Card>
  );
}

export default StatCard;
