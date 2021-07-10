var dbOptions = {};

function getDB(){
	console.log(process.env.DEBUG)
	if(process.env.DEBUG == 'isDebug'){
		dbOptions = {
			host     : 'localhost',
			port     : '3306',
			user     : 'root',
			password : '',
			database : 'pengesst_'
		};
	}
	else{
		dbOptions = {
			host     : 'localhost',
			port     : '3306',
			user     : 'pengesst',
			password : 'Pesa!739',
			database : 'pengesst_'
		};
	}
}
getDB();
console.log(dbOptions);
module.exports = {dbOptions: dbOptions};
