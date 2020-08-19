import { createViewBuilder, generateBindings, View } from '@jsview/core';
import '@material/mwc-list/mwc-list-item';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import '@material/mwc-select';
import { Select as MDCSelect } from '@material/mwc-select';
import { spread } from '@open-wc/lit-helpers/src/spread';
import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';

export class SelectView extends View {
  disabled = false;
  required = false;
  label?: string = undefined;
  name?: string = undefined;
  value?: string = undefined;
  icon?: string = undefined;
  naturalMenuWidth = false;
  fullwidth = true;
  outlined = false;
  helper?: string = undefined;
  healperPersistent = false;
  validationMessage?: string = undefined;
  selected?: ListItemBase | null = undefined;
  items: SelectItem[] | (() => SelectItem[]) = [];
  index?: number = undefined;
  validityTransform:
    | ((value: string, nativeValidity: ValidityState) => Partial<ValidityState>)
    | null = null;
  validateOnInitialRender = false;

  onChange?: (_: string, isValid: boolean) => void = undefined;

  get body() {
    const bindings: { [k: string]: string } = generateBindings(this, [
      'items',
      'onChange',
      'validityTransform',
    ]);
    const items = typeof this.items === 'function' ? this.items() : this.items;

    return html`
      <mwc-select
        .view="${this}"
        ...=${spread({ ...this.attrs, ...bindings })}
        style="${styleMap(this.styles)}"
        .validityTransform="${this.validityTransform}"
        @change="${this.#handleChange}"
      >
        <mwc-list-item></mwc-list-item>
        ${items.map(
          ({ value, name }) => html`
            <mwc-list-item value="${value}">${name}</mwc-list-item>
          `
        )}
      </mwc-select>
    `;
  }

  #handleChange = (e: {
    target: { value: string; checkValidity: () => boolean };
  }) => {
    if (this.onChange) {
      this.onChange(e.target.value, e.target.checkValidity());
    }
  };
}

export function Select(label: string) {
  return createViewBuilder(SelectView).label(label);
}

export interface SelectItem {
  name: string;
  value: string;
}

export type SelectElement = MDCSelect;
