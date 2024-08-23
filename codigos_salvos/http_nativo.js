//Não é um módulo, não funciona, só pra salvar

import { createServer } from 'node:http'

const server = createServer((request, response) => {
    response.write('Hello World!')

    return response.end()
})

server.listen(3334)