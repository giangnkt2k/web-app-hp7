import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: '#ffe100',
        success: '#07c160',
        danger: '#ee0a24',
        warning: '#ff976a'
      }
    }
  },
  plugins: [require('windicss/plugin/aspect-ratio')]
})
