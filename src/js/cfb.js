import request from 'request-promise'
import cheerio from 'cheerio'
import querystring from 'querystring'

function searchCFB (cardname) {
  function extractCardData (html) {
    let $ = cheerio.load(html)
    $('.global-list-containter')
  }

  let query = querystring.stringify({
    query: 'goblin guide'
  })
  return new Promise((resolve, reject) => {
    request('http://store.channelfireball.com/products/search?' + query)
      .then(extractCardData)
  })
}

searchCFB('goblinguide')
