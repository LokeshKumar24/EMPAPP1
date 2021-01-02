sap.ui.define([
         "EA/EmployeeApp2/controller/BaseController",
        "sap/ui/model/json/JSONModel",
        "sap/base/Log",
        "sap/ui/core/Fragment"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController,JSONModel,Log,Fragment) {
		"use strict";

		return BaseController.extend("EA.EmployeeApp2.controller.SplitApp", {
			onInit: function () {
               // debugger;
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                 this.getView().setModel(new JSONModel(), "Rqst");
                 this.getView().setModel(new JSONModel(), "Asst");

            oRouter.attachRoutePatternMatched(this.getId, this);

            
            
        },
    
        //to get the profile id
        getId: function (oEvent) {
            // debugger
            var path = oEvent.getParameter("arguments").ID;
            this.Id=path
            // this.addProfileData();
             console.log(path)
        },

        

             onRequest: function () {
		//	debugger;
			var oView = this.getView();

			if (!this.byId("helloDialog")) {
				Fragment.load({
                    id: oView.getId(),
                    
					name: "EA.EmployeeApp2.view.Request",
					controller: this

				}).then(function (oDialog) {
					oView.addDependent(oDialog);
                    oDialog.open();
                    
				});
			} else {
				this.byId("helloDialog").open();
			}

        },
        
        onClose: function () {
			//debugger;
			this.getView().byId("helloDialog").close();

        },

            	onListItemPress: function (oEvent) {
                //  debugger
            var sToPageId = oEvent.getParameter("listItem").mProperties.title;

			this.byId("SplitApp").toDetail(this.createId(sToPageId));
        },

        notif:null,
            onOpenNoti:function(){
               // debugger;
                if(!this.notif){
                    this.notif = new sap.ui.xmlfragment("EA.EmployeeApp2.view.Notification",this);
                    this.getView().addDependent(this.notif);
                }
                this.notif.open();

            },

            
            onCloseN:function(){
                this.notif.close();
            },
           

        //logout
         onLogout:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                        oRouter.navTo("RouteLogin");
           
            },
                 onLeave:function(){
                     debugger;

                var Lid = this.getView().getModel("Rqst").getProperty("/RId");
                var Lname = this.getView().getModel("Rqst").getProperty("/name");
                var Ldate =  this.getView().getModel("Rqst").getProperty("/RDate");
                
                var Lreason = this.getView().getModel("Rqst").getProperty("/RLeave");
                var Lassets = "No";
                var ltype = "LEAVE";
   
                var Payload = {};
                
                Payload.Rid = Lid;
                Payload.Rdate = Ldate;
                Payload.Name = Lname;
                Payload.Reason = Lreason;
                Payload.Assets = Lassets;
                Payload.Type = ltype 
                
                
                this.updateRequest(Payload);
                this.getView().getModel("Rqst").setProperty("/RId","");
                this.getView().getModel("Rqst").setProperty("/name", "");
                this.getView().getModel("Rqst").setProperty("/RDate","");
                this.getView().getModel("Rqst").setProperty("/RLeave", "");
                
                 

               },

                 onAssets:function(){
                     debugger;

                var Aid = this.getView().getModel("Asst").getProperty("/AEid");
                var Aname = this.getView().getModel("Asst").getProperty("/AName");
                var Adate =  this.getView().getModel("Asst").getProperty("/ADate");
                
                var Areason = this.getView().getModel("Asst").getProperty("/AReason");
                var Aassets = this.getView().getModel("Asst").getProperty("/AAst");
                var ltype = "Assets";

             var Payload = {};

             Payload.Rid = Aid;
             Payload.Rdate = Adate;
             Payload.Name = Aname ;
             Payload.Reason = Areason;
             Payload.Assets = Aassets ;
             Payload.Type = ltype 

                    this.updateRequest(Payload);

                this.getView().getModel("Asst").setProperty("/AEid","");
                this.getView().getModel("Asst").setProperty("/AName", "");
                this.getView().getModel("Asst").setProperty("/ADate","");
                 this.getView().getModel("Asst").setProperty("/AAst","");
                this.getView().getModel("Asst").setProperty("/AReason", "");
               
                

                 },

            //profile changes
            
        // addProfileData:function(){
        //  //   debugger
        //  if(this.getOwnerComponent().getModel("profileModel")){
        //     var id=this.Id;
        //     var path=null
        //           var detail = this.getOwnerComponent().getModel("profileModel").getProperty("/profile");
        //          // console.log(detail)
        //           detail.map((element,index)=>{
        //               if(element.Eid===id){
        //                  // debugger
        //                 path = index;
        //             }
        //             detail[index].Picture = element.Picture.toLowerCase()
        //           })
        //           this.getOwnerComponent().setModel(new JSONModel({profile:detail}),"profileModel")
        //             this.getView().byId("ObjectPageLayout").bindElement("profileModel>/profile/"+path);
        //         }
        //     },

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

                this.getView().byId("SimpleFormChange354").setVisible(false);
                

                 this.getView().byId("SmForm6").setVisible(true);

                  
                  this.getView().byId("edit").setVisible(true);
                 this.getView().byId("save").setVisible(false);
                 this.getView().byId("cancel").setVisible(false);
    
           }

            
		});
	});
