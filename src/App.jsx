import { useState, useEffect } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'dashboard', 'database', 'fingerprint', 'game'
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy data for development
  const dummyPlayers = [
    {
      playerId: "player1",
      name: "Alice Detective",
      found: 4,
      total: 4,
      isSolved: true,
      lastUpdate: new Date(Date.now() - 5 * 60 * 1000).toISOString() // 5 minutes ago
    },
    {
      playerId: "player2", 
      name: "Bob Investigator",
      found: 3,
      total: 4,
      isSolved: false,
      lastUpdate: new Date(Date.now() - 2 * 60 * 1000).toISOString() // 2 minutes ago
    },
    {
      playerId: "player3",
      name: "Charlie Forensic",
      found: 2,
      total: 4,
      isSolved: false,
      lastUpdate: new Date(Date.now() - 1 * 60 * 1000).toISOString() // 1 minute ago
    },
    {
      playerId: "player4",
      name: "Diana Sleuth",
      found: 1,
      total: 4,
      isSolved: false,
      lastUpdate: new Date(Date.now() - 30 * 1000).toISOString() // 30 seconds ago
    },
    {
      playerId: "player5",
      name: "Eve Analyzer",
      found: 0,
      total: 4,
      isSolved: false,
      lastUpdate: new Date(Date.now() - 10 * 1000).toISOString() // 10 seconds ago
    }
  ];

  const fetchLeaderboard = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate some progress changes over time
      const updatedPlayers = dummyPlayers.map(player => {
        // Randomly update some players' progress occasionally
        if (Math.random() < 0.1 && !player.isSolved) {
          const newFound = Math.min(player.found + (Math.random() < 0.5 ? 1 : 0), player.total);
          return {
            ...player,
            found: newFound,
            isSolved: newFound === player.total,
            lastUpdate: new Date().toISOString()
          };
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

  useEffect(() => {
    // Initial fetch only
    fetchLeaderboard();
  }, []);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getProgressPercentage = (found, total) => {
    return total > 0 ? (found / total) * 100 : 0;
  };

  // Navigation Component
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
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">
                🔬 Forensic Investigation Platform
              </h1>
            </div>
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.icon} {item.label.split(' ').slice(1).join(' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    );
  };

  // Home Page Component
  const HomePage = () => {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <div className="text-8xl mb-6">🔬</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Forensic Investigation Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced digital forensic tools for crime scene analysis, evidence processing, and investigative workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              onClick={() => setCurrentPage('dashboard')}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Dashboard</h3>
              <p className="text-sm text-gray-600">View investigation statistics and case progress</p>
            </div>

            <div 
              onClick={() => setCurrentPage('database')}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="text-4xl mb-4">🗃️</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Database Search</h3>
              <p className="text-sm text-gray-600">Search criminal records and evidence database</p>
            </div>

            <div 
              onClick={() => setCurrentPage('fingerprint')}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="text-4xl mb-4">🖐️</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Fingerprint Scanner</h3>
              <p className="text-sm text-gray-600">Analyze and match fingerprint evidence</p>
            </div>

            <div 
              onClick={() => setCurrentPage('game')}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Training Game</h3>
              <p className="text-sm text-gray-600">Practice forensic skills with interactive challenges</p>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Fingerprint match found for Case #2024-001</span>
                <span className="text-sm text-gray-500">2 minutes ago</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">DNA analysis completed for Evidence #E-4429</span>
                <span className="text-sm text-gray-500">15 minutes ago</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600">New case assigned: Burglary Investigation</span>
                <span className="text-sm text-gray-500">1 hour ago</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };

  // Dashboard Page Component (Coming Soon)
  const DashboardPage = () => {
    return (
      <div className="min-h-screen bg-white relative">
        <Navigation />
        
        {/* Coming Soon Ribbon */}
        <div className="absolute top-16 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-2 transform rotate-12 translate-x-4 translate-y-4 z-20 shadow-lg">
          <span className="font-bold text-sm">🚧 COMING SOON</span>
        </div>

        {/* Blurred Content */}
        <div className="filter blur-sm pointer-events-none">
          <main className="max-w-6xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Investigation Dashboard</h1>
              <p className="text-gray-600">Overview of active cases and forensic analysis</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Cases</p>
                    <p className="text-2xl font-bold text-gray-800">12</p>
                  </div>
                  <div className="text-3xl">📁</div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Evidence Processed</p>
                    <p className="text-2xl font-bold text-gray-800">247</p>
                  </div>
                  <div className="text-3xl">🔍</div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Matches Found</p>
                    <p className="text-2xl font-bold text-gray-800">89</p>
                  </div>
                  <div className="text-3xl">✅</div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Cases Solved</p>
                    <p className="text-2xl font-bold text-gray-800">34</p>
                  </div>
                  <div className="text-3xl">🏆</div>
                </div>
              </div>
            </div>

            {/* Active Cases */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Active Cases</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-medium text-gray-800">Case #2024-001: Burglary Investigation</h3>
                    <p className="text-sm text-gray-600">Status: Evidence Analysis</p>
                    <p className="text-sm text-gray-500">Priority: High</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="font-medium text-gray-800">Case #2024-002: Identity Fraud</h3>
                    <p className="text-sm text-gray-600">Status: Fingerprint Matching</p>
                    <p className="text-sm text-gray-500">Priority: Medium</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-medium text-gray-800">Case #2024-003: Vehicle Theft</h3>
                    <p className="text-sm text-gray-600">Status: DNA Processing</p>
                    <p className="text-sm text-gray-500">Priority: Low</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Matches</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl">🖐️</div>
                    <div>
                      <p className="font-medium text-gray-800">Fingerprint Match</p>
                      <p className="text-sm text-gray-600">John Smith - 94.7% confidence</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl">🧬</div>
                    <div>
                      <p className="font-medium text-gray-800">DNA Match</p>
                      <p className="text-sm text-gray-600">Sarah Johnson - 99.2% confidence</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl">📸</div>
                    <div>
                      <p className="font-medium text-gray-800">Facial Recognition</p>
                      <p className="text-sm text-gray-600">Michael Davis - 87.3% confidence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Coming Soon Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-200 max-w-md mx-4">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Coming Soon</h2>
            <p className="text-gray-600 mb-4">
              We're working hard to bring you comprehensive case management and analytics tools.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Database Search Page Component
  const DatabasePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);

    const dummyResults = [
      {
        id: 1,
        name: "John Smith",
        type: "Criminal Record",
        confidence: 94.7,
        details: "Previous convictions: Burglary (2019), Theft (2021)",
        image: "https://via.placeholder.com/100x100/2563eb/ffffff?text=JS"
      },
      {
        id: 2,
        name: "Sarah Johnson",
        type: "Witness",
        confidence: 87.3,
        details: "Witness in Case #2023-445, Reliable testimony record",
        image: "https://via.placeholder.com/100x100/16a34a/ffffff?text=SJ"
      },
      {
        id: 3,
        name: "Michael Davis",
        type: "Person of Interest",
        confidence: 76.8,
        details: "Connected to multiple cases, No convictions",
        image: "https://via.placeholder.com/100x100/dc2626/ffffff?text=MD"
      }
    ];

    const handleSearch = async () => {
      if (!searchQuery.trim()) return;
      
      setSearching(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSearchResults(dummyResults);
      setSearching(false);
    };

    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Database Search</h1>
            <p className="text-gray-600">Search criminal records, evidence, and case files</p>
          </div>

          {/* Search Interface */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter name, case number, or evidence ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={searching}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                {searching ? '⏳ Searching...' : '🔍 Search'}
              </button>
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Search Results ({searchResults.length})
              </h2>
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <div key={result.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-800">{result.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          result.confidence >= 90 ? 'bg-green-100 text-green-800' :
                          result.confidence >= 75 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {result.confidence}% Match
                        </span>
                      </div>
                      <p className="text-sm text-blue-600 mb-1">{result.type}</p>
                      <p className="text-sm text-gray-600">{result.details}</p>
                    </div>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.length === 0 && searchQuery && !searching && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-600">No results found for "{searchQuery}"</p>
            </div>
          )}
        </main>
      </div>
    );
  };

  // Game Page Component (moved from leaderboard)
  const GamePage = () => {
    if (loading) {
      return (
        <div className="min-h-screen bg-white">
          <Navigation />
          <div className="flex items-center justify-center" style={{height: 'calc(100vh - 64px)'}}>
            <div className="text-center">
              <div className="text-6xl mb-4">⏳</div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen bg-white">
          <Navigation />
          <div className="flex items-center justify-center" style={{height: 'calc(100vh - 64px)'}}>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
              <div className="flex items-center gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <h3 className="text-red-800 font-medium">Error</h3>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🎮 Forensic Training Game</h1>
            <p className="text-gray-600">Competitive forensic skill challenges and leaderboard</p>
          </div>

          {players.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🙁</div>
              <p className="text-gray-600">No players yet</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {players
                    .sort((a, b) => (b.found / b.total) - (a.found / a.total))
                    .map((player, index) => (
                      <tr key={player.playerId} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-3 py-2 text-gray-500 text-sm">
                          {index + 1}
                        </td>
                        <td className="px-3 py-2 font-medium text-gray-800">
                          {player.name}
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-32 bg-gray-200 rounded">
                              <div 
                                className="h-2 bg-blue-500 rounded" 
                                style={{ width: `${getProgressPercentage(player.found, player.total)}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">
                              {player.found}/{player.total}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          {player.isSolved ? (
                            <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                              ✅ Solved
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                              ⏳ Solving
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-500">
                          {formatTime(player.lastUpdate)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    );
  };

  // Fingerprint Scanner Component
  const FingerprintPage = () => {
    const [scanState, setScanState] = useState('ready'); // 'ready', 'scanning', 'results'
    const [matches, setMatches] = useState([]);
    const [expandedImage, setExpandedImage] = useState(null);
    const [scanLoading, setScanLoading] = useState(false);

    // Dummy fingerprint match data
    const dummyMatches = [
      {
        id: 1,
        personName: "John Smith",
        image: "https://via.placeholder.com/200x200/2563eb/ffffff?text=Print+1"
      },
      {
        id: 2,
        personName: "Sarah Johnson", 
        image: "https://via.placeholder.com/200x200/16a34a/ffffff?text=Print+2"
      },
      {
        id: 3,
        personName: "Michael Davis",
        image: "https://via.placeholder.com/200x200/dc2626/ffffff?text=Print+3"
      },
      {
        id: 4,
        personName: "Emily Wilson",
        image: "https://via.placeholder.com/200x200/f59e0b/ffffff?text=Print+4"
      }
    ];

    const startScan = async () => {
      setScanState('scanning');
      setScanLoading(true);
      
      // Simulate scanning process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Just use the dummy matches as-is
      const sortedMatches = [...dummyMatches];
      setMatches(sortedMatches);
      setScanState('results');
      setScanLoading(false);
    };

    const finishScan = () => {
      setScanState('ready');
      setMatches([]);
      setExpandedImage(null);
    };

    if (scanState === 'ready') {
      return (
        <div className="min-h-screen bg-white">
          <Navigation />
          <div className="flex items-center justify-center" style={{height: 'calc(100vh - 64px)'}}>
            <div className="text-center max-w-md">
              <div className="text-8xl mb-6">🔍</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Fingerprint Scanner
              </h2>
              <p className="text-gray-600 mb-8">
                Place your finger on the scanner to begin analysis
              </p>
              <button
                onClick={startScan}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
              >
                🖐️ Start Scan
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (scanState === 'scanning') {
      return (
        <div className="min-h-screen bg-white">
          <Navigation />
          
          {/* Scanning content */}
          <div className="flex items-center justify-center" style={{height: 'calc(100vh - 80px)'}}>
            <div className="text-center">
              <div className="text-8xl mb-6 animate-pulse">🔍</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Scanning...
              </h2>
              <p className="text-gray-600 mb-6">
                Analyzing fingerprint patterns
              </p>
              <div className="flex justify-center">
                <div className="w-64 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                🔍 Fingerprint Matches
              </h1>
              <p className="text-gray-600">
                {matches.length} matches found
              </p>
            </div>
            <button
              onClick={finishScan}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              ✅ New Scan
            </button>
          </div>

          {/* Results */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {matches.map((match) => (
              <div key={match.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <img
                    src={match.image}
                    alt={`Fingerprint ${match.id}`}
                    className="w-full h-48 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setExpandedImage(match)}
                  />
                </div>
                
                <h3 className="font-bold text-gray-800 text-center">
                  {match.personName}
                </h3>
              </div>
            ))}
          </div>
          {/* Expanded Image Modal */}
        {expandedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setExpandedImage(null)}
          >
            <div className="bg-white rounded-lg p-6 max-w-2xl max-h-full overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {expandedImage.personName}
                </h3>
                <button
                  onClick={() => setExpandedImage(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
              <img
                src={expandedImage.image}
                alt={`Expanded fingerprint ${expandedImage.id}`}
                className="w-full h-auto rounded-lg border border-gray-200"
              />
            </div>
          </div>
        )}
        </main>
      </div>
    );
  };

  // Main routing logic
  if (currentPage === 'home') {
    return <HomePage />;
  }

  if (currentPage === 'dashboard') {
    return <DashboardPage />;
  }

  if (currentPage === 'database') {
    return <DatabasePage />;
  }

  if (currentPage === 'fingerprint') {
    return <FingerprintPage />;
  }

  if (currentPage === 'game') {
    return <GamePage />;
  }

  // Default fallback
  return <HomePage />;
}

export default App;
