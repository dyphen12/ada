import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from ada.core import adaload

n_features = 1

sc = MinMaxScaler()

model = adaload.load_model()

def forecast(symbol):

    currentdata = yf.Ticker(symbol)

    newraw = currentdata.history(period="max")

    datanocrack = newraw

    Data = datanocrack.pop('Close')

    Data = Data.round(2)

    x_banal = np.array([Data[-3],Data[-2],Data[-1]])
    x_banalv = np.array(x_banal.tolist()).reshape(-1, 1)
    x_banalv = sc.fit_transform(x_banalv)

    xfuck = x_banalv.reshape((1, 3, n_features))


    inverse_forecast = model.predict(xfuck, verbose=0)


    forecast = sc.inverse_transform(inverse_forecast)

    print('Current Price: ', Data[-1])
    print('Forecast (1 Period):', forecast[0][0])

    return forecast[0][0]

def hardforecast(symbol):

    currentdata = yf.Ticker(symbol)

    newraw = currentdata.history(period="max")

    datanocrack = newraw

    Data = datanocrack.pop('Close')

    Data = Data.round(2)

    x_banal = np.array([Data[-3],Data[-2],Data[-1]])
    x_banalv = np.array(x_banal.tolist()).reshape(-1, 1)

    xfuck = x_banalv.reshape((1, 3, n_features))


    inverse_forecast = model.predict(xfuck, verbose=0)

    forecast = sc.inverse_transform(inverse_forecast)

    return forecast[0][0], Data[-1]

def tripleforecast(symbol):

    currentdata = yf.Ticker(symbol)

    newraw = currentdata.history(period="max")

    datanocrack = newraw

    Data = datanocrack.pop('Close')

    Data = Data.round(2)

    x_banal = np.array([Data[-3],Data[-2],Data[-1]])
    x_banalv = np.array(x_banal.tolist()).reshape(-1, 1)
    x_banalv = sc.fit_transform(x_banalv)

    xfuck = x_banalv.reshape((1, 3, n_features))


    inverse_forecast = model.predict(xfuck, verbose=0)


    forecast = sc.inverse_transform(inverse_forecast)

    deforecast = [Data[-3],Data[-2],Data[-1], forecast[0][0]]

    return deforecast

# Extended Forecast

def arrayofdata(arg3, arg2, arg1):
    outarray = np.array([arg3, arg2, arg1], dtype=object)
    outarrayv2 = np.array(outarray.tolist()).reshape(-1, 1)
    outarrayv2 = sc.fit_transform(outarrayv2)

    return outarrayv2

def extendedforecast(symbol):

    extension = []

    flen = 5  # IT SHOULD BE 5 BECAUSE THE PRONOSTIC PARADOX, MORE THAN 7 DAYS MAY BE INCONSISTENT.

    defarray = tripleforecast(symbol)

    O1 = defarray[-1]
    O2 = defarray[-2]
    O3 = defarray[-3]

    extension.append(O2)
    extension.append(O1)

    for step in range(0, flen):
        currentarray = arrayofdata(O3, O2, O1)

        xfuck = currentarray.reshape((1, 3, n_features))

        inverse_forecast = model.predict(xfuck, verbose=0)

        forecastx = sc.inverse_transform(inverse_forecast)

        extension.append(forecastx[0][0])

        O3 = O2
        O2 = O1
        O1 = forecastx[0][0]

    return extension
