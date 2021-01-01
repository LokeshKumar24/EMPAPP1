sap.ui.define([
         "EA/EmployeeApp2/controller/BaseController",
        "sap/ui/model/json/JSONModel"
        
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController,JSONModel) {
		"use strict";

		return BaseController.extend("EA.EmployeeApp2.controller.Profile", {
			onInit: function () {
                // debugger;
                 this.getProfile();
                  var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.attachRoutePatternMatched(this.getProfileId, this);
               // this.addProfileData();


            },
            Path:null,
            getProfileId:function(oEvent){

                var id = oEvent.getParameter("arguments").ID;
                console.log(id)
                this.Path=id;
            },
             getProfile:function(){
                // debugger
                  var that = this;
                //  var id= this.Eid;
              var serviceurl="/sap/opu/odata/sap/ZAPP_EMP1_SRV/";

             var oJModel =  new sap.ui.model.odata.ODataModel(serviceurl);
      
            var data=oJModel.read("/PROFILESet", {
                success:function(data){
                    //  debugger;
                     console.log(data.results)
                    that.getOwnerComponent().setModel(new JSONModel({profile:data.results}),"profileModel");
                      that.addProfileData()             
                },
                error:function(){
                    alert("Profile data is not received");
                }
            });

            },


        addProfileData:function(){
         //   debugger
         if(this.getOwnerComponent().getModel("profileModel")){
            var id=this.Path;
            var path=null
                  var detail = this.getOwnerComponent().getModel("profileModel").getProperty("/profile");
                  console.log(detail)
                  detail.map((element,index)=>{
                      if(element.Eid===id){
                         // debugger
                        path = index;
                    }
                    detail[index].Picture = element.Picture.toLowerCase()
                  })
                  this.getOwnerComponent().setModel(new JSONModel({profile:detail}),"profileModel")
                    this.getView().byId("ObjectPageLayout").bindElement("profileModel>/profile/"+path);
                }
            },

       
             
		});
	});
