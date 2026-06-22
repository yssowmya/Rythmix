import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MusicProvider } from './context/MusicContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/Home';
import AlbumsPage from './pages/Albums';
import PlaylistsPage from './pages/Playlists';
import DownloadsPage from './pages/Downloads';
import ProfilePage from './pages/Profile';
import ArtistPage from './pages/ArtistPage';
import AlbumDetailPage from './pages/AlbumDetailPage';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';

function App() {
  return (
    <AuthProvider>
      <MusicProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/albums" element={<AlbumsPage />} />
              <Route path="/playlists" element={<PlaylistsPage />} />
              <Route path="/downloads" element={<DownloadsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/artist/:id" element={<ArtistPage />} />
              <Route path="/album/:id" element={<AlbumDetailPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Layout>
        </Router>
      </MusicProvider>
    </AuthProvider>
  );
}

export default App;