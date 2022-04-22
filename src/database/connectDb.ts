const path = require("path");
const os = require("os");
const sqlite3 = require("sqlite3").verbose()

function connectDb(){
	return new Promise((resolve, reject)=>{
		let dbName = ""
		if(process.env.NODE_ENV === "development"){
			dbName = path.resolve( "db/blog.db")
		} else {
			let temp = os.tmpdir()
			dbName = path.resolve(temp + "/blog.db")
		}
		
		let db = new sqlite3.Database(dbName, function (err){
			if (err && err.code === "SQLITE_CANTOPEN") {
				// createDatabase();
				console.log("not ", err)
				reject(err)
			} else if (err) {
				reject(err)
				console.log("Getting error " + err);
			}
			resolve(db)
		});
		
	})
}

export default connectDb