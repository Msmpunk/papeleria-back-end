const dbconfig = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "123456",
    DB: "PROYECTO_PAPELERIA",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};

export default dbconfig