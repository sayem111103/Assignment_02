import mongoose from 'mongoose'
import app from './app'
import { config } from './app/config/config'

async function main() {
  try {
    await mongoose.connect(config.database_url as string).then(() => {
      console.log('DB connected Successfully on port' + config.port)
    })
    app.listen(config.port)
  } catch (error) {
    console.log(error)
  }
}

main()
