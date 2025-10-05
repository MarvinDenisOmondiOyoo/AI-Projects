import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
  const baseClasses = `
    px-6 py-2.5 font-semibold rounded-lg shadow-md
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition-all duration-300 ease-in-out
    disabled:cursor-not-allowed disabled:shadow-none
    flex items-center justify-center gap-2
    transform hover:-translate-y-0.5
  `;

  const variantClasses = {
    primary: `
      text-white bg-brand-primary hover:bg-brand-dark 
      focus:ring-brand-primary disabled:bg-slate-300
    `,
    outline: `
      text-brand-primary bg-transparent border border-brand-primary
      hover:bg-brand-light focus:ring-brand-primary
      disabled:bg-transparent disabled:border-slate-300 disabled:text-slate-400
    `,
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
