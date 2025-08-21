import React, { useState } from 'react';
import { RetroWindow } from './RetroWindow';

interface ProjectsWindowProps {
  onClose?: () => void;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  status: 'completed' | 'in-progress' | 'planned';
  link?: string;
  github?: string;
}

export const ProjectsWindow: React.FC<ProjectsWindowProps> = ({ onClose }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress' | 'planned'>('all');

  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "Multiple Disease Prediction System",
      description: "A comprehensive healthcare AI application that predicts Diabetes, Heart Disease, and Parkinson's using machine learning models. Features real-time predictions, user-friendly interface, and pre-trained ML models.",
      status: "completed",
      technologies: ["Python", "Machine Learning", "Streamlit", "Scikit-learn", "Healthcare AI"],
      link: "https://multiple-disease-prediction-app-app-cahregxftg44s93fd7jfvs.streamlit.app/",
      github: "https://github.com/Vi1en/multiple-disease-prediction-streamlit-app"
    },
    {
      id: 2,
      title: "Fashion Recommendation Box",
      description: "AI/ML-based fashion recommendation system that suggests personalized clothing based on user preferences and style analysis.",
      status: "completed",
      technologies: ["Python", "Machine Learning", "AI", "Recommendation System"],
      link: "https://spectacular-naiad-d809f7.netlify.app/#/ai-fashion-stylist",
      github: "https://github.com/Vi1en/ai-fashion-recommendation-box"
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React frontend, Node.js backend, and MongoDB database.",
      status: "completed",
      technologies: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
      github: "#"
    },
    {
      id: 4,
      title: "Task Management App",
      description: "Real-time task management application with collaborative features and real-time updates.",
      status: "completed",
      technologies: ["React", "Socket.io", "PostgreSQL", "Node.js"],
      github: "#"
    }
  ]);

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-yellow-400';
      case 'planned': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'planned': return '📋';
      default: return '❓';
    }
  };

  return (
    <RetroWindow
      title="Projects.folder"
      onClose={onClose}
      initialSize={{ width: 500, height: 450 }}
    >
      <div className="h-full max-h-full overflow-auto p-2 break-words w-full max-w-[95vw] mx-auto pb-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-retro-green">🚀 My Awesome Projects</h2>
            <div className="text-sm text-muted-foreground">
              {projects.filter(p => p.status === 'completed').length} completed
            </div>
          </div>

          {/* Filter buttons */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`retro-button px-3 py-1 rounded text-xs ${
                filter === 'all' 
                  ? 'bg-blue-900 text-blue-300 border-blue-600' 
                  : 'bg-muted text-muted-foreground border-border'
              }`}
            >
              All ({projects.length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`retro-button px-3 py-1 rounded text-xs ${
                filter === 'completed' 
                  ? 'bg-green-900 text-green-300 border-green-600' 
                  : 'bg-muted text-muted-foreground border-border'
              }`}
            >
              Completed ({projects.filter(p => p.status === 'completed').length})
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`retro-button px-3 py-1 rounded text-xs ${
                filter === 'in-progress' 
                  ? 'bg-yellow-900 text-yellow-300 border-yellow-600' 
                  : 'bg-muted text-muted-foreground border-border'
              }`}
            >
              In Progress ({projects.filter(p => p.status === 'in-progress').length})
            </button>
            <button
              onClick={() => setFilter('planned')}
              className={`retro-button px-3 py-1 rounded text-xs ${
                filter === 'planned' 
                  ? 'bg-purple-900 text-purple-300 border-purple-600' 
                  : 'bg-muted text-muted-foreground border-border'
              }`}
            >
              Planned ({projects.filter(p => p.status === 'planned').length})
            </button>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`border border-border p-4 rounded cursor-pointer transition-all hover:border-retro-green ${
                  selectedProject?.id === project.id ? 'border-retro-green bg-green-900/20' : ''
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-retro-green text-sm">{project.title}</h3>
                  <span className={`text-xs ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)} {project.status}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-xs rounded border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-xs rounded border border-border">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {project.github && (
                    <button className="retro-button bg-gray-900 hover:bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-600 text-xs">
                      📁 GitHub
                    </button>
                  )}
                  {project.link && (
                    <button className="retro-button bg-blue-900 hover:bg-blue-800 text-blue-300 px-2 py-1 rounded border border-blue-600 text-xs">
                      🌐 Live Demo
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Project details */}
          {selectedProject && (
            <div className="border-t border-border pt-4 mt-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-retro-green">{selectedProject.title}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {selectedProject.description}
              </p>
              
              <div className="mb-3">
                <h4 className="text-sm font-bold text-accent mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted text-sm rounded border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                {selectedProject.github && (
                  <button className="retro-button bg-gray-900 hover:bg-gray-800 text-gray-300 px-3 py-2 rounded border border-gray-600">
                    📁 View on GitHub
                  </button>
                )}
                {selectedProject.link && (
                  <button className="retro-button bg-blue-900 hover:bg-blue-800 text-blue-300 px-3 py-2 rounded border border-blue-600">
                    🌐 Visit Live Site
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </RetroWindow>
  );
};
