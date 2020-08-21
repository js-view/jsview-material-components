import { View } from '@jsview/core';

View.prototype.theme = function theme({
  primaryColor,
  secondaryColor,
  surfaceColor,
  backgroundColor,
  errorColor,

  onPrimaryColor,
  onSecondaryColor,
  onSurfaceColor,

  textPrimaryOnBackground,
  textSecondaryOnBackground,
  textHintOnBackground,
  textIconOnBackground,
  textDisabledOnBackground,
}: MaterialTheme) {
  this.style('--mdc-theme-primary', primaryColor);
  this.style('--mdc-theme-secondary', secondaryColor);
  this.style('--mdc-theme-surface', surfaceColor);
  this.style('--mdc-theme-background', backgroundColor);
  this.style('--mdc-theme-error', errorColor);

  this.style('--mdc-theme-on-primary', onPrimaryColor);
  this.style('--mdc-theme-on-secondary', onSecondaryColor);
  this.style('--mdc-theme-on-surface', onSurfaceColor);

  this.style('--mdc-theme-text-primary-on-background', textPrimaryOnBackground);
  this.style(
    '--mdc-theme-text-secondary-on-background',
    textSecondaryOnBackground
  );
  this.style('--mdc-theme-text-hint-on-background', textHintOnBackground);
  this.style('--mdc-theme-text-icon-on-background', textIconOnBackground);
  this.style(
    '--mdc-theme-text-disabled-on-background',
    textDisabledOnBackground
  );

  return this;
};

declare module '@jsview/core/view' {
  interface View {
    theme: (_: MaterialTheme) => this;
  }
}

export interface MaterialTheme {
  primaryColor?: string;
  secondaryColor?: string;
  surfaceColor?: string;
  backgroundColor?: string;
  errorColor?: string;

  onPrimaryColor?: string;
  onSecondaryColor?: string;
  onSurfaceColor?: string;

  textPrimaryOnBackground?: string;
  textSecondaryOnBackground?: string;
  textHintOnBackground?: string;
  textDisabledOnBackground?: string;
  textIconOnBackground?: string;
}
