import { html, css, LitElement, property, customElement } from 'lit-element';
import '@material/mwc-textfield';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-icon-button';
import { debounce } from '../util/debounce.js';

@customElement('jsui-autocomplete')
export class WcesAutocomplete extends LitElement {
  @property({ type: Array }) data: Item[] = [];
  @property({ type: String }) placeholder = 'Search';

  @property({ type: Boolean }) open = false;
  @property({ type: String }) _searchText = '';

  @property({ type: Object }) value?: Item;

  @property({ type: Boolean }) disabled = false;

  get displayedValue() {
    if (this.open) {
      return this._searchText;
    }
    return this._searchText || this.value?.name || '';
  }

  static styles = [
    css`
      *,
      *::before,
      *::after {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      .container {
        display: block;
        position: relative;
      }
      .input {
        width: 100%;
      }
      .content {
        visibility: hidden;
        opacity: 0;
        transition: all 0.1s;
        position: absolute;
        left: 0;
        right: 0;
        z-index: 100;
        background-color: var(--mdc-theme-background, #ffffff);
        color: var(--mdc-theme-text-primary-on-background, inherit);
        box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.08);
        border: solid 1px rgba(0, 0, 0, 0.08);
        border-radius: 0 0 4px 4px;
      }
      .content[open] {
        visibility: visible;
        opacity: 1;
        max-height: 15rem;
        overflow-y: auto;
      }
      .clear {
        position: absolute;
        right: 0;
        transform: translateY(8%);
        color: rgba(0, 0, 0, 0.6);
        --mdc-icon-size: 20px;
      }
      mwc-list-item {
        padding: 0 16px;
      }
    `,
  ];

  onSearchFocus() {
    this.open = true;
    this.onSearch();
  }
  onSearchTextChange = debounce(() => {
    this._searchText = this.$('#search').value;
    this.onSearch();
  });

  onSearch(searchText?: string) {
    this.dispatchEvent(
      new CustomEvent('search', {
        detail: { text: searchText ?? this.$('#search').value },
      })
    );
  }

  onSelected({ detail: { index } }: SelectedEventData) {
    this.value = this.data[index];
    this.close();
    this.dispatchEvent(
      new CustomEvent('change', { detail: { value: this.value } })
    );
  }

  close() {
    this.open = false;
    if (this.value) {
      this._searchText = this.value.name;
    }
  }

  get hasFocus() {
    return !!this.shadowRoot!.activeElement;
  }

  handleBlur() {
    setTimeout(() => {
      if (!this.hasFocus) {
        this.close();
      }
    }, 0);
  }

  render() {
    return html`
      <div class="container" id="container">
        <mwc-textfield
          id="search"
          class="input"
          placeholder="${this.placeholder}"
          outlined
          .value="${this.displayedValue}"
          ?disabled="${this.disabled}"
          @focus="${this.onSearchFocus}"
          @input="${this.onSearchTextChange}"
          @blur="${this.handleBlur}"
        >
        </mwc-textfield>
        ${this.value
          ? html`
              <mwc-icon-button
                id="clear"
                class="clear"
                icon="clear"
                ?disabled="${this.disabled}"
                @click="${this.clear}"
              ></mwc-icon-button>
            `
          : ''}

        <mwc-list
          id="content"
          class="content"
          ?open="${this.open}"
          @action="${this.onSelected}"
        >
          ${this.data.map(
            item =>
              html`
                <mwc-list-item @blur="${this.handleBlur}" @click="${this.close}"
                  >${item.name}</mwc-list-item
                >
              `
          )}
        </mwc-list>
      </div>
    `;
  }

  firstUpdated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('value')) {
      this._searchText = this.value?.name ?? '';
    }
  }

  clear() {
    this._searchText = '';
    this.value = undefined;
    this.dispatchEvent(
      new CustomEvent('change', { detail: { value: this.value } })
    );
    this.onSearch('');
    if (this.open) {
      setTimeout(() => this.$('#search').focus(), 500);
    }
  }

  _handleKeydown = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      this.close();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this._handleKeydown);
    super.disconnectedCallback();
  }

  $(selector: string) {
    return this.shadowRoot!.querySelector(selector) as any;
  }
}

export interface Item {
  name: string;
  id?: string;
}

export interface SelectedEventData {
  detail: {
    index: number;
  };
}
