(function() {
	
function Popover(config)
{
	this.element = config.element || mui.createElement('div', { className: 'mui-popover-default' });
	this.anchorElement = config.anchorElement || document.body;
	this.callback = config.callback || {};
	this.initialize();
}

Popover.prototype = {
	
	isShowing: false,	
	
	_documentClicked: function(e)
	{
		if(this.isShowing)
		{
			if(!mui.getAncestorByClassName(e.target, 'mui-popover') && !mui.getAncestorByClassName(e.target, 'mui-navbar-back'))
			{
				this.hide();
			}
		}
	},
	
	hide: function()
	{
		if(!this.isShowing) return;
		this.isShowing = false;
		
		if(this.callback.popoverWillHide) this.callback.popoverWillHide();		
		mui.removeClass(this.boundingBox, 'mui-showing');
		if(this.callback.popoverDidHide) this.callback.popoverDidHide();
	},
	
	show: function()
	{
		if(this.isShowing) return;
		
		this.position();
		
		if(this.callback.popoverWillShow) this.callback.popoverWillShow();				
		mui.addClass(this.boundingBox, 'mui-showing');
		if(this.callback.popoverDidShow) this.callback.popoverDidShow();
		
		setTimeout(mui.bind(function() { this.isShowing = true; }, this), 10);
	},
	
	render: function(el)
	{
		el = el || document.body;
		if(this.callback.popoverWillRender) this.callback.popoverWillRender();						
		this.contentBox.appendChild(this.element);
		el.appendChild(this.boundingBox);
		if(this.callback.popoverDidRender) this.callback.popoverDidRender();
	},
	
	position: function()
	{
		var anchorXY = mui.getXY(this.anchorElement);
		var anchorHeight = this.anchorElement.offsetHeight;
		this.boundingBox.style.left = anchorXY[0]+'px';
		this.boundingBox.style.top = (anchorXY[1]+anchorHeight)+'px'
	},
	
	initialize: function()
	{
		this.boundingBox = mui.createElement('div', { className: 'mui-popover' });
		this.contentBox = mui.createElement('div', { className: 'mui-popover-content' });
		this.tip = mui.createElement('div', { className: 'mui-popover-tip' });
		this.contentBox.appendChild(this.tip);
		this.boundingBox.appendChild(this.contentBox);
		mui.on(document, 'click', mui.bind(this._documentClicked, this));
	}
	
};

mui.add('Popover', Popover);
	
})();