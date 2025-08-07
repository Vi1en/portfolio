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
      className={`desktop-icon w-20 h-16 md:w-16 md:h-20 min-w-0 max-w-full ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="text-xl md:text-3xl mb-1">{icon}</div>
      <div className="pixel-font text-xs md:text-xs text-center text-foreground leading-tight min-w-0 px-1 w-full overflow-visible">
        {label}
      </div>
    </div>
  );
};