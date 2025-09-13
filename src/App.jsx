import { useState, useEffect } from 'react';

const BASE_URL = "http://api.yousified.xyz";

async function registerUser(file, username) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("username", username);
  const res = await fetch(`${BASE_URL}/register`, { method: "POST", body: formData });
  if (!res.ok) throw new Error("Register failed");
  return await res.json();
}

async function matchFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${BASE_URL}/match`, { method: "POST", body: formData });
  if (!res.ok) throw new Error("Match failed");
  return await res.json();
}

async function registerFolder(folderPath, username) {
  const res = await fetch(`${BASE_URL}/register-folder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folderPath, username }),
  });
  if (!res.ok) throw new Error("Register folder failed");
  return await res.json();
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dummyPlayers = [
    { playerId: "player1", name: "Alice Detective", found: 4, total: 4, isSolved: true, lastUpdate: new Date(Date.now() - 5 * 60 * 1000).toISOString() },
    { playerId: "player2", name: "Bob Investigator", found: 3, total: 4, isSolved: false, lastUpdate: new Date(Date.now() - 2 * 60 * 1000).toISOString() },
    { playerId: "player3", name: "Charlie Forensic", found: 2, total: 4, isSolved: false, lastUpdate: new Date(Date.now() - 1 * 60 * 1000).toISOString() },
    { playerId: "player4", name: "Diana Sleuth", found: 1, total: 4, isSolved: false, lastUpdate: new Date(Date.now() - 30 * 1000).toISOString() },
    { playerId: "player5", name: "Eve Analyzer", found: 0, total: 4, isSolved: false, lastUpdate: new Date(Date.now() - 10 * 1000).toISOString() }
  ];

  const fetchLeaderboard = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const updatedPlayers = dummyPlayers.map(player => {
        if (Math.random() < 0.1 && !player.isSolved) {
          const newFound = Math.min(player.found + (Math.random() < 0.5 ? 1 : 0), player.total);
          return { ...player, found: newFound, isSolved: newFound === player.total, lastUpdate: new Date().toISOString() };
        }
        return player;
      });
      setPlayers(updatedPlayers);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeaderboard(); }, []);

  const formatTime = (timestamp) =>
      new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const getProgressPercentage = (found, total) => (total > 0 ? (found / total) * 100 : 0);

  const Navigation = () => {
    const navItems = [
      { id: 'home', label: '🏠 Home', icon: '🏠' },
      { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
      { id: 'database', label: '🗃️ Database Search', icon: '🗃️' },
      { id: 'fingerprint', label: '🖐️ Fingerprint Scanner', icon: '🖐️' },
      { id: 'game', label: '🎮 Mini Game', icon: '🎮' }
    ];
    return (
        <nav className="border-b border-gray-200 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-xl font-bold text-gray-800">🔬 Forensic Investigation Platform</h1>
              <div className="flex space-x-1">
                {navItems.map((item) => (
                    <button key={item.id} onClick={() => setCurrentPage(item.id)}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                      {item.icon} {item.label.split(' ').slice(1).join(' ')}
                    </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
    );
  };

  const HomePage = () => (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navigation />
        <main className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 shadow-lg">
              <div className="text-6xl">🔬</div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Forensic Investigation Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Advanced digital forensic tools for crime scene analysis, evidence processing, and investigative workflows
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-4">🖐️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Fingerprint Analysis</h3>
              <p className="text-gray-600 mb-4">Advanced biometric matching and identification system</p>
              <button 
                onClick={() => setCurrentPage('fingerprint')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Start Scanning
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-4">🗃️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Database Search</h3>
              <p className="text-gray-600 mb-4">Search through forensic databases and case files</p>
              <button 
                onClick={() => setCurrentPage('database')}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Search Database
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Training Game</h3>
              <p className="text-gray-600 mb-4">Interactive forensic training and skill development</p>
              <button 
                onClick={() => setCurrentPage('game')}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Play Game
              </button>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">System Online - All APIs Connected</span>
            </div>
          </div>
        </main>
      </div>
  );

  const DashboardPage = () => (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navigation />
        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Investigation Dashboard</h1>
              <p className="text-gray-600">Overview of active cases and forensic analysis</p>
            </div>
            <div className="bg-orange-100 border border-orange-200 text-orange-800 px-4 py-2 rounded-lg">
              🚧 Coming Soon
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Active Cases</h3>
                <div className="text-2xl">📋</div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <p className="text-gray-600 text-sm">Cases under investigation</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Evidence Items</h3>
                <div className="text-2xl">🔍</div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">247</div>
              <p className="text-gray-600 text-sm">Items processed this month</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Match Rate</h3>
                <div className="text-2xl">📊</div>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">94%</div>
              <p className="text-gray-600 text-sm">Successful identifications</p>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Fingerprint match found for Case #2024-001</span>
                  <span className="text-sm text-gray-400">2 min ago</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">New evidence uploaded to Case #2024-003</span>
                  <span className="text-sm text-gray-400">15 min ago</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Database search completed for John Doe</span>
                  <span className="text-sm text-gray-400">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );

  const GamePage = () => {
    if (loading) {
      return <div className="min-h-screen bg-white"><Navigation /><div className="flex items-center justify-center h-[80vh]"><p>⏳ Loading...</p></div></div>;
    }
    return (
        <div className="min-h-screen bg-white">
          <Navigation />
          <main className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">🎮 Forensic Training Game</h1>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left">#</th>
                  <th className="px-3 py-3 text-left">Player</th>
                  <th className="px-3 py-3 text-left">Progress</th>
                  <th className="px-3 py-3 text-left">Status</th>
                  <th className="px-3 py-3 text-left">Last Update</th>
                </tr>
                </thead>
                <tbody>
                {players.sort((a, b) => (b.found / b.total) - (a.found / a.total)).map((player, i) => (
                    <tr key={player.playerId} className="border-t hover:bg-gray-50">
                      <td className="px-3 py-2">{i + 1}</td>
                      <td className="px-3 py-2">{player.name}</td>
                      <td className="px-3 py-2">{player.found}/{player.total}</td>
                      <td className="px-3 py-2">{player.isSolved ? "✅ Solved" : "⏳ Solving"}</td>
                      <td className="px-3 py-2">{formatTime(player.lastUpdate)}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
    );
  };

  const FingerprintPage = () => {
    const [scanState, setScanState] = useState('ready');
    const [file, setFile] = useState(null);
    const [matches, setMatches] = useState([]);
    const [scanLoading, setScanLoading] = useState(false);
    const [error, setError] = useState(null);
    const [registerMode, setRegisterMode] = useState(false);
    const [username, setUsername] = useState('');

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
      setError(null);
    };

    const startScan = async () => {
      if (!file) {
        setError("Please select a file first");
        return;
      }
      
      setScanState("scanning");
      setScanLoading(true);
      setError(null);
      
      try {
        const matchResult = await matchFile(file);
        setMatches([matchResult]);
        setScanState("results");
      } catch (err) {
        console.error('Match error:', err);
        setError(`Scan failed: ${err.message}`);
        setScanState("ready");
      } finally {
        setScanLoading(false);
      }
    };

    const registerFingerprint = async () => {
      if (!file || !username.trim()) {
        setError("Please select a file and enter a username");
        return;
      }
      
      setScanLoading(true);
      setError(null);
      
      try {
        const result = await registerUser(file, username.trim());
        alert(`Registration successful! User: ${username}`);
        setFile(null);
        setUsername('');
        setRegisterMode(false);
      } catch (err) {
        console.error('Registration error:', err);
        setError(`Registration failed: ${err.message}`);
      } finally {
        setScanLoading(false);
      }
    };

    if (scanState === 'ready') {
      return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <Navigation />
            <div className="flex items-center justify-center min-h-[80vh] px-4">
              <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🖐️</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Fingerprint Scanner</h2>
                  <p className="text-gray-600">Upload a fingerprint image for analysis</p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <label className="cursor-pointer">
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                      <div className="text-gray-600">
                        <div className="text-3xl mb-2">📁</div>
                        <span className="font-medium">Click to choose file</span>
                        <p className="text-sm text-gray-500 mt-1">PNG, JPG, or JPEG</p>
                      </div>
                    </label>
                  </div>

                  {file && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800">📄 {file.name}</p>
                      <p className="text-xs text-blue-600">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="registerMode"
                      checked={registerMode}
                      onChange={(e) => setRegisterMode(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="registerMode" className="text-sm text-gray-700">
                      Register new fingerprint
                    </label>
                  </div>

                  {registerMode && (
                    <input
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}

                  <div className="flex space-x-3">
                    {registerMode ? (
                      <button 
                        onClick={registerFingerprint}
                        disabled={scanLoading || !file || !username.trim()}
                        className="flex-1 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                      >
                        {scanLoading ? '⏳ Registering...' : '📝 Register'}
                      </button>
                    ) : (
                      <button 
                        onClick={startScan}
                        disabled={scanLoading || !file}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                      >
                        {scanLoading ? '⏳ Scanning...' : '🔍 Scan'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
      );
    }

    if (scanState === 'scanning') {
      return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <Navigation />
            <div className="flex items-center justify-center h-[80vh]">
              <div className="text-center bg-white p-12 rounded-2xl shadow-xl">
                <div className="text-8xl mb-6 animate-pulse">🔍</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Analyzing Fingerprint...</h2>
                <p className="text-gray-600 mb-6">Please wait while we process your scan</p>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              </div>
            </div>
          </div>
      );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
          <Navigation />
          <main className="max-w-4xl mx-auto px-6 py-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">✅</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Match Results</h1>
              <p className="text-gray-600">Fingerprint analysis complete</p>
            </div>
            
            {matches.map((m, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 mb-6 shadow-xl border border-gray-100">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Matched User:</span>
                        <span className="font-bold text-lg text-blue-600">{m.username}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Match Score:</span>
                        <span className="font-bold text-lg text-green-600">{m.score}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Certainty Level:</span>
                        <span className="font-bold text-lg text-purple-600">{m.certainty}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Processing Time:</span>
                        <span className="font-mono text-gray-800">{m.matchingTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className={`text-6xl mb-2 ${m.score > 80 ? 'text-green-500' : m.score > 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                          {m.score > 80 ? '✅' : m.score > 60 ? '⚠️' : '❌'}
                        </div>
                        <p className="text-sm text-gray-600">
                          {m.score > 80 ? 'Strong Match' : m.score > 60 ? 'Partial Match' : 'No Match'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
            
            <div className="text-center">
              <button 
                onClick={() => {setScanState('ready'); setMatches([]); setFile(null);}}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                🔍 Scan Another
              </button>
            </div>
          </main>
        </div>
    );
  };

  const DatabasePage = () => {
    const [folderPath, setFolderPath] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleRegisterFolder = async () => {
      if (!folderPath.trim() || !username.trim()) {
        setError("Please enter both folder path and username");
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const result = await registerFolder(folderPath.trim(), username.trim());
        setResult(`Successfully registered folder for user: ${username}`);
        setFolderPath('');
        setUsername('');
      } catch (err) {
        console.error('Register folder error:', err);
        setError(`Registration failed: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Navigation />
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🗃️</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Database Management</h1>
            <p className="text-gray-600">Register folder paths for forensic database indexing</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Register Folder</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}
            
            {result && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                {result}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Folder Path
                </label>
                <input
                  type="text"
                  value={folderPath}
                  onChange={(e) => setFolderPath(e.target.value)}
                  placeholder="/path/to/evidence/folder"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="forensic_analyst_01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                onClick={handleRegisterFolder}
                disabled={loading || !folderPath.trim() || !username.trim()}
                className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {loading ? '⏳ Registering...' : '📁 Register Folder'}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  };

  if (currentPage === 'home') return <HomePage />;
  if (currentPage === 'dashboard') return <DashboardPage />;
  if (currentPage === 'database') return <DatabasePage />;
  if (currentPage === 'fingerprint') return <FingerprintPage />;
  if (currentPage === 'game') return <GamePage />;
  return <HomePage />;
}

export default App;
