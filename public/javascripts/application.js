// Generated by CoffeeScript 1.3.3
(function() {

  $(function() {
    var ButtonView, MainView, app_router, button_view, main_view;
    window.App = {};
    App.Router = Backbone.Router.extend({
      routes: {
        "*method": "methodChange"
      }
    });
    app_router = new App.Router;
    app_router.on('route:methodChange', function(method) {
      return $("[role=io-view]").trigger("methodChange", [method]);
    });
    Backbone.history.start();
    MainView = Backbone.View.extend({
      inputField: null,
      outputField: null,
      method: null,
      events: {
        "input [role=input]": "renderOutput",
        "methodChange": "onMethodChange"
      },
      initialize: function() {
        this.method = "decode";
        this.input = $("[role=input]");
        return this.output = $("[role=output]");
      },
      renderOutput: function() {
        var parsedValue;
        parsedValue = this.method === "decode" ? Url.decode(this.input.val()) : Url.encode(this.input.val());
        return this.output.val(parsedValue);
      },
      onMethodChange: function(event, data) {
        return this.method = data;
      }
    });
    main_view = new MainView({
      el: $("[role=io-view]")
    });
    ButtonView = Backbone.View.extend({
      elements: null,
      events: {
        "click .button": "onClick"
      },
      initialize: function() {
        return this.elements = this.$(".button");
      },
      onClick: function(event) {
        this.elements.removeClass("active");
        $(event.target).addClass("active");
        return $("[role=input]").trigger("input");
      }
    });
    button_view = new ButtonView({
      el: $(".method-select")
    });
    $("[role=output]").click(function(event) {
      return $(event.target).select();
    });
    return $('[role=copy-to-clipboard]').zclip({
      path: '/swfs/zero-clipboard.swf',
      copy: function() {
        return $("[role=output]").val();
      }
    });
  });

}).call(this);
