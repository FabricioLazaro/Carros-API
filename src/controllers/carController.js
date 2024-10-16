const { error } = require('winston');
const carModel = require('../models/carModel');
const { Marcas, Cars } = require('../models/carModel');

exports.getAllCars = (req, res) => {
  res.json(carModel.getCars());
};

exports.getCarById = (req, res) => {
  const carId = parseInt(req.params.id);

  
  const carro = carModel.Cars.find(v => v.Id === carId);

  if (!carro) {
    return res.status(404).json({ error: "Carro não encontrado" });
  }

  
  res.json(carro);
};

exports.createCar = (req, res, next) => {
  const { Marca, Modelo, Ano } = req.body;

    if (!Marca || !Modelo || !Ano || !parseInt(Ano)) {
        const error = new Error('Por favor, forneca todas as informacoes do carro!');
        error.name = 'ValidationError';
        next(error)
    }

    if (typeof Marca === "string" && !Marcas.includes(Marca)) {
        return res.status(400).send("Preencha o campo corretamente!50");
    }

    
    const novoId = Cars.length > 0 ? Cars[Cars.length - 1].Id + 1 : 1;
    const novoCarro = { Id: novoId, Marca, Modelo, Ano };
    Cars.push(novoCarro);
    res.status(201).send('Carro cadastrado com sucesso!');
};

exports.updateCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const updatedCar = carModel.Cars.find(v => v.Id === Number(carId))

    if (updatedCar) {
      Object.assign(updatedCar, req.body);
      return res.json(updatedCar);
    } else {
      return res.status(404).send('Carro não encontrado');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro ao atualizar o carro');
  }
};

exports.deleteCar = (req, res) => {

  

  const indexCar = carModel.Cars.findIndex(v => v.Id === Number(req.params.id));

  if (indexCar === -1) {
    // Car not found
    return res.status(404).json({ message: 'Por favor, colocar o id correto do carro!' });
  }
  
  carModel.Cars.splice(indexCar, 1)
  
  
  
  return res.status(202).json({ message: 'Carro deletado!' });
  
  
  
  
  
};