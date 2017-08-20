'use latest';

const elasticsearch = require('elasticsearch');

const searchData = (client, esIndex) => (
  client.search({
    index: esIndex,
    body: {
      aggs: {
        values: { terms: { field: 'sentiment' } }
      }
    }
  })
);

const serializeData = (data) => (
  data.map(({ key, doc_count }) => ({
    label: key,
    value: doc_count,
  }))
);

module.exports = ({ secrets: { esUrl, esIndex }}, req, res) => {
  const client = new elasticsearch.Client({ host: esUrl });

  searchData(client, esIndex)
    .then(body => {
      const { buckets } = body.aggregations.values
      const serialized = serializeData(buckets)

      res.writeHead(200, { 'Content-Type': 'application/json ' });
      res.end(JSON.stringify({ londonHapiness: serialized }));
    }, error => {
      res.writeHead(500, { 'Content-Type': 'application/json ' })
      res.end(JSON.stringify({ message: error.message }));
    });
}  
