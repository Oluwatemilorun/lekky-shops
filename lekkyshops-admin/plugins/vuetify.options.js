import colors from 'vuetify/es5/util/colors'
import '@mdi/font/css/materialdesignicons.min.css'

const theme = {
  dark: false,
  themes: {
    light: {
      primary: '#20c0a8',
      secondary: '#f9f8f3',
      accent: '#FF5252',
      tertiary: colors.teal.darken1,
    },
    dark: {
      primary: '#40c8b0',
    },
  },
}

export default {
  // breakpoint: {},
  icons: { iconfont: 'mdi' },
  theme,
}
