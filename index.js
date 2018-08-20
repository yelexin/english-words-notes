const go = require('./crawler')
const fs = require('fs')

fs.readFile('./words.txt', async (err, buff) => {
  if (err) throw err
  let data = buff.toString()
  data = data.replace(/\r/g, '')
  let arr = data.split('\n')
  for (let i = 0; i < arr.length; i++) {
    let res = await go(arr[i])
    fs.writeFile('./new.txt', arr[i] + '\n' + res + '\n------------------------------------------------\n',{flag: 'a+'}, function (err) {
      if (err) console.log(err)
    })
  }
})