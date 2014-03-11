(function ($, undefined) {
	'use strict';
	
	/**
		* Creates an instance of Lightbox.
		*
		* @constructor
		* @this {Lightbox}
		* @param {object} $container The container.
		* @param {object} opts Options.
	*/
	var Lightbox = function ($container, opts) {
		if (!this instanceof Lightbox) { return new Lightbox($container, opts); }
		var _this = this; 
		
		opts = opts || {};
		_this.$container = $($container);
		
		_this.cfg = opts = {
			$trigger: (typeof opts.$trigger === 'object') ? opts.$trigger : null,
			$content: (typeof opts.$content === 'object') ? opts.$content : _this.$container,
			activeClass: (typeof opts.activeClass === 'string') ? opts.activeClass : 'open',
			centered: (typeof opts.centered === 'boolean') ? opts.centered : false,
			duration: (typeof opts.duration === 'number') ? opts.duration : 200,
			onBeforeOpen: (typeof opts.onBeforeOpen === 'function') ? opts.onBeforeOpen : function () {},
			onOpen: (typeof opts.onOpen === 'function') ? opts.onOpen : function () {},
			onBeforeClose: (typeof opts.onBeforeClose === 'function') ? opts.onBeforeClose : function () {},
			onClose: (typeof opts.onClose === 'function') ? opts.onClose : function () {}
		};
	};
	Lightbox.prototype = {
		init: function () {
			var _this = this,
				cfg = _this.cfg;
			if (cfg.$trigger) {
				cfg.$trigger.on('click', function (ev) {
					ev.stopPropagation();
					if (_this.$container.hasClass(cfg.activeClass)) {
						_this.close();
					} else {
						_this.open();
					}
				});
			}
			$(window).on('click', function () {
				_this.close();
			});
			_this.$container.on('click', function (ev) { ev.stopPropagation(); });
			_this.$container.find('.close').on('click', function (ev) {
				ev.stopPropagation();
				_this.close();
			});
		},
		open: function () {
			var _this = this,
				cfg = _this.cfg;
			cfg.onBeforeOpen();
			if (cfg.centered) { _this.$container.center(); }
			_this.$container.fadeIn(cfg.duration, function () {
				cfg.onOpen();
				$(this).addClass(cfg.activeClass);
			});
		},
		close: function () {
			var _this = this,
				cfg = _this.cfg;
			cfg.onBeforeClose();
			_this.$container.fadeOut(cfg.duration, function () {
				cfg.onClose();
				$(this).removeClass(cfg.activeClass);
			});
		}
	};
	
	window.Lightbox = Lightbox;
	
}(window.jQuery));