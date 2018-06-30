/**
 * Created by Skeksify on 09/07/2016.
 */

define([
	"underscore",
	"jquery",
	"Backbone",
	"Toolset/toolset",
	"./TableView"
], function (_, $, Backbone, Toolset, View) {

	function makeComparisonFunction(dir, colName) {
		if (dir === 0) {
			return (a, b) => a.originalIndex - b.originalIndex;
		}
		if (dir === 1) {
			return (a, b) => b[colName] - a[colName];
		}
		if (dir === 2) {
			return (a, b) => a[colName] - b[colName];
		}
	}

	return Backbone.Model.extend({

		_data: null,
		_columns: null,
		_indexToColName: null,
		_stickyIndices: null,
		_sortState: { colIndex: -1, dir: 0 }, // 0 - None, 1 - Desc, 2 - Asc

		initialize: function (tableName, settings) {
			this._view = new View(tableName);
			this._view.on('thClick', this.sort.bind(this));
			this._view.render();
			this._initColumns();
			this._loadDataFromRows();

			if (settings.stickyIndices) {
				this._stickyIndices = settings.stickyIndices;
				this._view.colorRows(this._stickyIndices);
			}
		},

		render: function () { },

		_loadDataFromRows: function () {
			let value;
			this._data = [];

			for (value of this._view.generateTableIterator()) {
				if (_.isNu(value)) { // New Row
					this._data[value] = { originalIndex: value };
				} else { // TD
					let dataType = this._columns[value.colName].dataType;
					!Toolset.FinancialData.is(dataType, value.text) && announceWarn('Table Data parsing error, type mismatch', `'${value.text}' isn't ${dataType}`);
					this._data[value.rowIndex][value.colName] = Toolset.FinancialData.getValue(dataType, value.text);
				}
			}

			lcl(this._data);
		},

		_initColumns: function () {
			const { indexToColName, columns } = this._view.absorbColumns();
			this._columns = columns;
			this._indexToColName = indexToColName;
		},

		sort: function (colIndex) {
			let newDir = this._getNewDir(colIndex),
				extractedStickies = _.extractByIndices(this._data, this._stickyIndices);

			this._data.sort(makeComparisonFunction(newDir, this._indexToColName[colIndex]));

			_.injectByIndices(this._data, this._stickyIndices, extractedStickies);
			this._view.reorder(_.pluck(this._data, 'originalIndex'));
			this._sortState = { colIndex, dir: newDir };
			this._view.setTHSortState(this._sortState);
		},

		_getNewDir: function (colIndex) {
			return this._sortState.colIndex === colIndex ? ((this._sortState.dir + 1) % 3) : 1;
		}
	})
});