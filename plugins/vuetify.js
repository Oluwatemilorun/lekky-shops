import colors from 'vuetify/es5/util/colors';
import '@mdi/font/css/materialdesignicons.min.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

const theme = {
  dark: false,
  themes: {
    light: {
      primary: colors.grey.darken4,
      secondary: colors.grey.lighten5,
      tertiary: colors.teal.accent2,
      accent: colors.orange.accent4
    }
  },
  breakpoint: {}
};

export default {
  // breakpoint: {},
  icons: { iconfont: 'mdi' },
  theme
};
