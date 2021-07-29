import {colors} from './colors';

export const Fonts = {
  xxs: 12,
  sm: 16,
  md: 20,
  lg: 28,
  xl: 32,
  xxl: 40,
  bold: 'Lato-Bold',
  normal: 'Lato-Regular',
};

export const typography = {
  heading1: {
    color: colors.text.default,
    fontFamily: 'Lato-Regular',
    fontSize: Fonts.xxl,
    lineHeight: Fonts.xxl,
  },
  heading2: {
    color: colors.text.default,
    fontFamily: 'Lato-Regular',
    fontSize: Fonts.xl,
    lineHeight: Fonts.xl + 4,
  },
  heading3: {
    color: colors.text.default,
    fontFamily: 'Lato-Regular',
    fontSize: Fonts.lg,
    lineHeight: Fonts.xl,
  },
  heading4: {
    color: colors.text.default,
    fontFamily: 'Lato-Regular',
    fontSize: Fonts.md,
    lineHeight: Fonts.md + 4,
  },
  heading5: {
    color: colors.text.default,
    fontFamily: 'Lato-Regular',
    fontSize: Fonts.sm,
    lineHeight: Fonts.md,
  },
  heading6: {
    color: colors.text.default,
    fontFamily: 'Lato-Regular',
    fontSize: Fonts.xxs,
    lineHeight: Fonts.xxs,
  },
};
