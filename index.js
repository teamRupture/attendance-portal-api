'use strict';

const Hapi     = require( 'hapi' );
const server   = new Hapi.Server();
const mongoose = require( 'mongoose' );
const config   = require( './config' );
const routes   = require( './lib/routes' );

// connect db
mongoose.connect( config.mongodb );

server.connection( config.connection );
server.route( routes );
server.start( ( error ) => {
	if ( error ) {
		console.log( error );
		return;
	}
	console.log( 'Server started at:', server.info.uri );
} );
