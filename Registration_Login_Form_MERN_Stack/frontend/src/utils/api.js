// src/utils/api.js

import axios from 'axios';
import { mockUsers, mockRecommendedFriends } from './mockData';

// Constants
const API_URL = 'http://localhost:3001/api'; // Replace with your actual backend URL

// Mocked functions for testing
export const searchUsers = async (query, token) => {
  // Simulate a delay for the async function
  await new Promise(resolve => setTimeout(resolve, 500));

  // Filter mock data based on the query
  const filteredUsers = mockUsers.filter(user =>
    user.username.toLowerCase().includes(query.toLowerCase())
  );
  return filteredUsers;
};

export const sendFriendRequest = async (userId, token) => {
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // Simulate sending friend request
  console.log(`Friend request sent to userId: ${userId}`);
  return { success: true };
};

export const getRecommendedFriends = async (token) => {
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRecommendedFriends;
};

export const respondToFriendRequest = async (requestId, response, token) => {
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // Simulate response to friend request
  console.log(`Responded to requestId: ${requestId} with response: ${response}`);
  return { success: true };
};
