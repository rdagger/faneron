import { cyan900,
         darkBlack,
         grey100,
         grey300,
         grey500,
         lightBlack,
         white,
         yellow500 } from 'material-ui/styles/colors';

import { fade } from 'material-ui/utils/colorManipulator.js';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: cyan900,
    primary2Color: '#E64A19',
    primary3Color: lightBlack,
    accent1Color: yellow500,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan900,
  },
};
