// @flow

import React from 'react';
import { arc } from 'd3';
import Smiley from '../Smiley';
import { pieConfig, labels } from '../../constants';

type Item = {
  label: string,
  value: number,
  index: number,
  valuePercent: number,
  color: string,
  isActive: boolean,
};

type Props = {
  data: Item[],
  dimensions: {
    width: number,
    height: number,
  },
  onPieHover: (number) => void,
  onPieHoverOut: () => void,
  arcs: Object[],
  highlightedIndex: number,
};

const createPieElement = (arcs, index, highlightedIndex) => {
  const radius = highlightedIndex === index ?
    pieConfig.RADIUS + 10 :
    pieConfig.RADIUS;

  const pieElement = arc()
    .outerRadius(radius)
    .padAngle(.05)
    .innerRadius(pieConfig.INNER_RADIUS);

  const arcData = arcs[index];

  return pieElement(arcData);
}

const winningItem = (data) => data.reduce((prev, current) =>
  (prev.value > current.value) ? prev : current, { label: '', value: 0 });

const isPositive = (data) =>
  winningItem(data).label === labels.POSITIVE;

const PieChart = ({
  data,
  dimensions: { width, height },
  onPieHover,
  onPieHoverOut,
  arcs,
  highlightedIndex
}: Props) => (
  <svg
    key="svg"
    width="100%"
    height={height}
    fontFamily="Helvetica"
  >
    <g transform={`translate(${width / 2},${height / 2})`}>
      {
        data.map((item) => (
          <g key={`${item.label}_index`}>
            <path
              d={createPieElement(arcs, item.index, highlightedIndex)}
              fill={item.color}
              onMouseEnter={() => onPieHover(item.index)}
              onMouseLeave={() => onPieHoverOut()}
            />
          </g>
        ))
      }
      <Smiley isPositive={isPositive(data)} />
    </g>
  </svg>
)

export default PieChart;
