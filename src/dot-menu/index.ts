import '@material/mwc-menu';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon-button';
import { html, useState, css, view } from '@jsview/core';
import { ActionDetail } from '@material/mwc-list/mwc-list-foundation';
import { IconButton } from '../icon-button/index.js';

export interface MenuItem {
  name: string;
  value: string;
}

export class DotMenuProps {
  menu: MenuItem[] = [];
  onSelected?: (item: MenuItem) => void = undefined;
}

function template({ menu, onSelected }: DotMenuProps) {
  const [open, setOpen] = useState(false);

  return html`
    <div class="menu">
      ${IconButton('more_vert').onClick(() => setOpen(isOpen => !isOpen)).body}

      <mwc-menu
        ?open="${open}"
        @closed="${() => setOpen(false)}"
        @action="${(e: { detail: ActionDetail }) =>
          onSelected?.(menu[e.detail.index])} "
      >
        ${menu.map(({ name }) => html`<mwc-list-item>${name}</mwc-list-item>`)}
      </mwc-menu>
    </div>
  `;
}

const cssTemplate = css`
  *,
  *::after,
  *::before {
    padding: 0;
    margin: 0;
  }
  .menu {
    position: relative;
  }
  mwc-list-item {
    padding: 0 1rem;
  }
`;

export const [DotMenuViewBuilder, DotMenuView] = view(
  'jsview-mdc-dot-menu',
  { template, cssTemplate },
  DotMenuProps
);

export function DotMenu(...menu: MenuItem[] | string[]) {
  if (menu.length > 0 && typeof menu[0] === 'string') {
    return DotMenuViewBuilder().menu(toMenu(menu as string[]));
  }
  return DotMenuViewBuilder().menu(menu as MenuItem[]);
}

export function toMenu(itemArray: string[]): MenuItem[] {
  return itemArray.map(name => ({ name, value: name }));
}
