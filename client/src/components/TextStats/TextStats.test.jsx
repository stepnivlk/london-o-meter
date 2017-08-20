import React from 'react';
import renderer from 'react-test-renderer';
import TextStats from './TextStats';

const createItem = (label, index) => ({
  label,
  value: 10,
  valuePercent: 50,
  index,
  color: '#fff',
  isActive: false
});

it('matches a snapshot', () => {
  const component = renderer.create(
    <TextStats
      data={[createItem('positive', 0), createItem('negative', 1)]}
      highlightedIndex={0}
    />
  );

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

it('Matches expected style', () => {
  const component = renderer.create(
    <TextStats
      data={[createItem('positive', 0), createItem('negative', 1)]}
      highlightedIndex={0}
    />
  );

  const tree = component.toJSON();

  const firstStatStyle = tree.children[0].props.style;
  const secondStatStyle = tree.children[2].props.style;

  const expectedActiveStyle = { color: '#fff', fontSize: 30, fontWeight: 'bold' };
  const expectedNonactiveStyle = { color: '#fff', fontSize: 20, fontWeight: 'normal' };

  expect(firstStatStyle).toMatchObject(expectedNonactiveStyle);
  expect(secondStatStyle).toMatchObject(expectedActiveStyle);
});
