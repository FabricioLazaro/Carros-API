const carModel = require('../models/carModel');

exports.getAllCars = (req, res) => {
  res.json(carModel.getCars());
};

exports.getCarById = (req, res) => {
  const car = carModel.getCarById(req.params.id);
  if (car) {
    res.json(car);
  } else {
    res.status(404).send('Carro não encontrado');
  }
};

exports.createCar = (req, res) => {
  const newCar = carModel.createCar(req.body);
  res.status(201).json(newCar);
};

exports.updateCar = (req, res) => {
  const updatedCar = carModel.updateCar(req.params.id, req.body);
  if (updatedCar) {
    res.json(updatedCar);
  } else {
    res.status(404).send('Carro não encontrado');
  }
};

exports.deleteCar = (req, res) => {
  const success = carModel.deleteCar(req.params.id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).send('Carro não encontrado');
  }
};