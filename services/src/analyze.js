'use latest';

const elasticsearch = require('elasticsearch');
const request = require('request');

const extractClassification = ({ classification }) => {
  const maxItem = classification.reduce((prev, current) => (
    (prev.p > current.p) ? prev : current
  ));

  return maxItem.className;
};

const updateIndex = (client) => (classifications, hits, type) => {
  const newBody = hits.reduce((acc, hit, i) => {
    const classification = extractClassification(classifications[i]);
    return [
      ...acc,
      {
        update: {
          _index: hit._index,
          _type: hit._type,
          _id: hit._id,
        }
      },
      { doc: { [type]: classification, analyzed: true } }
    ];
  }, []);

  client.bulk({
    body: newBody,
  }, (err, resp) => {
  });
};

const toUpperCase = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const classifyWrapper = (classifyUrl, classifyToken) =>
  (texts, hits, type, callback) => {
  request({
    url: `${classifyUrl}/${toUpperCase(type)}/classify`,
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json",
      "Authorization": `Token ${classifyToken}`,
    },
    body: { texts }
  }, (error, response, body) => {
    if (error) { return console.trace(error.message); }

    callback(body, hits, type);
  });
};

const classifyData = (hits, client, classificator) => {
  const texts = hits.map(hit => {
    const { _source: { text } } = hit;
    return text;
  });

  classificator(texts, hits, 'sentiment', updateIndex(client));
};

const analyzeData = (client, esIndex, classificator) => {
  client.search({
    index: esIndex,
    body: {
      query: { match: { analyzed: false } },
      size: 10,
    }
  }).then(body => {
    if (body.hits.total === 0) { return }

    const hits = body.hits.hits;
    classifyData(hits, client, classificator);
  }, error => {
    console.trace(error.message);
  });
};


module.exports = (
  { secrets: { esUrl, esIndex, classifyUrl, classifyToken }}, callback
) => {
  const client = new elasticsearch.Client({ host: esUrl });
  const classificator = classifyWrapper(classifyUrl, classifyToken);

  analyzeData(client, esIndex, classificator);

  callback(null, { status: 'ok' });
};
