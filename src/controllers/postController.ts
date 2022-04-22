
// import response from "../response";
// import errorConsole from "../logger/errorConsole";
// import slugify from "slugify";
// import Post, {PostWithAuthorType} from "../models/Post";
// import {ObjectId} from "mongodb";
// import Hits from "../models/Hits";
// import User from "../models/User";
// import path from "path";
// import {readFile, writeFile, rm} from "fs/promises";
// import fs from "fs";
// import { marked } from 'marked';
import connectDb  from "../database/connectDb"
import response from "../response";
import saveLog from "../logger/saveLog";

// import {
//   deleteUsersPostIntoCache,
//   pullUserPostsFromCache,
//   pushUserPostsIntoCache,
//   setUsersPostsIntoCache
// } from "../redisCacheActions/usersPosts";

// import {pullPostsFromCache, pushPostsIntoCache} from "../redisCacheActions/allPosts";

// import {
//   deleteAdminPostIntoCache,
//   setAdminPostsIntoCache
// } from "../redisCacheActions/adminPosts";
// import saveLog from "../logger/saveLog";




// export const getP = (req, res)=>{
//   try{
//     res.send("test")
//   } catch (ex){
//     res.send("test err")
//   } finally {
//
//   }
// }


export const getPosts = async (req, res, next) =>{
  
    const { author_id } = req.query
    let db;
    try {
      
      /** get users posts from redis cache using author id */
      db = await connectDb()
      const posts = []
      const sql = `SELECT * FROM POSTS p join users u on u.user_id = p.author_id LIMIT 100`
      
      db.all(sql, (err, rows)=>{
        if(!err){
          res.send(rows)
        } else {
          res.status(500).json({message: err.message})
        }
      })
      
    } catch (ex){
      res.status(500).json({message: ex.message})
      
      // response(res, 500, ex.message || "Internal Error")
    } finally {
      db?.close()
    }
    
  
  // let client;
  // try {
  //
  //   client = await redisConnect()
  //
  //   let posts = []
  //   if (author_id) {
  //     // posts = db.get('posts').filter({author_id: author_id}).value()
  //     let allPosts = await getHashData('posts', client)
  //     if(allPosts) {
  //       posts = allPosts.filter(p => p.author_id === author_id)
  //     }
  //   } else {
  //     posts = await getHashData('posts', client)
  //   }
  //
  //   let users = await getHashData("users", client)
  //
  //   let posts_with_user = []
  //   // usersSync(users, client)
  //
  //
  //   posts && posts.length > 0 && posts.forEach(post => {
  //     let user = users.find(u => u.id === post.author_id)
  //     if (user) {
  //       posts_with_user.push({
  //         ...post,
  //         author: {
  //           username: user.first_name + " " + user.last_name,
  //           avatar: user.avatar
  //         }
  //       })
  //     } else {
  //       posts_with_user.push({
  //         ...post,
  //         author: {}
  //       })
  //     }
  //   })
  //
  //   response(res, 200, {posts: posts_with_user})
  //
  // } catch (ex){
  //   errorConsole(ex)
  //   response(res, 500, "Server Error. Please Try Again")
  // } finally {
  //   client?.quit()
  // }
  
}


export const savePost = async (req, res, next) =>{
  
  const { author_id } = req.query
  let db;
  try {
    
    /** get users posts from redis cache using author id */
    db = await connectDb()
  
    const posts = [
      {
        "_id": "1",
        "author_id": 1,
        "created_at": "2022-02-21T20:42:08.471Z",
        "slug": "how-to-setup-babel-in-node.js 1111111111111111111111",
        "title": "How to Setup Babel in Node.js 1111111111111111111111 ",
        "cover": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1639068650/2021-12-09_224749.jpg",
        "path": "markdown/how-to-setup-babel-in-node.js.md",
        "tags": [
          "babel",
          "javascript",
          "programming",
          "es6",
          "npm",
          "node.js",
          "nodejs"
        ],
        "summary": "React.memo() vs. useMemo():`  Major differences and use cases\nProblem of React Re-render**\nMemoization is one of the ways to optimize performance. In this article, we’ll explore how it works in React.",
        "author": {
          "_id": "620ff9e25cb6c343543bebc5",
          "first_name": "Rasel",
          "last_name": "mahmud",
          "email": "rasel@gmail.com",
          "avatar": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1639027976/my-avatar-300x300.jpg",
          "role": "admin",
          "cover": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1647107871/Untitled_Diagram.jpg"
        }
      },
      {
        "_id": "621408c858523b8fa17e0b17",
        "author_id": 1,
        "cover": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1639071905/Untitled_Diagram.jpg",
        "created_at": "2022-02-21T20:42:08.471Z",
        "slug": "স্বল্পভাষীতা-আশির্বাদ-নাকি-অভিশাপ",
        "title": "স্বল্পভাষীতা-আশির্বাদ নাকি অভিশাপ",
        "path": "markdown/solpovasita-naki-ovishap.md",
        "tags": [
          "অভিশাপ আশির্বাদ",
          "স্বল্পভাষীতা"
        ],
        "likes": [
          "X71lHJqu_",
          "y6hXv1owV"
        ],
        "summary": "React.memo() vs. useMemo():`  Major differences and use cases\nProblem of React Re-render**\nMemoization is one of the ways to optimize performance. In this article, we’ll explore how it works in React.",
        "author": {
          "_id": "620ff9e25cb6c343543bebc5",
          "first_name": "Rasel",
          "last_name": "mahmud",
          "email": "rasel@gmail.com",
          "avatar": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1639027976/my-avatar-300x300.jpg",
          "role": "admin",
          "cover": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1647107871/Untitled_Diagram.jpg"
        }
      },
      {
        "_id": "6214080c58523b8fa17e0b14",
        "author_id": 1,
        "slug": "মেটাডেটা-কী-আপনি-কি-সত্যিই-ঝুকির-মধ্যে‌‍",
        "title": "মেটাডেটা কী? আপনি কি সত্যিই ঝুকির মধ্যে‌‍ ?",
        "cover": "https://thumbs.dreamstime.com/z/zero-one-hacker-coding-cracker-tries-to-hack-security-system-steal-destroy-critical-information-ransom-important-129896215.jpg",
        "path": "markdown/metadata-ki-apni-ki-shotti-jhukir-moddhe.md",
        "tags": [
          "মেটাডেটা",
          "ঝুকি",
          "প্রাইভেসী",
          "Data",
          "মোবাইল",
          "ল্যাপটপ",
          "পিসি",
          "ফেইসবুক",
          "গুগল",
          "ব্রাউজার",
          "মেসেজিং"
        ],
        "comments": [],
        "likes": [
          "4GsD7MSue",
          "X71lHJqu_"
        ],
        "created_at": "2022-02-21T20:42:08.471Z",
        "summary": "React.memo() vs. useMemo():`  Major differences and use cases\nProblem of React Re-render**\nMemoization is one of the ways to optimize performance. In this article, we’ll explore how it works in React.",
        "author": {
          "_id": "620ff9e25cb6c343543bebc5",
          "first_name": "Rasel",
          "last_name": "mahmud",
          "email": "rasel@gmail.com",
          "avatar": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1639027976/my-avatar-300x300.jpg",
          "role": "admin",
          "cover": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1647107871/Untitled_Diagram.jpg"
        }
      },
      {
        "_id": "6214098958523b8fa17e0b19",
        "author_id": 1,
        "created_at": "2022-02-21T20:42:08.471Z",
        "slug": "how-to-deal-with-recursive-function-in-javascript",
        "title": "How to deal with recursive function in javascript",
        "path": "markdown/working_with_recursive_function.md",
        "likes": [
          "4GsD7MSue",
          "X71lHJqu_",
          "y6hXv1owV"
        ],
        "tags": [
          "react",
          "recursive",
          "loop",
          "nested",
          "react",
          "function"
        ],
        "cover": "markdown/cover/react-usememo-reactmemo.png",
        "summary": "JavaScript Recursion updated\n\nIn this tutorial, you will learn about recursion in JavaScript with the help of examples.",
        "updated_at": "2022-02-22T19:51:31.233Z",
        "author": {
          "_id": "620ff9e25cb6c343543bebc5",
          "first_name": "Rasel",
          "last_name": "mahmud",
          "email": "rasel@gmail.com",
          "avatar": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1639027976/my-avatar-300x300.jpg",
          "role": "admin",
          "cover": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1647107871/Untitled_Diagram.jpg"
        }
      },
      {
        "_id": "6214089858523b8fa17e0b16",
        "author_id": 1,
        "slug": "react-prevent-re-rendering-using-React-useMemo",
        "title": "React prevent re-rendering using React useMemo",
        "path": "markdown/react_use_memo.md",
        "likes": [
          "4GsD7MSue",
          "y6hXv1owV"
        ],
        "tags": [
          "react",
          "effect",
          "useMemo",
          "memo"
        ],
        "cover": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1639071905/Untitled_Diagram.jpg",
        "created_at": "2022-02-21T20:42:08.471Z",
        "summary": "React.memo() vs. useMemo():`  Major differences and use cases\nProblem of React Re-render**\nMemoization is one of the ways to optimize performance. In this article, we’ll explore how it works in React.",
        "updated_at": "2022-02-22T18:40:56.311Z",
        "author": {
          "_id": "620ff9e25cb6c343543bebc5",
          "first_name": "Rasel",
          "last_name": "mahmud",
          "email": "rasel@gmail.com",
          "avatar": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1639027976/my-avatar-300x300.jpg",
          "role": "admin",
          "cover": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1647107871/Untitled_Diagram.jpg"
        }
      },
      {
        "_id": "6214086558523b8fa17e0b15",
        "author_id": 1,
        "cover": "https://community-cdn-digitalocean-com.global.ssl.fastly.net/variants/NakVQu9jRsxc6TEmSSLfEjeG/035575f2985fe451d86e717d73691e533a1a00545d7230900ed786341dc3c882",
        "slug": "React_memo_vs_useMemo_Major_differences_and_use_cases",
        "title": "React.memo() vs. useMemo(): Major differences and use cases",
        "path": "markdown/react_use_memo.md",
        "created_at": "2022-02-21T20:42:08.471Z",
        "likes": [
          "4GsD7MSue",
          "y6hXv1owV"
        ],
        "tags": [
          "react",
          "effect",
          "useMemo",
          "memo"
        ],
        "summary": "React.memo() vs. useMemo():`  Major differences and use cases\nProblem of React Re-render**\nMemoization is one of the ways to optimize performance. In this article, we’ll explore how it works in React.",
        "author": {
          "_id": "620ff9e25cb6c343543bebc5",
          "first_name": "Rasel",
          "last_name": "mahmud",
          "email": "rasel@gmail.com",
          "avatar": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1639027976/my-avatar-300x300.jpg",
          "role": "admin",
          "cover": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1647107871/Untitled_Diagram.jpg"
        }
      },
      {
        "_id": "6213f9229916c21666dca4c3",
        "author_id": 1,
        "slug": "react-context-api-with-nice-organized-like-redux-js-but-it-is-simple",
        "title": "React Context Api with nice organized Like Redux js, but it is Simple.",
        "cover": "",
        "tags": [
          "javascript",
          "reactjs",
          "react"
        ],
        "comments": [],
        "likes": [
          "1445819995011",
          "1639723152"
        ],
        "created_at": "2022-02-21T20:42:08.471Z",
        "path": "markdown/deno-is-a-secure-and-fast-javascript-runtime-engine.md",
        "summary": "React.memo() vs. useMemo():`  Major differences and use cases\nProblem of React Re-render**\nMemoization is one of the ways to optimize performance. In this article, we’ll explore how it works in React.",
        "author": {
          "_id": "620ff9e25cb6c343543bebc5",
          "first_name": "Rasel",
          "last_name": "mahmud",
          "email": "rasel@gmail.com",
          "avatar": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1639027976/my-avatar-300x300.jpg",
          "role": "admin",
          "cover": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1647107871/Untitled_Diagram.jpg"
        }
      },
      {
        "_id": "621a1498a45291051b83b5f6",
        "title": "Authentication System Node.js App using Passport.js, and MongoDB Google Login",
        "slug": "authentication-system-nodejs-app-using-passportjs-and-mongodb-google-login",
        "tags": [
          "passport.js",
          "passport",
          "google",
          "oauth",
          "oauth2.0",
          "authentication",
          "google-sign-in",
          "nodejs",
          "mongodb"
        ],
        "cover": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1645876282/Level.jpg",
        "path": "markdown/authentication-system-nodejs-app-using-passportjs-and-mongodb-google-login.md",
        "author_id": 1,
        "summary": "Authentication for Rest-Api with google account in nodejs application using passport.js, Jwt token create based login system for our react application.",
        "created_at": "2022-02-26T11:52:56.485Z",
        "updated_at": "2022-02-26T13:25:02.327Z",
        "author": {
          "_id": "620ff9e25cb6c343543bebc5",
          "first_name": "Rasel",
          "last_name": "mahmud",
          "email": "rasel@gmail.com",
          "avatar": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1639027976/my-avatar-300x300.jpg",
          "role": "admin",
          "cover": "https://res.cloudinary.com/dbuvg9h1e/image/upload/v1647107871/Untitled_Diagram.jpg"
        }
      }
    ]
    
    let values = ""
    
    posts.forEach((post, i)=>{
      if(posts.length === i+1) {
        values += `('${post.title}', ${post.author_id}, '${post.path}', '${post.slug}', '${post.summary}', '${post.cover}', '[${post.tags.map(t=> `"${t}"`  )}]')`
      } else{
        values += `('${post.title}', ${post.author_id}, '${post.path}', '${post.slug}', '${post.summary}', '${post.cover}', '[${post.tags.map(t=> `"${t}"`  )}]'),`
      }
    })
  
    
    // let sql = `// INSERT INTO posts (title,  author_id, path, slug, summary, cover) VALUES ('How to Setup Babel in Node.js ', '1', 'markdown/how-to-setup-babel-in-node.js.md', 'how-to-setup-babel-in-node.js', 'React.memo() vs. useMemo() Major differences and use cases Problem of React Re-render** Memoization is one of the ways to optimize performance. In this article, we’ll explore how it works in React.', 'https://res.cloudinary.com/dbuvg9h1e/image/upload/v1639068650/2021-12-09_224749.jpg')`
    const sql = `INSERT INTO posts (title,  author_id, path, slug, summary, cover, tags) VALUES ${values}`
    
    db.exec(sql, (err)=>{
      if(!err){
        res.status(201).json({message: "post added"})
      } else {
        res.status(500).json({message: err.message})
      }
      return
    })
    
  } catch (ex){
    res.status(500).json({message: ex.message})
    
    // response(res, 500, ex.message || "Internal Error")
  } finally {
    db?.close()
  }
  
  
  // let client;
  // try {
  //
  //   client = await redisConnect()
  //
  //   let posts = []
  //   if (author_id) {
  //     // posts = db.get('posts').filter({author_id: author_id}).value()
  //     let allPosts = await getHashData('posts', client)
  //     if(allPosts) {
  //       posts = allPosts.filter(p => p.author_id === author_id)
  //     }
  //   } else {
  //     posts = await getHashData('posts', client)
  //   }
  //
  //   let users = await getHashData("users", client)
  //
  //   let posts_with_user = []
  //   // usersSync(users, client)
  //
  //
  //   posts && posts.length > 0 && posts.forEach(post => {
  //     let user = users.find(u => u.id === post.author_id)
  //     if (user) {
  //       posts_with_user.push({
  //         ...post,
  //         author: {
  //           username: user.first_name + " " + user.last_name,
  //           avatar: user.avatar
  //         }
  //       })
  //     } else {
  //       posts_with_user.push({
  //         ...post,
  //         author: {}
  //       })
  //     }
  //   })
  //
  //   response(res, 200, {posts: posts_with_user})
  //
  // } catch (ex){
  //   errorConsole(ex)
  //   response(res, 500, "Server Error. Please Try Again")
  // } finally {
  //   client?.quit()
  // }
  
}




// export const filterPosts = async (req, res, next) =>{
//   const  { filter }: {
//     filter: {tags?: string[], text?: string, summary?: string}
//   } = req.body
//
//   try {
//
//     let regExp = new RegExp(filter.text, "i")
//     let posts = await Post.aggregate([
//       {
//         $match: {
//           $or: [
//             {title: {$in: [regExp]}},
//             {summary: {$in: [regExp]}},
//             {tags: filter.tags ? {$in:  [filter.tags]} : [] }
//           ]
//         }
//       },
//       {
//         $lookup: {
//           from: 'users',
//           localField: "author_id",
//           foreignField: "_id",
//           as: "author"
//         }
//       },
//       { $unwind: { path: "$author", preserveNullAndEmptyArrays: true } },
//       { $project: {
//           author: {
//             password: 0,
//             created_at: 0,
//             updated_at: 0,
//             description: 0,
//             last_name: 0,
//             _id: 0,
//           }
//
//         } }
//     ])
//
//
//     res.send(posts)
//
//   } catch (ex){
//     console.log(ex)
//   }
// }
//
// export const getTopHitsPosts = async (req, res, next) =>{
//
//   try {
//     let p = await Post.aggregate([
//       // { $match: { author_id: new ObjectId(author_id)}},
//       { $lookup: {
//           from: "users",
//           localField: "author_id",
//           foreignField: "_id",
//           as: "author"
//         }},
//       { $unwind: { path: "$author", preserveNullAndEmptyArrays: true } },
//       { $project: {
//           tags: 0,
//           author: {
//             _id: 0,
//             password: 0,
//             created_at: 0,
//             updated_at: 0,
//             description: 0,
//             email: 0
//           }
//         } },
//       { $lookup: {
//           from: "hits",
//           localField: "_id",
//           foreignField: "post_id",
//           as: "hits"
//         }},
//       { $unwind: { path: "$hits", preserveNullAndEmptyArrays: true } },
//       { $project: {
//           tags: 0,
//           hits: {
//             post_id: 0
//           }
//         } },
//       { $sort: {
//           'hits.hits': -1
//         } },
//       { $limit: 10 }
//     ])
//     response(res, 200, {  posts: p })
//
//   } catch (ex){
//     errorConsole(ex)
//     saveLog(ex.message ? ex.message : "internal error")
//     response(res, 500, ex.message)
//   }
//
//   // let client;
//   // try {
//   //
//   //   client = await redisConnect()
//   //
//   //   let posts = []
//   //   if (author_id) {
//   //     // posts = db.get('posts').filter({author_id: author_id}).value()
//   //     let allPosts = await getHashData('posts', client)
//   //     if(allPosts) {
//   //       posts = allPosts.filter(p => p.author_id === author_id)
//   //     }
//   //   } else {
//   //     posts = await getHashData('posts', client)
//   //   }
//   //
//   //   let users = await getHashData("users", client)
//   //
//   //   let posts_with_user = []
//   //   // usersSync(users, client)
//   //
//   //
//   //   posts && posts.length > 0 && posts.forEach(post => {
//   //     let user = users.find(u => u.id === post.author_id)
//   //     if (user) {
//   //       posts_with_user.push({
//   //         ...post,
//   //         author: {
//   //           username: user.first_name + " " + user.last_name,
//   //           avatar: user.avatar
//   //         }
//   //       })
//   //     } else {
//   //       posts_with_user.push({
//   //         ...post,
//   //         author: {}
//   //       })
//   //     }
//   //   })
//   //
//   //   response(res, 200, {posts: posts_with_user})
//   //
//   // } catch (ex){
//   //   errorConsole(ex)
//   //   response(res, 500, "Server Error. Please Try Again")
//   // } finally {
//   //   client?.quit()
//   // }
//
// }
//
export const getPost = async (req, res, next) =>{
  let { slug, post_id } = req.params
  
  const { author_id } = req.query
  let db;
  
  try {
    
    if(!post_id) {
      return response(res, 404, "post not found")
    }
    
    const { author_id } = req.query

    db = await connectDb()
      // let sql = `// INSERT INTO posts (title,  author_id, path, slug, summary, cover) VALUES ('How to Setup Babel in Node.js ', '1', 'markdown/how-to-setup-babel-in-node.js.md', 'how-to-setup-babel-in-node.js', 'React.memo() vs. useMemo() Major differences and use cases Problem of React Re-render** Memoization is one of the ways to optimize performance. In this article, we’ll explore how it works in React.', 'https://res.cloudinary.com/dbuvg9h1e/image/upload/v1639068650/2021-12-09_224749.jpg')`
      const sql = `SELECT * FROM  posts where post_id = ${post_id}`
    
      db.get(sql, (err, row)=>{
        if(err){
          saveLog("post not found with id: " + post_id)
          response(res, 404, "post not found")
          return
        }
        console.log(row)
      })
    
    // await increasePostVisitorCount(post_id)
    //   .then(d=>{
    //   console.log(d)
    // })
    
  } catch (ex){
    saveLog(ex.message ? ex.message : "internal error")
    response(res, 500, ex.message)
  } finally {
    db?.close()
  }

}
//
// function uploadMarkdownFile(mdFilePath: string, mdContent: string){
//   return new Promise<string | null>(async (s, e)=>{
//     try {
//       let p = path.resolve(process.cwd() + "/"+ mdFilePath)
//       await writeFile(p, JSON.stringify(mdContent))
//       s(mdFilePath)
//     } catch (ex){
//       errorConsole(ex)
//       s(null)
//     }
//   })
// }
//
// export const addPost = async (req, res, next) =>{
//
//   let user_id = req.user_id
//   let { title, cover = "", author_id, mdContent, tags, summary = "" } = req.body
//
//   if(!(title && author_id && mdContent)){
//     return response(res, 500, "incomplete post data")
//   }
//   if(user_id !== author_id){
//     return response(res, 401, {message: "unauthorized" })
//   }
//
//   // let id = shortid.generate();
//   //
//   // let slug = slugify(title, {
//   //   replacement: "-",
//   //   strict: true,
//   //   lower: true,
//   //   trim: true
//   // })
//   //
//   // if(!slug){
//   //   // slug = make_slug(title)
//   //   // return response(res, 400, {message: "post title invalid" })
//   //   slug = shortid.generate();
//   // }
//   //
//   // if(mdContent){
//   //   try {
//   //
//   //     let sd = cloudinaryHandler().uploader.upload_stream(
//   //       {
//   //         folder: "foo"
//   //       },
//   //       function(error, result) {
//   //         console.log(error, result);
//   //       })
//   //
//   //     console.log(sd)
//   //
//   //     const Readable = require('stream').Readable;
//   //     let s = new Readable()
//   //     s.push("some string")
//   //     s.push(null) // end od pushing chunk
//   //     s.on("data", (d)=>{
//   //
//   //     })
//   //
//   //     s.on("end", ()=>{
//   //       // res.end()
//   //     })
//
//   if(!mdContent){
//     return response(res, 400, {message: "post not create because markdown content are empty"})
//   }
//
//   let client;
//   try {
//     let slug = slugify(title, {
//       replacement: "-",
//       strict: true,
//       lower: true,
//       trim: true
//     })
//
//     if (!slug) {
//       slug = shortid.generate()
//     }
//
//     let mdFilePath = `markdown/${slug}.md`
//     // let isUploaded = await updateFile(mdContent, mdFilePath)
//
//     mdFilePath = await uploadMarkdownFile(mdFilePath, mdContent)
//
//     if(!mdFilePath){
//       saveLog("markdown file create fail " + mdFilePath)
//       return  response(res, 409, { message: "markdown file create fail" })
//     }
//
//
//     let newPost: any = {
//       author_id: new ObjectId(author_id),
//       slug,
//       title,
//       cover,
//       tags: tags,
//       summary,
//       path: mdFilePath,
//       updated_at: new Date(),
//       created_at: new Date()
//     }
//
//     let n = new Post({
//       ...newPost,
//     })
//
//     let isError = await n.validationBeforeSave()
//     if(isError){
//       return  response(res, 409, { message: "missing data" })
//     }
//
//     let r: any = await n.save()
//     if(!r){
//       response(res, 409, "post create fail")
//       return
//     }
//
//     // populated author...
//     let user: any = await User.findOne({_id: new ObjectId(author_id)}, {})
//
//     if(user){
//       let { password, ...other } = user
//       r.author = {
//         first_name: user.first_name,
//         last_name: user.last_name,
//         email: user.email,
//         avatar: user.avatar
//       }
//       if(other.role === "admin"){
//         /// make cache admin posts
//         await setAdminPostsIntoCache("admin_posts", user._id, r)
//
//       } else {
//         await setUsersPostsIntoCache("users_posts", user._id, r)
//       }
//       response(res, 200, {post: r})
//
//     } else {
//       response(res, 200, {post: r})
//     }
//
//   } catch (ex){
//     errorConsole(ex)
//     saveLog(ex.message ? ex.message : "post create fail")
//     response(res, 409, "post create fail")
//
//   } finally {
//     client?.close()
//   }
//
// }
//
//
// export const updatePost = async (req, res, next) =>{
//
//   let user_id = req.user_id
//   if(!user_id){
//     return response(res, 409, "Unauthorized")
//   }
//
//
//   let { _id, title, cover, summary, mdContent, tags } = req.body
//
//   let client;
//
//   try {
//
//     let post: any  = await Post.findOne({_id: new ObjectId(_id)}, {})
//     if(post) {
//       if (title) {
//         post.title = title
//       }
//       if(summary){
//         post.summary = summary
//       }
//       if (tags) {
//         post.tags = tags
//       }
//       if (cover) {
//         post.cover = cover
//       }
//       if (!post.created_at) {
//         post.created_at = new Date()
//       }
//       post.updated_at = new Date()
//
//       try {
//
//         if (mdContent) {
//           await writeFile(post.path, mdContent)
//           let isUpdated = await Post.update(
//             {_id: new ObjectId(post._id)},
//             {$set: post}
//           )
//
//           if (isUpdated) {
//             response(res, 200, {post: post})
//           } else {
//             response(res, 500, "post update fail 1")
//             saveLog("Internal Error. Please Try Again", req.url, req.method)
//           }
//
//         } else {
//           response(res, 400, "markdown content required")
//           saveLog("markdown content required", req.url, req.method)
//         }
//
//       } catch (ex){
//         response(res, 500, "post update fail")
//         saveLog(ex.message ? ex.message : "Internal Error. Please Try Again", req.url, req.method)
//       }
//
//
//     } else {
//       response(res, 404, "post Not found")
//     }
//
//
//   } catch (ex){
//     errorConsole(ex)
//     saveLog(ex.message ? ex.message : "Internal Error. Please Try Again", req.url, req.method)
//     response(res, 500, "Internal Error. Please Try Again")
//
//   } finally {
//     client?.close()
//   }
// }
//
//
//
// /**...............Implementation.............*/
// function increasePostVisitorCount(post_id){
//
//   return new Promise(async (resolve, reject)=>{
//     try{
//       let hit: any =  await Hits.findOne({post_id: new ObjectId(post_id)}, {})
//       if(hit){
//         let doc = await Hits.update({_id: hit._id}, {
//           $inc: { hits:  1 }
//         })
//         resolve(doc)
//       } else {
//         let newHit = new Hits({
//           post_id: new ObjectId(post_id), hits: 1
//         })
//         //
//         // const errors = await newHit.validationBeforeSave()
//         // if(errors){  console.log(errors) }
//         let doc = await newHit.save()
//         resolve(doc)
//
//       }
//
//     } catch (ex){
//       resolve(false)
//     }
//   })
//
//   // let postHit = await client.HGET("post_hits", post.id)
//   // if(postHit){
//   //
//   //   if(Number(postHit)) {
//   //     let increase =  Number(postHit) + 1
//   //     let isAdded = await client.HSET("post_hits", post.id, increase.toString())
//   //     if(isAdded){
//   //       // console.log("increase post visit")
//   //     }
//   //   } else {
//   //     let isAdded = await client.HSET("post_hits", post.id, "1")
//   //     if(isAdded){
//   //       // console.log("increase post visit")
//   //     }
//   //   }
//   //
//   // } else {
//   //   // create new one
//   //   let isAdded = await client.HSET("post_hits", post.id, "1")
//   //   if(isAdded){
//   //     // console.log("increase post visit")
//   //
//   //   }
//   // }
//
//   //
//   // let postHit = await client.HGET("post_hits", post.id)
//   // if(postHit){
//   //
//   //   if(Number(postHit)) {
//   //     let increase =  Number(postHit) + 1
//   //     let isAdded = await client.HSET("post_hits", post.id, increase.toString())
//   //     if(isAdded){
//   //       // console.log("increase post visit")
//   //     }
//   //   } else {
//   //     let isAdded = await client.HSET("post_hits", post.id, "1")
//   //     if(isAdded){
//   //       // console.log("increase post visit")
//   //     }
//   //   }
//   //
//   // } else {
//   //   // create new one
//   //   let isAdded = await client.HSET("post_hits", post.id, "1")
//   //   if(isAdded){
//   //     // console.log("increase post visit")
//   //   }
//   // }
// }
//
//
//
// export const getFileContent = async (req, res, next)=>{
//   // try{
//   //   let mdContent = await downloadFile(req.body.path)
//   //   res.send(mdContent)
//   // } catch (ex){
//   //   res.send(ex)
//   // }
// }
//
// export const getPostContent = async (req, res, next) =>{
//   let { filePath, post_id } = req.body
//
//   let p = path.resolve(process.cwd() + `/${filePath}`)
//
//   let client;
//
//   try {
//
//     // let mdContent = await downloadFile(filePath)
//     // if (mdContent) {
//     //   marked.setOptions({
//     //     highlight: function(code, lang) {
//     //       const hljs = require('highlight.js');
//     //       const language = hljs.getLanguage(lang) ? lang : 'plaintext';
//     //       return hljs.highlight(code, { language }).value;
//     //     },
//     //   })
//     //
//     //   marked.parse(mdContent.toString(), (err, html) => {
//     //     if(!err) {
//     //       res.write(html)
//     //       res.end()
//     //       // response(res, 200, {mdContent: html, message: "yyyyyyy"})
//     //     } else{
//     //       response(res, 500,  "markdown file parse fail")
//     //     }
//     //   });
//     //
//     // } else {
//     //   response(res, 404, {mdContent: "", message: "Markdown content not found"})
//     // }
//
//
//     // node.js, "classic" way:
//     // const md = new MarkdownIt({
//     //   breaks: true,
//     //   highlight: function (str, lang) {
//     //     if (lang && hljs.getLanguage(lang)) {
//     //       try {
//     //         return hljs.highlight(str, { language: lang }).value;
//     //       } catch (__) {}
//     //     }
//     //
//     //     return ''; // use external default escaping
//     //   }
//     // });
//
//     marked.setOptions({
//       highlight: function(code, lang) {
//         const hljs = require('highlight.js');
//         const language = hljs.getLanguage(lang) ? lang : 'plaintext';
//         return hljs.highlight(code, { language }).value;
//       },
//     })
//
//
//     const stream = fs.createReadStream(p)
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//
//     stream.on("data", (data)=>{
//       const html = marked.parse(data.toString());
//       // const result = md.render(data.toString());
//       res.write(html)
//       // res.send(result);
//     })
//
//     stream.on("end", ()=>{
//       res.end()
//     })
//
//     stream.on("error", (e)=>{
//       console.log(e)
//     })
//
//
//
//   } catch (ex){
//     errorConsole(ex)
//     saveLog(ex.message ? ex.message : "Internal error")
//     response(res, 500, ex.message)
//   }
//   finally {
//     client?.quit()
//   }
// }
//
// export const getRawMarkdownContent = async (req, res, next) =>{
//
//   try {
//
//     const {filePath } = req.body
//     let p = path.resolve(process.cwd() + `/${filePath}`)
//     const stream = fs.createReadStream(p)
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//
//     stream.on("data", (data)=>{
//       res.write(data)
//     })
//
//     stream.on("end", ()=>{
//       res.end()
//     })
//
//     stream.on("error", (e)=>{
//       saveLog("getRawMarkdownContent stream error " + e.message ? e.message: "")
//     })
//
//
//   } catch (ex){
//     errorConsole(ex)
//     response(res, 404, {mdContent: ""})
//   }
//
// }
//
// async function deleteMarkdownFile(filePath){
//   try {
//     await rm(filePath)
//     console.log("markdown file deleted...")
//   } catch (ex){
//     console.log("markdown not found...")
//     errorConsole(ex)
//   }
// }
//
// function deletePostHandler(req, res){
//   return new Promise(async (resolve, reject)=>{
//     try {
//       let doc = await Post.removeOne({_id: new ObjectId(req.body._id)})
//       if (doc) {
//         let mdFilePath = path.resolve(process.cwd() + "/" + req.body.path)
//         response(res, 201, {id: req.body._id})
//         await deleteMarkdownFile(mdFilePath)
//       } else {
//         response(res, 404, "Post not found")
//       }
//     } catch (ex){
//       response(res, 500, "Post Delete fail")
//     }
//   })
// }
//
//
// export const deletePost = async (req, res, next) =>{
//   let { adminId } = req.body
//
//   try{
//     if(adminId){
//       let admin = await User.findOne({_id: new ObjectId(adminId), role: "admin"}, {})
//       if(admin) {
//         await deletePostHandler(req, res)
//         await deleteAdminPostIntoCache("admin_posts", req.body._id)
//       }
//     } else {
//
//       await deletePostHandler(req, res)
//
//       let admin = await User.findOne({_id: new ObjectId(req.user_id), role: "admin"}, {})
//       if(admin) {
//         await deleteAdminPostIntoCache("admin_posts", req.body._id)
//       } else {
//         await deleteUsersPostIntoCache("users_posts", req.body._id)
//       }
//     }
//
//   } catch (ex){
//     response(res, 500, "Post Delete fail")
//   } finally {
//
//   }
//
// }
//
// export const handleToggleLike = async (req, res)=>{
//   const {post_id, user_id} = req.body
//
//   let client;
//   try{
//     response(res, 500, "Please try again")
//     // client = await redisConnect()
//     // let postStr = await client.HGET("posts", post_id)
//     // if(postStr){
//     //   let post = JSON.parse(postStr)
//     //   if(post.likes) {
//     //     let idx = post.likes && post.likes.indexOf(user_id)
//     //     if (idx === -1) {
//     //       post.likes && post.likes.push(user_id)
//     //     } else {
//     //       post.likes && post.likes.splice(idx, 1)
//     //     }
//     //   } else {
//     //     post.likes = [user_id]
//     //   }
//     //
//     //   let doc = await client.HSET("posts", post_id, JSON.stringify(post))
//     //   if(doc === 0 || doc) {
//     //     response(res, 201, {message: "Like Action Success", post: post})
//     //   } else {
//     //     response(res, 500, "Post Action fail")
//     //   }
//     // }
//
//   } catch (ex){
//     response(res, 500, "Post Delete fail")
//
//   } finally {
//     client?.quit()
//   }
// }
//
//
