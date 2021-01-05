sap.ui.define([
         "EA/EmployeeApp2/controller/BaseController",
        "sap/ui/model/json/JSONModel",
        "sap/base/Log",
        "sap/ui/core/Fragment",
         'sap/m/MessagePopover',
  'sap/m/MessagePopoverItem',
  'sap/m/MessageToast'
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController,JSONModel,Log,Fragment,MessagePopover,MessagePopoverItem,MessageToast) {
        "use strict";
        

         var oMessagePopover = new MessagePopover({
    items: {
      path: "requestModel>/request",
      template: new sap.m.StandardListItem({
        description: "{requestModel>Reason}",
        type: "{requestModel>Name}",
        title: "{requestModel>Rid}"
      })
    }
  });

// oMessagePopover.setModel(sap.ui.getCore().getMessageManager().getMessageModel(), "requestModel");
oMessagePopover.setModel("requestModel");
		return BaseController.extend("EA.EmployeeApp2.controller.SplitApp", {
			onInit: function () {
               // debugger;
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                 this.getView().setModel(new JSONModel(), "Rqst");
                 this.getView().setModel(new JSONModel(), "Asst");

            oRouter.attachRoutePatternMatched(this.getId, this);

            
            
        },
    //      openMsgList: function(oEvent) {
    //          debugger;
    //       oMessagePopover.openBy(oEvent.getSource());

        
    // },
    openMsgList: function (oEvent) {
        debugger;

        

   if (!this._oPopover) {
    this._oPopover = sap.ui.xmlfragment("EA.EmployeeApp2.view.create", this);
    this.getView().addDependent(this._oPopover);
   }  
   this._oPopover.openBy(oEvent.getSource());
  },
  onClosePopover:function(){
      debugger;
      this._oPopover.close();

  },
    
        //to get the profile id
        getId: function (oEvent) {
            debugger
            var path = oEvent.getParameter("arguments").ID;
            this.Id=path
            // this.addProfileData();
             console.log(path)

             var oRModel = this.getOwnerComponent().getModel("requestModel").getProperty("/request");
             for (var x= 0; x<oRModel.length; x++){
                 if(oRModel[x].Rid == path){
                     var id = oRModel[x].Rid;
                     var name = oRModel[x].Name;
                     var reason = oRModel[x].Reason;

                     var i= this.getView().byId("text1").getText();
                 }
             }
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

                // var Lid = this.getView().getModel("Rqst").getProperty("/RId");
                var Lid = this.getView().byId("lid").getValue();
                var Lname = this.getView().byId("lname").getValue();
                var Ldate =  this.getView().byId("lDP1").getValue();
                
                var Lreason = this.getView().byId("lReason").getValue();
                var Lassets = "No";
                var ltype = "LEAVE";

                 var nameV = /^[A-Z]{1}[a-z]+/;

                 if (Lid == "" && Lname == "" && Ldate ==""  && Lreason== "") {
				MessageToast.show("Please Fill all fields");
				this.getView().byId("lid").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("lname").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("lDP1").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("lReason").setValueState(sap.ui.core.ValueState.Error);
				

			} else if ( Lid == "") {

				this.getView().byId("lid").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("lid").setValueStateText("Please Enter Employee Id");

			} else if ( Lname == "") {

				this.getView().byId("lname").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("lname").setValueStateText("Please Enter Employee Name");

			} else if ( Ldate == "") {

				this.getView().byId("lDP1").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("lDP1").setValueStateText("Please Enter Date");

			}else if ( Lreason == "") {

				this.getView().byId("lReason").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("lReason").setValueStateText("Please Enter Leave Reason");

			}else if (!nameV.test(Lname)) {

				this.getView().byId("lname").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("lname").setValueStateText("Name Must Start with Uppercase Letters");

			}





              else{

                this.getView().byId("lid").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("lname").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("lDP1").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("lReason").setValueState(sap.ui.core.ValueState.None);

                var Payload = {};
                
                Payload.Rid = Lid;
                Payload.Rdate = Ldate;
                Payload.Name = Lname;
                Payload.Reason = Lreason;
                Payload.Assets = Lassets;
                Payload.Type = ltype 
                
                
                this.updateRequest(Payload);

                this.getView().byId("lid").setValue("");
                this.getView().byId("lname").setValue("");
                this.getView().byId("lDP1").setValue("");
                this.getView().byId("lReason").setValue("");

               
                
              }   

               },

                 onAssets:function(){
                     debugger;
                var Aid = this.getView().byId("InputId1").getValue();
                var Aname = this.getView().byId("InputName2").getValue();
                var Adate =  this.getView().byId("date3").getValue();
                
                var Areason = this.getView().byId("InputAssetsReason").getValue();
                var Aassets = this.getView().byId("InputAssets").getValue();
                var ltype = "Assets";
                 var nameV = /^[A-Z]{1}[a-z]+/;

                

                
                   if (Aid == "" && Aname == "" && Adate ==""  && Areason== "" && Aassets == "") {
				MessageToast.show("Please Fill all fields");
				this.getView().byId("InputId1").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("InputName2").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("date3").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("InputAssetsReason").setValueState(sap.ui.core.ValueState.Error);
                this.getView().byId("InputAssets").setValueState(sap.ui.core.ValueState.Error);
				
                

			} else if ( Aid == "") {

				this.getView().byId("InputId1").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("InputId1").setValueStateText("Please Enter Employee Id");

			} else if ( Aname == "") {

				this.getView().byId("InputName2").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("InputName2").setValueStateText("Please Enter Employee Name");

			} else if ( Adate == "") {

				this.getView().byId("date3").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("date3").setValueStateText("Please Enter Date");

			}else if ( Areason == "") {

				this.getView().byId("InputAssetsReason").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("InputAssetsReason").setValueStateText("Please Enter Leave Reason");

            }else if ( Aassets == "") {

				this.getView().byId("InputAssets").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("InputAssets").setValueStateText("Please Enter Leave Reason");

			}
            else if (!nameV.test(Aname)) {

				this.getView().byId("InputName2").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("InputName2").setValueStateText("Name Must Start with Uppercase Letters");

			}


         else{

                this.getView().byId("InputId1").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("InputName2").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("date3").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("InputAssetsReason").setValueState(sap.ui.core.ValueState.None);
                this.getView().byId("InputAssets").setValueState(sap.ui.core.ValueState.None);

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
               
         }

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


             var IDM = /^[A-Z]{2}[0-9]{4}$/;
			 var nameV = /^[A-Z]{1}[a-z]+/;
			 var mobilevalidation = /^[0-9]{10}$/;
			 var mobile2 = /^[789]\d{9}$/;
             var re = /(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d).{9,}/;

             if (IntName == "" && IntPno == "" && IntAge =="" && IntAdress== "" && IntCity == "") {
				MessageToast.show("Please Fill all fields");
				this.getView().byId("idInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("nameInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("noInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("ageInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("addInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("cityInput").setValueState(sap.ui.core.ValueState.Error);
				

			} else if ( IntName === "") {

				this.getView().byId("nameInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("nameInput").setValueStateText("Please Enter Employee Name");

			}else if (IntPno === "") {

				this.getView().byId("noInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("noInput").setValueStateText("Please Enter Employee Contact No");

			} else if (IntAge  === "") {

				this.getView().byId("ageInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("ageInput").setValueStateText("Please Enter Employee Age");

			} else if (IntAdress === "") {

				this.getView().byId("addInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("addInput").setValueStateText("Please Enter Employee Address");

			} else if( IntCity === ""){
              this.getView().byId("cityInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("cityInput").setValueStateText("Please Enter Employee Address");

            } else if (!nameV.test(IntName)) {

				this.getView().byId("nameInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("nameInput").setValueStateText("Name Must Start with Uppercase Letters");

			}else if (!mobilevalidation.test(IntPno)) {

				this.getView().byId("noInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("noInput").setValueStateText("Number Must Be 10 Digits");

			} else if (!mobile2.test(IntPno)) {

				this.getView().byId("noInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("noInput").setValueStateText("Please Enter Valid Number");

			} else if (IntAge < 18 || IntAge > 55) {

				this.getView().byId("ageInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("ageInput").setValueStateText("Age Must Be Greater Than 18  and Less than 55");

			}






            


               
               
             else{  
                 this.getView().byId("idInput").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("nameInput").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("noInput").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("ageInput").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("addInput").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("cityInput").setValueState(sap.ui.core.ValueState.None);




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
    
           }

            
		});
	});
