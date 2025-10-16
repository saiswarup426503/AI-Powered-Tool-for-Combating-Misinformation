import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
<<<<<<< HEAD
    base: './',
=======
    base: mode === 'production' ? '/' : '/AI-Powered-Tool-for-Combating-Misinformation',
>>>>>>> d341868d91c09f688e0151d0149839e027c3a83e
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  }
}
<<<<<<< HEAD
);
=======
);
>>>>>>> d341868d91c09f688e0151d0149839e027c3a83e
