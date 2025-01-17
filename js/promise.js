const PROMISE_MAP = {}

const Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const CharactersLength = Characters.length

function randomCharacters (length = 6) {
  const result = []
  for (var i = 0; i < length; i++) {
    result.push(Characters.charAt(Math.floor(Math.random() *
      CharactersLength)))
  }
  return result.join('')
}

class MyPromise extends Promise {
  constructor (...args) {
    const id = randomCharacters()
    // console.log('创建Promise', id)
    super(...args)
    this.id = id
    PROMISE_MAP[id] = this
    sendMessage('PromiseStart', JSON.stringify([id]))
    this.resolve = null
    this.reject = null
  }
}

Promise.prototype.toString = function () {
  if (!this.id) {
    this.id = randomCharacters()
    PROMISE_MAP[this.id] = this
    sendMessage('PromiseStart', JSON.stringify([this.id]))
    this.resolve = null
    this.reject = null
  }
  // console.log('Promise.toString', this.id)
  return `Promise:${this.id}`
}

globalThis.Promise = Promise = MyPromise
