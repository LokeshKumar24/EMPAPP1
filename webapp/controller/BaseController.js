sap.ui.define([      
          "sap/ui/core/mvc/Controller",
          "sap/ui/model/json/JSONModel",
          "sap/m/MessageToast"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller,JSONModel,MessageToast) {
		"use strict";

		return Controller.extend("EA.EmployeeApp2.controller.BaseController", {
            Eid:null,
            loginDetails:null,
            oRouter : null,
            profile:null,
			onInit: function () {
                
            },
            //login data and validations
            getLogin:function(){
                var that = this;
              var serviceurl="/sap/opu/odata/sap/ZAPP_EMP1_SRV/";

             var oJModel =  new sap.ui.model.odata.ODataModel(serviceurl);
      
            var data=oJModel.read("/LOGINSet", {
                success:function(data){
                    // debugger;
                     that.loginDetails = data.results;
                     console.log(that.loginDetails)
                                   
                },
                error:function(){
                    alert("Login data is not received");
                }
            });

            },
            checkLogin:function(id,password){
               // debugger
                this.loginDetails.forEach(element => {
                    if(element.Eid === id && element.Password === password){
                        this.oRouter.navTo("SplitApp",{ID:id});
                    }
                });

            },
            //home data
            getHome:function(){
                // debugger
                var that = this;
                var serviceurl="/sap/opu/odata/sap/ZAPP_EMP1_SRV/";
                
                var oJModel =  new sap.ui.model.odata.ODataModel(serviceurl);
                
            var data=oJModel.read("/HOMESet", {
                success:function(data){
                   // debugger;
                    
                     console.log(data.results)
                                   
                },
                error:function(){
                    alert("Home data is not received");
                }
            });

            },

            // project data
            getProject:function(){
                //  debugger
                   var that = this;
              var serviceurl="/sap/opu/odata/sap/ZAPP_EMP1_SRV/";

             var oJModel =  new sap.ui.model.odata.ODataModel(serviceurl);
      
            var data=oJModel.read("/PROJECTSet", {
                success:function(data){
                   //  debugger;
                    
                     console.log(data.results)
                                   
                },
                error:function(){
                    alert("Project data is not received");
                }
            });

            },
            //get others data
            getOthers:function(){
                //debugger
                  var that = this;
              var serviceurl="/sap/opu/odata/sap/ZAPP_EMP1_SRV/";

             var oJModel =  new sap.ui.model.odata.ODataModel(serviceurl);
      
            var data=oJModel.read("/REQUESTSet", {
                success:function(data){
                    // debugger;
                    
                     console.log(data.results)
                                   
                },
                error:function(){
                    alert("Request data is not received");
                }
            });

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
                    //   that.addProfileData()             
                },
                error:function(){
                    alert("Profile data is not received");
                }
            });

            },
            //profile update
            profileUpdate(Payload){
                 var serviceurl="/sap/opu/odata/sap/ZAPP_EMP1_SRV/";
  
               var oPModel =  new sap.ui.model.odata.ODataModel(serviceurl);
              oPModel .update("/PROFILESet('"+Payload.Eid+"')", Payload, {
                     method: "PUT",
                     success: function(data) {
                    //   alert("success");
                    sap.m.MessageToast.show("Updated Succesfully");
                    },
                     error: function(e) {
                      alert("error");
                    }
                });

            }
		});
	});
