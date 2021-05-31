const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://openwhen.darrylforbes.me/api'
  : 'http://localhost/api';

export { apiUrl };
