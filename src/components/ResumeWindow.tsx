import React from 'react';
import { RetroWindow } from './RetroWindow';

interface ResumeWindowProps {
  onClose?: () => void;
}

export const ResumeWindow: React.FC<ResumeWindowProps> = ({ onClose }) => {
  return (
    <RetroWindow
      title="Resume.pdf - Manab"
      onClose={onClose}
      initialPosition={{ x: 250, y: 100 }}
      initialSize={{ width: 450, height: 500 }}
    >
      <div className="space-y-4">
        <div className="text-center border-b border-border pb-3">
          <h1 className="pixel-font text-lg text-accent">MANAB</h1>
          <p className="terminal-font text-sm">Full Stack Developer</p>
          <p className="terminal-font text-xs text-muted-foreground">B.Tech CSE @ IIIT Kalyani</p>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="pixel-font text-sm text-accent mb-2">🎓 EDUCATION</h3>
            <div className="terminal-font text-xs space-y-1">
              <div><strong>IIIT Kalyani</strong> - B.Tech CSE (2022-2026)</div>
              <div>Current CGPA: 8.5/10</div>
            </div>
          </div>

          <div>
            <h3 className="pixel-font text-sm text-accent mb-2">💻 TECHNICAL SKILLS</h3>
            <div className="terminal-font text-xs space-y-1">
              <div><strong>Languages:</strong> JavaScript, Python, TypeScript, C++</div>
              <div><strong>Frontend:</strong> React, HTML5, CSS3, Tailwind CSS</div>
              <div><strong>Backend:</strong> Node.js, Express.js, MongoDB, MySQL</div>
              <div><strong>Tools:</strong> Git, Docker, VS Code, Figma</div>
            </div>
          </div>

          <div>
            <h3 className="pixel-font text-sm text-accent mb-2">🚀 PROJECTS</h3>
            <div className="terminal-font text-xs space-y-2">
              <div>
                <div><strong>Portfolio Website</strong></div>
                <div>Retro-styled personal portfolio with pixel art theme</div>
              </div>
              <div>
                <div><strong>Task Management App</strong></div>
                <div>Full-stack CRUD application with React & Node.js</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="pixel-font text-sm text-accent mb-2">📧 CONTACT</h3>
            <div className="terminal-font text-xs">
              <div>Email: manab.dev@example.com</div>
              <div>GitHub: @manab-dev</div>
              <div>LinkedIn: /in/manab-developer</div>
            </div>
          </div>
        </div>

        <div className="text-center pt-3 border-t border-border">
          <button 
            className="retro-button text-xs"
            onClick={() => {
              // Download resume functionality
              alert('📄 Resume download started! (Feature coming soon)');
            }}
          >
            💾 Download PDF
          </button>
        </div>
      </div>
    </RetroWindow>
  );
};