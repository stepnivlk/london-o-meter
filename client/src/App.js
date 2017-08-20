// @flow

import React, { Component } from 'react';
import { pie } from 'd3';
import Header from './components/Header';
import PieChart from './components/PieChart';
import TextStats from './components/TextStats';
import Info from './components/Info'
import { fetchData, serializeData } from './dataUtils';

export type Item = {
  label: string,
  value: number,
  index: number,
  valuePercent: number,
  color: string,
  isActive: boolean,
};

type State = {
  containerHeight: number | null,
  containerWidth: number | null,
  highlightedIndex: number | null,
  arcs: Function | null,
  data: Item[],
}

const nullContainer = {
  getBoundingClientRect: () => ({ height: null, width: null })
}

class App extends Component<{}, State> {
  chartContainer: ?HTMLDivElement;

  constructor(props: {}) {
    super(props);

    this.state = {
      containerHeight: null,
      containerWidth: null,
      highlightedIndex: null,
      arcs: null,
      data: [],
    };
  }

  componentDidMount() {
    this.fitParentContainer();
    fetchData()
      .then(data => {
        console.log(data)
        const serializedData = serializeData(data.londonHapiness)
        const arcs = pie().value(item => item.value)(serializedData)

        this.setState(() => ({ data: serializedData, arcs }))
      })
  }

  fitParentContainer = () => {
    const container = this.chartContainer || nullContainer

    const currentHeight = container.getBoundingClientRect().height;
    const currentWidth = container.getBoundingClientRect().width;

    this.setState(() => ({
      containerHeight: currentHeight,
      containerWidth: currentWidth,
    }));
  }

  handlePieHover = (index: number) =>
    this.setState(() => ({ highlightedIndex: index }));

  handlePieHoverOut = () =>
    this.setState(() => ({ highlightedIndex: null }));

  render() {
    const {
      containerWidth,
      containerHeight,
      highlightedIndex,
      data,
      arcs
    } = this.state;

    return (
      <div className="App Stretch">
        <div className="Stretch">
          <Header />
          <div
            className="Pie"
            ref={(el) => { this.chartContainer = el }}
          >
            {
              data &&
              <PieChart
                arcs={arcs}
                dimensions={{ width: containerWidth, height: containerHeight }}
                highlightedIndex={highlightedIndex}
                onPieHover={this.handlePieHover}
                onPieHoverOut={this.handlePieHoverOut}
                data={data}
              />
            }
          </div>
          {
            data &&
            <TextStats
              data={data}
              highlightedIndex={highlightedIndex}
            />
          }
        </div>
        <Info />
      </div>
    )
  }
}

export default App;
