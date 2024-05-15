import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const JWT_EXPIRY_TIME = 1000 * 60 * 60 * 3 - 1000 * 60 * 10; // 3시간 - 10분
const BASE_URL = import.meta.env.VITE_APP_URL;

export const useTokenRefreshTimer = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login') {
      return;
    }

    let time = localStorage.getItem('expirationTime') ?? '';

    if (!time) {
      let expirationTime = new Date(new Date().getTime() + JWT_EXPIRY_TIME).toISOString();
      localStorage.setItem('expirationTime', expirationTime);
      time = expirationTime;
    }

    const remainingTime = calculateRemainingTime(time);
    const timer = setTimeout(() => refreshTokens(), remainingTime);
    return () => clearTimeout(timer);
  });

  const refreshTokens = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/refresh`, {
        headers: { 'Refresh-Token': `${localStorage.getItem('refresh-token')}` },
      });
      const newAuthTokens = response.headers['access-token'];
      localStorage.setItem('access-token', newAuthTokens);

      const newRefreshToken = response.headers['refresh-token'];
      localStorage.setItem('refresh-token', newRefreshToken);

      let expirationTime = new Date(new Date().getTime() + JWT_EXPIRY_TIME).toISOString();
      localStorage.setItem('expirationTime', expirationTime);
    } catch (error) {
      if (error === 401 || error) {
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        clearLocalStorage();
        window.location.href = '/login';
      }
    }
  };
};

export const clearLocalStorage = () => {
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('access-token');
  localStorage.removeItem('refresh-token');
  localStorage.removeItem('userId');
};

export const calculateRemainingTime = (expirationTime: string): number => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  return adjExpirationTime - currentTime;
};
