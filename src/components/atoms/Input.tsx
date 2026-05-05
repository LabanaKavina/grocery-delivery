import type { InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  onChange: (value: string) => void;
}

const Input = ({
  label,
  error,
  onChange,
  id,
  className = '',
  ...rest
}: InputProps) => {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm text-[#7C7C7C] font-medium"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error && inputId ? `${inputId}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`
          h-[52px] px-4 text-base rounded-[15px] border outline-none
          transition-colors duration-200
          focus:ring-2 focus:ring-[#53B175] focus:ring-offset-1
          ${error ? 'border-red-500' : 'border-[#E2E2E2]'}
          ${className}
        `.trim()}
        {...rest}
      />
      {error && inputId && (
        <p id={`${inputId}-error`} role="alert" className="text-sm text-red-500 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
