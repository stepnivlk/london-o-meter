import { serializeData } from './dataUtils';

const positive = { label: 'positive', value: 20 };
const negative = { label: 'negative', value: 20 };

describe('serializeData', () => {
  it('creates object with all the fields per item in data prop', () => {
    const serialized = serializeData([positive, negative]);

    const expectedFirstItem = Object.assign(
      {},
      positive,
      {
        index: 0,
        valuePercent: 50,
        color: '#F17105',
        isActive: false
      }
    );

    const expectedSecondItem = Object.assign(
      {},
      negative,
      {
        index: 1,
        valuePercent: 50,
        color: '#2E4057',
        isActive: false
      }
    );

    expect(serialized[0]).toMatchObject(expectedFirstItem);
    expect(serialized[1]).toMatchObject(expectedSecondItem);
  });
});
