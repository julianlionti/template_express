import compression from 'compression'
import express, {json} from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import Config from './util/Config'
import routes from './routes'

const dbName = `${Config.DB_NAME}-${Config.NODE_ENV!.substring(0, 4).toUpperCase()}`
mongoose.connect(Config.MONGODB + dbName, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
})

const app = express()

app.use(cors())
app.use(compression())
app.use(json())
app.use('/api', routes())

app.listen(Config.PORT, () => {
  console.log('Servidor iniciado en ' + Config.PORT)
})

export default app
