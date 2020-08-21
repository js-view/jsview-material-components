import { createViewBuilder, generateBindings, View } from '@jsview/core';
import { spread } from '@open-wc/lit-helpers/src/spread';
import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';
import { until } from 'lit-html/directives/until';
import './element.js';
import { Item, WcesAutocomplete } from './element.js';

export * from './element.js';

export class AutocompleteView extends View {
  data: Item[] | (() => Promise<Item[]>) = [];
  placeholder?: string = undefined;
  value?: Item = undefined;
  required = false;
  disabled = false;
  onChange?: (_: Item, isValid: boolean) => void = undefined;
  onSearch?: (_: string) => void = undefined;

  get body() {
    const data = typeof this.data === 'function' ? this.data() : this.data;

    const options: { [k: string]: string } = generateBindings(this, [
      'data',
      'onChange',
      'onSearch',
    ]);

    return html`
      <jsui-autocomplete
        .view="${this}"
        ...="${spread({ ...this.attrs, ...options })}"
        style="${styleMap(this.styles)}"
        .data="${until(data, [])}"
        @change="${this.#handleChange}"
        @search="${this.#handleSearch}"
      ></jsui-autocomplete>
    `;
  }

  #handleChange = (e: { detail: { value: Item } }) => {
    if (this.onChange) {
      const isValid = !this.required || !!e.detail.value;
      this.onChange(e.detail.value, isValid);
    }
  };

  #handleSearch = (e: { detail: { text: string } }) => {
    if (this.onSearch) {
      this.onSearch(e.detail.text);
    }
  };
}

export type AutocompleteElement = WcesAutocomplete;

export function Autocomplete(label?: string) {
  return createViewBuilder(AutocompleteView).placeholder(label);
}
