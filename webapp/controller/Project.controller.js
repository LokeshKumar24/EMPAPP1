sap.ui.define([    
         "EA/EmployeeApp2/controller/BaseController"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController) {
		"use strict";

		return BaseController.extend("EA.EmployeeApp2.controller.Project", {
			onInit: function () {
              
            },
            	onBeforeExport: function (oEvt) {
			var mExcelSettings = oEvt.getParameter("exportSettings");

			// Disable Worker as Mockserver is used in Demokit sample
			mExcelSettings.worker = false;
		},

		});
	});
