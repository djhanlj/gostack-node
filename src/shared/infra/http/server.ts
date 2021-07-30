import 'reflect-metadata'
import express, { request, response } from 'express';
import routes from '@shared/infra/http/routes';
import uploadConfig from '@config/upload';
import cors from 'cors';

import '@shared/infra/typeorm'
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
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
