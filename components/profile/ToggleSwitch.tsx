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
      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 transition-smooth tap-highlight-none touch-feedback focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        disabled ? 'opacity-60' : 'hover:border-primary/60'
      }`}
      style={{
        border: '2px solid var(--border-light)',
        backgroundColor: 'var(--surface-card)'
      }}
    >
      <div className="text-left">
        <p className="text-sm font-medium text-text-primary">{label}</p>
        {description && (
          <p className="mt-1 text-xs text-text-tertiary">{description}</p>
        )}
      </div>
      <div
        className="relative h-6 w-11 rounded-full transition-colors"
        style={{
          backgroundColor: checked ? 'var(--primary)' : 'var(--border-medium)'
        }}
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
