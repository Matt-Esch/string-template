var test = require("tape");

var format = require('../index');
var custom = require('../custom');



test("Setting identical open/close tags leads to no action", function (assert) {
  var config = custom.config();
  custom.setOpenCloseTags( "<==", "<==" );
  var newConfig = custom.config();
  assert.equal( config.nargs, newConfig.nargs );
  assert.equal( config.opTag, newConfig.opTag );
  assert.equal( config.clTag, newConfig.clTag );

  assert.end();
});


test("Changing open/close tags works", function (assert) {
   var objs = {
       name: "Nicolas",
       age: "31",
       city: "Paris" };

   custom.setOpenCloseTags( "{", "}" );
   var result = format( "Hello {name}, I hear you come from {{city}}?", objs );
   assert.equal(result, "Hello Nicolas, I hear you come from {city}?");

   custom.setOpenCloseTags( "{{", "}}" );
   result = format( "Hello {name}, I hear you come from {{city}}?", objs );
   assert.equal(result, "Hello {name}, I hear you come from Paris?");

   custom.setOpenCloseTags( "<%=", "%>" );
   result = format( "Hello {name}, I hear you come from {{city}}?", objs );
   assert.equal(result, "Hello {name}, I hear you come from {{city}}?");

   // restoring standard open/close tags for following tests
   custom.setOpenCloseTags( "{", "}" );

   assert.end();
});

