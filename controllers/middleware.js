var name = {"name": "Donovan Hiland"};
var location = {"location": "Provo"};
var occupations = {"occupations": ["student", "ortho", "noob", "popo"]};
var hobbies = [{
  "name": "hobby1",
  "type": "current"
  },
  {
  "name": "hobby2",
  "type": "past"
  },
  {
    "name": "hobby3",
    "type": "past"
  }
];
var skills = {"skills": [
    {
      "id": 1,
      "name": "Javascript",
      "experience": "Intermediate"
    },
    {
      "id": 2,
      "name": "CSS3",
      "experience": "Expert"
    }
]};

module.exports = {
  addHeaders: function(req, res, next) {
    res.status(200).set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'X-XSS-Protection': '1; mode=block',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "default-src 'self' devmountain.github.io"
    });

    next();
  },

  getName: function(req, res, next) {
    res.status(200).json(name.name);
  },

  getLocation: function(req, res, next) {
    res.status(200).json(location.location);
  },

  getOccupations: function(req, res, next) {
    console.log(req.query.order);
    if(req.query.order === 'desc') {
      res.status(200).json(occupations.sort().reverse());
    }
    if(req.query.order === 'asc') {
      res.status(200).json(occupations.sort());
    }
    else {
      res.status(200).json(occupations);
    }
  },

  getLatestOccupation: function(req, res, next) {
    var latestOccupation = occupations.pop();
    res.status(200).json(latestOccupation);
  },

  getHobbies: function(req, res, next) {
    res.status(200).json(hobbies);
  },

  getHobbiesByType: function(req, res, next) {
    console.log(req.params);
    console.log(req.query);
    var type = req.params.type;
    var filteredHobbies = [];
    for(var i = 0; i < hobbies.length; i++) {
      if(hobbies[i].type === type) {
        filteredHobbies.push(hobbies[i]);
      }
    }
    res.status(200).json(filteredHobbies);
  },

  getSkills: function(req, res, next) {
    var experience = req.query.experience;
    var filteredSkills = [];
    var result;
    if(experience) {
      for(var i = 0; i < skills.skills.length; i++) {
        if(skills.skills[i].experience === experience) {
          filteredSkills.push(skills.skills[i]);
        }
      }
      res.status(200).json(filteredSkills);
    }
    else {
      res.status(200).json(skills);
    }
  },

  updateName: function(req, res, next) {
    name = req.body;
    res.status(200).json(name);
  },

  updateLocation: function(req, res, next) {
    location = req.body;
    res.status(200).json(location);
  },

  createHobbies: function(req, res, next) {
    hobbies.hobbies.push(req.body);
  },

  createOccupations: function(req, res, next) {
    occupations.occupations.push(req.body);
  },

  createSkills: function(req, res, next) {
    console.log(req.body);
    skills.skills.push(req.body);
    res.status(200).json(skills);
  }
};
