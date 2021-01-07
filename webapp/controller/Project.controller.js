sap.ui.define([    
         "EA/EmployeeApp2/controller/BaseController",
          "sap/ui/core/Fragment"
         
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController,Fragment) {
		"use strict";

		return BaseController.extend("EA.EmployeeApp2.controller.Project", {
			onInit: function () {
            
            },
            
             // open Fragment for creating new project
              onProjectOpen: function () {
		//	debugger;
			var oView = this.getView();

			if (!this.byId("DialogCreateProject")) {
				Fragment.load({
                    id: oView.getId(),
                    
					name: "EA.EmployeeApp2.view.create",
					controller: this

				}).then(function (oDialog) {
					oView.addDependent(oDialog);
                    oDialog.open();
                    
				});
			} else {
				this.byId("DialogCreateProject").open();
			}

        },
        
        onClose: function () {
			//debugger;
			this.getView().byId("DialogCreateProject").close();

        },

        onProjectOpen3:function(){
            debugger;
            this.getView().byId("SimpleFormChange353").setVisible(true);
        },
         

        //Create new Data for Project
        onCreate:function(){
            debugger;
            var pid = this.getView().byId("Pid").getValue();
            var eid = this.getView().byId("eid").getValue();
            var name = this.getView().byId("name").getValue();
            var pname = this.getView().byId("Pname").getValue();
            var pdetails = this.getView().byId("pdetails").getValue();
            var sdate = this.getView().byId("PSDP").getValue();
            var edate = this.getView().byId("PEDP").getValue();
            var status = this.getView().byId("pstatus").getValue();

            // var nameV = /^[A-Z]{1}[a-z]+/;
          
           if ( pid == "") {

				this.getView().byId("Pid").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("Pid").setValueStateText("Please Enter Employee Id");

			} 
            else if ( pname  == "") {

				this.getView().byId("Pname").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("Pname").setValueStateText("Please Enter Date");

			}else if ( pdetails == "") {

				this.getView().byId("pdetails").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("pdetails").setValueStateText("Please Enter Project Details");

            }else if ( sdate  == "") {

				this.getView().byId("PSDP").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("PSDP").setValueStateText("Please Enter Start Date");

            }
            else if ( edate == "") {

				this.getView().byId("PEDP").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("PEDP").setValueStateText("Please Enter Due Date");

            }
            else if ( status == "") {

				this.getView().byId("pstatus").setValueState(sap.ui.core.ValueState.Error);
				this.getView().byId("pstatus").setValueStateText("Please Enter Status of your Project");

			}
           

            
            else{

                this.getView().byId("Pid").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("eid").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("name").setValueState(sap.ui.core.ValueState.None);
                this.getView().byId("Pname").setValueState(sap.ui.core.ValueState.None);
                this.getView().byId("pdetails").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("PSDP").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("PEDP").setValueState(sap.ui.core.ValueState.None);
				this.getView().byId("pstatus").setValueState(sap.ui.core.ValueState.None);
               
                var Payload = {};
                
                Payload.Pid = pid;
                Payload.Eid = eid;
                Payload.Name = name;
                Payload.Projectname = pname;
                Payload.Projectdetails = pdetails; 
                Payload.Startdate = sdate;
                Payload.Enddate = edate;
                Payload.Status = status;
                
                
                this.CreateProject(Payload);

                this.getView().byId("Pid").setValue("");
                //  this.getView().byId("eid").setValue("");
                //   this.getView().byId("name").setValue("");
                  this.getView().byId("Pname").setValue("");
            this.getView().byId("pdetails").setValue("");
            this.getView().byId("PSDP").setValue("");
            this.getView().byId("PEDP").setValue("");
            this.getView().byId("pstatus").setValue("");

                this.getView().byId("SimpleFormChange353").setVisible(false);
                // this.byId("idListItem").getBinding("items").refresh();
                // this. getProject();
               
            }

                

        },
        // edit project details
        onEdit:function(){
            debugger;
            
                         var oTable1 = this.byId("idListItem");
                         var oView = this.getView();
                        
                
                          var aArray = [];
                        
                        // var  idx = oTable1.getSelectedIndices();
                         var aItems = oTable1.getSelectedItems();
                          for(var i = 0; i < aItems.length; i++){
                    var edit = aItems[i].getAggregation("cells")[0].getProperty("editable");
                     if(aItems[i].getAggregation("cells")[0].getProperty("editable")==edit){
                        // aItems[i].getAggregation("cells")[0].setEditable(true);
                        aItems[i].getAggregation("cells")[1].setEditable(true);;
                       aItems[i].getAggregation("cells")[2].setEditable(true);
                       aItems[i].getAggregation("cells")[3].setEditable(true);
                      aItems[i].getAggregation("cells")[4].setEditable(true);
                      aItems[i].getAggregation("cells")[5].setEditable(true);
                      aItems[i].getAggregation("cells")[6].setEditable(true);
                      aItems[i].getAggregation("cells")[7].setEditable(true);

                     }

                     this.getView().byId("saveid").setVisible(true);

                     }


        },


                  // On Save Edit details of Project
                  onSaveP:function(){
                     debugger;
                     var oTable1 = this.byId("idListItem");
                         var oView = this.getView();
                        
                
                          var aArray = [];
                        
                        
                         var aItems = oTable1.getSelectedItems();
                          for(var i = 0; i < aItems.length; i++){
                    var edit = aItems[i].getAggregation("cells")[0].getProperty("editable");
                     if(aItems[i].getAggregation("cells")[0].getProperty("editable")==edit){
                        var sid = aItems[i].getAggregation("cells")[0].getProperty("value");
                        var eid =aItems[i].getAggregation("cells")[1].getProperty("value");
                         var name = aItems[i].getAggregation("cells")[2].getProperty("value");
                       var pname = aItems[i].getAggregation("cells")[3].getProperty("value");
                     var pdeta =  aItems[i].getAggregation("cells")[4].getProperty("value");
                      var sdate1 = aItems[i].getAggregation("cells")[5].getProperty("value");
                      var edate1 = aItems[i].getAggregation("cells")[6].getProperty("value");
                      var status1 = aItems[i].getAggregation("cells")[7].getProperty("value");


                       var Payload = {};
                
                Payload.Pid = sid;
                Payload.Eid = eid;
                Payload.Name = name;
                Payload.Projectname = pname;
                Payload.Projectdetails = pdeta; 
                Payload.Startdate = sdate1;
                Payload.Enddate = edate1;
                Payload.Status = status1;


                var oModel10 = this.getOwnerComponent().getModel();
                oModel10.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
                oModel10.setUseBatch(true);

                            
                oModel10.setDeferredGroups(["myGroupId"]); 
                var group =  oModel10.getDeferredGroups();
                            
                oModel10.setDeferredGroups(oModel10.getDeferredGroups().concat(["myGroupId"]));
                                
                var mParameters = {groupId:"myGroupId",success:function(odata, resp){
                                    console.log(resp);
                                    

                for(var x = 0; x < aItems.length; x++){
                    var edit = aItems[x].getAggregation("cells")[0].getProperty("editable");
                     if(aItems[x].getAggregation("cells")[0].getProperty("editable")==edit){
                        //  aArray.push(aItems[i].getAggregation("cells")[1].getProperty("value"));
                        // aItems[i].getAggregation("cells")[0].setEditable(true);
                        aItems[x].getAggregation("cells")[1].setEditable(false);
                        aItems[x].getAggregation("cells")[2].setEditable(false);
                        aItems[x].getAggregation("cells")[3].setEditable(false);
                        aItems[x].getAggregation("cells")[4].setEditable(false);
                        aItems[x].getAggregation("cells")[5].setEditable(false);
                        aItems[x].getAggregation("cells")[6].setEditable(false);
                        aItems[x].getAggregation("cells")[7].setEditable(false);
                     }
                    }
                },
                 error: function(odata, resp) {

                                       console.log(resp);
                        }};

                oModel10.update("/PROJECTSet('" + sid + "')", Payload, mParameters);

                     }

                     }

                     oModel10.submitChanges(mParameters);
                    sap.m.MessageBox.success("Updated Succesfully");
                     this.getView().byId("saveid").setVisible(false);


                 },

                 
                  // On Delete Project
                  onDelete:function(){
                     debugger;
                     var oTable1 = this.byId("idProjectListItem");
                         var oView = this.getView();
                        var that=this;
                
                          var aArray = [];
                        
                       
                         var aItems = oTable1.getSelectedItems();
                          for(var i = 0; i < aItems.length; i++){
                    var edit = aItems[i].getAggregation("cells")[0].getProperty("editable");
                     if(aItems[i].getAggregation("cells")[0].getProperty("editable")==edit){
                        var sid = aItems[i].getAggregation("cells")[0].getProperty("value");
                   
                var oModel10 = this.getOwnerComponent().getModel();
                oModel10.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
                oModel10.setUseBatch(true);

                            
                oModel10.setDeferredGroups(["myGroupId"]); 
                var group =  oModel10.getDeferredGroups();
                            
                oModel10.setDeferredGroups(oModel10.getDeferredGroups().concat(["myGroupId"]));
                                
                var mParameters = {groupId:"myGroupId",
                success:function(odata, resp){
                    that.getProject();
                      console.log(resp);
               
                },
                 error: function(odata, resp) {

                                       console.log(resp);
                        }};

                oModel10.remove("/PROJECTSet('" + sid + "')",  mParameters);

                    }

                     

                     }

                     oModel10.submitChanges(mParameters);
                    sap.m.MessageToast.show("Deleted Succesfully");
                    //  this.getView().byId("saveid").setVisible(false);
                    
                      this.byId("idProjectListItem").getBinding("items").refresh();


                 },

                 

       
              
        
            

		});
	});
