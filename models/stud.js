var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudSchema = new Schema(
  {
    name: {type: String, required: true},
    //author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
    age: {type: String, required: true},
    //isbn: {type: String, required: true},
    //genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
  }
);

// Virtual for book's URL
StudSchema
.virtual('url')
.get(function () {
  return '/info/stud/' + this._id;
});

//Export model
module.exports = mongoose.model('Stud', StudSchema);
