sap.ui.define([
         "EA/EmployeeApp2/controller/BaseController",
          "sap/m/MessageToast",
          "sap/ui/model/json/JSONModel",
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController,MessageToast,JSONModel) {
		"use strict";

		return BaseController.extend("EA.EmployeeApp2.controller.Login", {
            
            
			onInit: function () {
                this.getView().setModel(new JSONModel(), "Login");
                  this.getView().setModel(new JSONModel(), "ch");
                 this.oRouter =  sap.ui.core.UIComponent.getRouterFor(this);
                 // this.getProfile();
                 this.getLogin();
                 this.getRequest();
                    this.getOthers();
                      this.getProject();
                        this.getHome();
            },
 
        
            onLogin:function(){
               debugger;
                var id = this.getView().getModel("Login").getProperty("/id");
                var password = this.getView().getModel("Login").getProperty("/password");
                if(id&&password){

                    this.Eid = id;
                    this.checkLogin(id,password);
                   //  this.getProfile(id);
                    this.getView().byId("userId").setValueState("None");
				this.getView().byId("userPassword").setValueState("None");
                } else{
                    this.getView().byId("userId").setValueState("Error");
				this.getView().byId("userPassword").setValueState("Error");
                }     
            },
            changePass:null,
            changePassword:function(){
               // debugger;
                if(!this.changePass){
                    this.changePass = new sap.ui.xmlfragment("EA.EmployeeApp2.view.changePassword",this);
                    this.getView().addDependent(this.changePass);
                }
                this.changePass.open();

            },
            onClose:function(){
                this.changePass.close();
            },
            newPassword:function(){
                debugger
             var id = this.getView().getModel("ch").getProperty("/id");
			var newPass = this.getView().getModel("ch").getProperty("/newPass");
            var confPass = this.getView().getModel("ch").getProperty("/confPass");
            if(newPass === confPass){
                this.loginUpdate(id,newPass)
                MessageToast.show("Password updated Successfully");

            }
            else{
                MessageToast.show("password and confirm password should be  same");
            }
            }

		});
	});
