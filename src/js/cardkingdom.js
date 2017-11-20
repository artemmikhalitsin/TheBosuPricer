import cheerio from 'cheerio'
import querystring from 'querystring'
import request from 'request-promise'

function search (cardName) {
  cardName = cardName.toUpperCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
  // jquery selector
  let $
  let query = querystring.escape(cardName)
  // URL for retrieving non-foil card data
  let nonfoilURL = 'https://www.cardkingdom.com/catalog/' +
  'search?search=header&filter%5Bname%5D=' +
  query +
  '&filter[tab]=mtg_card'
  // URL for retrieving foil card data
  let foilURL = 'https://www.cardkingdom.com/catalog/' +
  'search?search=header&filter%5Bname%5D=' +
  query +
  '&filter%5Btab%5D=mtg_card&filter[tab]=mtg_foil'
  // Spoof the header to appear as a legitimate browser (otherwise gets 500 err)
  let headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) ' +
    'Chrome/62.0.3202.94 Safari/537.36'
  }
  // Retrieves data from an html page
  function getPageData (html) {
    return new Promise((resolve, reject) => {
      $ = cheerio.load(html)
      let cards = []
      $('.mainListing')
        .find('.itemContentWrapper')
        .each((index, elem) => {
          let cardData = extractCardData($(elem))
          if (cardData) {
            cards.push(Object.assign({}, cardData))
          }
        })
      resolve(cards)
    })
  }

  // Given a card row, extracts its data into an object
  function extractCardData (row) {
    let card = {}
    // Title contains info about name and set
    card.set = row.find('.productDetailSet').text()
    // Strip the rarity marker and foil marker
    card.set = card.set.replace(/\([MRUCS]\)/, '').trim()
    card.name = row.find('.productDetailTitle').text()
    // Check if the card is a foil
    if (card.set.match(/FOIL/)) {
      // If it is, strip the FOIL from set, and append to name
      // (Crystal commerce format)
      card.name += ' - Foil'
      card.set = card.set.replace(/FOIL/, '').trim()
    }
    // Work only with cards that match the name of the query
    // (uppercase, no punctuation)
    if (card.name.toUpperCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
      .includes(cardName)) {
      card.price = getNMPrice(row)
      card.stock = getStock(row)
      return card
    }
    return null
  }

  // Retrieves the NM price of the card
  function getNMPrice (row) {
    let NMElement = row.find('.itemAddToCart.NM')
    let price = NMElement.find('.stylePrice').text().replace(/[^0-9.]/g, '')
    return parseFloat(price)
  }

  // Counts total stock of a card
  function getStock (row) {
    let conditions = row.find('.itemAddToCart')
    let totalStock = 0
    conditions
      .each(
        (index, elem) => {
          let qty = $(elem).find('.styleQty')
            .text().replace(/[^0-9]/g, '')
          totalStock += parseInt(qty)
        }
      )
    return totalStock
  }
  return new Promise((resolve, reject) => {
    if (cardName === '') {
      reject(new Error('Card name cannot be empty'))
    }
    let nonfoilData = request({
      url: nonfoilURL,
      headers: headers
    }).then(getPageData)
    let foilData = request({
      url: foilURL,
      headers: headers
    }).then(getPageData)
    Promise.all([nonfoilData, foilData])
      .then(
        (data) => {
          let result = [].concat(...data)
          console.log('resolving cardkingdom')
          resolve(result)
        }
      )
  })
}

export default {
  search: search
}
