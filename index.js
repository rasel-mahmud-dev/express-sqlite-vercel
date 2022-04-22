
let app;

if(process.env.NODE_ENV === "development") {
  app = require("./src/app")
  
} else {
  app = require("./dist/app")
}

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));