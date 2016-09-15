var users = {
 
  getAll: function(req, res) {
    var allUsers = data; // Spoof a DB call
    res.json(allUsers);
  },
 
  getOne: function(req, res) {
    var id = req.params.id;
    var user = data[id]; // Spoof a DB call
    res.json(user);
  },
 
  create: function(req, res) {
    var newUser = req.body;
    data.push(newUser); // Spoof a DB call
    res.json(newUser);
  },
 
  update: function(req, res) {
    var updateUser = req.body;
    var id = req.params.id;
    data[id] = updateUser // Spoof a DB call
    res.json(updateUser);
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};
 
var data = [{
  name: 'user 1',
  id: '1'
}, {
  name: 'user 2',
  id: '2'
}, {
  name: 'user 3',
  id: '3'
}];
 
module.exports = users;