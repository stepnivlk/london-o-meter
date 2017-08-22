# london-o-meter

https://peaceful-headland-84902.herokuapp.com/

Have you ever wondered how much are people happy? Now we can measure it!

A collection of 3 Webtasks and React client which together forms Twitter data mining, analyzing and visualizing service.

## Webtasks
### Flow of the services
* [IFTTT](https://ifttt.com/discover) applet sends all the tweets in London to the `load` [Webtask](https://webtask.io/)
* `load` Webtask serializes the data and stores them in an Elasticsearch index.
* `analyze` Webtask is being run each 10mins using a cron, it queries 10 items from Elasticsearch, sends them to the [uClassify](https://uclassify.com/) (which analyzes a sentiment of text - positive or negative), merges response with data and stores whole merged batch in Elasticsearch.
* `serve` Webtask is being called from the client React app, it performs simple query counting analyzed data in Elasticsearch and sends it to the client as a JSON.

### Secrets
`load`:
* esUrl - URL of ElasticSearch cluster
* esIndex - Specific ElasticSearch index we want to read/write a data

`analyze`:
* esUrl - URL of ElasticSearch cluster
* esIndex - Specific ElasticSearch index we want to read/write a data
* classifyUrl - uClassify API url
* classifyToken - uClassify API token

`serve`:
* esUrl - URL of ElasticSearch cluster
* esIndex - Specific ElasticSearch index we want to read/write a data

### TODO
- [ ] Add tests

- [ ] Add Flow

- [ ] Deployment script

## Client
Simple React + D3.js app

### Development
#### Start dev server
`yarn start`

#### Run tests
`yarn test`

#### Run Flow type checks
`yarn flow`

### Deployment
Zero configuration deployment to [heroku](https://blog.heroku.com/deploying-react-with-zero-configuration)

### TODO
- [ ] SVG should be responsive to a window resize
- [ ] Change favicon & title
