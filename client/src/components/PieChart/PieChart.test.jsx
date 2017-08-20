import React from 'react';
import renderer from 'react-test-renderer';
import PieChart from './PieChart';

const item = {
  label: 'positive',
  value: 10,
  valuePercent: 50,
  index: 0,
  color: '#fff',
  isActive: false
};

const arc = {
  data: item,
  index: 0,
  value: 33,
  startAngle: 0,
  endAngle: 3.3991002481463335,
  padAngle: 0
};

it('matches a snapshot', () => {
  const component = renderer.create(
    <PieChart
      data={[item]}
      dimensions={{ width: 100, height: 100 }}
      onPieHover={() => null}
      onPieHoverOut={() => null}
      arcs={[arc]}
      highlightedIndex={0}
    />
  );

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
