'use strict';

const mongoose = require( 'mongoose' );
const Schema   = mongoose.Schema;

const UserModel = new Schema( {
	'id'       : Schema.ObjectId,
	'username' : {
		'type'   : String,
		'unique' : true
	},
	'password' : String
} );

mongoose.models.Slave = mongoose.model( 'UserModel', UserModel );
