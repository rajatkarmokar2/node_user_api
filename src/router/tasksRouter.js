const express = require( 'express' ),
    tasksrouter = express.Router()

const {
    createItems,
    updateItems,
    deleteItems,
    getSingleItems,
    getAllItems } = require( '../controllers/tasksController' )

tasksrouter.route( '/' ).get( getAllItems ).post( createItems )
tasksrouter.route( '/:id' ).get( getSingleItems ).patch( updateItems ).delete( deleteItems )

module.exports = tasksrouter