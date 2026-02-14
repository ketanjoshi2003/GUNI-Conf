const mongoose = require('mongoose');

const conferenceSchema = new mongoose.Schema({
  conference_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  short_name: { type: String },
  year: { type: String },
  edition: { type: String },
  mode: { type: String },
  description: { type: String },
  venue: { type: String },
  state: { type: String },
  country: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
  website: { type: String },
  author_page: { type: String }
});

module.exports = mongoose.model('Conference', conferenceSchema);
