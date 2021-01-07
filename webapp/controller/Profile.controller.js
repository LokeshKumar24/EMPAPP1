sap.ui.define([
         "EA/EmployeeApp2/controller/SplitApp.controller",
        "sap/ui/model/json/JSONModel",
        
        
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (SplitAppController,JSONModel) {
		"use strict";

		return SplitAppController.extend("EA.EmployeeApp2.controller.Profile", {
			onInit: function () {
                // debugger;
                  var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.attachRoutePatternMatched(this.getProfileId, this);
                this.getProfile();

            },
              //birthday
            getBirthDay:function(){
                 var date= new Date();
           var data=   this.getOwnerComponent().getModel("profileModel").getProperty("/profile");
           data.map((element=>{
               if(element.Dob[9] === date.getDate() ){
                   debugger
             this.getOwnerComponent().setModel(new JSONModel({birthay:[{name:"Wish you happy BirthDay "+element.Fullname}]}),"birth");
               }
           }))
           
            },
               //profile data
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
                        that.getBirthDay()                
                },
                error:function(){
                    alert("Profile data is not received");
                }
            });

            },
            Path:null,
            getProfileId:function(oEvent){

                var id = oEvent.getParameter("arguments").ID;
                console.log(id)
                this.Path=id;
                 this.addProfileData();
            },

        addProfileData:function(){
          // debugger
         if(this.getOwnerComponent().getModel("profileModel")){
            var id=this.Path;
            var path=null
                  var detail = this.getOwnerComponent().getModel("profileModel").getProperty("/profile");
                  console.log(detail)
                  detail.map((element,index)=>{
                      if(element.Eid===id){
                         // debugger
                        path = index;

                    var data1={
                            id:id,
                            name:element.Fullname                        
                    }
                    var data2={
                        data:[data1]
                    }
                      this.getOwnerComponent().setModel(new JSONModel(data2), "emp");
                    }
                    detail[index].Picture = element.Picture.toLowerCase()
                  })
                  this.getOwnerComponent().setModel(new JSONModel({profile:detail}),"profileModel")
                    this.getView().byId("ObjectPageLayout").bindElement("profileModel>/profile/"+path);
                }
            },

       
             
		});
	});
