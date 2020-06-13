import colors from 'vuetify/es5/util/colors';
import '@mdi/font/css/materialdesignicons.min.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

const theme = {
  dark: false,
  themes: {
    light: {
      primary: colors.grey.darken3,
      secondary: colors.grey.lighten2,
      tertiary: colors.teal.darken1,
      accent: colors.red.accent3
    }
  }
};

export default {
  // breakpoint: {},
  icons: { iconfont: 'mdi' },
  theme
};
