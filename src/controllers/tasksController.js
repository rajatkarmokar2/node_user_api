const connectDB = require( "../db/mongodb" )
const tasksModel = require( "../models/tasksModel" )

const getAllItems = async ( req,res ) => {
    // res.send( 'get all items' )
    try {
        const alltasks = await tasksModel.find( {} )
        res.status( 200 ).json( alltasks )
    } catch ( err ) { res.status( 500 ).json( [ err ] ) }
}

const getSingleItems = async ( req,res ) => {
    // res.send( 'get single items' )
    try {
        const id = req.params.id
        const singletask = await tasksModel.findOne( { _id: id } )
        if ( !singletask ) return res.status( 404 ).json( { msg: `no task found with id ${id}` } )
        res.status( 200 ).json( singletask )
    } catch ( err ) { res.status( 500 ).json( [ err ] ) }
}

const createItems = async ( req,res ) => {
    // if ( !req.body ) return res.send( 'create a items' )
    try {
        const createtask = await tasksModel.create( req.body )
        res.status( 201 ).json( createtask )
    } catch ( err ) { res.status( 500 ).json( [ err ] ) }
}

const updateItems = async ( req,res ) => {
    // if ( !req.body ) return res.send( 'update a items' )
    try {
        const id = req.params.id
        const updatetask = await tasksModel.findOneAndUpdate( { _id: id },req.body,{ new: true,runValidators: true } )
        if ( !updatetask ) return res.status( 404 ).json( { msg: `no task found with id ${id}` } )
        res.status( 200 ).json( { id,data: req.body } )
    } catch ( err ) { res.status( 500 ).json( [ err ] ) }
}

const deleteItems = async ( req,res ) => {
    // if ( !req.body ) return res.send( 'delete a items' )
    try {
        const id = req.params.id
        const deletetask = await tasksModel.findOneAndDelete( { _id: id } )
        if ( !deletetask ) return res.status( 404 ).json( { msg: `no task found with id ${id}` } )
        res.status( 200 ).json( { id,success: true } )
    } catch ( err ) { res.status( 500 ).json( [ err ] ) }
}

const refresh = async ( req,res ) => {
    try {
        console.log('refreshing...');
        await connectDB( process.env.MONGO_DB_URL )
        res.status( 200 ).send( '<h1>success</h1>' )
        res.end()
    } catch ( err ) {
        res.status( 500 ).send( '<h1>failed</h1>' )
        res.end()
    }
}

module.exports = { getAllItems,getSingleItems,createItems,updateItems,deleteItems ,refresh}