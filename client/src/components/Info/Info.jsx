// @flow

import React from 'react';

const Info = () => (
  <div className="Info">
    <h3>What kind of magic is this?</h3>
    <p>
      This is an experiment with Twitter data mining and its analysis. Please don't take the output too seriously.
    </p>
    <p>
      Basically, there's an IFTTT applet triggering a web hook action which sends all the tweets in London to the particular Webtask URL.
      Webtask then serializes the tweet data and stores it in an ElasticSearch index.
    </p>
    <p>
      Then there's a scheduled Webtask action which processes batches of tweets from an ElasticSearch, contacts text analyzation service and updates data in ElasticSearch with its output.
    </p>
    <p>
      Finally, there's a Webtask acting as an API for this React + D3.js client which aggregates data from ElasticSearch and serves it as a JSON.
    </p>
    <h4>Technologies used:</h4>
    <p><a href='http://ifttt.com/' target='_blank' rel='noopener noreferrer'>IFTTT</a></p>
    <p><a href='https://webtask.io/' target='_blank' rel='noopener noreferrer'>Webtask</a></p>
    <p><a href='https://www.elastic.co/' target='_blank' rel='noopener noreferrer'>ElasticSearch</a></p>
    <p><a href='https://uclassify.com/' target='_blank' rel='noopener noreferrer'>uClassify</a></p>
    <p><a href='https://facebook.github.io/react/' target='_blank' rel='noopener noreferrer'>React</a></p>
    <p><a href='https://d3js.org/' target='_blank' rel='noopener noreferrer'>D3.js</a></p>
    <p>[ <a href='https://github.com/stepnivlk/' target='_blank' rel='noopener noreferrer'>author</a> ][ <a href='https://github.com/stepnivlk/london-o-meter' target='_blank' rel='noopener noreferrer'>code</a> ]</p>
  </div>
);

export default Info;
