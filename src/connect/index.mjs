import Sequelize from 'sequelize'
import dotenv from 'dotenv'

const environment = process.env.NODE_ENV || 'development'
dotenv.config({ path: `.env.${environment}` })



const connectDatabase = async () => {
  try {
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.USERNAME_DB, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DB_MANAGER,
        port: 3306,
        define: {
          freezeTableName: true 
        },
        logging: false,
      },
    )
    await sequelize.authenticate();
    await sequelize.sync({ force: true })
    console.log('Connection database successfully.')
        console.log({
          'HOST:': process.env.HOST,
          'DB_NAME:': process.env.DB_NAME,
          'USERNAME_DB:': process.env.USERNAME_DB,
          'PASSWORD:': process.env.PASSWORD,
        })
  } catch (error) {
    console.error('Can not connect to the database:', error)
  }
}

export default connectDatabase

