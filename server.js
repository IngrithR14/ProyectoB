const express = require('express')

const app = express()
const cors=require('cors')

//connect-DB
require('./Drivers/Connect_bdM')

//setters
app.set('PORT',process.env.PORT || 3000 )

//middlewares
app.use(express.json())
app.use(cors());


app.use("/competitor",require('./Routes/Competitor'))
app.use("/discipline",require('./Routes/Discipline'))
app.use("/event",require('./Routes/Event'))
app.use("/stake",require('./Routes/Stake'))
app.listen(app.get('PORT'),()=>console.log(`Sever Listen to Port ${app.get('PORT')}`))