const populateDb = require('./populate-db');

const API_KEY = 'AIzaSyAUNNcfbS7-gf2hxJ1jt-LVIDU0wNuTjMY';
const ENGINE_ID = '002380537691482816554:nghhnm458ec';
const NUM_RESULTS = 10;
const FIELDS = 'items(link,image/thumbnailLink,snippet)';
const REQUEST_BASE = `https://www.googleapis.com/customsearch/v1?cx=${ENGINE_ID}&num=${NUM_RESULTS}&searchType=image&fields=${FIELDS}&key=${API_KEY}`;


exports.addOne = (db, req, res) => {
    const query = req.params.query;
    const start = req.query.offset;

    db.collection('searches', (err, collection) => {
        const search = {
            "term": query,
            "created_at": new Date()
        };
        collection.insert(search, (err, doc) => {
            if (!err && doc) {
                res.send(result);
            } else {
                res.json({'error': 'Unable to complete search'});
            }
        });
    });
}

exports.findRecent = (db, req, res) => {
    db.collection('searches', (err, collection) => {
        collection.find({}, {"_id": 0}).sort({"created_at": -1}).limit(10).toArray((err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log('ERROR:', err);
                res.send({"error": "Unable to get searches"});
            }
        });
    });
}
