import colors from 'vuetify/es5/util/colors'
import '@mdi/font/css/materialdesignicons.min.css'

const theme = {
  dark: false,
  themes: {
    light: {
      primary: colors.grey.darken3,
      secondary: '#f9f8f3',
      accent: colors.deepOrange.accent4,
      tertiary: colors.teal.darken1,
    },
  },
}

export default {
  // breakpoint: {},
  icons: { iconfont: 'mdi' },
  theme,
}
