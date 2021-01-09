sap.ui.define([
         "EA/EmployeeApp2/controller/BaseController",
          "EA/EmployeeApp2/model/formatter",
         "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController,Formatter,Filter,FilterOperator,FilterType) {
		"use strict";

		return BaseController.extend("EA.EmployeeApp2.controller.Others", {
            Eid:null,
            formatter:Formatter,
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
                    var vContent = e.currentTarget.result.replace("data:"+ file.type+";base64,","");
                     vContent=vContent.replace("data:application/octet-stream;base64,","");
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
                    var vContent = e.currentTarget.result.replace("data:"+file.type+ ";base64,","");
                        vContent=vContent.replace("data:application/octet-stream;base64,","");
                   // debugger
                that.updateFile(that.Eid, that.fileName, that.fileType, vContent);
                }
                 reader.readAsDataURL(file);
        
    }	,
    downloadFile:function(oEvent){
      // debugger;
       var fileName =oEvent.getSource().oParent.mAggregations.cells[2].mProperties.text;
       this.getFile(fileName);
    },
    dateFilter:function(oEvent){
       // debugger;
     var filterProperty=    oEvent.getParameters().column.mProperties.filterProperty
     filterProperty = filterProperty.split(">")
     filterProperty = filterProperty[1];
     var sQuery1 = oEvent.getParameters().value;
    // var sQuery2 = sQuery1.toLowerCase();
     	oEvent.preventDefault();
     var aFilter=[];

     aFilter.push(new Filter(filterProperty, FilterOperator.EQ, sQuery1));
      //aFilter.push(new Filter(filterProperty, FilterOperator.StartsWith, sQuery1));
    var oView= this.getView().byId("idListItem");
    var binding= oView.getBinding("rows");
                 binding.filter(aFilter);
    }
        
        });
	});
