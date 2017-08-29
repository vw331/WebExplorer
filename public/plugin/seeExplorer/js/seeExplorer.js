(function($){

	function createCardItem(item){

		return $(['<div class="see-item-card see-item">',
							'<div class="see-item-up">',
								'<span class="see-item-ico ', 'see-type-'+item.type ,'"></span>',
							'</div>',
							'<div class="see-item-down">',
								'<p class="see-item-text">', item.name ,'</p>',
							'</div>',
						'</div>'].join(' ')).data('target',item)

	}


	var SeeExplorer = function(el, options){
		this.options = options	
		this.$el = el

		this.init()
	}

	SeeExplorer.prototype.init = function(){
		this.initContainer()
		this.initHeader()
		this.initToolbar()
		this.initMain()
		this.initFooter()

		
		this.initManager()
	}

	SeeExplorer.prototype.initContainer = function(){
		this.$container = $('<div class="see-container"></div>')
		this.$container.appendTo( this.$el )
	}

	SeeExplorer.prototype.initHeader = function(){
		this.$header = $(['<div class="see-header">',
					'<div class="see-header-left">',
						'<a class="see-btn"><span class="see-iconfont see-btn-back"></span></a>',
						'<a class="see-btn"><span class="see-iconfont see-btn-forward"></span></a>',
					'</div>',
					'<div class="see-header-right">',
						'<div class="see-search-wrap">',
							'<input type="text" class="see-search-text">',
							'<a href="javascript:;" class="see-btn see-btn-search">查询</a>',
						'</div>',
					'</div>',
					'<div class="see-header-main">',
						'<div class="see-breadcrumb-wrap">',
							'<ul class="see-breadcrumb-list clearfix">',
								'<li class="see-breadcrumb-bar">',
									'<a href="" class="see-breadcrumb-link"><span class="see-iconfont see-breadcrumb-link-home"></span> 主页</a>',
								'</li>',
								'<li class="see-breadcrumb-bar">',
									'<a href="" class="see-breadcrumb-link">我的文档</a>',
								'</li>',
								'<li class="see-breadcrumb-bar">',
									'<a href="" class="see-breadcrumb-link">公司资料</a>',
								'</li>',
							'</ul>',
						'</div>',
					'</div>',
				'</div>'].join(''))

		this.$header.appendTo( this.$container )
	}

	SeeExplorer.prototype.initToolbar = function(){
		this.$toolbar = $(['<div class="see-toolbar">',
					'<div class="see-toolbar-left">',
						'<div class="see-btn-group">',
							'<a href="javascript:;" class="see-btn see-btn-sm">',
								'<span class="see-iconfont see-btn-newFolder"></span> 新建文件夹',
							'</a>',
							'<a href="javascript:;" class="see-btn see-btn-sm">',
								'<span class="see-iconfont see-btn-upload"></span> 上传',
							'</a>',
							'<a href="javascript:;" class="see-btn see-btn-sm">',
								'<span class="see-iconfont see-btn-refresh"></span> 刷新',
							'</a>',
						'</div>',
					'</div>',
					'<div class="see-toolbar-right">',
						'<div class="see-btn-group">',
							'<a href="javascript:;" class="see-btn see-btn-sm">',
								'<span class="see-iconfont see-btn-listView"></span>',
							'</a>',
							'<a href="javascript:;" class="see-btn see-btn-sm">',
								'<span class="see-iconfont see-btn-tableView"></span>',
							'</a>',
						'</div>',
					'</div>',			
				'</div>'].join(' '))

		this.$toolbar.appendTo( this.$container )
	}

	SeeExplorer.prototype.initMain = function(){
		this.$main = $(['<div class="see-main">',
						'<div class="see-body see-cardLayout-wrap">',
						'</div>',
					'</div>'].join(''))


		this.$body = this.$main.find('.see-body')
		this.$wrap = this.$main.find('.see-cardLayout-wrap')
		this.$main.appendTo( this.$container )
	}

	SeeExplorer.prototype.initFooter = function(){
		
		this.$footer = $(['<div class="see-footer">',
							'<p class="see-notice">15个项目</p>',
						'</div>'].join(''))

		this.$footer.appendTo( this.$container )
	}

	SeeExplorer.prototype.initData = function(){

		this.data = this.options.data

	}

	SeeExplorer.prototype.initManager = function(){

		this.initData()
		this.createItems()
		this.renderManager()
		this.bindManager()
	}

	SeeExplorer.prototype.createItems = function(){
		var _this = this
			_this.items = []
		$.each( _this.data, function(index, item){

			 _this.items.push( createCardItem( item ) )

		})
	}

	SeeExplorer.prototype.renderManager = function(){

		var _this = this

		$.each( this.items, function(index, item){

			_this.append( item )

		})

	}

	SeeExplorer.prototype.append = function(item){
		this.$body.append( item )
	}

	SeeExplorer.prototype.bindManager = function(item){
		var _this = this
		this.$wrap
			.on('mouseover', '.see-item', function(){
				$(this).addClass('see-item-hover')
			})
			.on('mouseout', '.see-item', function(){
				$(this).removeClass('see-item-hover')
			})
			.on('click', '.see-item', _this.toggleSelect.bind(_this) )
	}

	SeeExplorer.prototype.toggleSelect = function(event){
		var $this = $( event.currentTarget )
		var isSelected = $this.data('selected')

		if( !isSelected ){
			$this.addClass('see-item-selected').data('selected',true)
			this.trigger('onSelect')
		}
		else{
			$this.removeClass('see-item-selected').data('selected',false)
		}
	}

	var SeeExplorer_DEFAULTS = {
		data : []
	}



   $.fn.seeExplorer = function(opt){

	   	var options = $.extend( SeeExplorer_DEFAULTS, opt )

	   	console.log( options )

	   	return new SeeExplorer( $(this), options )

   }

})(jQuery)