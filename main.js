const fs = require('fs')
const data = fs.readFileSync('./input', 'utf8')

function mph (miles, hours, minutes) {
  if (minutes){
    return miles / (minutes / 60)
  } else if (hours){
    return miles / hours
  }
}

function tripParser (trip) {
  const [startHour, startMin] = trip[0].split(':')
  const [endHour, endMin] = trip[1].split(':')
  const miles = Number(trip[2])
  const minutes = Number(((endHour - startHour) * 60) + (endMin - startMin))
  return {minutes, miles}
}

function condenseDriverData (driverData) {
  return Object.keys(driverData).sort((a, b) => {
    return driverData[a].totalMiles < driverData[b].totalMiles
  })
  .reduce((accumulator, person) => {
    const miles = driverData[person].totalMiles
    const minutes = driverData[person].totalMinutes
    const speedString = miles > 0 ? '@ ' + Math.round(mph(miles, null, minutes)) + ' mph' : ''
    accumulator[person] = Math.round(miles) + ' miles ' + speedString
    return accumulator
  }, {})
}

function generateDriverHistory (file) {
  let inputArr = !Array.isArray(file) ? file.split('\n') : file
  let driverData = {}

  inputArr.forEach(line => {
    line = line.split(' ')
    let command = line.shift()
    const driver = line.shift()
    switch (command){
      case 'Driver':
        if (!driverData[driver]){
          driverData[driver] = {
            totalMiles: 0,
            totalMinutes: 0
          }
        } else {
          // How do we want to handle duplicated drivers?
        }
        break
      case 'Trip':
        const {minutes, miles} = tripParser(line)
        if (mph(miles, null, minutes) > 5 && mph(miles, null, minutes) < 100){
          driverData[driver].totalMiles += miles
          driverData[driver].totalMinutes += minutes
        }
        break
      default:
        // How do we want to handle unexpected commands?
    }
  })
  return condenseDriverData(driverData)
}

console.log(generateDriverHistory(data))

