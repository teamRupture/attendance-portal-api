'use strict';

// dummy user source
const _     = require( 'lodash' );
const users = require( '../users.json' );
const uuid  = require( 'uuid' );
const fs    = require( 'fs' );

module.exports = [ {
	'method'  : 'POST',
	'path'    : '/login',
	'handler' : ( request, reply ) => {
		if ( !request.payload ) {
			reply( 'Unauthorized' ).code( 401 );
			return;
		}

		// supposed to be database call
		const user = {
			'username' : request.payload.username,
			'password' : request.payload.password
		};

		if ( !_.find( users, user ) ) {
			reply( 'Unauthorized' ).code( 401 );
			return;
		}

		// session should be saved in the database with ttl
		const token   = uuid.v4();
		const session = require( process.cwd() + '/session' );

		user.token = token;
		session.push( user );
		let writeStream = fs.createWriteStream( process.cwd() + '/session.json' );
		writeStream.on( 'error', ( error ) => {
			console.log( error );
		} );

		writeStream.on( 'finish', () => {
			reply( { 'token' : token, 'token_type' : 'bearer' } ).code( 200 );
		} );

		writeStream.write( JSON.stringify( session ) );
		writeStream.end();

	}
}, {
	'method' : 'GET',
	'path'   : '/me',
	'config' : {
		'auth'    : 'authenticated-check',
		'handler' : ( request, reply ) => {
			reply( 'done' );
		}
	}
} ];
