var Problem = require('../models/problem');

exports.postProblems = function (req, res) {
    var problem = new Problem();
    problem.name = req.body.name;
    problem.description = req.body.description;
    problem.save(function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(201).json(problem);
    });
};

exports.getProblems = function (req, res) {
    Problem.find({}, function (err, problems) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(problems);
    });
};

exports.getProblem = function (req, res) {
    Problem.find({_id: req.params.problem_id}, function (err, problem) {
        if (err)
            res.status(400).json(err);
        else if (!problem)
            res.status(404).end();
        else
            res.status(200).json(problem);
    });
};

exports.putProblem = function (req, res) {
    Problem.update({
        _id: req.params.problem_id
    }, {name: req.body.name}, function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

exports.deleteProblem = function (req, res) {
    Problem.remove({_id: req.params.problem_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};