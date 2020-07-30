import dontenv from 'dotenv'
dontenv.config()

const {PORT, NODE_ENV, MONGODB, DB_NAME, SECRETA} = process.env
if (!PORT || !NODE_ENV || !MONGODB || !DB_NAME || !SECRETA) {
  console.log('Se tiene que crear un archivo .env con las siguiente configuración')
  console.log(
    'PORT=5050\n' +
      'NODE_ENV=development\n' +
      'MONGODB=mongodb+srv://CONNECTION_SRING/\n' +
      'DB_NAME=NOMBREBASE\n' +
      'SECRETA=PARATOKEN\n',
  )
  process.exit(0)
}

export default {
  PORT,
  NODE_ENV,
  MONGODB,
  DB_NAME,
  SECRETA,
}
