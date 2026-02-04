const config = {
    API_URL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : 'https://myportfolio-h187.onrender.com')
};

export default config;
