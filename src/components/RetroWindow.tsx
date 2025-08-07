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
    // Center window on open for all devices, and resize for mobile
    const centerWindow = () => {
      if (windowRef.current) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        let width = initialSize.width;
        let height = initialSize.height;
        
        // On mobile, use a smaller size for better usability
        if (vw <= 768) {
          width = vw * 0.85;
          height = vh * 0.6;
        }
        
        // Calculate center position
        const centerX = Math.max((vw - width) / 2, 0);
        const centerY = Math.max((vh - height) / 2, 0);
        
        // Set the window size and position directly
        windowRef.current.style.width = `${width}px`;
        windowRef.current.style.height = `${height}px`;
        windowRef.current.style.left = `${centerX}px`;
        windowRef.current.style.top = `${centerY}px`;
        
        setPosition({
          x: centerX,
          y: centerY,
        });
      }
    };

    // Center immediately and also on window resize
    centerWindow();
    window.addEventListener('resize', centerWindow);
    
    return () => {
      window.removeEventListener('resize', centerWindow);
    };
  }, [initialSize.width, initialSize.height]);

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
        minWidth: 250,
        minHeight: 150,
        maxWidth: '100vw',
        maxHeight: '100vh',
        boxSizing: 'border-box',
        overflow: 'hidden',
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
              className="w-5 h-5 bg-red-500 border border-red-600 hover:bg-red-400"
              onClick={onClose}
            >
              <X className="w-3 h-3 m-auto" />
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