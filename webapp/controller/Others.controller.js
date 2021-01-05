sap.ui.define([
         "EA/EmployeeApp2/controller/BaseController"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController) {
		"use strict";

		return BaseController.extend("EA.EmployeeApp2.controller.Others", {
            Eid:null,
			onInit: function () {
                 var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.attachRoutePatternMatched(this.getProfileId, this);
            },
             getProfileId:function(oEvent){

                var id = oEvent.getParameter("arguments").ID;
                console.log(id)
                this.Eid=id;
                 
            },
            
           
             onUploaderTS:function(oEvent){
                 debugger
              var oFileUpload = this.getView().byId("fileUploaderTS");
                var domRef = oFileUpload.getFocusDomRef();
                var file = domRef.files[0];
                var that = this;
                this.fileName = this.getView().byId("TSFileName").getValue();
                this.fileType = file.type;
                var reader = new FileReader();
                reader.onload = function (e) {
                    var vContent = e.currentTarget.result.replace("data:"+ file.type+";base64," );
                that.updateFile(that.Eid, that.fileName, that.fileType, vContent);
                }
                reader.readAsDataURL(file);
            },
            onUploadFile:function(oEvent){
                 debugger
              var oFileUpload = this.getView().byId("fileUploaderFS");

                var domRef = oFileUpload.getFocusDomRef();
                var file = domRef.files[0];
                var that = this;
                this.fileName = this.getView().byId("FileName").getValue();
                this.fileType = file.type;
                var reader = new FileReader();
                reader.onload = function (e) {
                    var vContent = e.currentTarget.result.replace( file.type );
                that.updateFile(that.Eid, that.fileName, that.fileType, vContent);
                }
            
	
            
    }	
        
        });
	});
