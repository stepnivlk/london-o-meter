// @flow

import React from 'react';

type Props = {
  isPositive: boolean,
}

const negativePath = () =>
  <path d="M0,0 A40,0 10 0,0 65,0" fill='none' stroke='black' strokeWidth={5} />

const positivePath = () =>
  <path d="M0,0 A40,40 10 0,0 65,0" fill='none' stroke='black' strokeWidth={5} />

const Smiley = ({ isPositive }: Props) => (
  <g transform='translate(-50,-50)'>
    <circle r={5} fill='black' id='c' cx={25} cy={30} />
    <circle r={5} fill='black' id='c' cx={75} cy={30} />
    <g transform='translate(15,65)'>
      {
        isPositive ? positivePath() : negativePath()
      }
    </g>
  </g>
);

export default Smiley;
