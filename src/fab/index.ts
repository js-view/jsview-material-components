import { createViewBuilder, generateBindings, html, View } from '@jsview/core';
import '@material/mwc-fab';
import { spread } from '@open-wc/lit-helpers/src/spread';
import { nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { styleMap } from 'lit-html/directives/style-map';

export class FabView extends View {
  icon: string | View = '';
  label = '';
  mini = false;
  extended = false;
  reducedTouchTarget?: boolean = undefined;
  showIconAtEnd = false;
  onClick?: () => void = undefined;

  get body() {
    const bindings: { [k: string]: string } = generateBindings(this, ['icon']);

    const attrIcon = typeof this.icon === 'string' ? this.icon : undefined;

    return html`
      <mwc-fab
        icon="${ifDefined(attrIcon)}"
        ...=${spread({ ...this.attrs, ...bindings })}
        .view="${this}"
        style="${styleMap(this.styles)}"
      >
        ${this.icon instanceof View ? this.icon.slot('icon').body : nothing}
      </mwc-fab>
    `;
  }
}

export function Fab(icon: string | View) {
  return createViewBuilder(FabView).icon(icon);
}
