import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchUsers, sendFriendRequest, getRecommendedFriends } from '../utils/api';
import './Home.css'; 

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [recommendedFriends, setRecommendedFriends] = useState([]);
  const [token, setToken] = useState(''); // Replace with actual token logic

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const friends = await getRecommendedFriends(token);
        setRecommendedFriends(friends);
      } catch (err) {
        console.error('Failed to fetch recommendations', err);
      }
    };

    fetchRecommendations();
  }, [token]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const result = await searchUsers(searchQuery, token);
      setUsers(result);
    } catch (err) {
      console.error('Failed to search users', err);
    }
  };

  const handleSendRequest = async (userId) => {
    try {
      await sendFriendRequest(userId, token);
      alert('Friend request sent');
    } catch (err) {
      console.error('Failed to send friend request', err);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Home Page</h1>
        <Link to='/login' className="btn btn-light logout-button">Logout</Link>
      </header>

      <div className="search-section">
        <h2>Search Users</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for users..."
            className="form-control search-input"
          />
          <button type="submit" className="btn btn-primary search-button">Search</button>
        </form>
      </div>

      <div className="results-section">
        <h2>Search Results</h2>
        <table className="table table-striped user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button
                    onClick={() => handleSendRequest(user._id)}
                    className="btn btn-success btn-sm"
                  >
                    Add Friend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="recommendations-section">
        <h2>Friend Recommendations</h2>
        <table className="table table-striped friend-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recommendedFriends.map((friend, index) => (
              <tr key={friend._id}>
                <td>{index + 1}</td>
                <td>{friend.username}</td>
                <td>{friend.email}</td>
                <td>{friend.phone}</td>
                <td>
                  <button
                    onClick={() => handleSendRequest(friend._id)}
                    className="btn btn-success btn-sm"
                  >
                    Add Friend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
