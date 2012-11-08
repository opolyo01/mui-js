/**
 * TabView module
 * @module tab-view
 */

(function() {
var CLASS_SHOWING = 'mui-showing',
	DISABLED = 'disabled',
	DOT = '.';
/**
 * The TabView class provides a tabbed navigation model for related
 * contents. TabViews can be embedded inside the header of a page for
 * global navigation, or inside the content of the page
 * @class TabView
 * @constructor
 * @param el {String|HTMLElement} CSS Selector or HTMLElement for the tabs container
 * @param options {Object} TabView configuration options
 */
function TabView(el, options)
{
	options = options || {};
	this.tabContents = [];
	this.element = mui.get(el);
	this.tabs = mui.getAll('li', this.element);
	
	if(options.activeTab){
		this.setActiveTab(options.activeTab);
	}
	else{
		var oSelectedItem = mui.get(DOT+CLASS_SHOWING, this.element);
		this.active = oSelectedItem ? oSelectedItem : this.tabs[0];
		this.activeIndex = this.tabs.indexOf(this.active);
	}
	
	
	mui.addClass(this.element, 'mui-tab-view');
	// mui.each(this.tabs, function(t) {
	// 		t.style.width = Math.round(100/this.tabs.length)+'%';
	// 	}, this);
	
	if(!mui.hasClass(this.active, CLASS_SHOWING)){
		mui.addClass(this.active, CLASS_SHOWING);
	} 

	if(options.tabContents)
	{
		mui.each(options.tabContents, function(tc, i) {
			var el = mui.get(tc);
			mui.addClass(el, 'mui-tab-content');
			if(i === this.activeIndex){
				mui.addClass(el, CLASS_SHOWING);
			}
			this.tabContents.push(el);
		}, this);
	}
	
	mui.on(this.element, 'click', this);
}

TabView.prototype = {
	handleEvent: function(e)
	{
		var tabTarget = mui.getAncestorByTagName(e.target, 'li');
		if(tabTarget && e.type === "click"){
			e.preventDefault();
			var oLink = mui.get("a", tabTarget);
			if(oLink && oLink.className !== " disabled" && this.active && tabTarget === this.active){
				this.tabRefreshed(this.activeIndex);
			}
			else if(this.active && tabTarget !== this.active){
				this.activateTabAtIndex(this.tabs.indexOf(tabTarget)).tabChanged(this.activeIndex);
			}
		}
	},
	
	/**
	 * Tab change event handler which is invoked every time a tab is activated.
	 * Override this method in implementation. The first argument to the method
	 * is the index of the selected tab.
	 * @method tabChanged
	 * @param index {Number} The index of the selected tab
	 */
	tabChanged: function(index)
	{
		// Override this method
	},
	
	/**
	 * This method is invoked whenever the currently active tab is reactivated.
	 * Override this method in implementation. The first argument to the method
	 * is the index of the selected tab.
	 * @method tabRefreshed
	 * @param index {Number} The index of the selected tab
	 */
	tabRefreshed: function(index)
	{
		// Override this method	
	},
	
	/**
	 * Set the tabContent for a particular tab at a given index
	 * @method setTabContent
	 * @param index {Number} The index of the tab
	 * @param tabContent {String|HTMLElement} The tabContent element
	 */
	setTabContent: function(index, tabContent)
	{
		this.tabContents[index] = mui.get(tabContent);
	},
	
	/**
	 * Activate a tab at a given index by activating the selected state of the tab, as well
	 * as showing any tab content for the tab
	 * @method activateTabAtIndex
	 * @param index {Number} The index of the tab to activate
	 * @return {mui.TabView} The TabView instance
	 */
	activateTabAtIndex: function(index)
	{
		var curActiveEl = this.active,
			curActiveIdx = this.activeIndex,
			activeContent;
		this.setActiveTab(index);
		
		mui.removeClass(curActiveEl, CLASS_SHOWING);
		mui.addClass(this.active, CLASS_SHOWING);

		if(this.tabContents){
			activeContent = this.tabContents[curActiveIdx];
		} 

		if(activeContent){
			mui.removeClass(activeContent, CLASS_SHOWING);
			mui.addClass(this.tabContents[this.activeIndex], CLASS_SHOWING);
		}
		return this;
	},
	
	enableActiveTab: function(){
		var tabLink = mui.get("a", this.active);
		if(mui.hasClass(tabLink, DISABLED)){
			mui.removeClass(tabLink, DISABLED);
		}
	},
	
	disableActiveTab: function(){
		var tabLink = mui.get("a", this.active);
		if(!mui.hasClass(tabLink, DISABLED)){
			mui.addClass(tabLink, DISABLED);
		}
	},
	
	setActiveTab: function(index){
		this.activeIndex = index;
		this.active = this.tabs[index];
	}
};
mui.TabView = TabView;
	
})();
