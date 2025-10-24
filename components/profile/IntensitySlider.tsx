import { ChangeEvent } from 'react';

interface IntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const marks = [
  { value: 1, label: 'Muito leve', color: 'bg-emerald-400' },
  { value: 2, label: 'Leve', color: 'bg-lime-400' },
  { value: 3, label: 'Moderada', color: 'bg-yellow-400' },
  { value: 4, label: 'Intensa', color: 'bg-orange-400' },
  { value: 5, label: 'Muito grave', color: 'bg-red-500' },
];

export function IntensitySlider({ value, onChange }: IntensitySliderProps) {
  const selected = marks.find((mark) => mark.value === value) ?? marks[2];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value);
    onChange(nextValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-secondary">Intensidade</span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${selected.color}`}>
          {selected.label}
        </span>
      </div>
      <div className="relative">
        <div className="absolute inset-x-1 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-red-500" />
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={value}
          onChange={handleChange}
          aria-label="Intensidade da crise"
          aria-valuenow={value}
          aria-valuemin={1}
          aria-valuemax={5}
          aria-valuetext={selected.label}
          className="relative z-10 w-full appearance-none bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        />
        <div className="mt-3 flex justify-between">
          {marks.map((mark) => (
            <span
              key={mark.value}
              className="w-16 text-center text-[10px] font-medium text-text-tertiary"
            >
              {mark.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IntensitySlider;
