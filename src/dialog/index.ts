import { html, View, generateBindings, createViewBuilder } from '@jsview/core';
import '@material/mwc-dialog';
import { spread } from '@open-wc/lit-helpers/src/spread';
import { styleMap } from 'lit-html/directives/style-map';

export class DialogView extends View {
  content?: View = undefined;
  primaryAction?: [string, View] | View = undefined;
  secondaryAction?: [string, View] | View = undefined;
  open = false;
  heading?: string = undefined;
  hideActions = false;
  stacked = false;
  scrimClickAction = 'close';
  escapeKeyAction = 'close';
  defaultAction = 'close';
  actionAttribute = 'dialogAction';
  initialFocusAttribute = 'dialogInitialFocus';
  onOpening?: () => void = undefined;
  onOpened?: () => void = undefined;
  onClosing?: (e: { detail: { action: string } }) => void = undefined;
  onClosed?: (e: { detail: { action: string } }) => void = undefined;

  #action = (level: string, control: [string, View] | View | undefined) => {
    if (typeof control === 'undefined') {
      return undefined;
    }
    if (control instanceof View) {
      return control.attr({ [this.actionAttribute]: level }).slot(level).body;
    }
    return control[1].attr({ [this.actionAttribute]: control[0] }).slot(level)
      .body;
  };

  get body() {
    const bindings: { [k: string]: string } = generateBindings(this, [
      'content',
      'primaryAction',
      'secondaryAction',
    ]);
    return html`
      <mwc-dialog
        ...=${spread({ ...this.attrs, ...bindings })}
        .view="${this}"
        style="${styleMap(this.styles)}"
      >
        ${this.content?.body}
        ${this.#action('primaryAction', this.primaryAction)}
        ${this.#action('secondaryAction', this.secondaryAction)}
      </mwc-dialog>
    `;
  }
}

export function Dialog(content: View) {
  return createViewBuilder(DialogView).content(content);
}
