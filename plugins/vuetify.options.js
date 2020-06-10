import colors from 'vuetify/es5/util/colors';
import '@mdi/font/css/materialdesignicons.min.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

const theme = {
  dark: false,
  themes: {
    light: {
      primary: colors.teal.lighten1,
      secondary: colors.teal.darken4,
      tertiary: colors.grey.darken3,
      accent: colors.red.accent3
    }
  }
};

export default {
  // breakpoint: {},
  icons: { iconfont: 'mdi' },
  theme
};
