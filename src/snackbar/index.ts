import '@material/mwc-snackbar';
import { Snackbar as MDCSnackbar } from '@material/mwc-snackbar';
import { spread } from '@open-wc/lit-helpers/src/spread';
import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';
import { View } from '@jsview/core';

export class SnackbarView extends View {
  isOpen = false;
  private _options: SnackbarOptions = {};
  private actionView?: View;
  private dismissView?: View;

  private openingHandler: () => void = () => {
    //
  };
  private openedHandler: () => void = () => {
    //
  };
  private closingHandler: (reason?: 'action' | 'dismiss') => void = () => {
    //
  };
  private closedHandler: (reason?: 'action' | 'dismiss') => void = () => {
    //
  };

  constructor(private labelText: string) {
    super();
  }

  get body() {
    const attrs = {
      ...this.attrs,
      ...this._options,
    };
    return html`
      <mwc-snackbar
        .view="${this}"
        ...=${spread(attrs)}
        style="${styleMap(this.styles)}"
        labelText="${this.labelText}"
        ?open="${this.isOpen}"
        @MDCSnackbar:opening="${this.openingHandler}"
        @MDCSnackbar:opened="${this.openedHandler}"
        @MDCSnackbar:closing="${this.handleClosing}"
        @MDCSnackbar:closed="${this.handleClosed}"
      >
        ${this.actionView?.slot('action').body}
        ${this.dismissView?.slot('dismiss').body}
      </mwc-snackbar>
    `;
  }

  handleClosing = (e: { detail: { reason?: 'action' | 'dismiss' } }) => {
    this.closingHandler(e.detail.reason);
  };

  handleClosed = (e: { detail: { reason?: 'action' | 'dismiss' } }) => {
    this.closedHandler(e.detail.reason);
  };

  opened(isOpen = true) {
    this.isOpen = isOpen;
    return this;
  }

  options(options: SnackbarOptions) {
    this._options = options;
    return this;
  }

  actionControl(view: View) {
    this.actionView = view;
    return this;
  }

  actionColor(color: string) {
    this.style('--mdc-snackbar-action-color', color);
    return this;
  }

  dismissControl(view: View) {
    this.dismissView = view;
    return this;
  }

  onOpening(handler: () => void) {
    this.openingHandler = handler;
    return this;
  }

  onOpened(handler: () => void) {
    this.openedHandler = handler;
    return this;
  }

  onClosing(handler: (reason?: 'action' | 'dismiss') => void) {
    this.closingHandler = handler;
    return this;
  }

  onClosed(handler: (reason?: 'action' | 'dismiss') => void) {
    this.closedHandler = handler;
    return this;
  }
}

export function Snackbar(text: string) {
  return new SnackbarView(text);
}

export interface SnackbarOptions {
  timeoutMs?: number;
  closeOnEscape?: boolean;
  stacked?: boolean;
  leading?: boolean;
}

export type SnackbarElement = MDCSnackbar;
