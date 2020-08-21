import { createView, Font, html } from '@jsview/core';
import { TextScale } from './font.js';
import { spread } from '@open-wc/lit-helpers/src/spread';
import { styleMap } from 'lit-html/directives/style-map';

export function Text(text: string, font: Font = TextScale.body1) {
  return createView(
    ({ attrs, styles }) =>
      html`<span ...=${spread(attrs)} style="${styleMap(styles)}"
        >${text}</span
      >`
  ).font(font);
}

export * from './font.js';
