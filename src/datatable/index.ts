/* eslint-disable @typescript-eslint/camelcase */
import { View, css, view } from '@jsview/core';
import { TemplateResult, html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import getProperty from './get-property.js';

export interface DatatableHeader<T> {
  name?: string | keyof T;
  displayName?: string;
  isNumeric?: boolean;
  renderer?: (row: T) => View | TemplateResult;
}

export class DatatableProps<T> {
  header: DatatableHeader<T>[] = [];
  data: T[] = [];
  hideHeader = false;
  condensed = false;
}

function template(props: DatatableProps<any>) {
  const { header, data, hideHeader, condensed } = props;

  return html`
    <div class="container">
      <table class="table" ?condensed="${condensed}">
        ${!hideHeader && header && header.length
          ? renderHeader(header)
          : html``}
        ${data && data.length ? renderRows(props) : html``}
      </table>
    </div>
  `;
}

function renderHeader<T>(header: DatatableHeader<T>[]) {
  return html`
    <tr class="table__header">
      ${header.map(({ name, displayName, isNumeric }) => {
        const classes = {
          table__cell: true,
          'table__cell--numeric': isNumeric ?? false,
        };
        return html`
          <th class=${classMap(classes)}>${displayName || name}</th>
        `;
      })}
    </tr>
  `;
}

function renderRows<T>({ data, header }: DatatableProps<T>) {
  return html`
    ${data.map(
      row => html`
        <tr class="table__row">
          ${renderRow(row, header)}
        </tr>
      `
    )}
  `;
}

function renderRow<T>(row: T, header: DatatableHeader<T>[]) {
  return html`
    ${header.map(({ name, isNumeric, renderer }) => {
      const classes = {
        table__cell: true,
        'table__cell--numeric': isNumeric ?? false,
      };
      const tpl = renderer
        ? toTpl(renderer(row))
        : getProperty(name as string, row);
      return html` <td class=${classMap(classes)}>${tpl}</td> `;
    })}
  `;
}
function toTpl(val: TemplateResult | View) {
  if (val instanceof View) {
    return val.body;
  }
  return val;
}

const cssTemplate = css`
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .container {
    display: grid;
    grid-template-rows: max-content max-content;
  }
  .table {
    width: 100%;
    border: solid 1px rgba(0, 0, 0, 0.08);
    border-collapse: collapse;
    border-radius: var(--radius-1);
  }
  .table__row,
  .table__header {
    transition: all 0.1s;
    border-bottom: solid 1px rgba(0, 0, 0, 0.08);
  }
  .table__row:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .table__header {
    height: 3.5rem;
  }
  .table__row .table__cell {
    height: 3.25rem;
  }
  .table[condensed] .table__header,
  .table[condensed] .table__row .table__cell {
    height: 1.625rem;
  }
  .table__cell {
    padding: 0 1rem;
    text-align: left;
  }
  .table__header .table__cell--numeric {
    text-align: right;
  }
  .table__row .table__cell--numeric {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

export const [DatatableViewBuilder, DatatableView] = view(
  'jsview-mdc-datatable',
  { template, cssTemplate },
  DatatableProps
);

export function Datatable<T>(...header: DatatableHeader<T>[]) {
  return DatatableViewBuilder().header(header);
}
