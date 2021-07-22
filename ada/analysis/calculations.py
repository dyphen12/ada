from ada.analysis import forecasts

def cucatodict(cuca):

  newcuca= []

  for item in cuca:
    newcuca.append(float(item))

  return newcuca


def forecastdiff(extforecast):
    test = extforecast
    difflist = []

    for item in range(len(test)):
        if item + 1 is not len(test):
            i = test[item]
            j = test[item + 1]
            dff = j - i
            difflist.append(dff)

        else:
            break

    return difflist

# Trend Calculator

def trendcalc(symbol):

    trends = []

    fr = forecasts.extendedforecast(symbol)

    DiffTrend = forecastdiff(fr)

    for item in DiffTrend:
        if item > 0:
            trends.append('Buy')
        else:
            trends.append('Sell')

    return trends