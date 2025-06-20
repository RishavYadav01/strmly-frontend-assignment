// Project: STRMLY Web Assignment
// Framework: React.js + Tailwind CSS

// File: src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// File: src/App.jsx
import React from 'react';
import VideoFeed from './screens/VideoFeed';
import BottomNav from './components/BottomNav';

const App = () => {
  return (
    <div className="w-full h-screen">
      <VideoFeed />
      <BottomNav />
    </div>
  );
};

export default App;

// File: src/screens/VideoFeed.jsx
import React, { useEffect, useRef, useState } from 'react';
import { fetchVideos } from '../services/api';

const VideoFeed = () => {
  const videoRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    fetchVideos()
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert('Failed to load videos');
      });
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
  };

  const toggleFollow = () => {
    setFollowed(!followed);
  };

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="flex flex-col h-screen overflow-y-scroll bg-black">
      {videos.map((video, idx) => (
        <div key={video.id} className="relative h-screen w-full">
          <video
            ref={videoRef}
            src={video.videoUrl}
            className="w-full h-full object-cover"
            autoPlay
            muted={isMuted}
            loop
            onClick={toggleMute}
          ></video>
          <div className="absolute bottom-24 left-5 text-white">
            <p className="text-sm">#{video.title}</p>
            <div className="flex items-center gap-2">
              <p className="font-semibold">{video.userName}</p>
              <button
                onClick={toggleFollow}
                className={`px-2 py-1 rounded text-sm ${followed ? 'bg-gray-700' : 'bg-red-500'}`}
              >
                {followed ? 'Following' : 'Follow'}
              </button>
            </div>
            <p className="line-clamp-3 w-72">{video.description}</p>
          </div>
          <div className="absolute right-5 bottom-24 flex flex-col gap-3 text-white text-sm">
            <p>❤️ {video.likes}</p>
            <p>💬 {video.comments}</p>
            <p>🔁 {video.shares}</p>
            <p>💰 {video.earnings}</p>
            <p>⋮</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;

// File: src/components/BottomNav.jsx
import React from 'react';
import { FaHome, FaPlus, FaSearch, FaUser, FaVideo } from 'react-icons/fa';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 w-full bg-black text-white flex justify-around py-2 border-t border-gray-700">
      <FaHome />
      <FaVideo />
      <FaPlus />
      <FaSearch />
      <FaUser />
    </div>
  );
};

export default BottomNav;

// File: src/services/api.js
import mockData from './mockData.json';

export const fetchVideos = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockData.length > 0) resolve(mockData);
      else reject('Failed to fetch');
    }, 1000);
  });
};

// File: src/services/mockData.json
[
  {
    "id": 1,
    "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
    "title": "StartupIndia",
    "description": "A motivational video for aspiring entrepreneurs and creators. Join the movement.",
    "userName": "Gabar Singh",
    "userImage": "https://i.pravatar.cc/150?img=1",
    "likes": "200K",
    "comments": "1.3K",
    "shares": "456",
    "earnings": "₹2.1K",
    "isPaid": true
  }
]

// File: src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
