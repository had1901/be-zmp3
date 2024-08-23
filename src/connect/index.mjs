import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()


const connectDatabase = async () => {
  try {
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.USERNAME_DB, '', {
        host: process.env.HOST,
        dialect: process.env.DB_MANAGER,
        define: {
          freezeTableName: true 
        },
        logging: false
      },
    )
    await sequelize.authenticate();
    await sequelize.sync({ force: true })
    console.log('Đã đồng bộ models')
    console.log('Connection database successfully.');
  } catch (error) {
    console.error('Can not connect to the database:', error);
  }
}

export default connectDatabase

