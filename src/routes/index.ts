import * as os from "os";
import * as fs from "fs";
import { copyFile } from "fs/promises";
import * as path from "path";


const { MongoClient } = require('mongodb')
import connectDb  from "../database/connectDb"
import {getPosts, savePost} from "../controllers/postController";


const routes = (app)=>{
  
  // app.post("/api/post", async (req, res)=>{
  //
  //
  //   let db;
  //
  //   try {
  //     db = await connectDb()
  //
  //     let sql = "INSERT INTO posts(title, cover, author_id, summary, path) VALUES('Dummy post', '', 1, 'ss', 'as'`)  "+`'${email}'`
  //     db.exec(sql, (err, row) => {
  //       if(err){
  //         return res.json({
  //           message: err.message
  //         })
  //       }
  //       res.json({
  //         user: row
  //       })
  //
  //     })
  //
  //   } catch (ex){
  //     res.status(500).json({
  //       message: ex.message
  //     })
  //   } finally {
  //     db.close()
  //   }
  //
  //
  // })
  
  app.get("/api/posts", getPosts)
  app.post("/api/post", savePost)
  
  app.get('/', (req, res) => {
    let temp = os.tmpdir()
    let n = path.resolve(temp + "/blog.db")
    
    fs.readFile(n, (err, data)=>{
      if(!err){
        let stat  = fs.statSync(n)
        res.json({data: data.toString(), path: n, size: stat.size, birthTime: stat.birthtime, time: new Date(stat.ctimeMs).toTimeString()})
      } else {
        res.json({message: err.message })
      }
    })
  });
  
  app.get('/move', async (req, res) => {
    let temp = os.tmpdir()
    let n = path.resolve("db" + "/blog.db")
    try {
      await copyFile(n, temp+"/blog.db")
      res.json({message: "db copied complete"})
      
    } catch (ex){
      res.json({message: "db copy complete fail", err: ex.message})
    }
  });
  
  app.get('/api/backup-db', async (req, res) => {
    let temp = os.tmpdir()
    let n = path.resolve("db" + "/blog.db")
    try {
      await copyFile(temp+"/blog.db", n)
      res.json({message: "db backup complete"})
    } catch (ex){
      res.json({message: "db backup complete fail", err: ex.message})
    }
  });
  
  
  app.get('/create', (req, res) => {
    let temp = os.tmpdir()
    let n = path.resolve(temp + "/blog.database")
    

    fs.writeFile(n, "Hello", (err => {
      if(!err){
        res.json({message: "created", path: n})
      } else {
        res.json({message: err.message })
      }
    }))
  });
  
  
  
  app.get('/data', async (req, res) => {
    let start = Date.now()
    let client
    let clientPromise
    
    try{
      const uri = process.env.MONGODB_URI
      const options = {}
      
      if(!process.env.MONGODB_URI){
        return res.status(409).json({message: "Please Provide env.MONGODB_URI"})
      }
      
      if (process.env.NODE_ENV === 'development') {
        // In development mode, use a global variable so that the value
        // is preserved across module reloads caused by HMR (Hot Module Replacement).
        if (!global._mongoClientPromise) {
          client = new MongoClient(uri, options)
          global._mongoClientPromise = await client.connect()
          
        }
        clientPromise = global._mongoClientPromise
      } else {
        // In production mode, it's best to not use a global variable.
        client = new MongoClient(uri, options)
        clientPromise = await client.connect()
      }
      
      let db = clientPromise.db("digital-store")
      let User = await db .collection("products")
      let cursor = User.find()
      let products = []
      await cursor.forEach(u=>{
        products.push(u)
      })
      
      let  time = Date.now() - start
      res.json({time, total: products.length, data: products})
    } catch (ex){
      res.json({message: ex.message})
      
    } finally {
      await clientPromise.close()
    }
    
  });
  
  app.get('/api/item/:slug', (req, res) => {
    const { slug } = req.params;
    res.end(`Item: ${slug}`);
  });
  
  

  
  
  app.post("/api/registration", async function (req, res){
    const { username, email } = req.body
    let db;
    try {
      db = await connectDb()

      let sql = "CREATE TABLE IF NOT EXISTS users(" +
        "user_id integer NOT NULL UNIQUE," +
        "username text(30) ," +
        "email text(50) UNIQUE," +
        "PRIMARY KEY('user_id' AUTOINCREMENT))"
      db.exec(sql, (err)=>{
        if(err) {
          console.log(err)
          // reject(err)
        }
      })
      
      sql = `insert into users(username, email) values('${username}', '${email}')`
      
      // sql = "insert into users(username, email)"+
      // 	"values" +
      // 	"('rasel', 'raselmr@gmail.com'), " +
      // 	"('raju', 'raju@gmail.com'), " +
      // 	"('rasel', 'alex@gmail.com')"
      
      
      db.exec(sql, (err)=>{
        if(err){
          res.json({
            message: "user already exists",
            user: {username, email}
          })
          return
        }
        res.status(201).json({
          message: "user registration successful",
          user: {username, email}
        })
      })
      
    } catch (ex){
      res.status(500).json({
        message: ex.message
      })
    } finally {
      db?.close()
    }
  })
  
  app.post("/api/login", async function(req, res){
    const { email } = req.body
    res.setHeader("Content-Type", "application/json")
    let db;
    try {
      db = await connectDb()
   
      let sql = "SELECT * FROM users where email = "+`'${email}'`
      db.get(sql, (err, row) => {
        if(err){
          return res.json({
            message: err.message
          })
        }
        res.json({
          user: row
        })
        
      })
      
    } catch (ex){
      res.status(500).json({
        message: ex.message
      })
    }
    finally {
      db?.close()
    }
    
  })
  
  
}

export default routes




