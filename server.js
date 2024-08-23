// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     response.write('Hello World')

//     return response.end()
// })

// server.listen(3333)

//import { DatabaseMemory } from "./database-memory.js";
import { fastify } from "fastify";
import { DatabasePostgres } from "./database-prostgres.js";

const server = fastify()

//const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {
    const {title, description, duration} = request.body

    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send() // Resposta com sucesso
})

server.get('/videos',  async (request) => {
    const search = request.query.search

    console.log(search)


    const videos = await database.list(search) //Querye Parameters

    console.log(videos)

    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send() //204 - Resposta com sucesso, mas sem conteúdo
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)
    
    return reply.status(204).send() //204 - Resposta com sucesso, maas sem conteúdo
})


server.listen({
    port: process.env.port ?? 3333,
})