var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

var goalInit = mongoose.model('goals',{
    name:String,
    description:String,
    dueDate:String
},'goals');

let goals = [];

router.get('/getGoals', function(req, res, next){
    goalInit.find({}).then((response)=>
        res.status(200).json(response)
    ).catch((err)=>res.status(500).json(err));
})

router.post('/addGoal', function(req, res, next){
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        const goal = new goalInit(req.body);
        goal.save().then(() => 
            res.status(200).json({})
        ).catch((err)=> res.status(500).json(err))
    }else {
        res.status(400).json({});
    }
    
})


router.delete('/removeGoal/:id', function(req, res, next){
    if(req.params && req.params.id){
        let id = req.params.id;
        goalInit.deleteOne({_id:new mongoose.Types.ObjectId(id)}).then((response)=>{
            res.status(200).json(response);
        }).catch(err=>res.status(500).json(err));
    }else{
        res.status(400).json({});
    }

})

module.exports = router;