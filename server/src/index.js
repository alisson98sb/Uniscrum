import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const app = express();

// Middleware para habilitar o CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type'], // Cabeçalhos permitidos
}));

app.use(express.json());

const port = 3000;


app.post('/usuarios', async (req, res) => {
    await prisma.user2.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body);
});

app.get('/usuarios', async (req, res) => {
    const data = await prisma.user2.findMany();
    res.send(data);
});

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user2.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(201).json({message: 'Usuario deletado com sucesso'});
});






//sprint
app.post('/sprints', async (req, res) => {
    try {
        const newSprint = await prisma.sprint.create({
            data: {
                codigoSprint: req.body.codigoSprint,
                nome: req.body.nome,
                dataCriacao: new Date(req.body.dataCriacao),
                objetivo: req.body.objetivo,
                timeBoxed: req.body.timeBoxed,
                notaAtividades: req.body.notaAtividades,
                notaDefinicaoDoEscopo: req.body.notaDefinicaoDoEscopo,
                notaEquipe: req.body.notaEquipe,
                notaComunicacao: req.body.notaComunicacao,
                notaEntregas: req.body.notaEntregas,
            },
        });
        res.status(201).json(newSprint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/dailies', async (req, res) => {
    try {
        const newDaily = await prisma.daily.create({
            data: {
                nome: req.body.nome,
                data: new Date(req.body.data),
                avaliacao: req.body.avaliacao,
                observacao: req.body.observacao,
                sprintCodigo: req.body.sprintCodigo,  // Deve corresponder ao codigoSprint da Sprint
            },
        });
        res.status(201).json(newDaily);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});