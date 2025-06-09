import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-all duration-200';
  const variants = {
    primary: 'bg-pink-600 text-white hover:bg-pink-700',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    outline: 'border-2 border-pink-600 text-pink-600 hover:bg-pink-50'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
