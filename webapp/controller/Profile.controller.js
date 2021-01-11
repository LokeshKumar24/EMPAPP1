sap.ui.define([
         "EA/EmployeeApp2/controller/SplitApp.controller",
        "sap/ui/model/json/JSONModel",
        "sap/m/Dialog"
        
        
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (SplitAppController,JSONModel,Dialog) {
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
                debugger;
                 var date= new Date();
                 var today = date.getDate();
                // today = today.toString()
           var data=   this.getOwnerComponent().getModel("profileModel").getProperty("/profile");
           data.map((element=>{
               var birthd =Number( element.Dob.slice(8));
               if(birthd == today ){
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
                       that.dateFormat();              
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

            // takePhoto: function() {
            //     debugger;
            //     //step1 : Create PopUp Object as a Global Variable
            //     var that = this;
            //     this.fixedDialog = new Dialog({
            //         title:"Click on Capture to take a Picture",
            //         beginButton:new sap.m.Button({
            //             text:"Capture Photo",
            //             press:function(){
            //                 that.imageVal = document.getElementById("player")
            //                 that.fixedDialog.close();
            //             }
            //         }),
            //         content:[

            //             new sap.ui.core.HTML({
            //                 content:"<video id='player' autoplay ></video>"
            //             }),
            //             new sap.m.Input({
            //                 placeholder:'please enter image here',
            //                 required:true
            //             })
            //         ],
            //         endButton:new sap.m.Button({
            //             text:"Cancel",
            //             press:function(){
            //                  that.fixedDialog.close();
            //             }                    
            //         })

            //     }) ;

            //     this.getView().addDepenedent(this.fixedDialog);
            //   this.fixedDialog.open();  

            //   this.fixedDialog.attachBeforeClose(this.setImage,this);

            //   var handelSuccess:function(stream){
            //     //   debugger;
            //       palyer.srcObject = stream;

            //   }

            //   navigator.mediaDevices.getUserMedia({
            //       video:true
            //   }).then(handelSuccess)
            // },

            // setImage:function(){
            //     debugger;
            //     var oVbox = this.getView().byId("wow");
            //     var items = oVbox.getItems();
            //     var snapId = 'anjum-'+items.length;
            //     var textId = snapId + '-text';
            //     var imageval = this.imageVal;

            //     var oCanvas = new sap.ui.core.HTML({
            //         content:"<canvas id='" + snapId + "'  width='320px' height='320px' " +
            //         "style='2px solid red'></canvas>" +
            //         "<label id='" + textId + "'>" + this.attachName + "</label>"'
            //     })

            //     oVbox.addItem(oCanvas);
            //     oCanvas.addEventDeleget({
            //         onAfterRendering :function(){
            //             var snapShotcanvas = document.getElementById(snapId);
            //             var oContext = snapShotcanvas.getContext('2d');
            //             oContext.drawImage(imageval,0,0, snapShotcanvas.width, snapShotcanvas.height);
            //         }
            //     });
                
            // },


        
         onCapture: function() {
             debugger;
        navigator.camera.getPicture(this.onSuccess, this.onFail, {
            quality: 75,
            targetWidth: 300,
            targetHeight: 300,
            sourceType: navigator.camera.PictureSourceType.CAMERA,
            destinationType: navigator.camera.DestinationType.FILE_URI
        });
    },
    onSelect: function() {
        debugger;
        navigator.camera.getPicture(this.onSuccess, this.onFail, {
            quality: 75,
            targetWidth: 300,
            targetHeight: 300,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: navigator.camera.DestinationType.FILE_URI
        });
    },
    onSuccess: function(imageData) {
        debugger;
        var imageId = oView.byId("myImage");
        imageId.setSrc(imageData);

    },
    onFail: function(message) {
        debugger;
        alert("Failed because: " + message);
    },
    


       
             
		});
	});
