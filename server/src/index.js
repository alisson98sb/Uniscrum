import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const app = express();
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
    
    res.send("Hello Worldd");
})

app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password
        }
    })
    res.status(201).json(req.body);
});

app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            username: req.body.username,
            password: req.body.password
        }
    })
    res.status(201).json(req.body);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});