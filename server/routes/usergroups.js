var userGroups = {
 
  getAll: function(req, res) {
    var allUserGroups = data; // Spoof a DB call
    res.json(allUserGroups);
  },
 
  getOne: function(req, res) {
    var id = req.params.id;
    var userGroup = data[id]; // Spoof a DB call
    res.json(userGroup);
  },
 
  create: function(req, res) {
    var newUserGroup = req.body;
    data.push(newUserGroup); // Spoof a DB call
    res.json(newUserGroup);
  },
 
  update: function(req, res) {
    var updateUserGroup = req.body;
    var id = req.params.id;
    data[id] = updateUserGroup // Spoof a DB call
    res.json(updateUserGroup);
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};
 
var data = [{
  name: 'User Group 1',
  id: '1'
}, {
  name: 'User Group 2',
  id: '2'
}, {
  name: 'User Group 3',
  id: '3'
}];
 
module.exports = userGroups;