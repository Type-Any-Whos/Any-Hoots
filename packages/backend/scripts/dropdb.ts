import * as mongoose from 'mongoose';
import { mongoConnectionString } from '../constants';
/* Connect to the DB */
mongoose.connect(mongoConnectionString, function () {
	/* Drop the DB */
	mongoose.connection.db
		.dropDatabase()
		.then(() => process.exit(0))
		.catch((e: string | object) => {
			console.error(e);
			process.exit(-1);
		});
});
