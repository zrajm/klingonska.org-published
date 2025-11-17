/*-*- js-indent-level: 2 -*-*/
// Copyright 2025 by zrajm. Licenses: CC BY-SA (text), GPLv2 (code).

// URL-compatible, non-padded base64.
function base64encode(x) {
  try {
    return btoa(x).replace(/[+\/=]/g, x => ({'+': '-', '/': '_'}[x] || ''))
  } catch { return '' }
}
function base64decode(x) {
  try {
    return atob(x.replace(/[-_]/g, x => ({'-': '+', '_': '/'}[x])))
  } catch { return '' }
}

// /(?:[a-zA-Z0-9_-]{2,4})*(?:/|$)
//
//function encodeURLSearchParam(str) {
function encodeURLStr(str) {
  const encoder = new TextEncoder()
  return (str + '').replace(
    /([a-zA-Z0-9*._-]+)|([ ])|([\u{10c900}-\u{10c9ff}]+)|[^\u{10c900}-\u{10c9ff} a-zA-Z0-9*._-]/gu,
    (substr, unenc, space, transcript) => {
      if (unenc) { return substr }
      if (space) { return '+' }
      if (transcript) {
        return '/' + btoa(substr.replace(
          /./gu, x => String.fromCharCode(x.codePointAt(0) - 0x10c900)
        )) + '/'
      }
      return [...encoder.encode(substr)]
        .map(x => `%${x.toString(16).padStart(2, '0')}`).join('')
    })
}

function decodeURLStr(str) {
  const decoder = new TextDecoder()
  return (str + '').replace(
    /(?:%[0-9a-fA-F]{2})+|\/((?:[a-zA-Z0-9_-]{2,4})*)\/|(.)/gu,
    (substr, transcript, unenc) => {
      if (unenc) { return unenc === '+' ? ' ' : unenc }
      if (transcript) {
        return atob(transcript).replace(
          /./gu, x => x.codePointAt(0) + 0x10c900)
      }

      substr.replace(/%([0-9a-fA-F]{2})/, x => {

        parseInt(hex, 16)
      })

      return [...decoder.decode(substr)]
        .map(x => `%${x.toString(16).padStart(2, '0')}`).join('')

        String.fromCharCode(parseInt(hex, 16))

        return parseInt(hex, 16)

    })
}

function encodeURL(obj) {
  return '?' + Object.entries(obj)
    .map(x => x.map(encodeURLStr).join('=')).join('&')
}
function decodeURL(urlStr) {
  if (urlStr[0] !== '?') { return null }
  return Object.fromEntries(
    urlStr.slice(1).split('&').map(x => x.split('=').map(decodeURLStr)))
}


// function encodeURLSearchParam(str) {
//   const encoder = new TextEncoder();
//   return Array.from(str).map(chr => {
//     const code = chr.chrCodeAt(0);
//     // Chracters not percent-encoded (except space → +)
//     if (/^[a-zA-Z0-9\-._*]$/.test(chr)) {
//       return chr;
//     }
//     if (chr === ' ') {
//       return '+';
//     }
//     // Encode the full chracter to UTF-8 bytes
//     const bytes = encoder.encode(chr);
//     return [...bytes].map(b => `%${b.toString(16).toUpperCase().padStart(2, '0')}`).join('');
//   }).join('');
// }


// Query string to URL parameter.
function blorp(str) {
  return str.replace(
    /([\u{10c900}-\u{10c9ff}]+)|[^\u{10c900}-\u{10c9ff}]+/gu,
    (substr, transcr) => transcr
      ? '/' + btoa(substr.replace(/./gu, x =>
        String.fromCharCode(x.codePointAt(0) - 0x10c900))) + '/'
      : encodeURIComponent(substr))

  // return str
  //   .split(/([\u{10c900}-\u{10c9ff}]+)/u)
  //   .map((x, i) => i % 2
  //        ? '/' + btoa(x.replace(/./gu, x =>
  //          String.fromCharCode(x.codePointAt(0) - 0x10c900))) + '/'
  //        : encodeURIComponent(x)
  //       ).join('')

  // return str.split(/([\u{10c900}-\u{10c9ff}]+)/u).map((x, i) =>
  //   i % 2
  //     ? '/' + btoa(x.replace(/./gu, x =>
  //       String.fromCharCode(x.codePointAt(0) - 0x10c900))) + '/'
  //     : encodeURIComponent(x)
  // ).join('')
}

// console.log('SOUHSOUHSH',
//   bleep('abc="􌤢􌤺􌥔􌥘􌤢􌤴􌤶􌥦􌥡􌥱􌥿􌥠􌤢􌤹􌥔􌥙􌤦􌤴􌤶􌤟􌥥"')
// )





function urlEncodeQuery(str) {


  
                          
  // x = new URLSearchParams({
  //   ...str.split(/([\u{10c900}-\u{10c9ff}]+)/u).map((x, i) => {
  //     if (i % 2 === 0) { return x }
  //     btoa(
  //       //String.fromCharCode(Uint8Array.from(x, x => x.codePointAt(0) - 0x10c900))
  //       String.fromCharCode([...str].map(x => x.codePointAt(0) - 0x10c900))
  //     )
  //   })
  // })


  // return str.split(/([\u{10c900}-\u{10c9ff}]+)/u).map((x, i) => {
  //   if (i % 2 === 0) { return encodeURIComponent(x) }
  //   x = Uint8Array.from(x, x => x.codePointAt(0) - 0x10c900)
  //   x = String.fromCharCode(...x)
  //   return `~${base64encode(x)}~`
  // }).join('')
}
// URL parameter to query string.
function urlDecodeQuery(str) {
  return str.split(/~([^~]*)~/u).map((x, i) => {
    if (i % 2 === 0) { return decodeURIComponent(x) }
    x = base64decode(x)
    x = Array.from(x, x => x.charCodeAt(0) + 0x10c900)
    return String.fromCodePoint(...x)
  }).join('')
}


console.log(encodeURLStr('abc 􌤳􌤴􌥙􌦑 åäö'))
console.log(encodeURLStr('="􌤌􌤌􌤤􌤵􌥘􌤟􌥼􌥻􌥻􌥼􌥠􌥔􌥘􌤫􌤫􌥓􌤫􌥓􌥘􌤟􌥼􌥱􌦀"'))


//[eof]
