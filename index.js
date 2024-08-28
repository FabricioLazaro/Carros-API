const express = require('express');

const app = express();

const port = 3000;

app.use(express.json())

app.use(function (req, res, next) {
    // console.log('Time:', Date.now());
    console.log("Caiu aqui!")
    next();
});

var Carros = [
    {Id: 1, Marca: "Mercedes", Modelo: "Amg-Gt", Ano: "2015/2016"},
    {Id: 2, Marca: "Audi", Modelo: "TT", Ano: "2016"},
    {Id: 3, Marca: "Porshe", Modelo: "Taycan", Ano: "2021"},
    {Id: 4, Marca: "Ferrari", Modelo: "LaFerrari", Ano: "2013"}
    
]

const Marcas = [
    "BMW",
    "Mercedes",
    "Jaguar",
    "Mclaren",
    "Bugatti"
]

function CarrosId (id){
    return Carros.filter( Carros => Carros.Id == id)
}

function CarrosIndex(id){
    return Carros.findIndex( Carros => Carros.Id == id)
}

app.get('/Carros', (req, res) => {
    res.status(200).send(Carros)
})

app.get('/Carros/:id', (req, res) => {
    res.json(CarrosId(req.params.id))
})

app.listen(port, () => {
    console.log(`servidor rodando no endereço http://localhost:${port}`)
})

app.post('/Carros', (req, res) => {
    console.log("Caiu aqui 2!")
    console.log("condicao ", Marcas.includes(req.body.Marca))
    console.log(req.body)
    if(!req.body.Marca || !req.body.Modelo || !req.body.Ano || !parseInt(req.body.Ano)){ return res.status(400).send("Preencha o campo corretamente!49")}

    if(typeof req.body.Marca === "string" && !Marcas.includes(req.body.Marca)){return res.status(400).send("Preencha o campo corretamente!50")}

    Carros.push(req.body)
    res.status(201).send('Carro cadastrado com sucesso!')
})

app.delete('/Carros/:id', (req, res) => {
    let index = CarrosIndex(req.params.id)
    Carros.splice(index, 1)
    res.send(`Carro com o id: ${req.params.id} excluido com sucesso!`)
})

app.put('/Carros/:id', (req, res) => {

    console.log(req.body)

    if(!req.body.Marca || !req.body.Modelo || !req.body.Ano || !parseInt(req.body.Ano)){ return res.status(400).send("Preencha o campo corretamente!")}

    if(typeof !req.body.Marca === "string" && !Marcas.includes(req.body.Marca)){ return res.status(400).send("Preencha o campo corretamente!")}

    console.log("condicao", Marcas.includes(req.body.Marca))

    let index = CarrosIndex(req.params.id)

    if (typeof Carros[index] == 'undefined') { return res.status(404).send("Id nao encontrado!")}
    else { Carros[index].Marca = req.body.Marca 
    Carros[index].Modelo = req.body.Modelo
    Carros[index].Ano = req.body.Ano}
    res.status(201).json(Carros)

})