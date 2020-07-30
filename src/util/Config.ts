import dontenv from 'dotenv'
dontenv.config()

const {PORT, NODE_ENV, MONGODB, DB_NAME, SECRETA} = process.env
export default {
  PORT,
  NODE_ENV,
  MONGODB,
  DB_NAME,
  SECRETA,
}
