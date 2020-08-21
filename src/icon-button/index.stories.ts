import { IconButton } from './index.js';
import { svg } from 'lit-html';

export default {
  title: 'icon button',
};

export const Simple = () => IconButton('code').body;

export const WithSVG = () =>
  IconButton(
    svg`
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
    `
  ).body;

export const Disabled = () => IconButton('code').disabled().body;

export const CustomStyle = () =>
  IconButton('code').color('tomato').iconSize('50px').buttonSize('96px').body;
