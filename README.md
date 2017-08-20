# london-o-meter

Have you ever wandered how much are people happy? Now we can measure it!

A collection of 3 Webtasks and React client which together forms Twitter data mining, analyzing and visualizing service.

## Flow of the services
* [IFTTT](https://ifttt.com/discover) applet sends tweet data to the `load` [Webtask](https://webtask.io/)
* `load` Webtasks serializes the data and stores them in an Elasticsearch index.
* `analyze` Webtask is being run each 10mins using a cron, it queries 10 items from Elasticsearch, sends them to the [uClassify](https://uclassify.com/) (which analyzes a sentiment of text - positive or negative), merges response with data and stores whole merged batch in Elasticsearch.
* `serve` Webtask is being called from the client React app, it performs simple query counting analyzed data in Elasticsearch and sends it to the client as a JSON.
