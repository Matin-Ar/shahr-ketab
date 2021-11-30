const path = require('path')
const express = require('express')
require('./db/mongoose')
const bookRouter = require('./routers/book')
const factorRouter = require('./routers/factor')


const app = express()
const port = process.env.PORT
 
// app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(express.json())
app.use('/api', bookRouter)
app.use('/api', factorRouter)
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// })

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})