var testsuites = {
 
  getAll: function(req, res) {
    var allTestsuites = data; // Spoof a DB call
    res.json(allTestsuites);
  },
 
  getOne: function(req, res) {
    var id = req.params.id;
    var testcase = data[id]; // Spoof a DB call
    res.json(testcase);
  },
 
  create: function(req, res) {
    var newTestsuites = req.body;
    data.push(newTestsuites); // Spoof a DB call
    res.json(newTestsuites);
  },
 
  update: function(req, res) {
    var updateTestsuites = req.body;
    var id = req.params.id;
    data[id] = updateTestsuites // Spoof a DB call
    res.json(updateTestsuites);
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};
 
var data = [{
  name: 'Testsuite 1',
  id: '1'
}, {
  name: 'Testsuite 2',
  id: '2'
}, {
  name: 'Testsuite 3',
  id: '3'
}];
 
module.exports = testsuites;
