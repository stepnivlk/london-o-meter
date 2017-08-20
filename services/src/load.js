'use latest';

const elasticsearch = require('elasticsearch');
const uuid = require('uuid');

const getLocation = (location) => {
  if (!location) { return { lat: null, lng: null } }

  const parsed = location.split(/\,|q=/);
  const parsedLength = parsed.length;
  return { lat: parsed[parsedLength - 2], lng: parsed[parsedLength -1] };
};

const dataToIndex = (
  client, esIndex, { text, username, userimage, created, link, location }
) => {
  const { lat, lng } = getLocation(location);

  return client.create({
    id: uuid.v1(),
    index: 'london',
    type: 'twitter',
    body: {
      text,
      username,
      userimage,
      created,
      link,
      lat,
      lng,
      analyzed: false,
    }
  });
};

module.exports = ({ secrets: { esUrl, esIndex }, data }, callback) => {
  const client = new elasticsearch.Client({ host: esUrl });

  const { text, username, userimage, created, link, location } = data;
  const { lat, lng } = getLocation(location);

  dataToIndex(client, esIndex, data)
    .then(_response => {
      callback(null, { status: 'ok' })
    }, error => {
      callback(null, { status: 'failure' })
    });
};
