import React, { useState } from 'react';
import { RetroWindow } from './RetroWindow';
import manabAvatar from '../assets/manab-avatar.png';

interface AboutWindowProps {
  onClose?: () => void;
}

export const AboutWindow: React.FC<AboutWindowProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('about');

  const skills = [
    { name: 'React & TypeScript', level: 90, color: 'bg-blue-500' },
    { name: 'Node.js & Express', level: 85, color: 'bg-green-500' },
    { name: 'Python & Django', level: 80, color: 'bg-yellow-500' },
    { name: 'MongoDB & SQL', level: 75, color: 'bg-purple-500' },
    { name: 'AWS & Docker', level: 70, color: 'bg-orange-500' },
    { name: 'UI/UX Design', level: 65, color: 'bg-pink-500' }
  ];

  return (
    <RetroWindow
      title="About Manab"
      onClose={onClose}
      initialSize={{ width: 600, height: 500 }}
    >
      <div className="h-full max-h-full overflow-auto p-2 break-words w-full max-w-[95vw] mx-auto pb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Profile Section */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img 
                src={manabAvatar} 
                alt="Manab Mallick" 
                className="w-32 h-32 rounded-lg border-2 border-retro-green mx-auto md:mx-0"
              />
            </div>
            
            <div className="text-center md:text-left mt-4">
              <h2 className="text-xl font-bold text-retro-green mb-2">Manab Mallick</h2>
              <p className="text-sm text-muted-foreground mb-2">Full Stack Developer</p>
              <div className="flex justify-center md:justify-start gap-2">
                <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded border border-green-600">🚀 React</span>
                <span className="px-2 py-1 bg-blue-900 text-blue-300 text-xs rounded border border-blue-600">⚡ TypeScript</span>
                <span className="px-2 py-1 bg-purple-900 text-purple-300 text-xs rounded border border-purple-600">🐍 Python</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex flex-col md:flex-row gap-2 mb-4">
              {[
                { id: 'about', label: 'About', icon: '👨‍💻' },
                { id: 'skills', label: 'Skills', icon: '⚡' },
                { id: 'experience', label: 'Experience', icon: '💼' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`retro-button px-6 py-3 rounded text-sm font-medium text-center flex-1 ${
                    activeTab === tab.id 
                      ? 'bg-green-900 text-green-300 border-green-600' 
                      : 'bg-muted text-muted-foreground border-border'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {activeTab === 'about' && (
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed">
                    👋 Hi! I'm Manab, a passionate Full Stack Developer who loves creating 
                    innovative web applications. When I'm not coding, you'll find me exploring 
                    new technologies or enjoying a good cup of coffee ☕.
                  </p>
                  <p className="text-sm leading-relaxed">
                    🎯 I specialize in React, TypeScript, and Node.js, building scalable 
                    applications that solve real-world problems. Always eager to learn and 
                    contribute to exciting projects!
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-muted p-2 rounded border">
                      <span className="text-green-400">📍 Location:</span> Remote
                    </div>
                    <div className="bg-muted p-2 rounded border">
                      <span className="text-blue-400">🎓 Education:</span> Computer Science
                    </div>
                    <div className="bg-muted p-2 rounded border">
                      <span className="text-purple-400">💼 Experience:</span> 3+ Years
                    </div>
                    <div className="bg-muted p-2 rounded border">
                      <span className="text-orange-400">🌱 Status:</span> Available
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-4">
                    Here are my technical skills and proficiency levels:
                  </p>
                  <div className="space-y-3">
                    {skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full ${skill.color}`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-3">
                  <div className="space-y-4">
                    <div className="border-l-2 border-green-500 pl-4">
                      <h4 className="font-medium text-green-400">Senior Developer</h4>
                      <p className="text-xs text-muted-foreground">Tech Company • 2023-Present</p>
                      <p className="text-sm mt-1">Leading development of scalable web applications using React and Node.js</p>
                    </div>
                    
                    <div className="border-l-2 border-blue-500 pl-4">
                      <h4 className="font-medium text-blue-400">AI/ML Project Developer</h4>
                      <p className="text-xs text-muted-foreground">Personal Projects • 2023-Present</p>
                      <ul className="text-sm mt-1 space-y-1">
                        <li>• <strong>Multiple Disease Prediction System:</strong> Built a comprehensive healthcare AI app that predicts Diabetes, Heart Disease, and Parkinson's using ML models</li>
                        <li>• <strong>Fashion Recommendation Box:</strong> Developed AI/ML-based fashion recommendation system</li>
                      </ul>
                    </div>
                    
                    <div className="border-l-2 border-purple-500 pl-4">
                      <h4 className="font-medium text-purple-400">Hackathon Winner</h4>
                      <p className="text-xs text-muted-foreground">Status Code 1 • 2024</p>
                      <p className="text-sm mt-1">Won first place in Status Code 1 hackathon with innovative project solution</p>
                    </div>
                    
                    <div className="border-l-2 border-orange-500 pl-4">
                      <h4 className="font-medium text-orange-400">Hackathon Organizer & Volunteer</h4>
                      <p className="text-xs text-muted-foreground">Multiple Events • 2023-Present</p>
                      <p className="text-sm mt-1">Organized and volunteered for multiple hackathons, helping create opportunities for developers</p>
                    </div>
                    
                    <div className="border-l-2 border-pink-500 pl-4">
                      <h4 className="font-medium text-pink-400">Full Stack Developer</h4>
                      <p className="text-xs text-muted-foreground">Startup • 2022-2023</p>
                      <p className="text-sm mt-1">Built and maintained multiple client projects with modern technologies</p>
                    </div>
                    
                    <div className="border-l-2 border-cyan-500 pl-4">
                      <h4 className="font-medium text-cyan-400">Junior Developer</h4>
                      <p className="text-xs text-muted-foreground">Agency • 2022</p>
                      <p className="text-sm mt-1">Started my journey with frontend development and basic backend tasks</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </RetroWindow>
  );
};