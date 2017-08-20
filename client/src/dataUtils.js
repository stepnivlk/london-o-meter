// @flow

import { colors, labels, serveUrl } from './constants';

type Item = {
  label: string,
  value: number,
};

const toPercent = (value, total) =>
  Math.round((value / total * 10000) / 100);

const serializeData = (data: Item[]) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return data.map(({ label, value }, index) => ({
    label,
    value,
    index,
    valuePercent: toPercent(value, total),
    color: label === labels.POSITIVE ? colors.POSITIVE : colors.NEGATIVE,
    isActive: false,
  }));
};

const fetchData = () => (
  fetch(serveUrl)
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
);

export { fetchData, serializeData };
