import request from 'request-promise'
import cheerio from 'cheerio'
import querystring from 'querystring'

function search (cardName) {
  // Perform searches in uppercase with no punctuation for consistency
  cardName = cardName.toUpperCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
  // jquery selector
  let $
  function getPageData (html) {
    $ = cheerio.load(html)
    let cards = []
    $('.global-list-container')
      .find('.product_row')
      .each((index, elem) => {
        let cardData = extractCardData($(elem))
        if (cardData) {
          cards.push(Object.assign({}, cardData))
        }
      })
    return cards
  }

  function extractCardData (row) {
    let card = {}
    // Title contains info about name and set
    let title = row.find('.product-list-title')
    card.set = title.children('small').text()
    // Text contains both set and title, so to get just title, remove the set
    // from the end of the string
    card.name = title.text().slice(0, -card.set.length)
    // Work only with cards that match the name of the query
    // (uppercase, no punctuation)
    if (card.name.toUpperCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
      .includes(cardName)) {
      // Extract price, and stock
      let id = row.attr('id')
      // Find the NM price using the id
      card.id = id
      card.price = getNMPrice(id)
      card.stock = getStock(id)
      return card
    }
    return null
  }

  function getNMPrice (id) {
    let gridItem = $('.global-grid-container').find(`#${id}`)
    let priceElement = gridItem.children('.grid-item-price')
    if (priceElement.length === 0) {
      // Product is out of stock - find price in list view
      let listItem = $('.global-list-container').find(`#${id}`)
      priceElement = listItem.find('.variant-pricing')
    }
    // Strip unnecessary characters and turn into a number
    let price = parseFloat(priceElement.text().replace(/[^0-9.]/g, ''))
    return price
  }

  function getStock (id) {
    let rowItem = $('.global-list-container').find(`#${id}`)
    let totalStock = 0
    rowItem
      .find('.product-info-row')
      .each(
        (index, row) => {
          let text = $(row).children('.variant-stock')
            .text().replace(/[^0-9]/g, '')
          totalStock += parseInt(text)
        }
      )
    return totalStock
  }

  let query = querystring.stringify({
    query: cardName
  })

  return new Promise((resolve, reject) => {
    request('http://store.channelfireball.com/products/search?' + query)
      .then(getPageData)
      .then((result) => { resolve(result) })
  })
}

export default {
  search: search
}
