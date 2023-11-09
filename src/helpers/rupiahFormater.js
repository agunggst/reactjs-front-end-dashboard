const rupiahFormatter = (num) => {
  if (isNaN(num)) {
    return 'NaN'
  } else {
    let stringNum = String(num).split('').reverse()
    for (let i = 0; i < stringNum.length; i++) {
      if ((i + 1) % 3 === 0 && i !== stringNum.length - 1) {
        stringNum.splice(i + 1, 1, `${stringNum[i + 1]}.`)
      }
    }
    return 'Rp' + stringNum.reverse().join('')
  }
}

export default rupiahFormatter