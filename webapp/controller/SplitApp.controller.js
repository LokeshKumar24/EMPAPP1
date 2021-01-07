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
        

    
		return BaseController.extend("EA.EmployeeApp2.controller.SplitApp", {
			onInit: function () {
               // debugger;
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                 this.getView().setModel(new JSONModel(), "Rqst");
                 this.getView().setModel(new JSONModel(), "Asst");

            oRouter.attachRoutePatternMatched(this.getId, this);

            
            
        },
   

        
    
    openMsgList: function () {
        debugger;

        

   if (!this.oPopover) {
    this.oPopover = sap.ui.xmlfragment("EA.EmployeeApp2.view.Notification", this);
    this.getView().addDependent(this.oPopover);
   }  
//    this._oPopover.openBy(oEvent.getSource());
          this.oPopover.open();
  },

    // openMsgList: function () {
	// 		// debugger;
    //         var oView = this.getView();
            
              

	// 		if (!this.byId("NotifDialog")) {
	// 			Fragment.load({
    //                 id: oView.getId(),
                    
	// 				name: "EA.EmployeeApp2.view.Notification",
	// 				controller: this

	// 			}).then(function (oDialog) {
	// 				oView.addDependent(oDialog);
    //                 oDialog.open();
                    
	// 			});
	// 		} else {
	// 			this.byId("NotifDialog").open();
	// 		}

    //     },
  onClosePopover:function(){
    //   debugger;
     this.oPopover.close();
    //   this.getView().byId("NotifDialog").close();

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
			debugger;
            var oView = this.getView();
             var data=    this.getOwnerComponent().getModel("requestModel").getProperty("/request");
             var ndata=[]
             data.map((element,index)=>{
                if(element.Eid===this.Id){
                    ndata.push(element);
                }
             });
               this.getOwnerComponent().setModel(new JSONModel({request:ndata}),"requestModel");

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
         // To Open Request Fragment
        notif:null,
            onOpenNoti:function(){
               // debugger;
                if(!this.notif){
                    this.notif = new sap.ui.xmlfragment("EA.EmployeeApp2.view.Notification",this);
                    this.getView().addDependent(this.notif);
                }
                this.notif.open();

            },

            // To Close Fragment
            onCloseN:function(){
                this.notif.close();
            },
           

        //logout
         onLogout:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                        oRouter.navTo("RouteLogin");
           
            },
             // For Leave Request
                 onLeave:function(){
                     debugger;

                // var Lid = this.getView().getModel("Rqst").getProperty("/RId");
                var Lid = this.getView().byId("lid").getValue();
                var Lname = this.getView().byId("lname").getValue();
                var Ldate =  this.getView().byId("lDP1").getValue();
                
                var Lreason = this.getView().byId("lReason").getValue();
                var Lassets = "No Assets";
                var ltype = "LEAVE";

                 var nameV = /^[A-Z]{1}[a-z]+/;

                 if (Lid == "" && Lname == "" && Ldate ==""  && Lreason== "") {
				MessageToast.show("Please Fill all fields");
				this.getView().byId("lid").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("lname").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("lDP1").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("lReason").setValueState(sap.ui.core.ValueState.Error);
				

			}else if ( Ldate == "") {

				this.getView().byId("lDP1").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("lDP1").setValueStateText("Please Enter Date");

			}else if ( Lreason == "") {

				this.getView().byId("lReason").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("lReason").setValueStateText("Please Enter Leave Reason");

			}


              else{

				this.getView().byId("lDP1").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("lReason").setValueState(sap.ui.core.ValueState.None);

                var Payload = {};
                var random= Math.floor((Math.random() * 100000) + 1)
                Payload.Eid = Lid;
                Payload.Rdate = Ldate;
                Payload.Name = Lname;
                Payload.Reason = Lreason;
                Payload.Assets = Lassets;
                Payload.Type = ltype 
                Payload.Rid= Lid+random;
                
                
                this.updateRequest(Payload);
                this.getView().byId("lDP1").setValue("");
                this.getView().byId("lReason").setValue("");
                MessageToast.show("Leave Request Send SuccesFully!");
                
                this.byId("idListItem").getBinding("items").refresh();
                this. getRequest();

               
                
              }   

               },
                // For Assets Request
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
				
				this.getView().byId("date3").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("InputAssetsReason").setValueState(sap.ui.core.ValueState.Error);
                this.getView().byId("InputAssets").setValueState(sap.ui.core.ValueState.Error);
				
                

			}else if ( Adate == "") {

				this.getView().byId("date3").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("date3").setValueStateText("Please Enter Date");

			}else if ( Areason == "") {

				this.getView().byId("InputAssetsReason").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("InputAssetsReason").setValueStateText("Please Enter Leave Reason");

            }else if ( Aassets == "") {

				this.getView().byId("InputAssets").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("InputAssets").setValueStateText("Please Enter Leave Reason");

			}


         else{

				this.getView().byId("date3").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("InputAssetsReason").setValueState(sap.ui.core.ValueState.None);
                this.getView().byId("InputAssets").setValueState(sap.ui.core.ValueState.None);

             var Payload = {};
                var random= Math.floor((Math.random() * 100000) + 1)
             Payload.Eid = Aid;
             Payload.Rdate = Adate;
             Payload.Name = Aname ;
             Payload.Reason = Areason;
             Payload.Assets = Aassets ;
             Payload.Type = ltype ;
             Payload.Rid = Aid+random;

            this.updateRequest(Payload);

            this.getView().getModel("Asst").setProperty("/ADate","");
            this.getView().getModel("Asst").setProperty("/AAst","");
            this.getView().getModel("Asst").setProperty("/AReason", "");
            MessageToast.show("Assets Request Send SuccesFully!");
                
            }

        },

        
           // For Open Editable Form In Profile View
            onOpenEdit:function(){
                debugger;
                this.getView().byId("section1").setVisible(false);
                this.getView().byId("section2").setVisible(false);
                this.getView().byId("section3").setVisible(true);

                this.getView().byId("edit").setVisible(false);
                this.getView().byId("save").setVisible(true);
                this.getView().byId("cancel").setVisible(true);

             },
            // For Cancel Profile Edit Form
           handleCancelPress:function(){
               debugger;
                this.getView().byId("section1").setVisible(true);
                this.getView().byId("section2").setVisible(true);
                this.getView().byId("section3").setVisible(false);

                this.getView().byId("edit").setVisible(true);
                this.getView().byId("save").setVisible(false);
                this.getView().byId("cancel").setVisible(false);

            },
           handleSavePress:function(){
               debugger;
               var IntId = this.getView().byId("idInput").getValue();
               var IntName = this.getView().byId("nameInput").getValue();
               var IntPno = this.getView().byId("noInput").getValue();
               var IntAge = this.getView().byId("ageInput").getValue();
               var IntAdress = this.getView().byId("addInput").getValue();
               var IntCity = this.getView().byId("cityInput").getValue();
               var IntCompLocation = this.getView().byId("compLoct").getValue();
               var IntProject = this.getView().byId("projectId").getValue();



             var IDM = /^[A-Z]{2}[0-9]{4}$/;
			 var nameV = /^[A-Z]{1}[a-z]+/;
			 var mobilevalidation = /^[0-9]{10}$/;
			 var mobile2 = /^[789]\d{9}$/;
             var re = /(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d).{9,}/;

             if (IntName == "" && IntPno == "" && IntAge =="" && IntAdress== "" && IntCity == "" && IntCompLocation =="" && IntProject == "") {
				MessageToast.show("Please Fill all fields");
				this.getView().byId("idInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("nameInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("noInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("ageInput").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("addInput").setValueState(sap.ui.core.ValueState.Error);
                this.getView().byId("cityInput").setValueState(sap.ui.core.ValueState.Error);
                this.getView().byId("compLoct").setValueState(sap.ui.core.ValueState.Error);
                this.getView().byId("projectId").setValueState(sap.ui.core.ValueState.Error);
				

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
				this.getView().byId("cityInput").setValueStateText("Please Enter City");

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
            else if( IntCompLocation  === ""){
              this.getView().byId("compLoct").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("compLoct").setValueStateText("Please Enter Employee Address");

            } 
            else if( IntProject === ""){
              this.getView().byId("projectId").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("projectId").setValueStateText("Please Enter Employee Address");

            } 

            else{  
                this.getView().byId("idInput").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("nameInput").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("noInput").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("ageInput").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("addInput").setValueState(sap.ui.core.ValueState.None);
                this.getView().byId("cityInput").setValueState(sap.ui.core.ValueState.None);
                this.getView().byId("compLoct").setValueState(sap.ui.core.ValueState.None);
                this.getView().byId("projectId").setValueState(sap.ui.core.ValueState.None);




               var Payload = {};
               
               Payload.Eid = IntId;
               Payload.Fullname = IntName;
               Payload.Phoneno = IntPno;
               Payload.Age = IntAge;
               Payload.Address = IntAdress;
               Payload.City = IntCity ;
               Payload.Complocation = IntCompLocation;
               Payload.Project = IntProject;
               
                this.profileUpdate(Payload)

                this.getView().byId("section1").setVisible(true);
                this.getView().byId("section2").setVisible(true);
                this.getView().byId("section3").setVisible(false);

                  
                this.getView().byId("edit").setVisible(true);
                this.getView().byId("save").setVisible(false);
                this.getView().byId("cancel").setVisible(false);

             }
    
           },

           onChangeName:function(){
               debugger;
               var name = this.getView().byId("nameInput").getValue();
                if (name =="") {
                 
                  this.getView().byId("nameInput").setValueState(sap.ui.core.ValueState.Error);  // if the field is empty after change, it will go red
                  this.getView().byId("nameInput").setValueStateText("Please Enter Employee Name");
            }
              else {
                 
                  this.getView().byId("nameInput").setValueState(sap.ui.core.ValueState.None); // if the field is not empty after change, the value state (if any) is removed
            }
           },

            onChangeNumber:function(){
               debugger;
               var CNO = this.getView().byId("noInput").getValue();
                if (CNO=="") {
                 
                  this.getView().byId("noInput").setValueState(sap.ui.core.ValueState.Error); 
                  this.getView().byId("noInput").setValueStateText("Please Enter Employee Contact No");
 
            }
              else {
                 
                  this.getView().byId("noInput").setValueState(sap.ui.core.ValueState.None); 
            }
           },

            onChangeAge:function(){
               debugger;
               var Cage = this.getView().byId("ageInput").getValue();
                if (Cage =="") {
                 
                  this.getView().byId("ageInput").setValueState(sap.ui.core.ValueState.Error); 
                  this.getView().byId("ageInput").setValueStateText("Please Enter Employee Age");
 
            }
              else {
                 
                  this.getView().byId("ageInput").setValueState(sap.ui.core.ValueState.None);  
            }
           },
           onChangeAdrees:function(){
               debugger;
               var Cage = this.getView().byId("addInput").getValue();
                if (Cage =="") {
                 
                  this.getView().byId("addInput").setValueState(sap.ui.core.ValueState.Error); 
                  this.getView().byId("addInput").setValueStateText("Please Enter Adress");
 
            }
              else {
                 
                  this.getView().byId("addInput").setValueState(sap.ui.core.ValueState.None);  
            }
           },
           onChangeCity:function(){
               debugger;
                var City = this.getView().byId("cityInput").getValue();
                if (City =="") {
                 
                  this.getView().byId("cityInput").setValueState(sap.ui.core.ValueState.Error); 
                  this.getView().byId("cityInput").setValueStateText("Please Enter City");
 
            }
              else {
                 
                  this.getView().byId("cityInput").setValueState(sap.ui.core.ValueState.None);  
            }
           },

           onChangeComp:function(){
               debugger;
                var CL = this.getView().byId("compLoct").getValue();
                if (CL =="") {
                 
                  this.getView().byId("compLoct").setValueState(sap.ui.core.ValueState.Error); 
                  this.getView().byId("compLoct").setValueStateText("Please Enter Company Location");
 
            }
              else {
                 
                  this.getView().byId("compLoct").setValueState(sap.ui.core.ValueState.None);  
            }
           },

           onChangeProject:function(){
               debugger;
                var CPR = this.getView().byId("projectId").getValue();
                if (CPR =="") {
                 
                  this.getView().byId("projectId").setValueState(sap.ui.core.ValueState.Error); 
                  this.getView().byId("projectId").setValueStateText("Please Enter Project Name");
 
            }
              else {
                 
                  this.getView().byId("projectId").setValueState(sap.ui.core.ValueState.None);  
            }
           }


        //    onChange: function () {
		// 	debugger;
		// 	var today = today = new Date();
		// 	var day = today.getDate(),
		// 		month = today.getMonth() + 1; //January is 0
		// 	var year = today.getFullYear();

		// 	if (day < 10) {
		// 		day = "0" + day;
		// 	}
		// 	if (month < 10) {
		// 		month = "0" + month;
		// 	}
		// 	today = day + "-" + month + "-" + year;

		// 	this.byId("lDP1").setMinDate(new Date());

		// }
           

            
		});
	});
