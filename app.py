from flask import Flask
from flask_restful import Resource, Api
from flask import jsonify
from flask_cors import CORS

from analysis import calculations as clc
from analysis import forecasts as fore


app = Flask(__name__)
api = Api(app)
CORS(app)

class HelloWorld(Resource):
    def get(self):
        return {'ADA1 core v1.2b': 'Now in the present!'}

class predictsymbol(Resource):
    def get(self, symbol):
        f = fore.forecast(symbol)
        return jsonify(float(f))

class predictextended(Resource):
    def get(self, symbol):
        f = fore.extendedforecast(symbol)
        csm = clc.cucatodict(f)
        return jsonify(csm)

class getdiff(Resource):
    def get(self, symbol):
        f = fore.extendedforecast(symbol)
        df = clc.forecastdiff(f)
        csm = clc.cucatodict(df)
        return jsonify(csm)

class gettrendcalc(Resource):
    def get(self, symbol):
        trnd2 = clc.trendcalc(symbol)
        return jsonify(trnd2)



api.add_resource(HelloWorld, '/')
api.add_resource(predictsymbol, '/predict/<string:symbol>')
api.add_resource(predictextended, '/extended/<string:symbol>')
api.add_resource(getdiff, '/getdiff/<string:symbol>')
api.add_resource(gettrendcalc, '/trendcalc/<string:symbol>')

if __name__ == '__main__':
    app.run()