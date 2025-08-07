import React from 'react';

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
  className?: string;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  icon,
  label,
  onClick,
  className = ''
}) => {
  return (
    <div 
      className={`desktop-icon w-12 h-16 md:w-16 md:h-20 ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="text-2xl md:text-3xl mb-1">{icon}</div>
      <div className="pixel-font text-xs text-center text-foreground leading-tight">
        {label}
      </div>
    </div>
  );
};