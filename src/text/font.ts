import { Font } from '@jsview/core';

export class TextScale {
  static fontWeightLight = '300';
  static fontWeightNormal = '400';
  static fontWeightMedium = '500';
  static fontWeightBold = '900';

  static headline1: Font = {
    fontWeight: TextScale.fontWeightLight,
    fontSize: '6rem',
    letterSpacing: '-1.5px',
  };

  static headline2: Font = {
    fontWeight: TextScale.fontWeightLight,
    fontSize: '3.75rem',
    letterSpacing: '-0.5px',
  };

  static headline3: Font = {
    fontWeight: TextScale.fontWeightNormal,
    fontSize: '3rem',
    letterSpacing: '0',
  };

  static headline4: Font = {
    fontWeight: TextScale.fontWeightNormal,
    fontSize: '2.125rem',
    letterSpacing: '0.25px',
  };

  static headline5: Font = {
    fontWeight: TextScale.fontWeightNormal,
    fontSize: '1.5rem',
    letterSpacing: '0',
  };

  static headline6: Font = {
    fontWeight: TextScale.fontWeightMedium,
    fontSize: '1.25rem',
    letterSpacing: '0.15px',
  };

  static subtitle1: Font = {
    fontWeight: TextScale.fontWeightNormal,
    fontSize: '1rem',
    letterSpacing: '0.15px',
  };

  static subtitle2: Font = {
    fontWeight: TextScale.fontWeightNormal,
    fontSize: '0.875rem',
    letterSpacing: '0.1px',
  };

  static body1: Font = {
    fontWeight: TextScale.fontWeightNormal,
    fontSize: '1rem',
    letterSpacing: '0.5px',
  };

  static body2: Font = {
    fontWeight: TextScale.fontWeightNormal,
    fontSize: '0.875rem',
    letterSpacing: '0.25px',
  };

  static caption: Font = {
    fontWeight: TextScale.fontWeightNormal,
    fontSize: '0.75rem',
    letterSpacing: '0.4px',
  };

  static overline: Font = {
    fontWeight: TextScale.fontWeightNormal,
    fontSize: '0.75rem',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  };
}
