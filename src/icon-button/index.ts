import { html, View, createViewBuilder } from '@jsview/core';
import '@material/icon-button';
import { spread } from '@open-wc/lit-helpers/src/spread';
import { nothing, TemplateResult, SVGTemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { styleMap } from 'lit-html/directives/style-map';

export class IconButtonView extends View {
  icon?: string | View | TemplateResult | SVGTemplateResult = '';
  label = '';
  disabled = false;
  iconSize?: string = undefined;
  buttonSize?: string = undefined;

  get body() {
    let slotIcon: any;
    let icon: string | undefined;

    if (typeof this.icon === 'string') {
      slotIcon = undefined;
      icon = this.icon;
    } else {
      slotIcon = this.icon instanceof View ? this.icon.body : this.icon;
      icon = undefined;
    }
    return html`
      <mwc-icon-button
        .view="${this}"
        style="${styleMap(this.styles)}"
        ...=${spread(this.attrs)}
        label="${this.label}"
        ?disabled="${this.disabled}"
        icon="${ifDefined(icon)}"
      >
        ${slotIcon || nothing}
      </mwc-icon-button>
    `;
  }
}

export function IconButton(
  icon: string | TemplateResult | SVGTemplateResult | View
) {
  return createViewBuilder(
    IconButtonView,
    {},
    new Map([
      ['iconSize', '--mdc-icon-size'],
      ['buttonSize', '--mdc-icon-button-size'],
    ])
  ).icon(icon);
}
