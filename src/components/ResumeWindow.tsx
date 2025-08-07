import React from 'react';
import { RetroWindow } from './RetroWindow';

interface ResumeWindowProps {
  onClose?: () => void;
}

export const ResumeWindow: React.FC<ResumeWindowProps> = ({ onClose }) => {
  return (
    <RetroWindow
      title="Resume"
      onClose={onClose}
      initialSize={{ width: 500, height: 450 }}
    >
      <div className="h-full max-h-full overflow-auto p-2 break-words w-full max-w-[95vw] mx-auto pb-8">
        <div className="space-y-4">
          {/* Header */}
          <div className="text-center border-b border-retro-green pb-4">
            <h1 className="text-2xl font-bold text-retro-green mb-2">Manab Mallick</h1>
            <p className="text-sm text-muted-foreground">Full Stack Developer</p>
            <div className="flex flex-wrap justify-center gap-4 mt-2 text-xs">
              <span>📧 manabmallick3345@gmail.com</span>
              <span>📍 Kolkata, India</span>
            </div>
          </div>

          {/* Contact Links */}
          <div className="flex justify-center gap-4 text-xs">
            <a 
              href="https://github.com/Vi1en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="retro-button bg-gray-900 hover:bg-gray-800 text-gray-300 px-3 py-1 rounded border border-gray-600"
            >
              🐙 GitHub: Vi1en
            </a>
            <a 
              href="https://www.linkedin.com/mwlite/profile/in/manab-mallick-57069734a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="retro-button bg-blue-900 hover:bg-blue-800 text-blue-300 px-3 py-1 rounded border border-blue-600"
            >
              💼 LinkedIn
            </a>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-lg font-bold text-retro-green mb-2">🎯 Summary</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Passionate Full Stack Developer with expertise in modern web technologies. 
              Specialized in React, Node.js, and cloud solutions. Committed to creating 
              efficient, scalable applications with excellent user experiences.
            </p>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-lg font-bold text-retro-green mb-2">🛠️ Technical Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              <div className="bg-muted p-2 rounded border border-border">
                <strong>Frontend:</strong> React, TypeScript, Tailwind CSS
              </div>
              <div className="bg-muted p-2 rounded border border-border">
                <strong>Backend:</strong> Node.js, Express, MongoDB
              </div>
              <div className="bg-muted p-2 rounded border border-border">
                <strong>Tools:</strong> Git, Docker, AWS
              </div>
              <div className="bg-muted p-2 rounded border border-border">
                <strong>Languages:</strong> JavaScript, Python, Java
              </div>
              <div className="bg-muted p-2 rounded border border-border">
                <strong>Databases:</strong> MySQL, PostgreSQL, Redis
              </div>
              <div className="bg-muted p-2 rounded border border-border">
                <strong>Other:</strong> REST APIs, GraphQL, CI/CD
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-lg font-bold text-retro-green mb-2">🎓 Education</h2>
            <div className="space-y-2">
              <div className="bg-muted p-3 rounded border border-border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm">Bachelor of Technology in Computer Science</h3>
                    <p className="text-xs text-muted-foreground">University of Technology</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2020 - 2024</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Relevant coursework: Data Structures, Algorithms, Database Systems, 
                  Web Development, Software Engineering
                </p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-lg font-bold text-retro-green mb-2">💼 Work Experience</h2>
            <div className="space-y-3">
              <div className="bg-muted p-3 rounded border border-border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm">Full Stack Developer</h3>
                    <p className="text-xs text-muted-foreground">Tech Solutions Inc.</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2024 - Present</span>
                </div>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Developed and maintained React-based web applications</li>
                  <li>Implemented RESTful APIs using Node.js and Express</li>
                  <li>Collaborated with cross-functional teams using Agile methodology</li>
                  <li>Optimized application performance and user experience</li>
                </ul>
              </div>

              <div className="bg-muted p-3 rounded border border-border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm">Junior Developer</h3>
                    <p className="text-xs text-muted-foreground">StartupXYZ</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2023 - 2024</span>
                </div>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Built responsive web applications using modern frameworks</li>
                  <li>Integrated third-party APIs and payment gateways</li>
                  <li>Participated in code reviews and technical discussions</li>
                  <li>Mentored junior developers and interns</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-lg font-bold text-retro-green mb-2">🚀 Projects</h2>
            <div className="space-y-2">
              <div className="bg-muted p-3 rounded border border-border">
                <h3 className="font-bold text-sm">E-Commerce Platform</h3>
                <p className="text-xs text-muted-foreground">
                  Full-stack e-commerce solution with React frontend, Node.js backend, 
                  and MongoDB database. Features include user authentication, payment 
                  integration, and admin dashboard.
                </p>
              </div>
              <div className="bg-muted p-3 rounded border border-border">
                <h3 className="font-bold text-sm">Task Management App</h3>
                <p className="text-xs text-muted-foreground">
                  Real-time task management application with collaborative features, 
                  built using React, Socket.io, and PostgreSQL.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-lg font-bold text-retro-green mb-2">🏆 Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="bg-muted p-2 rounded border border-border">
                <strong>AWS Certified Developer</strong> - Amazon Web Services
              </div>
              <div className="bg-muted p-2 rounded border border-border">
                <strong>MongoDB Database Administrator</strong> - MongoDB University
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center pt-4">
            <button className="retro-button bg-green-900 hover:bg-green-800 text-green-300 px-6 py-2 rounded border border-green-600">
              📄 Download PDF
            </button>
          </div>
        </div>
      </div>
    </RetroWindow>
  );
};