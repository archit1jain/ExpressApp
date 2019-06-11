const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members.js')

//get all members
router.get('/', (req,res) => {
    res.json(members);  
});

//get a single member
router.get('/:id',(req,res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    //res.send(req.params.id);
    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else{
        res.status(404).json({
            msg: `No member is found with id: ${req.params.id}`
        });
    } 

})


//create member
router.post('/',(req,res) => {
    //res.send(req.body); We have to create a new member
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "Active"
    };
    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg: "Please include a name or email"});
    }
    members.push(newMember);
    //res.json(members);
    res.redirect('/');
});

//update member
router.put('/:id',(req,res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        const updMember = req.body;
        members.forEach(member=> {
            console.log("found");
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({msg: "Member Updated",member});
            }
        });
        
    } else {
        res.status(404).json({
            msg: `No member is found with id: ${req.params.id}`
        });
    } 

})

//delete a member
router.delete('/:id',(req,res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    //res.send(req.params.id);
    if(found) {
        res.json({
            msg: "Member Deleted",
            members: members.filter(member => member.id !== parseInt(req.params.id))
        })
        
    }
    else{
        res.status(404).json({
            msg: `No member is found with id: ${req.params.id}`
        });
    } 

})

module.exports = router;
