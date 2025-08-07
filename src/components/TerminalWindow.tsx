import React, { useState, useEffect } from 'react';
import { RetroWindow } from './RetroWindow';

interface TerminalWindowProps {
  onClose: () => void;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({ onClose }) => {
  const [output, setOutput] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const terminalLines = [
    '$ whoami',
    'manab@developer:~$ Full Stack Developer',
    '',
    '$ cat current_status.txt',
    'Status: Caffeinated',
    'Location: Working Remote',
    'Current Task: Building awesome projects',
    '',
    '$ ls skills/',
    'frontend/ backend/ database/',
    'devops/ coffee_brewing/ debugging/',
    '',
    '$ git log --oneline',
    'a1b2c3d Fixed critical bug',
    'e4f5g6h Added new feature',
    '...',
    '',
    '$ npm start',
    'Starting development server...',
    'Building dreams...',
    '',
    '$ █'
  ];

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;

    const typewriter = setInterval(() => {
      if (lineIndex < terminalLines.length - 1) {
        const currentTerminalLine = terminalLines[lineIndex];
        
        if (charIndex <= currentTerminalLine.length) {
          setCurrentLine(currentTerminalLine.substring(0, charIndex));
          charIndex++;
        } else {
          setOutput(prev => [...prev, currentTerminalLine]);
          setCurrentLine('');
          lineIndex++;
          charIndex = 0;
        }
      } else {
        clearInterval(typewriter);
      }
    }, 50);

    // Cursor blink
    const cursorBlink = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typewriter);
      clearInterval(cursorBlink);
    };
  }, []);

  return (
    <RetroWindow
      title="Terminal - Developer Console"
      onClose={onClose}
      initialPosition={{ x: 300, y: 200 }}
      initialSize={{ width: 400, height: 400 }}
      isTerminal={true}
    >
      <div className="h-full max-h-full overflow-auto p-2 break-words w-full max-w-[95vw] mx-auto pb-8">
        <div className="font-mono text-sm w-full">
          {output.map((line, index) => (
            <div key={index} className="mb-1">
              {line.startsWith('$') ? (
                <span className="terminal-prompt">{line}</span>
              ) : (
                <span className="text-terminal-text">{line}</span>
              )}
            </div>
          ))}
          <div className="mb-1">
            <span className="terminal-prompt">
              {currentLine}
              {showCursor && <span className="blink">█</span>}
            </span>
          </div>
        </div>
      </div>
    </RetroWindow>
  );
};