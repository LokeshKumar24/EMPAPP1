sap.ui.define([
         "EA/EmployeeApp2/controller/BaseController"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController) {
		"use strict";

		return BaseController.extend("EA.EmployeeApp2.controller.Others", {
			onInit: function () {
               
            },
            
           
             TimeSheetUpload:function(oEvent){
                 debugger
              var oFileUpload = this.getView().byId("timesheet");
                // var domRef = oFileUpload.getFocusDomRef();
                // var file = domRef.files[0];
                // var that = this;
                // this.fileName = file.name;
                // this.fileType = file.type;
                // var reader = new FileReader();
                // reader.onload = function (e) {var vContent = e.currentTarget.result.replace(“data:” + file.type + “;base64,”, “”);
                // that.postFileToBackend(workorderId, that.fileName, that.fileType, vContent);

            },
            

            onTimeSheetSubmit:function(oEvent){
                debugger
  var oFileUpload = this.getView().byId("timesheet");
            }
		});
	});
