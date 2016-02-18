'use strict';

// dummy user source
const _     = require( 'lodash' );
const users = require( '../users.json' );
const uuid  = require( 'uuid' );

module.exports = [ {
	'method'  : 'POST',
	'path'    : '/login',
	'handler' : ( request, reply ) => {
		if ( !request.payload ) {
			reply( 'Unauthorized' ).code( 401 );
			return;
		}

		// supposed to be database call
		const username = request.payload.username;
		const password = request.payload.password;

		if ( !_.find( users, { 'username' : username, 'password' : password } ) ) {
			reply( 'Unauthorized' ).code( 401 );
			return;
		}

		// session should be saved in the database with ttl
		const session = uuid.v4();
		reply( { 'token' : session, 'token_type' : 'bearer' } ).code( 200 );
	}
} ];
