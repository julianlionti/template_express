import mongoose from 'mongoose'
import Config from './util/Config'

const dbName = `${Config.DB_NAME}-${Config.NODE_ENV!.substring(0, 4).toUpperCase()}`
mongoose.connect(Config.MONGODB + dbName, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
})
