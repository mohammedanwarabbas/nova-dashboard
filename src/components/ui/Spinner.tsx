import React from 'react';

interface SpinnerProps {
  className?: string;
  size?: number;
  color?: string;
  text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  className = '', 
  size = 48, 
  color = 'border-blue-500',
  text 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`animate-spin rounded-full border-b-2 ${color}`}
        style={{ 
          height: `${size}px`, 
          width: `${size}px` 
        }}
      />
      
      {text && (
        <p className="mt-4 text-gray-600">
          {text}
        </p>
      )}
    </div>
  );
};

export default Spinner;