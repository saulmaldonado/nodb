const express = require('express')
const app = express()
const axios = require('axios')


//imported controllers
const { addCoin, getPortfolio, editCoin, deleteCoin } = require('./controller/controller')

//body parser
app.use(express.json())

//endpoints
app.post('/api/portfolio', addCoin)

app.get('/api/portfolio', getPortfolio)

app.put('/api/portfolio/:id', editCoin)

app.delete('/api/portfolio/:id', deleteCoin)

//coinmarketcap api GET
app.get('/marketdata', ((req, res) => {
    
            axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=9b804b18-ba9f-42d1-8f2d-cc72db8a76ba')
            .then(response => {

                let coinData = response.data["data"]
                let coinLibrary = []
                let priceLibrary = []

                for(let i = 0; i < coinData.length; i++){
                    for(var key in coinData[i]["quote"]["USD"]){
                        if(key === "price"){
                            priceLibrary.push(coinData[i]["quote"]["USD"][key])
                        }
                    }
                }

                for(let i = 0; i < coinData.length; i++){
                    for(var key in coinData[i]){
                        if(key === "symbol"){
                            coinLibrary.push(coinData[i][key])
                        }
                    }
                }

                res.status(200).json([coinLibrary, priceLibrary])
            })   
        }
    ))


   

app.listen(5050, () => {
    console.log('Listening on port 5050...')
})