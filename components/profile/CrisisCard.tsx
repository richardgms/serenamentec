import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OptimizedIcon } from '@/components/ui/OptimizedIcon';
import { CaretDown, CaretUp, Clock, MapPin, Note } from '@/lib/constants/icons';
import { Card } from '@/components/ui/Card';
import {
  CRISIS_DURATION_OPTIONS,
  CRISIS_TYPE_OPTIONS,
} from '@/lib/constants/profile';
import type { CrisisDuration, CrisisType } from '@prisma/client';

interface CrisisCardProps {
  crisis: {
    id: string;
    intensity: number;
    crisisTypes: CrisisType[];
    duration: CrisisDuration;
    whatHelped: string[];
    additionalNotes?: string | null;
    triggers?: string[] | null;
    location?: string | null;
    createdAt: string | Date;
  };
  defaultExpanded?: boolean;
}

const intensityStyles: Record<
  number,
  { label: string; badge: string; text: string }
> = {
  1: { label: 'Muito leve', badge: 'bg-emerald-100 text-emerald-600', text: 'text-emerald-600' },
  2: { label: 'Leve', badge: 'bg-lime-100 text-lime-600', text: 'text-lime-600' },
  3: { label: 'Moderada', badge: 'bg-yellow-100 text-yellow-600', text: 'text-yellow-600' },
  4: { label: 'Intensa', badge: 'bg-orange-100 text-orange-600', text: 'text-orange-600' },
  5: { label: 'Muito grave', badge: 'bg-red-100 text-red-600', text: 'text-red-600' },
};

const typeLabels = new Map(CRISIS_TYPE_OPTIONS.map((item) => [item.value, item.label]));
const durationLabels = new Map(
  CRISIS_DURATION_OPTIONS.map((item) => [item.value, item.label])
);

function formatTimestamp(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);
  const datePart = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const timePart = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return { datePart, timePart };
}

export function CrisisCard({ crisis, defaultExpanded = false }: CrisisCardProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);
  const intensity = intensityStyles[crisis.intensity] ?? intensityStyles[3];
  const { datePart, timePart } = formatTimestamp(crisis.createdAt);

  return (
    <Card className="space-y-4">
      <button
        type="button"
        onClick={() => setIsOpen((state) => !state)}
        className="flex w-full items-center justify-between text-left"
      >
        <div>
          <p className="text-xs font-semibold uppercase text-text-tertiary">{datePart}</p>
          <div className="mt-1 flex items-center gap-3">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${intensity.badge}`}>
              <span className="h-2 w-2 rounded-full bg-current" />
              {intensity.label}
            </span>
            <span className="flex items-center gap-1 text-xs text-text-tertiary">
              <OptimizedIcon icon={Clock} size={12} weight="bold" />
              {timePart}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {crisis.crisisTypes.map((type) => (
              <span
                key={type}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {typeLabels.get(type) ?? type}
              </span>
            ))}
          </div>
        </div>
        <div className="ml-4 text-primary">
          {isOpen ? (
            <OptimizedIcon icon={CaretUp} size={20} weight="bold" />
          ) : (
            <OptimizedIcon icon={CaretDown} size={20} weight="bold" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-4 overflow-hidden text-sm text-text-secondary"
          >
            <div className="grid gap-3 rounded-2xl bg-[var(--surface-card)] px-4 py-3 text-text-secondary">
              <div>
                <p className="text-xs font-semibold uppercase text-text-tertiary">
                  Duracao
                </p>
                <p className="text-sm">
                  {durationLabels.get(crisis.duration) ?? crisis.duration}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-text-tertiary">
                  O que ajudou
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {crisis.whatHelped.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-primary shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {crisis.additionalNotes && (
                <div>
                  <p className="text-xs font-semibold uppercase text-text-tertiary">
                    Notas
                  </p>
                  <p className="mt-1 inline-flex items-start gap-2 text-sm text-text-secondary">
                    <OptimizedIcon icon={Note} size={16} weight="duotone" className="mt-[2px] text-primary" />
                    {crisis.additionalNotes}
                  </p>
                </div>
              )}

              {crisis.triggers && crisis.triggers.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase text-text-tertiary">
                    Gatilhos
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {crisis.triggers.map((trigger) => (
                      <span
                        key={trigger}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {trigger}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {crisis.location && (
                <div className="flex items-start gap-2 text-sm text-text-secondary">
                  <OptimizedIcon icon={MapPin} size={16} weight="duotone" className="mt-[2px] text-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-text-tertiary">
                      Local
                    </p>
                    <p className="mt-1 text-sm">{crisis.location}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default CrisisCard;
