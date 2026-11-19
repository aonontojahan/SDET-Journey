import { DataTypes, Sequelize } from "sequelize"
import dotenv from "dotenv"
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host:process.env.DB_HOST,
    port:process.env.DB_HOST,
    dialect: 'mysql',
    logging:true
});


export const user = sequelize.define("User", {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true

    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:'users',
    timestamps:true
});

export async function initDB(){
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("DB connected and Table is synched")
}
export async function closeDB(){
    await sequelize.close();
}