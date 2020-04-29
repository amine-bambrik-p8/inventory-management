export const environment = {
  production: false,
  jwt: {
    secret: "somesecret",
    options: {

    }
  },
  pagination:{
    skip:10,
    limit:10,
  },
  mongoose:{
    uri: "mongodb://localhost:27017/inventory-test",
    options:{
      useNewUrlParser: true,
      useFindAndModify:true,
      useUnifiedTopology:true,
    }
  }
};
