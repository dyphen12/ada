import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler
import numpy as np
from core import adaload

n_features = 1

sc = MinMaxScaler()

model = adaload.load_model()

def forecast(symbol):

    currentdata = yf.Ticker(symbol)

    newraw = currentdata.history(period="max")

    x_banal = np.array([newraw['Open'][-1],newraw['High'][-1],newraw['Close'][-1]])
    x_banalv = np.array(x_banal.tolist()).reshape(-1, 1)
    x_banalv = sc.fit_transform(x_banalv)

    xfuck = x_banalv.reshape((1, 3, n_features))


    inverse_forecast = model.predict(xfuck, verbose=0)


    forecast = sc.inverse_transform(inverse_forecast)

    return forecast[0][0]

def hardforecast(symbol):
    currentdata = yf.Ticker(symbol)

    newraw = currentdata.history(period="max")

    x_banal = np.array([newraw['Open'][-1],newraw['High'][-1],newraw['Close'][-1]])
    x_banalv = np.array(x_banal.tolist()).reshape(-1, 1)
    x_banalv = sc.fit_transform(x_banalv)

    xfuck = x_banalv.reshape((1, 3, n_features))

    inverse_forecast = model.predict(xfuck, verbose=0)

    forecast = sc.inverse_transform(inverse_forecast)

    return forecast[0][0], newraw['Open'][-1]


def tripleforecast(symbol):

    currentdata = yf.Ticker(symbol)

    newraw = currentdata.history(period="max")

    x_banal = np.array([newraw['Open'][-1],newraw['High'][-1],newraw['Close'][-1]])
    x_banalv = np.array(x_banal.tolist()).reshape(-1, 1)
    x_banalv = sc.fit_transform(x_banalv)

    xfuck = x_banalv.reshape((1, 3, n_features))


    inverse_forecast = model.predict(xfuck, verbose=0)


    forecast = sc.inverse_transform(inverse_forecast)

    return forecast[0][0], newraw['Open'][-1],newraw['High'][-2],newraw['Close'][-3]

#Extended Forecast

def arrayofdata(Open,High,Close):

    outarray = np.array([Open,High,Close],dtype=object)
    outarrayv2 = np.array(outarray.tolist()).reshape(-1, 1)
    outarrayv2 = sc.fit_transform(outarrayv2)

    return outarrayv2


def extendedforecast(symbol):

    extension = []

    flen = 7 # IT SHOULD BE 4 BECAUSE THE PRONOSTIC PARADOX, MORE THAN 7 DAYS MAY BE INCONSISTENT.

    O, H, L, C = tripleforecast(symbol)

    for step in range(0,flen):

        currentarray = arrayofdata(O,H,L)

        xfuck = currentarray.reshape((1, 3, n_features))

        inverse_forecast = model.predict(xfuck, verbose=0)

        forecastx = sc.inverse_transform(inverse_forecast)

        extension.append(forecastx[0][0])

        L = H
        H = O
        O = forecastx

    return extension
