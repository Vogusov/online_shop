const moment = require('moment')
const fs = require('fs')

const file = 'server/db/stats.json'

const logger = (name, action) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if(err) {
      console.log(`Can't read file ${file}`)
    } else {
      const stat = JSON.parse(data);
      stat.push({
        time: moment().format('DD MMM YYYY, h:mm:ss a'),
        prod_name: name,
        action: action,
      })
      fs.writeFile(file, JSON.stringify(stat), (err) => {
        if(err) {
          console.log(`Can't read file ${file}`)
        }
      })
    }
  })
}

module.exports = logger