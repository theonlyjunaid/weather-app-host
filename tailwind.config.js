const styles = {
  colors: {
    accent: '#1de9b6',
    dark: '#050306',
    light: '#efefef',
    'accent-shade': '#00C8B6',
  },
  fontFamily: {
    regular: ['Lato', 'sans-serif'],
    special: ['Orbitron', 'sans-serif']
  }
}
module.exports = {
  content: ["views/*.{html,ejs}", "views/partials/*.{html,ejs}"],
  theme: {
    extend: {
      colors: {
        accent: styles.colors.accent,
        'accent-shade': styles.colors["accent-shade"],
        dark: styles.colors.dark,
        light: styles.colors.light
      },
      fontFamily: {
        regular: styles.fontFamily.regular,
        special: styles.fontFamily.special
      },
      boxShadow: {
        accent: `0 0 5px ${styles.colors.accent}, 
        0 0 10px ${styles.colors.dark}`
      }
    },
  },
  plugins: [],
}