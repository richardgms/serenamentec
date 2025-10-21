interface ToggleSwitchProps {
  label: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  onToggle: (checked: boolean) => void;
}

export function ToggleSwitch({
  label,
  description,
  checked,
  disabled = false,
  onToggle,
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onToggle(!checked)}
      className={`flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 transition-smooth tap-highlight-none touch-feedback ${
        disabled ? 'opacity-60' : 'hover:border-primary/60'
      }`}
    >
      <div className="text-left">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {description && (
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        )}
      </div>
      <div
        className={`relative h-6 w-11 rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </div>
    </button>
  );
}

export default ToggleSwitch;
