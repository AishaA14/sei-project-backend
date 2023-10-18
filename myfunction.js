
import { 
    getFruits, 
    listFruits, 
    getFruitsById, 
    getParameciaFruits, 
    getLogiaFruits, 
    getZoanFruits, 
    addReview, 
    getFruitReview, 
    getUserLogin
  } from './myfunction'; 

  module.exports = (req, res) => {
    const { query, method } = req;
  
    if (method === 'GET' && query.action === 'getFruits') {
      return getFruits(req, res);
    } else if (method === 'GET' && query.action === 'listFruits') {
      return listFruits(req, res);
    } else if (method === 'GET' && query.action === 'getFruitsById') {
      return getFruitsById(req, res);
    } else if (method === 'GET' && query.action === 'getParameciaFruits') {
      return getParameciaFruits(req, res);
    } else if (method === 'GET' && query.action === 'getLogiaFruits') {
      return getLogiaFruits(req, res);
    } else if (method === 'GET' && query.action === 'getZoanFruits') {
      return getZoanFruits(req, res);
    } else if (method === 'POST' && query.action === 'addReview') {
      return addReview(req, res);
    } else if (method === 'GET' && query.action === 'getFruitReview') {
      return getFruitReview(req, res);
    } else if (method === 'POST' && query.action === 'getUserLogin') {
      return getUserLogin(req, res);
    } else {
      res.status(404).end();
    }
  };
  