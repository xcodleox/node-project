const express = require('express')
const cors = require('cors')
const port = 3001
const app = express()
app.use(express.json()) /* usar esse use sempre quando for utilizar body antigo */
app.use(cors())
const uuid = require('uuid')


const users = []

const checkUserId = (request, response, next) =>{
    const { id } = request.params

    const index = users.findIndex(pedido => pedido.id === id) // localizar em qual posição do nosso array esta o usuario

    if( index < 0){
        return response.status(404).json({message: "Pedido não encontrado"})
    }

    request.userIndex = index  //consigo pegar a informação dentro do put
    next()
}

app.get('/users', (request, response) => {
    console.log('Fui chamado pela rota')
    return response.json(users)

})

app.post('/users',  (request, response) => {
const {name, age} = request.body

const tabela = {id:uuid.v4(), name, age}

users.push(tabela)

    return response.status(201).json(users)

})

app.put('/users/:id', checkUserId, (request, response) => {
// const { id } = request.params // é aonde eu pego meu ID -  request.params
const {name, age} = request.body // estou pegando as informações do usuario
const updateUser = {id:uuid.v4(), name, age} // meu usuario atualizado.
const index = request.userIndex
    
   // const index = users.findIndex(user => user.id === id) // localizar em qual posição do nosso array esta o usuario

    /*if( index < 0){
        return response.status(404).json({message: "Usuario não encontrado"})
    }*/
    users[index] = updateUser // index= possição do usuario,. updtadeuser é a atualização do usuario.


return response.json(updateUser) // mostra em tela a atualização


})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex
    users.splice(index,1)

    return response.status(204).json()

})

app.patch('/users:id', checkUserId, (request, response) => {
   request.params.statusk
})






















app.listen(port, () => {
    console.log(`Serve Started on ${port}`)
})