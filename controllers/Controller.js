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
  //.populate('name')
  .sort([['name', 'ascending']])
  .exec(function (err, list_studs) {
    if (err) { return next(err); }
    //Successful, so render
    res.render('stud_detail.ejs', { title: 'Student List', studentlist: list_studs });
  });

};



exports.stud_delete = function(req, res, next) {

    // Assume the post has valid id (ie no validation/sanitization).
          let id2 = req.params.id;
            Student.findByIdAndRemove(id2, function(err,Output) {
                if (err) { return next(err); }
                // Success - got to books list.
                //res.send(id2);
                res.redirect('/info/students');
            });

};

exports.stud_create_get = function(req, res) {
    res.render('stud_create.ejs',{title : 'Create Student'});


};

// Handle book create on POST.
exports.stud_create_post = [
    // Convert the genre to an array.

    // Validate fields.
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

        // Create a Book object with escaped and trimmed data.
        var student = new Student(
          { name: req.body.name,
            age: req.body.age,
            //summary: req.body.summary,
            //genre: req.body.genre
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
                res.render('stud_create.ejs', { title: 'Create Anime', student: student, errors: errors.array() });
                return;
          }
          else {
              // Data from form is valid. Save book.
              student.save(function (err) {
                  if (err) { return next(err); }
                     //successful - redirect to new book record.
                     res.redirect('/info/students');
                  });
          }

    }
];
