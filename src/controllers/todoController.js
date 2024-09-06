const { Query } = require("mongoose")
const TodoModel= require('../models/todoModel')
var jwt= require("jsonwebtoken")



// create todo
exports.createTodo= async(req, res)=>{
    try{
        const reqBody= req.body
        reqBody.email= req.headers.email
        const todo= await TodoModel.create(reqBody)
        res.status(200).json({
            status:'success',
            data: todo
        })
    }
    catch(error){
        res.status(500).json({
            status:'failed',
            data: error.message
        })
    }
}
// create todo end




// update todo
exports.updateTodo= async(req, res)=> {
    try{
        let id= req.params.id
        let status= req.params.status
        let query= {_id:id}
        const todo= await TodoModel.updateOne(
            query, 
            {status: status}
        )
        res.status(200).json({
            status:'success',
            data: todo
        })
    }
    catch(error){
        res.status(500).json({
            status:'failed',
            data: error.message
        })
    }
}

// update todo end


// delete todo


exports.deleteTodo= async(req, res)=>{

    try{
        let id= req.params.id
        let query= { _id:id}
        const todo= await TodoModel.deleteOne(query)
        res.status(200).json({
            status:'success',
            data: todo
        })
    }
    catch(error){
        res.status(500).json({
            status:'failed',
            data: error.message
        })
    }
}
// delete todo end

// todolist
exports.todoList= async (req, res)=>{
    try{
        let status= req.params.status
        let email= req.headers.email
        const result= await TodoModel.aggregate(
            [
                {$match: {email:email}},
                {$project: 
                    {_id:1, 
                        title:1, 
                        description:1, 
                        status:1, 
                        createdDate: 
                        {$dateToString:{
                            format:"%d-%m-%Y",
                            date:"$createdDate"}
                        },
                    }}
            ]
        )
        res.status(200).json({
            status:"success", 
            data:result})
    }
    catch(error){
        res.status(500).json({
            status:'failed',
            data: error.message
        })
    }
}
// todolist end


// todocount
exports.todoCount= async(req,res)=>{
    try{
        let email= req.headers.email
        const result= await TodoModel.aggregate(
            [
                {$match: {email:email}},
                {$group:{_id:"status", total:{$count:{}}}}
            ]
        )
        res.status(200).json({
            status:"success", 
            data:result})
    }
    catch(error){
        res.status(500).json({
            status:'failed',
            data: error.message
        })
    }
}
// todocount end