
import express from 'express'
import cors from 'cors'
import CoinGecko from 'coingecko-api'

const app = express()
const port = 3000

app.use(cors())

const CoinGeckoClient = new CoinGecko();

app.get('/getPrice', async (req, res) => {
    const params = req.query

    console.log(params.name)

    try {
        const cryptoInfo = await CoinGeckoClient.coins.fetch(params.name, {})

        res.json(cryptoInfo.data.market_data.current_price.usd)
    } catch(e) {
        console.log(e)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})