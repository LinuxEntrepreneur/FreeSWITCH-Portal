var App = Ember.Application.create({
	LOG_TRANSITIONS: true,
	rootElement: $('#container'),
	total: 0,
	ready: function(){
	}
});

App.CallsRoute = Ember.Route.extend({
	setupController: function(controller) {
		// Set the IndexController's `title`
		// controller.set('title', "My App");
		// alert("a")
		console.log("callsRoute");
  	}//,
  	// renderTemplate: function() {
	// this.render('calls');
  	// }
});

App.ChannelsRoute = Ember.Route.extend({
	setupController: function(controller) {
		// Set the IndexController's `title`
		// controller.set('title', "My App");
		// alert("a")
		console.log("callsRoute");
  	}//,
  	// renderTemplate: function() {
		// this.render('calls');
  	// }
});

App.Router.map(function() {
	this.route("calls");
	this.route("channels");
	this.route("about", { path: "/about" });
});

App.Call = Em.Object.extend({
	uuid: null,
	cidName: null,
	cidNumber: null

});

App.Channel = Em.Object.extend({
	uuid: null,
	cidName: null,
	cidNumber: null

});

App.callsController = Ember.ArrayController.create({
	content: [],
	init: function(){
	},
	load: function() {
		var me = this;
		$.getJSON("/api/show?calls%20as%20json", function(data){
			  // var channels = JSON.parse(data);
			console.log(data.row_count);
			me.set('total', data.row_count);
			me.content.clear();
			if (data.row_count == 0) return;

			// me.pushObjects(data.rows);
			data.rows.forEach(function(r) {
				me.pushObject(App.Call.create(r));
			});

		});
	},
	dump: function(uuid) {
		var obj = this.content.findProperty("uuid", uuid);
		console.log(obj.getProperties(["uuid", "cid_num"]));
	}
});

App.channelsController = Ember.ArrayController.create({
	content: [],
	init: function(){
	},
	load: function() {
		var me = this;
		$.getJSON("/api/show?channels%20as%20json", function(data){
			  // var channels = JSON.parse(data);
		 	console.log(data.row_count);
			me.set('total', data.row_count);
			me.content.clear();
			if (data.row_count == 0) return;
			data.rows.forEach(function(row) {
				me.pushObject(App.Channel.create(row));
		 	});

		});
	},
	delete: function(uuid) {
		var obj = this.content.findProperty("uuid", uuid);
		if (obj) this.content.removeObject(obj);// else alert(uuid);
	},
	dump: function(uuid) {
		var obj = this.content.findProperty("uuid", uuid);
		console.log(obj.getProperties(["uuid", "cid_num"]));
	}

});



App.initialize();

// App.callsController.load();


