# 🔍 Forensic Game — Leaderboard

A minimal React + Tailwind CSS app that displays a real-time leaderboard for a forensic game. Auto-updates every 3 seconds.

## 🚀 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://YOUR_BACKEND_URL
```

Replace `https://YOUR_BACKEND_URL` with your actual backend API endpoint.

### 3. Run Development Server

```bash
npm run dev
```

## 📡 API Requirements

Your backend should provide a `GET /leaderboard` endpoint that returns:

```json
{
  "players": [
    {
      "playerId": "unique-id",
      "name": "Player Name",
      "found": 2,
      "total": 4,
      "isSolved": false,
      "lastUpdate": "2024-01-01T12:00:00Z"
    }
  ]
}
```

### Player Object Fields:
- `playerId`: Unique identifier for the player
- `name`: Display name of the player
- `found`: Number of clues/items found
- `total`: Total number of clues/items to find
- `isSolved`: Boolean indicating if player completed the game
- `lastUpdate`: ISO timestamp of last activity

## 🎨 Features

- **Real-time updates**: Polls API every 3 seconds
- **Minimal UI**: Clean white background with accent colors
- **Progress visualization**: Blue progress bars showing completion
- **Status indicators**: Green pills for solved, amber for solving
- **Responsive design**: Works on desktop and mobile
- **Error handling**: Shows error states gracefully
- **Loading states**: Spinner while fetching data
- **Empty states**: Friendly message when no players

## 🎯 UI Design

- **Colors**: Blue `#2563eb`, Green `#16a34a`, Red `#dc2626`
- **Icons**: Emojis only (🔍, ✅, ⏳, ❌, 🙁)
- **Typography**: System font stack
- **Layout**: Centered content with max-width
- **Interactions**: Hover effects on table rows

## 🛠 Tech Stack

- **React 18** with hooks
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **No UI libraries** (no Chakra, Daisy, etc.)
- **No icon libraries** (emojis only)

## 📁 Project Structure

```
src/
├── App.jsx          # Main leaderboard component
├── main.jsx         # React app entry point
└── index.css        # Tailwind imports

tailwind.config.js   # Tailwind configuration
postcss.config.js    # PostCSS configuration
```

## 🔄 Data Flow

1. App loads → Shows loading spinner (⏳)
2. Fetches `/leaderboard` → Updates player list
3. Sets 3-second interval → Continuous polling
4. Sorts players by progress → Renders table
5. Error handling → Shows error state (❌)
6. Empty data → Shows "No players yet" (🙁)

## 🎮 Player States

- **✅ Solved**: Green pill when `isSolved: true`
- **⏳ Solving**: Amber pill when `isSolved: false`
- **Progress**: Blue bar showing `found/total` ratio
- **Ranking**: Sorted by completion percentage

## 📱 Responsive Behavior

- Desktop: Full table layout
- Mobile: Table scrolls horizontally
- Progress bars: Fixed width for consistency
- Text: Readable sizes across devices