; (function () {
    $.fn.extend({
        fixedTable: function () {
            var $this = this; return $this.each(function (index, item) {
                var $this = $(this); if (!$this.hasClass('fixed-table-box')) { return; }
                if ($this.hasClass('head-fixed')) { return; }
                $.calFixedTableWidth(item); $.calFixedColHeight(item); $.syncScroll(item); $this._setFixedIndex(); $this.rowHover();
            });
        }, getRow: function (row) {
            var $this = this, rowDom = undefined, index = undefined, rows = []; if (typeof row != "number") {
                rowDom = $(row); if (rowDom.length == 0) { return; }
                index = rowDom.index();
            } else if (typeof row == "number") { index = row; }
            if (index == undefined) { return this; }
            $this.each(function (index2, item) {
                var $item = $(item), row = { bodyRow: undefined, leftFixedRow: undefined, rightFixedRow: undefined }; if (!$item.hasClass('fixed-table-box')) { return; }
                var bodyRows = $item.children('.fixed-table_body-wraper').find("tr"), leftFixed = $item.children('.fixed-table_fixed-left'), rightFixed = $item.children('.fixed-table_fixed-right'); row.bodyRow = bodyRows.eq(index); if (leftFixed.length > 0) { row.leftFixedRow = leftFixed.children('.fixed-table_body-wraper').find("tr").eq(index); }
                if (rightFixed.length > 0) { row.rightFixedRow = rightFixed.children('.fixed-table_body-wraper').find("tr").eq(index); }
                rows.push(row);
            }); return rows;
        }, deleteRow: function (row, cb) {
            var $this = this; if (row == undefined) { return this; }
            return $this.each(function (index, item) {
                if (!$(item).hasClass('fixed-table-box')) { return; }
                var $item = $(item), rows = $item.getRow(row); if (!rows || rows.length == 0) { return; }
                $.each(rows, function (index, row) {
                    if (row.bodyRow) { row.bodyRow.remove(); }
                    if (row.leftFixedRow) { row.leftFixedRow.remove(); }
                    if (row.rightFixedRow) { row.rightFixedRow.remove(); }
                    $.calFixedColHeight(item);
                });
            });
        }, addRow: function (htmlDom, cb) {
            var $this = this, returnVal = undefined, rowDoms = undefined; if (!htmlDom) { return this; }
            if (({}).toString.call(htmlDom) == "[object Function]") { returnVal = htmlDom(); } else { returnVal = htmlDom; }
            if (!returnVal) { return this; }
            rowDoms = $(returnVal); if (rowDoms.length == 0) { return this; }
            return $this.each(function (index, item) {
                if (!$(item).hasClass('fixed-table-box')) { return; }
                var $item = $(item), $fixedTableBody = $item.children('.fixed-table_body-wraper').find("tbody"), $leftFixed = $item.children('.fixed-table_fixed-left'), $rightFixed = $item.children('.fixed-table_fixed-right'); $fixedTableBody.append(rowDoms); if (!item.fixedIndex) { return; }
                if (item.fixedIndex.left.length > 0 && $leftFixed.length > 0) { var cloneRows = rowDoms.clone(true), $leftFixedBody = $leftFixed.children('.fixed-table_body-wraper').find("tbody"), leftTrs = []; $.each(item.fixedIndex.left, function (index2, fixedIndex) { cloneRows.each(function (index3, cloneRow) { var leftTr = $(this).clone(true).html(""); $(cloneRow).find("td").each(function (index4, td) { if (index4 == fixedIndex.index) { leftTr.append(td); } }); leftTrs.push(leftTr); }); }); $leftFixedBody.append(leftTrs); }
                if (item.fixedIndex.right.length > 0 && $rightFixed.length > 0) { var cloneRows = rowDoms.clone(true), $rightFixedBody = $rightFixed.children('.fixed-table_body-wraper').find("tbody"), rightTrs = []; $.each(item.fixedIndex.right, function (index2, fixedIndex) { cloneRows.each(function (index3, cloneRow) { var rightTr = $(this).clone(true).html(""); $(cloneRow).find("td").each(function (index4, td) { if (index4 == fixedIndex.index) { rightTr.append(td); } }); rightTrs.push(rightTr); }); }); $rightFixedBody.append(rightTrs); }
                $.calFixedColHeight(item); $(item).rowHover();
            });
        }, emptyTable: function (cb) {
            var $this = this; return $this.each(function (index, item) {
                var $item = $(item); if (!$item.hasClass('fixed-table-box')) { return; }
                var bodyRows = $item.children('.fixed-table_body-wraper'), leftFixed = $item.children('.fixed-table_fixed-left'), rightFixed = $item.children('.fixed-table_fixed-right'); bodyRows.find("tbody").html(""); leftFixed.find(".fixed-table_body-wraper tbody").html(""); rightFixed.find(".fixed-table_body-wraper tbody").html(""); $.calFixedColHeight(item);
            });
        }, rowHover: function (cb) {
            var $this = this; return $this.each(function (index, item) {
                if (!$(item).hasClass('fixed-table-box')) { return; }
                var $item = $(item), hoverClass = $item.attr("data-hover") || "rowHover", $fixedTableBodyTrs = $item.children('.fixed-table_body-wraper').find("tr"), $leftFixed = $item.children('.fixed-table_fixed-left'), $rightFixed = $item.children('.fixed-table_fixed-right'); $fixedTableBodyTrs.off("mouseenter.rowHover").off("mouseleave.rowHover"); $fixedTableBodyTrs.on("mouseenter.rowHover", _process).on("mouseleave.rowHover", _process); if ($leftFixed.length > 0) { var $leftFixedTrs = $leftFixed.children('.fixed-table_body-wraper').find("tr"); $leftFixedTrs.off("mouseenter.rowHover").off("mouseleave.rowHover"); $leftFixedTrs.on("mouseenter.rowHover", _process).on("mouseleave.rowHover", _process); }
                if ($rightFixed.length > 0) { var $rightFixedTrs = $rightFixed.children('.fixed-table_body-wraper').find("tr"); $rightFixedTrs.off("mouseenter.rowHover").off("mouseleave.rowHover"); $rightFixedTrs.on("mouseenter.rowHover", _process).on("mouseleave.rowHover", _process); }
            }); function _process() {
                var $this = $(this), fixedTableBox = $this.parents(".fixed-table-box"), hoverClass = fixedTableBox.attr("data-hover") || "rowHover", rows = fixedTableBox.getRow($this.index()); if (!rows || rows.length == 0) { return; }
                $.each(rows, function (index, row) {
                    row.bodyRow.toggleClass(hoverClass); if (row.leftFixedRow) { row.leftFixedRow.toggleClass(hoverClass); }
                    if (row.rightFixedRow) { row.rightFixedRow.toggleClass(hoverClass); }
                });
            }
        }, _setFixedIndex: function () {
            return this.each(function () {
                var that = this, $this = $(this), $fixedTableHeaderTd = $this.children('.fixed-table_header-wraper').find('th'); if (this.fixedIndex) { return; }
                this.fixedIndex = {}; $fixedTableHeaderTd.each(function (index, th) {
                    if (th.hasAttribute("data-fixed")) {
                        var direction = ($(th).attr("data-direction") || "left").toLowerCase(); if (!that.fixedIndex.left) { that.fixedIndex.left = []; }
                        if (!that.fixedIndex.right) { that.fixedIndex.right = []; }
                        that.fixedIndex[direction].push({ index: index, direction: direction });
                    }
                });
            });
        }
    }); $.extend({
        calFixedColHeight: function (fixedTableBox) {
            if (!$(fixedTableBox).hasClass('fixed-table-box')) { return this; }
            var $fixedTableBox = $(fixedTableBox), $fixedTableHeader = $fixedTableBox.children('.fixed-table_header-wraper'), $fixedTableBody = $fixedTableBox.children(".fixed-table_body-wraper"), fixedTableBody = $fixedTableBody[0], $fixedTableLeft = $(".fixed-table_fixed-left"), $fixedTableRight = $(".fixed-table_fixed-right"), hasCrosswiseScroll = true, hasVerticalScroll = false, scrollWidth = 0, scrollWidth2 = 0, maxHeight = 0, isIE = $.isIE(); if (isIE) { maxHeight = $fixedTableBox.height() || $fixedTableBox[0].clientHeight || $fixedTableBox[0].scrollHeight; } else { maxHeight = $fixedTableBox.height(); }
            if (fixedTableBody.scrollWidth > fixedTableBody.clientWidth || fixedTableBody.offsetWidth > fixedTableBody.clientWidth) { hasCrosswiseScroll = true; } else { hasCrosswiseScroll = false; }
            if (fixedTableBody.scrollHeight > fixedTableBody.clientHeight || (fixedTableBody.offsetHeight - $.getScrollWidth()) > fixedTableBody.clientHeight) { hasVerticalScroll = true; } else { hasVerticalScroll = false; }
            if (hasCrosswiseScroll) { scrollWidth = $.getScrollWidth(); }
            if (hasVerticalScroll) { scrollWidth2 = $.getScrollWidth(); if ($fixedTableBox.find(".fixed-table-box_fixed-right-patch").length == 0) { var rightPatch = $('<div class="fixed-table-box_fixed-right-patch"></div>'), height = $fixedTableHeader.height(); rightPatch.css({ width: scrollWidth2, height: height - 2 }); $fixedTableBox.append(rightPatch); } } else { if ($fixedTableBox.find(".fixed-table-box_fixed-right-patch").length == 0) { $fixedTableBox.find(".fixed-table-box_fixed-right-patch").remove(); } }
            var height = maxHeight - scrollWidth, fixedTable = $fixedTableBox.find(".fixed-table_fixed"); if (fixedTable.height() != Math.abs(maxHeight - scrollWidth)) { var height = maxHeight - scrollWidth; fixedTable.height(maxHeight - scrollWidth); }
            $fixedTableBox.find(".fixed-table_fixed.fixed-table_fixed-right").css("right", (scrollWidth2 - 1) < 0 ? 1 : (scrollWidth2 - 1)); return $fixedTableBox;
        }, calFixedTableWidth: function (fixedTableBox) {
            if (!$(fixedTableBox).hasClass('fixed-table-box')) { return this; }
            var $this = $(fixedTableBox), $body = $("body"), $fixedTableHeader = $this.children().children(".fixed-table_header"), $fixedTableBody = $this.children().children(".fixed-table_body"), $cloneNode = $fixedTableHeader.clone(true), width = 0; $cloneNode.css({ position: "fixed", top: "-1000px" }); $body.append($cloneNode); width = $cloneNode.width(); $fixedTableHeader.width(width); $fixedTableBody.width(width); $cloneNode.remove(); return this;
        }, syncScroll: function (fixedTableBox) {
            if (!$(fixedTableBox).hasClass('fixed-table-box')) { return this; }
            var $fixedTableBox = $(fixedTableBox), fixedTableHeader = $fixedTableBox.children(".fixed-table_header-wraper"), $fixedTableBody = $fixedTableBox.children('.fixed-table_body-wraper'), $fixedCols = $fixedTableBox.children('.fixed-table_fixed').children('.fixed-table_body-wraper'); $fixedTableBody.on("scroll", function () { var $this = $(this); fixedTableHeader.scrollLeft($this.scrollLeft()); $fixedCols.scrollTop($this.scrollTop()); }); return this;
        }, getScrollWidth: function () { var div = document.createElement("div"), w1 = 0, w2 = 0; document.body.appendChild(div); div.style.position = "fixed"; div.style.left = "-2000px"; div.style.width = "200px"; div.style.height = "200px"; w1 = div.clientWidth; div.style.overflow = "scroll"; w2 = div.clientWidth; document.body.removeChild(div); return w1 - w2; }, isIE: function () { var ua = navigator.userAgent.toLowerCase(); if (/msie \d/g.test(ua) || ((/trident\/\d/g.test(ua)) && /like gecko/g.test(ua))) { return true; } else { return false; } }
    });
})();