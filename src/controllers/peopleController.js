// Import people model
let PeopleModel = require('../models/peopleModel');


// Handle index actions
exports.get = function (req, res) {
    PeopleModel.get(function (err, people) {
        if (err) {
            return res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "People retrieved successfully",
            data: people
        });
    });
};


// Handle create people actions
exports.post = function (req, res) {
    let person = new PeopleModel();

    person.name = req.body.name ? req.body.name : person.name;
    person.gender = req.body.gender;
    person.email = req.body.email;
    person.phone = req.body.phone;
    person.groups = req.body.groups;

    // save the people and check for errors
    person.save(function (err) {
        if (err)
            return res.send(err);
        res.json({
            message: 'New person created!',
            data: person
        });
    });
};


// Handle view people info
exports.getById = function (req, res) {
    PeopleModel.findById(req.params.id, function (err, people) {
        if (err)
            return res.send(err);
        res.json({
            message: 'Person retrieved successfully',
            data: people
        });
    });
};


// Handle update people info
exports.put = function (req, res) {
    PeopleModel.findById(req.params.id, function (err, person) {
        if (err) {
            return res.send(err);
        }
        if(!person) {
            return res.json({
                message: 'Person does not exist'
            });
        }

        person.name = req.body.name ? req.body.name : person.name;
        person.gender = req.body.gender;
        person.email = req.body.email ? req.body.email : person.email;
        person.phone = req.body.phone;
        person.groups = req.body.groups;

        // save the people and check for errors
        person.save(function (err) {
            if (err)
                return res.json(err);
            res.json({
                message: 'People Info updated',
                data: person
            });
        });
    });
};


// Handle delete people
exports.delete = function (req, res) {
    PeopleModel.remove({
        _id: req.params.id
    }, function (err, people) {
        if (err)
            return res.send(err);
        res.json({
            status: "success",
            message: 'People deleted'
        });
    });
};