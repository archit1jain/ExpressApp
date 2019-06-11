const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const members = require('./Members.js')
const logger = require('./middleware/logger')
const app = express();


//handlebars middlewares
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.get('/',(req,res) => res.render('index',{
    title: 'Member App',members
}));
//middleware
/*
const logger = (req,res,next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`); //The address that is hit.

    next();
};
*/
//init middleware
app.use(logger);
/*
app.get('/', (req,res) => {
    res.send('<h1> Hello World ! </h1>');
});
*/
/*
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});
*/
/*
//get all members
app.get('/api/members', (req,res) => {
    res.json(members);  
});

//get a single member
app.get('/api/members/:id',(req,res) =>{
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

*/

//body parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));


//set a static folder
app.use(express.static(path.join(__dirname,'public')));
// 
app.use('/api/members',require('./routes/api/members'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));


