const sqlite = require ('better-sqlite3')

const db = new sqlite ('test.db', { readonly : true })

let dataObj = {}
db.prepare ('SELECT raaga FROM t_recordings').all().forEach ( (row) => {
    dataObj[row.raaga] = []
})

for (raagaName in dataObj) {
    const rows = db.prepare ('select videoid from t_recordings where raaga=?').all(raagaName);
    dataObj[raagaName] = []
    rows.forEach ( (row) => {
        dataObj[raagaName].push (row.videoid);
    })
}

db.close ()

console.log (JSON.stringify(dataObj))
