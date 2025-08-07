import React, { useState, useRef, useEffect } from 'react';
import { X, Minimize2, Square } from 'lucide-react';

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  onClose?: () => void;
  minimizable?: boolean;
  closable?: boolean;
  className?: string;
  isTerminal?: boolean;
}

export const RetroWindow: React.FC<RetroWindowProps> = ({
  title,
  children,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 400, height: 300 },
  onClose,
  minimizable = true,
  closable = true,
  className = '',
  isTerminal = false
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!windowRef.current) return;
    
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const windowClasses = isTerminal ? 'terminal-window' : 'retro-window';

  return (
    <div
      ref={windowRef}
      className={`absolute z-10 ${windowClasses} ${className} responsive-retro-window`}
      style={{
        left: position.x,
        top: position.y,
        width: initialSize.width,
        height: initialSize.height,
        minWidth: 250,
        minHeight: 150,
        maxWidth: '100vw',
        maxHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <div 
        className="retro-window-header cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <span className="text-window-title">{title}</span>
        <div className="flex items-center gap-1">
          {minimizable && (
            <button className="w-4 h-4 bg-yellow-500 border border-yellow-600 hover:bg-yellow-400">
              <Minimize2 className="w-2 h-2 m-auto" />
            </button>
          )}
          {closable && (
            <button 
              className="w-4 h-4 bg-red-500 border border-red-600 hover:bg-red-400"
              onClick={onClose}
            >
              <X className="w-2 h-2 m-auto" />
            </button>
          )}
        </div>
      </div>
      <div className="p-3 overflow-auto h-full max-h-[calc(100vh-2.5rem)] responsive-retro-window-content">
        {children}
      </div>
    </div>
  );
};