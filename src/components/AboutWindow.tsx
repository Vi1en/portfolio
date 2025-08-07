import React from 'react';
import { RetroWindow } from './RetroWindow';
import manabAvatar from '@/assets/manab-avatar.png';
import itsyCat from '@/assets/itsy-cat.png';
import devCoffee from '@/assets/dev-coffee.png';

interface AboutWindowProps {
  onClose?: () => void;
}

export const AboutWindow: React.FC<AboutWindowProps> = ({ onClose }) => {
  return (
    <RetroWindow
      title="About - Manab.exe"
      onClose={onClose}
      initialPosition={{ x: 150, y: 80 }}
      initialSize={{ width: 500, height: 450 }}
    >
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <img 
            src={manabAvatar} 
            alt="Manab Avatar" 
            className="w-16 h-16 pixelated"
          />
          <div className="flex-1">
            <h2 className="pixel-font text-base mb-2 text-accent">Meet the Developer</h2>
            <div className="terminal-font text-sm space-y-1">
              <div><strong>Name:</strong> Manab</div>
              <div><strong>Role:</strong> Full Stack Developer</div>
              <div><strong>Currently:</strong> B.Tech CSE @ IIIT Kalyani</div>
              <div><strong>Languages:</strong> JavaScript, Python, TypeScript</div>
              <div><strong>Tools:</strong> React, Node.js, Express, MongoDB</div>
              <div><strong>Loves:</strong> Clean UI, Dark Mode, Coffee</div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <div className="bg-terminal-bg p-3 rounded border border-retro-green">
            <div className="terminal-font text-sm text-retro-green">
              <div className="mb-2">💭 "If it compiles, ship it 🚀"</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img 
              src={itsyCat} 
              alt="Itsy Cat" 
              className="w-8 h-8 pixelated"
            />
            <span className="pixel-font text-xs">
              Itsy (Chief Debugging Officer)
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <img 
              src={devCoffee} 
              alt="Dev Coffee" 
              className="w-8 h-8 pixelated"
            />
            <span className="pixel-font text-xs">
              Fuel Level: High
            </span>
          </div>
        </div>

        <div className="bg-muted p-3 rounded border">
          <div className="pixel-font text-xs mb-2 text-accent">📝 REMEMBER</div>
          <div className="terminal-font text-sm space-y-1">
            <div>• Your mental health is a priority.</div>
            <div>• Your happiness is essential.</div>
            <div>• Self-care is necessary. Give yourself time.</div>
          </div>
        </div>
      </div>
    </RetroWindow>
  );
};