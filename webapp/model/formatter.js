
sap.ui.define([
        "EA/EmployeeApp2/controller/BaseController",
        "sap/ui/core/format/DateFormat"
       
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController,DateFormatter) {
		"use strict";

		return {
            date: function(date) {
                debugger
			return  DateFormatter.format(date);
		}
        }
	});
