import { CircularProgress } from './index.js';

export default {
  title: 'circular progress',
};

export const Determinate = () => CircularProgress(0.3).body;

export const Indeterminate = () => CircularProgress().body;

export const Styled = () =>
  CircularProgress().style('--mdc-theme-primary', 'red').body;
