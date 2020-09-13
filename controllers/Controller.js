var Student = require('../models/stud');

var async= require('async')

const {body,validationResult} = require('express-validator/check')
const {sanitizeBody} = require('express-validator/filter')

exports.login = function(req, res) {
      res.render('login.ejs');
};
exports.index = function(req, res, next) {
     res.render('index.ejs');
  };


exports.stud_list = function(req, res, next) {

  Student.find()
  .sort([['name', 'ascending']])
  .exec(function (err, list_studs) {
    if (err) { return next(err); }
    //Successful, so render
    res.render('stud_detail.ejs', { title: 'Student List', studentlist: list_studs });
  });

};



exports.stud_delete = function(req, res, next) {

          let id2 = req.params.id;
            Student.findByIdAndRemove(id2, function(err,Output) {
                if (err) { return next(err); }
                res.redirect('/info/students');
            });

};

exports.stud_create_get = function(req, res) {
    res.render('stud_create.ejs',{title : 'Create Student'});
};


exports.stud_create_post = [
    body('name', 'Name must not be empty.').trim().isLength({ min: 1 }),
    body('age', 'Age must not be empty.').trim().isLength({ min: 1 }),
    //body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }),
    //body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }),

    // Sanitize fields (using wildcard).
    sanitizeBody('*').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        
        var student = new Student(
          { name: req.body.name,
            age: req.body.age;
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
                res.render('stud_create.ejs', { title: 'Create Anime', student: student, errors: errors.array() });
                return;
          }
          else {
              // Data from form is valid. Save Student.
              student.save(function (err) {
                  if (err) { return next(err); }                     
                     res.redirect('/info/students');
                  });
          }

    }
];
