// @flow

import React from 'react';

import type { Item } from '../../App';

type Props = {
  data: Item[],
  highlightedIndex: number,
};

const styleForStat = (item, isHighlighted) => ({
  color: item.color,
  fontSize: isHighlighted ? 30 : 20,
  fontWeight: isHighlighted ? 'bold' : 'normal'
});

const Stat = ({ item, text, isHighlighted }) => (
  <span style={styleForStat(item, isHighlighted)}>
    {item.valuePercent}% {text}
  </span>
);

const findItem = (label, data) => data.find(item => item.label === label);

const nullItem = {
  index: null,
  color: '',
  valuePercent: null,
}

const TextStats = ({ data, highlightedIndex }: Props) => {
  const happyItem = findItem('positive', data) || nullItem;
  const unhappyItem = findItem('negative', data) || nullItem;

  return (
    <div>
      <Stat
        item={unhappyItem}
        text='Unhappy'
        isHighlighted={unhappyItem.index === highlightedIndex}
      />
      {' / '}
      <Stat
        item={happyItem}
        text='Happy'
        isHighlighted={happyItem.index === highlightedIndex}
      />
    </div>
  )
}

export default TextStats;
