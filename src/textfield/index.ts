import { generateBindings, html, View, createViewBuilder } from '@jsview/core';
import '@material/mwc-textfield';
import { TextFieldType } from '@material/mwc-textfield';
import { spread } from '@open-wc/lit-helpers/src/spread';
import { styleMap } from 'lit-html/directives/style-map';

export class TextfieldView extends View {
  label?: string = undefined;
  name?: string = undefined;
  type: TextFieldType = 'text';
  value?: string = undefined;
  placeholder?: string = undefined;
  prefix?: string = undefined;
  suffix?: string = undefined;
  icon?: string = undefined;
  iconTrailing?: string = undefined;
  disabled = false;
  required = false;
  charCounter = false;
  outlined = false;
  helper?: string = undefined;
  healperPersistent = false;
  maxLength?: number = undefined;
  validationMessage?: string = undefined;
  pattern?: string = undefined;
  min?: number | string = undefined;
  max?: number | string = undefined;
  size: number | null = null;
  step: number | null = null;
  autoValidate = false;
  validityTransform:
    | ((value: string, nativeValidity: ValidityState) => Partial<ValidityState>)
    | null = null;

  onChange?: (_: string, isValid: boolean) => void = undefined;

  #handleChange = (e: { target: HTMLInputElement }) => {
    if (this.onChange) {
      this.onChange(e.target.value, e.target.checkValidity());
    }
  };

  get body() {
    const bindings: { [k: string]: string } = generateBindings(this, [
      'onChange',
      'validityTransform',
    ]);

    return html`
      <mwc-textfield
        .view="${this}"
        ...=${spread({ ...this.attrs, ...bindings })}
        style="${styleMap(this.styles)}"
        .validityTransform="${this.validityTransform}"
        @change="${this.#handleChange}"
      ></mwc-textfield>
    `;
  }
}

export function Textfield(label: string) {
  return createViewBuilder(TextfieldView).label(label);
}
