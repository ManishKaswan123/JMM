// import moment from 'moment'

export const JoinByDash = (data: string) => {
  const joinString = data.split(' ').join('-').toLowerCase()

  return joinString
}
export const JoinByUnderscore = (data: string) => {
  const joinString = data.split(' ').join('_').toLowerCase()

  return joinString
}

export const RemoveUnderscore = (data: string) => {
  const string = data.split('_').join(' ').toLowerCase()

  return string
}

export const RemoveDash = (data: string) => {
  const OriginalString = data.split('-').join(' ').toLowerCase()

  return OriginalString
}

export const RemoveSpaces = (data: string) => {
  const OriginalString = data.split(' ').join('').toLowerCase()

  return OriginalString
}

export const SplitStringInArray = (data: string) => {
  const result = data.toLowerCase().split(' ')

  return result
}

export const SplitUrlInArray = (data: string) => {
  const result = data.toLowerCase().split('/')

  return result
}

export const GetRandomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const UniqueElements = (item: any, index: any, array: any) => {
  return array.findIndex((obj: any) => obj.Level2 === item.Level2) === index
}

export const GenerateMaAndMinRandomNumber = (max: number, min: number) => {
  return Math.random() * (max - min + 1) + min
}

export const GetFirstLetterOfWord = (data: string) => {
  const arr: any = []

  const rst = data.toUpperCase().split(' ')

  rst.map((item: any) => {
    return arr.push(item.charAt(0))
  })

  const result = arr.join('')

  return result
}

export const DataForAxis = (data: any) => {
  const arrData: any = []
  data.map((item: any) => {
    return arrData.push({x: item.x, y2: item.HeadCnt})
  })

  return arrData
}

export const DataForActual = (data: any) => {
  const arrData: any = []
  data.map((item: any) => {
    return arrData.push({x: item.x, y1: item.y1})
  })

  return arrData
}

export const DataForPredicted = (data: any) => {
  const arrData: any = []
  data.map((item: any) => {
    return arrData.push({x: item.x, y: item.y2})
  })

  return arrData
}

export const DataForTwoAxis = (data: any) => {
  const arrData1: any = []
  const arrData2: any = []
  data.forEach(function (dt: any) {
    arrData1.push({x: dt.x, y: dt.y1})
    arrData2.push({x: dt.x, y: dt.y2})
  })
  return [arrData1, arrData2]
}

export const DataForThreeAxis = (data: any) => {
  const arrData: any = []

  data.map((item: any) => {
    return arrData.push({
      x: item.Date_mod,
      y1: item.Actual_Supply,
      y2: item.Forecasted_Supply,
    })
  })
  return arrData
}

export const ObjectToArray = (data: any) => {
  const label: any = []
  const val: any = []
  Object.values(data).forEach((item: any) => {
    label.push(item.state)
    val.push(item.average_excess_supply)
  })
  return {
    labels: label,
    values: val,
  }
}
