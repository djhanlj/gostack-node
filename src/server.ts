import express, { request, response } from 'express';
import routes from './routes';

import 'reflect-metadata'
import './database'

const app = express();

app.use(express.json());
app.use(routes)

app.get('/', (request, response) => {
    return response.json({message: "hello word go djair"})
})

app.post('/users', (request, response) => {
    const { name, email } = request.body;

    const user = {
        name,
        email,
    };

    return response.json(user);

})


app.listen(3333, ()=>{
    console.log(' server started on port 3333!')

})
