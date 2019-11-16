import CryptoJS from 'crypto-js'

// 加密
let encrypt = (word, keyStr) => {
  keyStr = 'sadg@$#%#$4'
  let key = CryptoJS.enc.Utf8.parse(keyStr)
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

// 解密
let decrypt = (word, keyStr) => {
  keyStr = 'sadg@$#%#$4'
  let key = CryptoJS.enc.Utf8.parse(keyStr)
  let decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

export {
  encrypt,
  decrypt
}
