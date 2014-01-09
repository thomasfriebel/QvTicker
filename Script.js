if (Qva.Mgr.mySelect == undefined) {
    Qva.Mgr.mySelect = function (owner, elem, name, prefix) {
        if (!Qva.MgrSplit(this, name, prefix)) return;
        owner.AddManager(this);
        this.Element = elem;
        this.ByValue = true;
 
        elem.binderid = owner.binderid;
        elem.Name = this.Name;
 
        elem.onchange = Qva.Mgr.mySelect.OnChange;
        elem.onclick = Qva.CancelBubble;
    }
    Qva.Mgr.mySelect.OnChange = function () {
        var binder = Qva.GetBinder(this.binderid);
        if (!binder.Enabled) return;
        if (this.selectedIndex < 0) return;
        var opt = this.options[this.selectedIndex];
        binder.Set(this.Name, 'text', opt.value, true);
    }
    Qva.Mgr.mySelect.prototype.Paint = function (mode, node) {
        this.Touched = true;
        var element = this.Element;
        var currentValue = node.getAttribute("value");
        if (currentValue == null) currentValue = "";
        var optlen = element.options.length;
        element.disabled = mode != 'e';
        //element.value = currentValue;
        for (var ix = 0; ix < optlen; ++ix) {
            if (element.options[ix].value === currentValue) {
                element.selectedIndex = ix;
            }
        }
        element.style.display = Qva.MgrGetDisplayFromMode(this, mode);
 
    }
}

Qva.AddExtension("QvTicker", function() {
	var cssFiles = [];
	cssFiles.push('Extensions/QvTicker/style.css');
	for (var i = 0; i < cssFiles.length; i++) {
		Qva.LoadCSS(Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?') + 'public=only' + '&name=' + cssFiles[i]);
	}

	var _this = this
	_this.version = '1.0'
	_this._uniqueId = _this.Layout.ObjectId.replace("\\","_");
	var _$element = $(_this.Element)
	var _data = this.Data
	_this._colText = getQVStringProp(0) //regular text color
	_this._colNegative = getQVStringProp(1) //negative value color
	_this._colNeutral = getQVStringProp(2) //neutral value color
	_this._colPositive = getQVStringProp(3) //positive value color
	_this._scrollSpeed = getQVStringProp(4) ? getQVStringProp(4) : 60
	var ticker = _this._$ticker ? _this._$ticker : _$element.html('<div id="'+_this._uniqueId+'" class="qvticker"><div class="qvticker-text"></div></div>')
	_this._$ticker = ticker
	clearInterval(_this._interval)
	ticker.css("font-family", _this.Layout.Style.fontfamily)
	ticker.css("font-size", _this.Layout.Style.fontsize)
	ticker.css("font-style", _this.Layout.Style.fontstyle)
	ticker.css("font-weight", _this.Layout.Style.fontweight)
	ticker.css("text-decoration", _this.Layout.Style.textdecoration)
	var tickerText = $('.qvticker-text',ticker).empty("")
	for ( var rowIx = 0; rowIx < _data.Rows.length; rowIx++) {
		   var row = _data.Rows[rowIx];
		   var dim1 = row[0].text;
		   var m1 = row[1].text;
		   var m2 = parseInt(row[2].text);
			tickerText.append('<span class="qvticker-entry"><span class="name">'+ 
				dim1 +
				'</span><span class="value '+
				(!m2 || m2 == 0 	? "neutral" : (m2 < 0 ? "negative" : "positive"))
				+'">'+ m1 + '</span></span>'
			)
	  }
	
	var qvticker = $('div#'+_this._uniqueId);
	qvticker.css("color", _this._colText);
	$(".positive",qvticker).css("color",_this._colPositive)
	$(".negative",qvticker).css("color",_this._colNegative)
	$(".neutral",qvticker).css("color",_this._colNeutral)
	qvticker.each(function() {
		var tic = $(this),indent = tic.width();
		tic.qvticker = function() {
			indent--;
			tic.css('text-indent',indent);
			if (indent < -1 * tic.children('div.qvticker-text').width()) {
				indent = tic.width();
			}
		};
		_this._interval = setInterval(tic.qvticker,1000/_this._scrollSpeed)
	});	  
	
	function getQVStringProp(idx) {
		var p = '';
		try {
			if (_this.Layout['Text' + idx]) {
				p = _this.Layout['Text' + idx].text //eval('_this.Layout.Text' + idx + '.text || _this.Layout.Text' + idx + '.value');
			}
		} catch (Exception) {
			alert("Exception")
		}
		return p;
	}		
	
})