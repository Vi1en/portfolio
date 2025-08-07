import React, { useState, useEffect } from 'react';
import { DesktopIcon } from './DesktopIcon';
import { TerminalWindow } from './TerminalWindow';
import { AboutWindow } from './AboutWindow';
import { RetroWindow } from './RetroWindow';
import { ResumeWindow } from './ResumeWindow';
import { GamesWindow } from './GamesWindow';

export const Desktop: React.FC = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const openWindow = (windowId: string) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows(prev => [...prev, windowId]);
    }
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(prev => prev.filter(id => id !== windowId));
  };

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="relative w-screen h-screen meet-developer-bg overflow-hidden scan-lines">
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-2 md:gap-3">
        <DesktopIcon 
          icon="ℹ️" 
          label="About" 
          onClick={() => openWindow('about')}
        />
        <DesktopIcon 
          icon="📂" 
          label="Projects" 
          onClick={() => openWindow('projects')}
        />
        <DesktopIcon 
          icon="📄" 
          label="Resume" 
          onClick={() => openWindow('resume')}
        />
        <DesktopIcon 
          icon="🎮" 
          label="Games" 
          onClick={() => openWindow('games')}
        />
        <DesktopIcon 
          icon="📋" 
          label="Todo" 
          onClick={() => openWindow('todo')}
        />
        <DesktopIcon 
          icon="💻" 
          label="Terminal" 
          onClick={() => openWindow('terminal')}
        />
      </div>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-8 md:h-12 bg-window-header border-t-2 border-window-border flex items-center px-2 md:px-4">
        <button 
          className="retro-button mr-2 md:mr-4"
          onClick={() => openWindow('about')}
        >
          Start
        </button>
        
        <div className="flex-1 flex items-center gap-1 md:gap-2 overflow-x-auto">
          {openWindows.map(windowId => (
            <button 
              key={windowId}
              className="retro-button text-xs px-1 md:px-2 whitespace-nowrap"
              onClick={() => {
                // Focus window logic could go here
              }}
              onDoubleClick={() => closeWindow(windowId)}
              title={`Double-click to close ${windowId}`}
            >
              {windowId.charAt(0).toUpperCase() + windowId.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <div className="pixel-font text-xs hidden sm:block">
            Building Dreams... {Math.floor(Math.random() * 100)}% Complete
          </div>
          <div className="pixel-font text-xs">
            {formatTime(currentTime)}
          </div>
        </div>
      </div>

      {/* Windows */}
      {openWindows.includes('terminal') && (
        <TerminalWindow onClose={() => closeWindow('terminal')} />
      )}
      
      {openWindows.includes('about') && (
        <AboutWindow onClose={() => closeWindow('about')} />
      )}

      {openWindows.includes('todo') && (
        <RetroWindow
          title="TODO.exe"
          onClose={() => closeWindow('todo')}
          initialPosition={{ x: 450, y: 120 }}
          initialSize={{ width: 300, height: 350 }}
        >
          <div className="space-y-3">
            <div className="pixel-font text-sm text-accent mb-3">Daily Tasks</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-retro-green">✓</span>
                <span className="terminal-font text-sm line-through">Finish project</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-retro-green">✓</span>
                <span className="terminal-font text-sm line-through">Call Subhash</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-retro-green">✓</span>
                <span className="terminal-font text-sm line-through">Cry a little</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">☐</span>
                <span className="terminal-font text-sm">Sleep</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">☐</span>
                <span className="terminal-font text-sm">Fix code</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">☐</span>
                <span className="terminal-font text-sm">Debug life</span>
              </div>
            </div>
            
            <div className="border-t border-border pt-3 mt-4">
              <div className="pixel-font text-xs text-accent mb-2">💭 Mood Status</div>
              <div className="terminal-font text-sm">Thinking... 🤔</div>
            </div>
          </div>
        </RetroWindow>
      )}

      {openWindows.includes('projects') && (
        <RetroWindow
          title="Projects.folder"
          onClose={() => closeWindow('projects')}
          initialPosition={{ x: 200, y: 150 }}
          initialSize={{ width: 400, height: 300 }}
        >
          <div className="space-y-4">
            <div className="pixel-font text-sm text-accent mb-3">My Awesome Projects</div>
            <div className="space-y-3">
              <div className="border border-border p-3 rounded">
                <div className="pixel-font text-xs text-retro-blue mb-1">🚀 Portfolio Website</div>
                <div className="terminal-font text-sm">Pixel art themed personal portfolio</div>
                <div className="text-xs text-muted-foreground mt-1">React, TypeScript, Tailwind</div>
              </div>
              <div className="border border-border p-3 rounded">
                <div className="pixel-font text-xs text-retro-green mb-1">💻 Code Editor</div>
                <div className="terminal-font text-sm">Custom text editor with syntax highlighting</div>
                <div className="text-xs text-muted-foreground mt-1">Electron, JavaScript</div>
              </div>
              <div className="border border-border p-3 rounded">
                <div className="pixel-font text-xs text-retro-orange mb-1">🎮 Snake Game</div>
                <div className="terminal-font text-sm">Classic snake game in the browser</div>
                <div className="text-xs text-muted-foreground mt-1">Vanilla JavaScript, Canvas</div>
              </div>
            </div>
          </div>
        </RetroWindow>
      )}

      {openWindows.includes('resume') && (
        <ResumeWindow onClose={() => closeWindow('resume')} />
      )}

      {openWindows.includes('games') && (
        <GamesWindow onClose={() => closeWindow('games')} />
      )}
    </div>
  );
};