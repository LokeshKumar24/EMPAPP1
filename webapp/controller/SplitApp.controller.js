sap.ui.define([
         "EA/EmployeeApp2/controller/BaseController",
        "sap/ui/model/json/JSONModel",
        "sap/base/Log"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController,JSONModel,Log) {
		"use strict";

		return BaseController.extend("EA.EmployeeApp2.controller.SplitApp", {
			onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            oRouter.attachRoutePatternMatched(this.getId, this);
            //  this.getProfile();

            
            
        },
        // to get the profile id
        getId: function (oEvent) {
            // debugger
            var path = oEvent.getParameter("arguments").ID;
            this.Id=path
            this.addProfileData();
             console.log(path)
        },
        // leave and asset request fragment
            request:null,
            onRequest:function(){
                debugger
                if(!this.request){
                    this.request = new sap.ui.xmlfragment("EA.EmployeeApp2.view.Request",this);
                    this.getView().addDependent(this.request);
                }
                this.request.open();

            },
            // close the leave request fragment
            onClose:function(){
                this.request.close();
            },

            	onListItemPress: function (oEvent) {
                //  debugger
            var sToPageId = oEvent.getParameter("listItem").mProperties.title;

			this.byId("SplitApp").toDetail(this.createId(sToPageId));
        },

        //logout
         onLogout:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                        oRouter.navTo("RouteLogin");
           
            },


            //profile changes
            
        addProfileData:function(){
         //   debugger
         if(this.getOwnerComponent().getModel("profileModel")){
            var id=this.Id;
            var path=null
                  var detail = this.getOwnerComponent().getModel("profileModel").getProperty("/profile");
                 // console.log(detail)
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

            onOpenEdit:function(){
                debugger;
                var sForm = this.getView().byId("SmForm1");
                sForm.setVisible(false);

                 this.getView().byId("SmForm6").setVisible(false);

                var form = this.getView().byId("SimpleFormChange354");
                form.setVisible(true);


                var edit = this.getView().byId("edit");
                edit.setVisible(false);

                this.getView().byId("save").setVisible(true);
                this.getView().byId("cancel").setVisible(true);
           },

           handleCancelPress:function(){
               debugger;

               var form = this.getView().byId("SimpleFormChange354");
                form.setVisible(false);

                var sForm = this.getView().byId("SmForm1");
                sForm.setVisible(true);

                 var edit = this.getView().byId("edit");
                edit.setVisible(true);

                this.getView().byId("save").setVisible(false);
                this.getView().byId("cancel").setVisible(false);

                 this.getView().byId("SmForm6").setVisible(true);

               



           },
           handleSavePress:function(){
               debugger;
               var IntId = this.getView().byId("idInput").getValue();
               var IntName = this.getView().byId("nameInput").getValue();
               var IntPno = this.getView().byId("noInput").getValue();
               var IntAge = this.getView().byId("ageInput").getValue();
               var IntAdress = this.getView().byId("addInput").getValue();
               var IntCity = this.getView().byId("cityInput").getValue();

               
               
               
               var Payload = {};
               
               Payload.Eid = IntId;
               Payload.Fullname = IntName;
               Payload.Phoneno = IntPno;
               Payload.Age = IntAge;
               Payload.Address = IntAdress;
               Payload.City = IntCity ;
               
               this.profileUpdate(Payload)
              
                this.getView().byId("SmForm1").setVisible(true);

                var form = this.getView().byId("SimpleFormChange354");
                form.setVisible(false);

                 this.getView().byId("SmForm6").setVisible(true);

                  
                  this.getView().byId("edit").setVisible(true);
                 this.getView().byId("save").setVisible(false);
                 this.getView().byId("cancel").setVisible(false);




          
               
           }

            
		});
	});
