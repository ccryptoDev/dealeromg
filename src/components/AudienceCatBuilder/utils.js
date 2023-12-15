// gridFilter created since AutBrandLoyaltyH special if modification WHERE 1=1 + in back happens
export const createSQLBrandLoyalty = (
  recordRequestBody,
  amountOfElements,
  filterName,
  filtersValues,
  AdWhereClsAM
) => {
  let WhereClsAM = ""
  if (filtersValues[filterName]) {
    const auxWhereClsAM = `${AdWhereClsAM.sql}`
    const auxResponse2 = filtersValues[filterName].filter(
      (item) => item.status !== "Not Applicable"
    )
    let auxText = ""
    for (let i = 0; i < auxResponse2.length; i++) {
      if (i === auxResponse2.length - 1) {
        auxText += `${auxResponse2[i].name_bq} IN('${auxResponse2[i].code.join(
          "','"
        )}')`
      } else {
        auxText += `${auxResponse2[i].name_bq} IN('${auxResponse2[i].code.join(
          "','"
        )}') AND `
      }
    }
    const valueToReplace = ` AND ${auxText}`
    const newValue = ` AND ${recordRequestBody}`
    if (!amountOfElements) {
      WhereClsAM = auxWhereClsAM.replace(valueToReplace, "")
    } else {
      WhereClsAM = `${AdWhereClsAM.sql} AND ${recordRequestBody}`
    }
    if (auxText.length && auxWhereClsAM.length && amountOfElements) {
      WhereClsAM = auxWhereClsAM.replace(valueToReplace, newValue)
    }
  } else {
    WhereClsAM = AdWhereClsAM.sql
    if (amountOfElements) {
      WhereClsAM = `${AdWhereClsAM.sql} AND ${recordRequestBody}`
    }
  }
  return WhereClsAM
}

// sliderFilter if modification WHERE 1=1 + in back happens general
export const createSQLSliderSentence = (
  recordRequestBody,
  filterName,
  columnBQ,
  filtersValues,
  AdWhereClsAM,
  needOR
) => {
  let WhereClsAM = ""
  if (filtersValues[filterName] && filtersValues[filterName].length > 0) {
    const auxWhereClsAM = `${AdWhereClsAM.sql}`
    const auxText = `'${filtersValues[filterName][0]}' AND '${filtersValues[filterName][1]}'`
    const valueToReplace = needOR
      ? ` AND (${columnBQ}1 BETWEEN ${auxText} OR ${columnBQ}2 BETWEEN ${auxText} OR ${columnBQ}3 BETWEEN ${auxText} OR ${columnBQ}4 BETWEEN ${auxText})`
      : ` AND ${columnBQ} BETWEEN ${auxText}`
    const newValue = needOR
      ? ` AND (${columnBQ}1 BETWEEN ${recordRequestBody} OR ${columnBQ}2 BETWEEN ${recordRequestBody} OR ${columnBQ}3 BETWEEN ${recordRequestBody} OR ${columnBQ}4 BETWEEN ${recordRequestBody})`
      : ` AND ${columnBQ} BETWEEN ${recordRequestBody}`
    if (AdWhereClsAM.sql.includes(columnBQ)) {
      if (recordRequestBody.length === 0) {
        WhereClsAM = auxWhereClsAM.replace(valueToReplace, "")
      } else {
        WhereClsAM = auxWhereClsAM.replace(valueToReplace, newValue)
      }
    }
  } else {
    if (recordRequestBody) {
      WhereClsAM = needOR
        ? `${AdWhereClsAM.sql} AND (${columnBQ}1 BETWEEN ${recordRequestBody} OR ${columnBQ}2 BETWEEN ${recordRequestBody} OR ${columnBQ}3 BETWEEN ${recordRequestBody} OR ${columnBQ}4 BETWEEN ${recordRequestBody})`
        : `${AdWhereClsAM.sql} AND ${columnBQ} BETWEEN ${recordRequestBody}`
    } else {
      WhereClsAM = AdWhereClsAM.sql
    }
  }
  return WhereClsAM
}

export const createSQLDateSentence = (
  recordRequestBody,
  filterName,
  columnBQ,
  filtersValues,
  AdWhereClsAM,
  needOR
) => {
  let WhereClsAM = ""
  if (filtersValues[filterName] && filtersValues[filterName].length > 0) {
    const auxWhereClsAM = `${AdWhereClsAM.sql}`
    const auxText = `CAST('${filtersValues[filterName][0]}' AS DATE FORMAT 'MM/DD/YYYY') AND CAST('${filtersValues[filterName][1]}' AS DATE FORMAT 'MM/DD/YYYY')`
    const valueToReplace = needOR
      ? ` AND (${columnBQ}1 BETWEEN ${auxText} OR ${columnBQ}2 BETWEEN ${auxText} OR ${columnBQ}3 BETWEEN ${auxText} OR ${columnBQ}4 BETWEEN ${auxText})`
      : ` AND ${columnBQ} BETWEEN ${auxText}`
    const newValue = needOR
      ? ` AND (${columnBQ}1 BETWEEN ${recordRequestBody} OR ${columnBQ}2 BETWEEN ${recordRequestBody} OR ${columnBQ}3 BETWEEN ${recordRequestBody} OR ${columnBQ}4 BETWEEN ${recordRequestBody})`
      : ` AND ${columnBQ} BETWEEN ${recordRequestBody}`
    if (AdWhereClsAM.sql.includes(columnBQ)) {
      if (recordRequestBody.length === 0) {
        WhereClsAM = auxWhereClsAM.replace(valueToReplace, "")
      } else {
        WhereClsAM = auxWhereClsAM.replace(valueToReplace, newValue)
      }
    }
  } else {
    if (recordRequestBody) {
      WhereClsAM = needOR
        ? `${AdWhereClsAM.sql} AND (${columnBQ}1 BETWEEN ${recordRequestBody} OR ${columnBQ}2 BETWEEN ${recordRequestBody} OR ${columnBQ}3 BETWEEN ${recordRequestBody} OR ${columnBQ}4 BETWEEN ${recordRequestBody})`
        : `${AdWhereClsAM.sql} AND ${columnBQ} BETWEEN ${recordRequestBody}`
    } else {
      WhereClsAM = AdWhereClsAM.sql
    }
  }
  return WhereClsAM
}

export const findQuery = (items, columnBQ) => {
  if (items.length === 0) return ""
  let query = ""
  let countUsed = 0
  for (let index = 0; index < items.length; index++) {
    if (items[index] === "Low") countUsed += 1
    if (items[index] === "Medium") countUsed += 2
    if (items[index] === "High") countUsed += 4
  }
  switch (countUsed) {
    case 1:
      query = "1 AND 20"
      break
    case 2:
      query = "21 AND 49"
      break
    case 4:
      query = "50 AND 100"
      break
    case 3:
      query = "1 AND 49"
      break
    case 5:
      query = `1 AND 20 AND CAST(${columnBQ} AS INT) BETWEEN 50 AND 100`
      break
    case 6:
      query = "21 AND 100"
      break
    case 7:
      query = "1 AND 100"
      break
    default:
      break
  }
  return `CAST(${columnBQ} AS INT) BETWEEN ${query}`
}

// listFilter created since AutPurchaseLikeH special if modification WHERE 1=1 + in back happens
export const createSQLListPurchaseLike = (
  recordRequestBody,
  filterName,
  columnBQ,
  filtersValues,
  AdWhereClsAM
) => {
  let WhereClsAM = ""
  if (filtersValues[filterName] && filtersValues[filterName].length > 0) {
    const auxWhereClsAM = `${AdWhereClsAM.sql}`
    const auxText = findQuery(filtersValues[filterName], columnBQ)
    const valueToReplace = ` AND ${auxText}`
    const newValue = ` AND ${recordRequestBody}`
    if (AdWhereClsAM.sql.includes(columnBQ)) {
      if (recordRequestBody.length === 0) {
        WhereClsAM = auxWhereClsAM.replace(valueToReplace, "")
      } else {
        WhereClsAM = auxWhereClsAM.replace(valueToReplace, newValue)
      }
    }
  } else {
    recordRequestBody
      ? (WhereClsAM = `${AdWhereClsAM.sql} AND ${recordRequestBody}`)
      : (WhereClsAM = AdWhereClsAM.sql)
  }
  return WhereClsAM
}

// yesFilter if modification WHERE 1=1 + in back happens general
export const createSQLYesSentence = (
  recordRequestBody,
  columnBQ,
  AdWhereClsAM
) => {
  let WhereClsAM = ""
  if (AdWhereClsAM.sql.includes(columnBQ)) {
    const auxWhereClsAM = `${AdWhereClsAM.sql}`
    const valueToReplace = ` AND ${columnBQ} IN('Y')`
    if (recordRequestBody.length === 0) {
      WhereClsAM = auxWhereClsAM.replace(valueToReplace, "")
    } else {
      WhereClsAM = auxWhereClsAM
    }
  } else {
    recordRequestBody === "'Y'"
      ? (WhereClsAM = `${AdWhereClsAM.sql} AND ${columnBQ} IN('Y')`)
      : (WhereClsAM = AdWhereClsAM.sql)
  }
  return WhereClsAM
}

// listFilter if modification WHERE 1=1 + in back happens general
export const createSQLListSentence = (
  recordRequestBody,
  filterName,
  columnBQ,
  filtersValues,
  recordRequest,
  AdWhereClsAM,
  needOR,
  oldBigQuery = null,
  transformAuxText = true
) => {
  let WhereClsAM = ""
  if (filtersValues[filterName] && filtersValues[filterName].length > 0) {
    const auxWhereClsAM = `${
      oldBigQuery == null ? AdWhereClsAM.sql : oldBigQuery
    }`
    let auxText = recordRequest[filterName]
    if (transformAuxText) {
      auxText = recordRequest[filterName].map((it) => {
        return `'${it.toUpperCase()}'`
      })
    }
    const valueToReplace = needOR
      ? ` AND (${columnBQ}1 IN(${auxText}) OR ${columnBQ}2 IN(${auxText}) OR ${columnBQ}3 IN(${auxText}) OR ${columnBQ}4 IN(${auxText}))`
      : ` AND ${columnBQ} IN(${auxText})`
    const newValue = needOR
      ? ` AND (${columnBQ}1 IN(${recordRequestBody}) OR ${columnBQ}2 IN(${recordRequestBody}) OR ${columnBQ}3 IN(${recordRequestBody}) OR ${columnBQ}4 IN(${recordRequestBody}))`
      : ` AND ${columnBQ} IN(${recordRequestBody})`
    if (auxWhereClsAM.includes(columnBQ)) {
      if (recordRequestBody.length === 0) {
        WhereClsAM = auxWhereClsAM.replace(valueToReplace, "")
      } else {
        WhereClsAM = auxWhereClsAM.replace(valueToReplace, newValue)
      }
    }
  } else {
    if (recordRequestBody.length) {
      WhereClsAM = needOR
        ? `${
            oldBigQuery == null ? AdWhereClsAM.sql : oldBigQuery
          } AND (${columnBQ}1 IN(${recordRequestBody}) OR ${columnBQ}2 IN(${recordRequestBody}) OR ${columnBQ}3 IN(${recordRequestBody}) OR ${columnBQ}4 IN(${recordRequestBody}))`
        : `${AdWhereClsAM.sql} AND ${columnBQ} IN(${recordRequestBody})`
    } else {
      WhereClsAM = oldBigQuery == null ? AdWhereClsAM.sql : oldBigQuery
    }
  }
  return WhereClsAM
}
