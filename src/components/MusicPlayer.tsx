import React, { useState, useRef, useEffect } from 'react';
import { RetroWindow } from './RetroWindow';

interface MusicPlayerProps {
  onClose?: () => void;
  onMusicStateChange?: (isPlaying: boolean, currentSong: Song | null) => void;
  externalAudioRef?: React.RefObject<HTMLAudioElement>;
  externalIsPlaying?: boolean;
  externalCurrentSong?: Song | null;
  externalCurrentTime?: number;
  externalDuration?: number;
  externalVolume?: number;
  onPlaySong?: (song: Song) => void;
  onTogglePlayPause?: () => void;
  onSkipNext?: () => void;
  onSkipPrevious?: () => void;
  onVolumeChange?: (volume: number) => void;
  onSeek?: (time: number) => void;
}

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  url: string;
  genre: string;
  youtubeId?: string;
  spotifyId?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  onClose, 
  onMusicStateChange,
  externalAudioRef,
  externalIsPlaying = false,
  externalCurrentSong = null,
  externalCurrentTime = 0,
  externalDuration = 0,
  externalVolume = 0.5,
  onPlaySong,
  onTogglePlayPause,
  onSkipNext,
  onSkipPrevious,
  onVolumeChange,
  onSeek
}) => {
  const [isPlaying, setIsPlaying] = useState(externalIsPlaying);
  const [currentSong, setCurrentSong] = useState<Song | null>(externalCurrentSong);
  const [volume, setVolume] = useState(externalVolume);
  const [currentTime, setCurrentTime] = useState(externalCurrentTime);
  const [duration, setDuration] = useState(externalDuration);
  const [error, setError] = useState<string>('');
  const [showYouTubeEmbed, setShowYouTubeEmbed] = useState(false);
  const [playlist, setPlaylist] = useState<Song[]>([
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
  ]);

  // Sync with external state
  useEffect(() => {
    setIsPlaying(externalIsPlaying);
  }, [externalIsPlaying]);

  useEffect(() => {
    setCurrentSong(externalCurrentSong);
  }, [externalCurrentSong]);

  useEffect(() => {
    setCurrentTime(externalCurrentTime);
  }, [externalCurrentTime]);

  useEffect(() => {
    setDuration(externalDuration);
  }, [externalDuration]);

  useEffect(() => {
    setVolume(externalVolume);
  }, [externalVolume]);

  const playSong = async (song: Song) => {
    if (onPlaySong) {
      onPlaySong(song);
    } else {
      // Fallback to local audio if no external handler
      if (externalAudioRef?.current) {
        try {
          setError('');
          setCurrentSong(song);
          
          // If song has YouTube ID, show YouTube embed
          if (song.youtubeId) {
            setShowYouTubeEmbed(true);
            setIsPlaying(true);
            return;
          }
          
          externalAudioRef.current.src = song.url;
          
          // Try to play the audio
          const playPromise = externalAudioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsPlaying(true);
            setShowYouTubeEmbed(false);
          }
        } catch (error) {
          console.error('Error playing song:', error);
          setError('Unable to play this song. Please try another one.');
          setIsPlaying(false);
        }
      }
    }
  };

  const togglePlayPause = async () => {
    if (onTogglePlayPause) {
      onTogglePlayPause();
    } else {
      // Fallback to local audio if no external handler
      if (externalAudioRef?.current) {
        try {
          if (isPlaying) {
            externalAudioRef.current.pause();
            setIsPlaying(false);
            setShowYouTubeEmbed(false);
          } else {
            if (!currentSong) {
              // If no song is selected, play the first one
              await playSong(playlist[0]);
            } else {
              const playPromise = externalAudioRef.current.play();
              if (playPromise !== undefined) {
                await playPromise;
                setIsPlaying(true);
              }
            }
          }
        } catch (error) {
          console.error('Error toggling play/pause:', error);
          setError('Unable to play audio. Please try again.');
        }
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (onSeek) {
      onSeek(time);
    } else if (externalAudioRef?.current) {
      externalAudioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (onVolumeChange) {
      onVolumeChange(newVolume);
    } else {
      setVolume(newVolume);
      if (externalAudioRef?.current) {
        externalAudioRef.current.volume = newVolume;
      }
    }
  };

  const openYouTubeMusic = (song: Song) => {
    if (song.youtubeId) {
      window.open(`https://www.youtube.com/watch?v=${song.youtubeId}`, '_blank');
    }
  };

  const skipToNext = () => {
    if (onSkipNext) {
      onSkipNext();
    } else {
      if (currentSong) {
        const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
        const nextSong = playlist[currentIndex + 1] || playlist[0];
        if (nextSong) {
          playSong(nextSong);
        }
      }
    }
  };

  const skipToPrevious = () => {
    if (onSkipPrevious) {
      onSkipPrevious();
    } else {
      if (currentSong) {
        const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
        const prevSong = playlist[currentIndex - 1] || playlist[playlist.length - 1];
        if (prevSong) {
          playSong(prevSong);
        }
      }
    }
  };

  return (
    <RetroWindow
      title="Music Player"
      onClose={onClose}
      initialSize={{ width: 400, height: 500 }}
    >
      <div className="h-full max-h-full overflow-auto p-2 break-words w-full max-w-[95vw] mx-auto pb-8">
        <div className="space-y-4">
          {/* Error Display */}
          {error && (
            <div className="bg-red-900/20 border border-red-600 text-red-300 p-3 rounded">
              <div className="text-sm font-bold mb-1">⚠️ Audio Error</div>
              <div className="text-xs">{error}</div>
            </div>
          )}

          {/* YouTube Embed */}
          {showYouTubeEmbed && currentSong?.youtubeId && (
            <div className="bg-muted p-4 rounded border border-border">
              <div className="text-center mb-2">
                <div className="text-sm text-muted-foreground">🎵 Now Playing on YouTube</div>
              </div>
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1&controls=1`}
                title={currentSong.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Current Song Display */}
          <div className="bg-muted p-4 rounded border border-border">
            <div className="text-center">
              <div className="text-2xl mb-2">🎵</div>
              <h3 className="font-bold text-retro-green text-lg">
                {currentSong ? currentSong.title : 'No song selected'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {currentSong ? currentSong.artist : 'Select a song to play'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {currentSong ? currentSong.genre : ''}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-2">
            <button
              onClick={skipToPrevious}
              className="retro-button bg-blue-900 hover:bg-blue-800 text-blue-300 px-3 py-2 rounded border border-blue-600"
              title="Previous Song"
            >
              ⏮️
            </button>
            <button
              onClick={togglePlayPause}
              className="retro-button bg-green-900 hover:bg-green-800 text-green-300 px-4 py-2 rounded border border-green-600"
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
            <button
              onClick={skipToNext}
              className="retro-button bg-blue-900 hover:bg-blue-800 text-blue-300 px-3 py-2 rounded border border-blue-600"
              title="Next Song"
            >
              ⏭️
            </button>
            <button
              onClick={() => {
                if (onSeek) {
                  onSeek(0);
                } else if (externalAudioRef?.current) {
                  externalAudioRef.current.currentTime = 0;
                  setCurrentTime(0);
                }
              }}
              className="retro-button bg-purple-900 hover:bg-purple-800 text-purple-300 px-3 py-2 rounded border border-purple-600"
              title="Restart Song"
            >
              🔄
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Volume</span>
              <span className="text-xs text-muted-foreground">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Playlist */}
          <div className="space-y-2">
            <h4 className="font-bold text-retro-green">📻 Playlist</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {playlist.map((song) => (
                <div
                  key={song.id}
                  className={`flex items-center justify-between p-3 rounded border cursor-pointer transition-all ${
                    currentSong?.id === song.id 
                      ? 'border-retro-green bg-green-900/20' 
                      : 'border-border hover:border-retro-green'
                  }`}
                  onClick={() => playSong(song)}
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">{song.title}</div>
                    <div className="text-xs text-muted-foreground">{song.artist}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{song.duration}</span>
                    <span className="text-xs px-2 py-1 bg-muted rounded border border-border">
                      {song.genre}
                    </span>
                    {song.youtubeId && (
                      <span className="text-xs px-2 py-1 bg-red-900/20 border border-red-600 rounded text-red-300">
                        📺
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Background Music Notice */}
          <div className="border-t border-border pt-4">
            <div className="text-xs text-muted-foreground">
              <div className="mb-2">🎧 Music Player v1.0</div>
              <div>Status: {isPlaying ? 'Playing' : 'Paused'}</div>
              <div>Format: MP3 / WAV / YouTube</div>
              <div>Quality: 320kbps</div>
              <div className="mt-2 p-2 bg-green-900/20 border border-green-600 rounded">
                <div className="text-green-300 font-bold">🎵 Background Music</div>
                <div className="text-green-200 text-xs">
                  Music continues playing even when you close this window!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RetroWindow>
  );
};
