const express = require( 'express' ),
    app = express()
const connectDB = require( './db/mongodb' )
const tasksrouter = require( './router/tasksRouter' )
require( 'dotenv' ).config()
const cors = require( 'cors' )
const { refresh } = require( './controllers/tasksController' )

app.use( cors( {
    origin: [ 'https://rajatkarmokar2.github.io','http://localhost:3000' ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
} ) )

app.use( express.json() )

app.use( ( req,res,next ) => {
    console.log( { url: req.url,params: req.params,method: req.method,body: req.body } )
    next()
} )

// middleware that uses routes----------------------
app.use( '/api/v1/tasks',tasksrouter )

// home-----------------------
app.get( '/',( req,res ) => res.status( 200 ).end( '<h1>express server started</h1>' ) )

// refresh-----------------------
app.get( `/${process.env.PASSWORD}/refresh`,refresh )

// 404------------------------
app.get( '*',( req,res ) => res.status( 200 ).end( '<h1>404 not found</h1>' ) )

// port------------------------
const port = process.env.PORT || 5000


// const secure = () => {
//     let retry = 0
//     let seconds = 5000
//     app.listen( port,( req,res ) => console.log( '\tserver started - 5000\t' ) )

//     const startServer = async () => {
//         try {
//             await connectDB( process.env.MONGO_DB_URL )
//             console.log('DATABASE CONNECTED')
//             retry = 0
//             seconds = 5000
//         } catch ( err ) {
//             retry += 1
//             console.log( err.code,'- something went wrong' );
//             setTimeout( () => {
//                 if ( retry % 10 === 0 && seconds < 3600000 ) seconds *= 2
//                 startServer()
//                 console.log( { retry,seconds } );
//             },seconds
//             )
//         }
//     }
//     startServer()
// }
// secure()

const start = async () => {
    try {
        await connectDB( process.env.MONGO_DB_URL )
        // console.log( 'DATABASE CONNECTED' )
        app.listen( port,( req,res ) => { }
            // console.log( '\tserver started - 5000\t' ) 
        )
    } catch ( error ) { console.log( error.code ) }
}
start()