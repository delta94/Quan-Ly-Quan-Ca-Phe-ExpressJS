//Import Controllers
const errorController = require('./error.controller');

//Import Databases
const khuyenmaiDatabase = require('../databases/khuyenmai.database');

module.exports.get = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = await khuyenmaiDatabase.get(input);
        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.post = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = await khuyenmaiDatabase.post(input);
        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.put = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = await khuyenmaiDatabase.put(input);
        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.patch = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = await khuyenmaiDatabase.patch(input);
        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.delete = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = await khuyenmaiDatabase.delete(input);
        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};

module.exports.exists = async function (request, response, next) {
    try {
        request.headers.accept = 'application/json';
        let input = request.body;
        let output = await khuyenmaiDatabase.exists(input);
        response.json(output);
        next();
    } catch (error) {
        errorController.handle500(error, request, response, next);
    }
};
