import { createViewBuilder, generateBindings, View } from '@jsview/core';
import '@material/mwc-formfield';
import '@material/mwc-switch';
import { Switch as MDCSwitch } from '@material/mwc-switch';
import { spread } from '@open-wc/lit-helpers/src/spread';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { styleMap } from 'lit-html/directives/style-map';

export class SwitchView extends View {
  label?: string = undefined;
  checked = false;
  disabled = false;
  onChange?: (_: boolean, isValid: boolean) => void = undefined;

  #isFormField = () => {
    return !!this.label;
  };

  #handleChange = (e: { target: MDCSwitch }) => {
    if (this.onChange) {
      this.onChange(e.target.checked, true);
    }
  };

  get body() {
    const options: { [k: string]: string } = generateBindings(this, [
      'label',
      'onChange',
    ]);

    const check = (isTopLevel = false) => {
      let attrs = { ...options };
      let styles = {};

      if (isTopLevel) {
        attrs = { ...attrs, ...this.attrs };
        styles = this.styles;
      }

      return html`
        <mwc-switch
          .view="${this}"
          ...=${spread(attrs)}
          style="${styleMap(styles)}"
          @change="${this.#handleChange}"
        ></mwc-switch>
      `;
    };

    if (this.#isFormField()) {
      return html`
        <mwc-formfield
          ...=${spread(this.attrs)}
          style="${styleMap(this.styles)}"
          label="${ifDefined(this.label)}"
        >
          ${check()}
        </mwc-formfield>
      `;
    }
    return check(true);
  }
}

export function Switch(label?: string) {
  return createViewBuilder(SwitchView).label(label);
}

export type SwitchElement = MDCSwitch;
