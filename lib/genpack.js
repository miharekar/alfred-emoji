'use strict'

const fs = require('fs')
const path = require('path')
const emojiKeywords = require('emojilib')
const emojiData = require('unicode-emoji-json')
const orderedEmoji = require('unicode-emoji-json/data-ordered-emoji')
const emojiComponents = require('unicode-emoji-json/data-emoji-components')

const keywordsMap = {}
const emmojiInfo = {}

const emojiSymbols = Object.keys(emojiKeywords)
for (const emojiSymbol of emojiSymbols) {
  emojiKeywords[emojiSymbol].forEach(keyword => {
    if (Object.prototype.hasOwnProperty.call(keywordsMap, keyword) === false) {
      keywordsMap[keyword] = []
    }
    keywordsMap[keyword].push(emojiSymbol)
  })
  emmojiInfo[emojiSymbol] = {
    ...emojiData[emojiSymbol],
    keywords: emojiKeywords[emojiSymbol]
  }
}

const packedEmoji = {
  keywords: keywordsMap,
  searchTerms: Object.keys(keywordsMap),
  emoji: emmojiInfo,
  orderedEmoji,
  emojiComponents
}

fs.writeFile(
  path.join(__dirname, '..', 'src', 'emoji.pack.json'),
  JSON.stringify(packedEmoji, null, 2),
  (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  }
)
