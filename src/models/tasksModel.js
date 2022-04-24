const mongoose = require( "mongoose" )

const tasksSchema = mongoose.Schema( {
    empcode: {
        type: String || Number,
        required: [ true,'emp is required' ]
    },
    name: {
        type: String,
        required: [ true,'name is required' ],
        trim: true,
        maxlength: [ 20,'name can be maximum 20 characters long' ]
    },
    department: {
        type: String,
        required: [ true,'department is required' ]
    },
    gender: {
        type: String,
        required: [ true,'gender is required' ]
    },
    dob: {
        type: Date,
        required: [ true,'date of birth is required' ]
    },
    joiningdate: {
        type: Date,
        required: [ true,'joining date is required' ]
    },
    previousexp: {
        type: Number,
        required: [ true,'previous exprience is required' ]
    },
    salary: {
        type: Number,
        required: [ true,'salary is required' ]
    },
    address: {
        type: String,
        required: [ true,'address is required' ]
    },
} )

const tastsModel = mongoose.model( 'tasks',tasksSchema )

module.exports = tastsModel