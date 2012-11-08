mui.provide('Mail');

Mail.Footer = {
	
	_initialized: false,
	
	_items: {
		leftColumn: [],
		centerColumn: [],
		rightColumn: []
	},
	
	_element: null,
	_leftColumnElement: null,
	_centerColumnElement: null,
	_rightColumnElement: null,
	
	initialize: function() {
		this._initialized = true;		
		
		this._element = mui.get('body > footer');
		this._leftColumnElement = mui.get('#footer-left', this._element);
		this._rightColumnElement = mui.get('#footer-right', this._element);
		this._centerColumnElement = mui.get('#footer-center', this._element);
		
		mui.on(this._element, 'click', this);
	},
	
	onClick: function(e) {
		var iconTarget = mui.getAncestorByClassName(e.target, 'icon');
		if(iconTarget) {
			var icon = iconTarget.getAttribute('type'),
			    i = 0, 
			    leftLen = this._items.leftColumn.length,
			    centerLen = this._items.centerColumn ? this._items.centerColumn.length : 0,
			    rightLen = this._items.rightColumn.length;
			
			for(i=0; i<leftLen; i++) {
				var item = this._items.leftColumn[i];
				if(item.icon === icon) {
					if(item.action) item.action();
					break;
				}
			}
			
			for(i=0; i<rightLen; i++) {
				var item = this._items.rightColumn[i];
				if(item.icon === icon) {
					if(item.action) item.action();
					break;
				}
			}
			
			for(i=0; i<centerLen; i++) {
				var item = this._items.centerColumn[i];
				if(item.icon === icon) {
					if(item.action) item.action();
					break;
				}
			}
		}
	},
	
	handleEvent: function(e) {
		switch(e.type) {
			case 'click':
				this.onClick(e);
				break;
		}
	},
	
	getIcon: function(type) {
		var el = mui.createElement('a', { className: 'icon '+type, type: type });
		return el;
	},

	setItems: function(items) {
		items = items || {};
		
		if(!this._initialized) this.initialize();
		
		this._items.leftColumn = items.leftColumn;
		this._items.centerColumn = items.centerColumn;
		this._items.rightColumn = items.rightColumn;
		
		this.setLeftColumnItems(items.leftColumn);
		this.setCenterColumnItems(items.centerColumn);
		this.setRightColumnItems(items.rightColumn);
	},
	
	setLeftColumnItems: function(items) {
		this._leftColumnElement.innerHTML = '';
		
		if(!items) return;
		
		mui.each(items, function(item) {
			var icon = this.getIcon(item.icon);
			this._leftColumnElement.appendChild(icon);
		}, this);
	},
	
	setRightColumnItems: function(items) {
		this._rightColumnElement.innerHTML = '';

		if(!items) return;
		
		mui.each(items, function(item) {
			var icon = this.getIcon(item.icon);
			this._rightColumnElement.appendChild(icon);
		}, this);
	},

	setCenterColumnItems: function(items) {
		this._centerColumnElement.innerHTML = '';

		if(!items || typeof items === 'string') mui.removeClass(this._element, 'center');
		else mui.addClass(this._element, 'center');

		if(!items) return;
		
		if(typeof items === 'string') {
			this._centerColumnElement.appendChild(mui.createElement(
				'div', {
					className: 'title',
					innerHTML: items
				}
			));
		} else {
			mui.each(items, function(item) {
				var icon = this.getIcon(item.icon);
				this._centerColumnElement.appendChild(icon);
			}, this);
		}
	},
	
	hide: function() {
		mui.setStyle('footer', 'display', 'none');
	},
	
	show: function() {
		mui.setStyle('footer', 'display', '');
	}

};