import compression from 'compression'
import express, {json} from 'express'
import cors from 'cors'

import Config from './util/Config'
import routes from './routes'
import './db'

const app = express()
app.use(cors())
app.use(compression())
app.use(json())
app.use('/api', routes())

app.listen(Config.PORT, () => {
  console.log('Servidor iniciado en ' + Config.PORT)
  console.log(Config.NODE_ENV)
})

export default app
