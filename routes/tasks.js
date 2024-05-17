var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { response } = require('../app');

var taskInit = mongoose.model('tasks',{
    name:String,
    description:String,
    dueDate:String
},'tasks');

let tasks = [];

router.get('/getTasks', function(req, res, next){
    taskInit.find({}).then((response)=>
        res.status(200).json(response)
    ).catch((err)=>res.status(500).json(err));
});

router.post('/addTask', function(req, res, next){
    let timestamp = Date.now() + Math.random();
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        const task = new taskInit(req.body);
        task.save().then(() => 
            res.status(200).json({})
        ).catch((err)=> res.status(500).json(err))
    }else{
        res.status(400).json({});
    }

})


router.delete('/removeTask/:id', function(req, res, next){
    if(req.params && req.params.id){
        let id = req.params.id;
        taskInit.deleteOne({_id:new mongoose.Types.ObjectId(id)}).then((response)=>{
            res.status(200).json(response);
        }).catch(err=>res.status(500).json(err));

    }else{
        res.status(400).json({});
    }

})

module.exports = router;