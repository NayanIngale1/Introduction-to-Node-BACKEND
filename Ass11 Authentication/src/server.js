const res = require('express/lib/response');


const app = require('./index');

const connect = require('./configs/db')



app.listen(8000, async () =>{
    try {
        await connect();
        console.log('Listening on port 8000');
    } catch (error) {
        console.log('error:', error)
        res.status(500).send({message: error.message})
        
    }
})