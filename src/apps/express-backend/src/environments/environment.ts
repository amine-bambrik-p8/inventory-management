export const environment = {
  production: false,
  jwt: {
    secret: "somesecret",
    options: {

    }
  },
  pagination:{
    size:20
  },
  mongoose:{
    uri: "mongodb://localhost:27017/inventory-test",
    options:{
      useNewUrlParser: true,
      useFindAndModify:true,
      useUnifiedTopology:true,
    }
  },
  filestorage:{
    type:"disk",
    dest:"./public/uploads/",
    ext:[
      ".png",
      ".jpg",
      ".jpeg"
    ]
  }
};
