import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'social-facebook' | 'social-google';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#53B175] text-white hover:bg-[#489e68] active:bg-[#3d8a59]',
  secondary: 'bg-white text-[#53B175] border border-[#53B175] hover:bg-[#f0faf3] active:bg-[#e0f5e8]',
  'social-facebook': 'bg-[#4A66AC] text-white hover:bg-[#3f5899] active:bg-[#354b85]',
  'social-google': 'bg-[#5383EC] text-white hover:bg-[#4573d9] active:bg-[#3a64c4]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm rounded-[12px]',
  md: 'h-[52px] px-6 text-base rounded-[15px]',
  lg: 'h-[67px] px-8 text-lg rounded-[19px]',
};

const Button = ({
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  disabled = false,
  children,
  className = '',
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center justify-center font-semibold
        transition-colors duration-200 cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53B175] focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `.trim()}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
