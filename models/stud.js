var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudSchema = new Schema(
  {
    name: {type: String, required: true};
    age: {type: String, required: true},
    }
);

// Virtual for student's URL
StudSchema
.virtual('url')
.get(function () {
  return '/info/students/' + this._id;
});

//Export model
module.exports = mongoose.model('Stud', StudSchema);
