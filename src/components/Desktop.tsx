import React, { useState, useEffect, useRef } from 'react';
import { DesktopIcon } from './DesktopIcon';
import { AboutWindow } from './AboutWindow';
import { ResumeWindow } from './ResumeWindow';
import { GamesWindow } from './GamesWindow';
import { TerminalWindow } from './TerminalWindow';
import { TodoWindow } from './TodoWindow';
import { ProjectsWindow } from './ProjectsWindow';
import { MusicPlayer } from './MusicPlayer';

interface DesktopProps {}

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  url: string;
  genre: string;
}

export const Desktop: React.FC<DesktopProps> = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [currentTimeAudio, setCurrentTimeAudio] = useState(0);
  const [duration, setDuration] = useState(0);

  // Persistent audio element
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Audio event listeners
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const updateTime = () => {
        setCurrentTimeAudio(audio.currentTime);
        setDuration(audio.duration);
      };

      const handleEnded = () => {
        setIsMusicPlaying(false);
        setCurrentTimeAudio(0);
        // Auto-play next song
        if (currentSong) {
          const playlist = getPlaylist();
          const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
          const nextSong = playlist[currentIndex + 1] || playlist[0];
          if (nextSong) {
            playSong(nextSong);
          }
        }
      };

      const handleCanPlay = () => {
        // Audio is ready to play
      };

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('canplay', handleCanPlay);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [currentSong]);

  const getPlaylist = (): Song[] => {
    return [
      {
        id: 1,
        title: "End of Beginning",
        artist: "Djo",
        duration: "2:39",
        url: "/audio/end-of-beginning.mp3",
        genre: "Indie Rock"
      },
      {
        id: 2,
        title: "The Scientist",
        artist: "Coldplay",
        duration: "5:09",
        url: "/audio/the-scientist.mp3",
        genre: "Alternative Rock"
      },
      {
        id: 3,
        title: "Wanna Be Yours",
        artist: "Arctic Monkeys",
        duration: "3:32",
        url: "/audio/wanna-be-yours.mp3",
        genre: "Indie Rock"
      },
      {
        id: 4,
        title: "When We Feel Young",
        artist: "Wild Child",
        duration: "4:15",
        url: "/audio/when-we-feel-young.mp3",
        genre: "Indie Folk"
      },
      {
        id: 5,
        title: "Cough Syrup",
        artist: "Young the Giant",
        duration: "4:09",
        url: "/audio/cough-syrup.mp3",
        genre: "Alternative Rock"
      },
      {
        id: 6,
        title: "Choo Lo",
        artist: "The Local Train",
        duration: "4:32",
        url: "/audio/choo-lo.mp3",
        genre: "Indie Rock"
      }
    ];
  };

  const playSong = async (song: Song) => {
    if (audioRef.current) {
      try {
        audioRef.current.src = song.url;
        audioRef.current.volume = volume;
        setCurrentSong(song);
        
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsMusicPlaying(true);
        }
      } catch (error) {
        console.error('Error playing song:', error);
      }
    }
  };

  const togglePlayPause = async () => {
    if (audioRef.current) {
      try {
        if (isMusicPlaying) {
          audioRef.current.pause();
          setIsMusicPlaying(false);
        } else {
          if (!currentSong) {
            // If no song is selected, play the first one
            const playlist = getPlaylist();
            await playSong(playlist[0]);
          } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
              await playPromise;
              setIsMusicPlaying(true);
            }
          }
        }
      } catch (error) {
        console.error('Error toggling play/pause:', error);
      }
    }
  };

  const skipToNext = () => {
    if (currentSong) {
      const playlist = getPlaylist();
      const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
      const nextSong = playlist[currentIndex + 1] || playlist[0];
      if (nextSong) {
        playSong(nextSong);
      }
    }
  };

  const skipToPrevious = () => {
    if (currentSong) {
      const playlist = getPlaylist();
      const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
      const prevSong = playlist[currentIndex - 1] || playlist[playlist.length - 1];
      if (prevSong) {
        playSong(prevSong);
      }
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatAudioTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const openWindow = (windowId: string) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows(prev => [...prev, windowId]);
    }
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(prev => prev.filter(window => window !== windowId));
  };

  const handleMusicStateChange = (isPlaying: boolean, song: Song | null) => {
    setIsMusicPlaying(isPlaying);
    setCurrentSong(song);
  };

  return (
    <div className="relative w-screen h-screen meet-developer-bg overflow-hidden">
      {/* Persistent Audio Element */}
      <audio ref={audioRef} preload="metadata" />

      {/* Desktop Icons - Only show when no windows are open */}
      {openWindows.length === 0 && (
        <div className="absolute top-4 left-4 md:grid md:grid-cols-1 md:gap-3 flex flex-col md:flex-row gap-4 px-4 pt-4 md:px-0 md:pt-0 z-20 w-auto justify-start items-start">
          <DesktopIcon
            icon="👨‍💻"
            label="About"
            onClick={() => openWindow('about')}
          />
          <DesktopIcon
            icon="📄"
            label="Resume"
            onClick={() => openWindow('resume')}
          />
          <DesktopIcon
            icon="📂"
            label="Projects"
            onClick={() => openWindow('projects')}
          />
          <DesktopIcon
            icon="📋"
            label="Todo"
            onClick={() => openWindow('todo')}
          />
          <DesktopIcon
            icon="🎮"
            label="Games"
            onClick={() => openWindow('games')}
          />
          <DesktopIcon
            icon="💻"
            label="Terminal"
            onClick={() => openWindow('terminal')}
          />
          <DesktopIcon
            icon="🎵"
            label="Music"
            onClick={() => openWindow('music')}
          />
        </div>
      )}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-8 md:h-12 bg-window-header border-t-2 border-window-border flex items-center px-2 md:px-4 z-30">
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
          {/* Mini Music Player */}
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">🎵</span>
            <span className="text-muted-foreground max-w-32 truncate">
              {currentSong ? currentSong.title : 'No song playing'}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={skipToPrevious}
                className="retro-button bg-blue-900 hover:bg-blue-800 text-blue-300 px-1 py-1 rounded border border-blue-600 text-xs"
                title="Previous"
              >
                ⏮️
              </button>
              <button
                onClick={togglePlayPause}
                className={`retro-button px-2 py-1 rounded border text-xs ${
                  isMusicPlaying 
                    ? 'bg-green-900 hover:bg-green-800 text-green-300 border-green-600' 
                    : 'bg-gray-900 hover:bg-gray-800 text-gray-300 border-gray-600'
                }`}
                title={isMusicPlaying ? 'Pause' : 'Play'}
              >
                {isMusicPlaying ? '⏸️' : '▶️'}
              </button>
              <button
                onClick={skipToNext}
                className="retro-button bg-blue-900 hover:bg-blue-800 text-blue-300 px-1 py-1 rounded border border-blue-600 text-xs"
                title="Next"
              >
                ⏭️
              </button>
            </div>
            {currentSong && (
              <span className="text-xs text-muted-foreground">
                {formatAudioTime(currentTimeAudio)} / {formatAudioTime(duration)}
              </span>
            )}
          </div>
          
          <div className="pixel-font text-xs hidden sm:block">
            Building Dreams... {Math.floor(Math.random() * 100)}% Complete
          </div>
          <div className="pixel-font text-xs">
            {formatTime(currentTime)}
          </div>
        </div>
      </div>

      {/* Persistent Music Control Panel */}
      {isMusicPlaying && (
        <div className="absolute bottom-16 md:bottom-20 left-4 right-4 bg-window-header border-2 border-window-border rounded-lg p-3 z-25">
          <div className="flex items-center justify-between">
            {/* Song Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="text-2xl">🎵</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-retro-green text-sm truncate">
                  {currentSong ? currentSong.title : 'Unknown Song'}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {currentSong ? currentSong.artist : 'Unknown Artist'}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={skipToPrevious}
                className="retro-button bg-blue-900 hover:bg-blue-800 text-blue-300 px-2 py-1 rounded border border-blue-600 text-xs"
                title="Previous Song"
              >
                ⏮️
              </button>
              <button
                onClick={togglePlayPause}
                className={`retro-button px-3 py-1 rounded border text-xs ${
                  isMusicPlaying 
                    ? 'bg-green-900 hover:bg-green-800 text-green-300 border-green-600' 
                    : 'bg-gray-900 hover:bg-gray-800 text-gray-300 border-gray-600'
                }`}
                title={isMusicPlaying ? 'Pause' : 'Play'}
              >
                {isMusicPlaying ? '⏸️ Pause' : '▶️ Play'}
              </button>
              <button
                onClick={skipToNext}
                className="retro-button bg-blue-900 hover:bg-blue-800 text-blue-300 px-2 py-1 rounded border border-blue-600 text-xs"
                title="Next Song"
              >
                ⏭️
              </button>
              <button
                onClick={() => openWindow('music')}
                className="retro-button bg-purple-900 hover:bg-purple-800 text-purple-300 px-2 py-1 rounded border border-purple-600 text-xs"
                title="Open Music Player"
              >
                🎧
              </button>
            </div>

            {/* Progress Bar */}
            <div className="hidden lg:flex items-center gap-2 flex-1 max-w-xs">
              <span className="text-xs text-muted-foreground">
                {formatAudioTime(currentTimeAudio)}
              </span>
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTimeAudio}
                  onChange={(e) => {
                    const time = parseFloat(e.target.value);
                    if (audioRef.current) {
                      audioRef.current.currentTime = time;
                      setCurrentTimeAudio(time);
                    }
                  }}
                  className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {formatAudioTime(duration)}
              </span>
            </div>

            {/* Volume Control */}
            <div className="hidden xl:flex items-center gap-2">
              <span className="text-xs text-muted-foreground">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => {
                  const newVolume = parseFloat(e.target.value);
                  setVolume(newVolume);
                  if (audioRef.current) {
                    audioRef.current.volume = newVolume;
                  }
                }}
                className="w-16 h-1 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Open Windows */}
      {openWindows.includes('about') && (
        <AboutWindow onClose={() => closeWindow('about')} />
      )}
      {openWindows.includes('resume') && (
        <ResumeWindow onClose={() => closeWindow('resume')} />
      )}
      {openWindows.includes('projects') && (
        <ProjectsWindow onClose={() => closeWindow('projects')} />
      )}
      {openWindows.includes('todo') && (
        <TodoWindow onClose={() => closeWindow('todo')} />
      )}
      {openWindows.includes('games') && (
        <GamesWindow onClose={() => closeWindow('games')} />
      )}
      {openWindows.includes('terminal') && (
        <TerminalWindow onClose={() => closeWindow('terminal')} />
      )}
      {openWindows.includes('music') && (
        <MusicPlayer 
          onClose={() => closeWindow('music')} 
          onMusicStateChange={handleMusicStateChange}
          externalAudioRef={audioRef}
          externalIsPlaying={isMusicPlaying}
          externalCurrentSong={currentSong}
          externalCurrentTime={currentTimeAudio}
          externalDuration={duration}
          externalVolume={volume}
          onPlaySong={playSong}
          onTogglePlayPause={togglePlayPause}
          onSkipNext={skipToNext}
          onSkipPrevious={skipToPrevious}
          onVolumeChange={setVolume}
          onSeek={(time) => {
            if (audioRef.current) {
              audioRef.current.currentTime = time;
              setCurrentTimeAudio(time);
            }
          }}
        />
      )}
    </div>
  );
};