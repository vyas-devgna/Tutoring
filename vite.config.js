import { defineConfig } from 'vite';

export default defineConfig({
  // Setting base to './' makes all assets use relative paths,
  // making it fully portable and deployable to any GitHub Pages subfolder (e.g. /Tutoring/) without issues.
  base: './',
  build: {
    outDir: 'dist',
    minify: 'esbuild', // Use built-in esbuild for minification
    sourcemap: false,
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
