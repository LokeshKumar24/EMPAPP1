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
                      that.getOwnerComponent().setModel(new JSONModel({login:data.results}),"loginModel");  
                                   
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

            //update login
             updateLogin:function(id,npass){
                 debugger
                var that = this;
                var Payload={
                    Eid:id,
                    Password:npass
                }
              var serviceurl="/sap/opu/odata/sap/ZAPP_EMP1_SRV/";

             var oJModel =  new sap.ui.model.odata.ODataModel(serviceurl);
      
            var data=oJModel.update("/LOGINSet('"+Payload.Eid+"')",Payload, {
                method:"PUT",
                success:function(data){
                  that.getLogin();  
                                   
                },
                error:function(){
                    alert("Login data is not updated");
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
                that.getOwnerComponent().setModel(new JSONModel({home:data.results}),"homeModel");  
                      
                },
                error:function(){
                    alert("Home data is not received");
                }
            });

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
             that.getOwnerComponent().setModel(new JSONModel({project:data.results}),"projectModel");                    
                },
                error:function(){
                    alert("Project data is not received");
                }
            });

            },

            //get others data
            getRequest:function(){
               // debugger
                  var that = this;
                  
              var serviceurl="/sap/opu/odata/sap/ZAPP_EMP1_SRV/";

             var oJModel =  new sap.ui.model.odata.ODataModel(serviceurl);
      
            var data=oJModel.read("/REQUESTSet", {
                success:function(data){
                    // debugger;
                    
                     console.log(data.results)
             that.getOwnerComponent().setModel(new JSONModel({request:data.results}),"requestModel");
                    // that.getDataT(data);
                    
                                   
                },
                error:function(){
                    alert("Request data is not received");
                }
            });

            },
           
            // file data
             getFileData:function(){
               // debugger
                  var that = this;
                  
              var serviceurl="/sap/opu/odata/sap/ZAPP_EMP1_SRV/";

             var oJModel =  new sap.ui.model.odata.ODataModel(serviceurl);
      
            var data=oJModel.read("/FILEASSOCATESet", {
                success:function(data){
                    // debugger;
                     console.log("data")
                     console.log(data.results)
              that.getOwnerComponent().setModel(new JSONModel({request:data.results}),"fileNameModel");
                    // that.getDataT(data);
                    
                                   
                },
                error:function(){
                    alert("files data is not received");
                }
            });

            },
            updateFileAssociate(fileName){
                debugger
                    var that = this;
                    var payLoad={};
                    var date= new Date();

                    payLoad.Eid= this.getOwnerComponent().getModel("emp").getProperty("/data/0/id");
                    payLoad.Employeename=this.getOwnerComponent().getModel("emp").getProperty("/data/0/name");
                    payLoad.Filename=fileName;
                     payLoad.Creationdate= date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                    
                  
              var serviceurl="/sap/opu/odata/sap/ZAPP_EMP1_SRV/";

             var oJModel =  new sap.ui.model.odata.ODataModel(serviceurl);
      
            var data=oJModel.create("/FILEASSOCATESet",payLoad, {
                method:"POST",
                success:function(data){
                    // debugger;
                     console.log("data")
                     console.log(data.results)
             
                    that.getFileData();
                    
                                   
                },
                error:function(){
                    alert("files data is not received");
                }
            });
            },
            // get specific file data
              getFile:function(fileName){
               debugger;
              fileName= fileName.toLowerCase()
                  var that = this;
                  var serviceurl="/sap/opu/odata/sap/ZAPP_EMP1_SRV/";
                
                var oModel =  new sap.ui.model.odata.ODataModel(serviceurl);
                 oModel .read("/FILESet('"+fileName+"')/$value",{
                     method: "GET",
                     success: function(data) {
                    // alert("success");
                     console.log(data)
                     var fName=data.Filename
                     var fType=data.Filetype
                     var fContent=null;
                     if(fType==="image/png"){
                        fContent= data.Filecontent
                     }
                     else{

                         var ndata= data.Filecontent.split(",");
                                     ndata=ndata[1];
                          fContent=atob(ndata);
                     }
                     if(fType==="text/plain" || fType===""){
                     sap.ui.core.util.File.save(fContent,fName.replace(".txt",""),"txt",fType,"utf-8",true)
                //    var tab=  window.open("_blank");
                //    tab.document.write("<p>"+fContent+"</p>");
                //    tab.document.close();
                //  var url=URL.createObjectURL(fContent)
                //          window.open(url,"_blank");
                    }
                     else{
                         var byteNumbers= new Array(fContent.length);
                         for (let index = 0; index < fContent.length; index++) {
                             byteNumbers[index]=fContent.charCodeAt(index)
                             
                         }
                         var byteArray= new Uint8Array(byteNumbers)
                         var blob= new Blob([byteArray],{type:fType});
                         var url=URL.createObjectURL(blob)
                         window.open(url,"_blank");
                     }
                    sap.m.MessageToast.show("FILE Downloaded Succesfully");
                       // that.createFile(eid,fileName)
                     },
                     error: function(e) {
                         console.log(e)
                      alert("error");
                    } 
                 })
                },
             
            //profile update
            profileUpdate(Payload){
                 var serviceurl="/sap/opu/odata/sap/ZAPP_EMP1_SRV/";
                var that=this;
               var oPModel =  new sap.ui.model.odata.ODataModel(serviceurl);
              oPModel .update("/PROFILESet('"+Payload.Eid+"')", Payload, {
                     method: "PUT",
                     success: function(data) {
                    //   alert("success");
                    that.getProfile();
                    sap.m.MessageToast.show("Profile Data Updated Succesfully!");
                    },
                     error: function(e) {
                      alert("error");
                    }
                });

            },

            //request update
            updateRequest:function(Payload){
                
                var serviceurl="/sap/opu/odata/sap/ZAPP_EMP1_SRV/";
                var that =this;
                var oLModel =  new sap.ui.model.odata.ODataModel(serviceurl);
                 oLModel .create("/REQUESTSet", Payload, {
                     method: "POST",
                     success: function(data) {
                         that.getRequest();
                     alert("success");
                    sap.m.MessageToast.show("Request Send Succesfully");
                    },
                     error: function(e) {
                      alert("error");
                    }
                });
            },

            // new and upate a file
            updateFile:function(eid,fileName, fileType, vContent){
                debugger
                var payLoad={
                    Eid:eid,
                    Filename:fileName,
                    Filetype:fileType,
                    Filecontent:vContent

                }
                  var that = this;
                  var serviceurl="/sap/opu/odata/sap/ZAPP_EMP1_SRV/";
                
                var oModel =  new sap.ui.model.odata.ODataModel(serviceurl);
                 oModel .update("/FILESet('"+payLoad.Filename+"')/$value", payLoad,{
                     method: "PUT",
                     success: function(data) {
                     alert("success");
                     that.getFileData();
                     that.updateFileAssociate(fileName);
                    sap.m.MessageToast.show("FILE UPDATED Succesfully");
                       // that.createFile(eid,fileName)
                     },
                     error: function(e) {
                      alert("error");
                    }
                 })
                },
              

                    

                
                     
            // new project

            CreateProject:function(Payload){
                debugger;
                var serviceurl="/sap/opu/odata/sap/ZAPP_EMP1_SRV/";
                var that=this;
                var oPRModel =  new sap.ui.model.odata.ODataModel(serviceurl);
                 oPRModel .create("/PROJECTSet", Payload, {
                     method: "POST",
                     success: function(data) {
                    //  alert("success");
                     that.getProject();
                    sap.m.MessageToast.show("New Project Added Succesfully!!!");
                    },
                     error: function(e) {
                      alert("error");
                    }
                 });
                
                 
               


            },
            dateFormat:function(){
               // debugger
           var data=    this.getOwnerComponent().getModel("fileNameModel").getProperty("/request");
                data.map((element,index)=>{
                    data[index].Creationdate= element.Creationdate.slice(0,10)
                });
                this.getOwnerComponent().setModel(new JSONModel({request:data}),"fileNameModel");
            }
		});
	});
