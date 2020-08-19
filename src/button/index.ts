import '@material/mwc-button';
import { spread } from '@open-wc/lit-helpers/src/spread';
import { generateBindings, view, html, css } from '@jsview/core';

function template(props: ButtonProps) {
  const bindings: { [k: string]: string } = generateBindings(props);

  return html` <mwc-button ...=${spread(bindings)}></mwc-button> `;
}

const cssTemplate = css`
  mwc-button {
    display: inline-block;
    width: 100%;
  }
`;

export class ButtonProps {
  label?: string = undefined;
  disabled = false;
  icon?: string = undefined;
  trailingIcon = false;
  raised = false;
  unelevated = false;
  outlined = false;
  dense = false;

  onClick?: () => void = undefined;
}

export const [ButtonViewBuilder, ButtonView] = view(
  'jsview-mdc-button',
  { template, cssTemplate },
  ButtonProps
);
console.log(ButtonViewBuilder().label('click').body);

export function Button(label: string) {
  return ButtonViewBuilder().label(label);
}
