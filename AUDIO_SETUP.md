# 🎵 Music Player Setup Guide

## How to Add Real Audio Files

### Option 1: Local Audio Files (Recommended)

1. **Download your favorite songs** in MP3 format
2. **Place them in the `public/audio/` folder** with these exact names:
   - `end-of-beginning.mp3`
   - `the-scientist.mp3`
   - `wanna-be-yours.mp3`
   - `when-we-feel-young.mp3`
   - `cough-syrup.mp3`
   - `choo-lo.mp3`

### Option 2: YouTube Integration

To use YouTube videos instead of local files:

1. **Find the YouTube video ID** for each song:
   - Go to YouTube and search for the song
   - Copy the video ID from the URL (e.g., `dQw4w9WgXcQ` from `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)

2. **Update the YouTube IDs** in `src/components/MusicPlayer.tsx`:
   ```typescript
   {
     id: 1,
     title: "End of Beginning",
     artist: "Djo",
     duration: "2:39",
     url: "/audio/end-of-beginning.mp3",
     genre: "Indie Rock",
     youtubeId: "REAL_YOUTUBE_ID_HERE" // Replace with actual YouTube ID
   }
   ```

### Option 3: Spotify Integration

To add Spotify integration:

1. **Get Spotify track IDs** for each song
2. **Update the playlist** with `spotifyId` properties
3. **Add Spotify embed functionality** to the player

## Current Features

✅ **Local Audio Files** - MP3/WAV files in public/audio/  
✅ **YouTube Embeds** - Play songs directly from YouTube  
✅ **Volume Control** - Adjustable volume slider  
✅ **Progress Bar** - Seek through songs  
✅ **Playlist Management** - Click to play any song  
✅ **Retro Styling** - Matches your portfolio theme  

## Quick Test

The "Demo Bell" song should work immediately since it uses an external URL. Try clicking on it to test the player!

## File Structure

```
public/
  audio/
    end-of-beginning.mp3    ← Add your files here
    the-scientist.mp3
    wanna-be-yours.mp3
    when-we-feel-young.mp3
    cough-syrup.mp3
    choo-lo.mp3
```

## Legal Note

Make sure you have the rights to use any audio files you add to your project. Consider using royalty-free music or your own compositions.
