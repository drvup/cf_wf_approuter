 sap.ui.define(["sap/ui/core/mvc/Controller",
 	"sap/ui/core/Fragment",
 	"sap/m/Button",
 	"sap/m/Dialog",
 	"sap/ui/core/format/DateFormat",
	"com/sap/cloud/workflow/wfl006/reviewBuPa/formatter/Formatter"
 ], function (Controller, Fragment, Button, Dialog, DateFormat, Formatter) {
 	"use strict";

 	return Controller.extend("com.sap.cloud.workflow.wfl006.reviewBuPa.controller.reviewBuPa", {
 		formatter: Formatter,
 		
 		onInit: function () {},

		onPressPersonIcon: function (){
			var GUID 	= this.getView().byId("PersonSectionSS1").data("GUID");
			var Entity 	= this.getView().byId("PersonSectionSS1").data("Entity"); 
			var ModelName  = this.getView().byId("PersonSectionSS1").data("Model"); 

			console.log("Guid: "+GUID+"   Entity: "+Entity+"    Model: "+ModelName+"");

			if (GUID !== '' ){
				this.getExtendData(GUID,ModelName,Entity);
				console.log(this.getView().getModel(ModelName).oData);
			}

		},

		onPressPersonIconSave: function (){
			var sGUID 	= this.getView().byId("PersonSectionSS1").data("GUID");
			var sEntity = this.getView().byId("PersonSectionSS1").data("Entity"); 
			var sModel  = this.getView().byId("PersonSectionSS1").data("Model");

			var oData = this.getView().getModel(sModel).oData;
			var sPath= "/s1011/mdmbupa/API_BUSINESS_PARTNER/" + sEntity + "(guid'" + sGUID + "')";

			if (oData !== ''){
				this.patchData(sPath,oData);
			}

		},

		patchData: function (sPath,oJSON){

			$.ajax({
				url: sPath,
				type: "PATCH",
				data: oJSON,
				dataType: "text",
				contentType: "text/json; charset=\"utf-8\"",
				success: function (data, textStatus, jqXHR) {
					console.log(data);
					console.log(textStatus);
				},
				error: function (data, xhr, status) {
					console.log(status);
					console.log(data);
				},
				complete: function (xhr, status) {
					console.log(status);
				}
			});

		},
		 
		getExtendData: function (DataGUID, sModel, sEntity) {

			var oView = this.getView();
			var oModel = this.getView().getModel(sModel);
			oView.setModel(oModel, sModel );
			oView.bindElement({
				path: "/" + sEntity + "(guid'" + DataGUID + "')",
				model: sModel,
				events: {
					dataRequested: function () {
						oView.setBusyIndicatorDelay(0);
						oView.setBusy(true);
					},
					dataReceived: function (oData) {
						oView.setBusy(false);
						var oDataJSON = new sap.ui.model.json.JSONModel();
						oDataJSON.setData(oData.getParameter("data"));
						this.oModel.oData = oDataJSON.getData();
					}
				}
			});

			this.getView().getModel(sModel).refresh();
		},

 		//ADO 61127 - AddPayementDetails
 		addAccountingDialog: function () {
 			if (!this._oAddAccountDialog) {
 				this._oAddAccountDialog = sap.ui.xmlfragment("com.sap.cloud.workflow.wfl006.reviewBuPa.fragments.addAccData", this);
 			}

 			this.getView().addDependent(this._oAddAccountDialog);
 			this._oAddAccountDialog.open();
 		},

 		onAccCancel: function () {
 			if (this._oAddAccountDialog) {
 				this._oAddAccountDialog.close();
 			}
 		},

 		onPressVHCountry: function (oEvent) {
 			var oItem = oEvent.getSource();

 			if (!this._oValueHelpDialogCountry) {
 				Fragment.load({
 					name: "com.sap.cloud.workflow.wfl006.reviewBuPa.fragments.VHCountry",
 					controller: this
 				}).then(function (oValueHelpDialog) {
 					this._oValueHelpDialogCountry = oValueHelpDialog;
 					oItem.addDependent(this._oValueHelpDialogCountry);
 					this._oValueHelpDialogCountry.open();
 				}.bind(this));
 			} else {
 				this._oValueHelpDialogCountry.open();
 			}
 		},

 		handleSearchCountry: function (oEvent) {
 			var sValue = oEvent.getParameter("value");
 			var oBinding = oEvent.getSource().getBinding("items");
 			var oFilter = new sap.ui.model.Filter("Country", sap.ui.model.FilterOperator.Contains, sValue);
 			oBinding.filter([oFilter]);
 		},

 		handleValueHelpCountryConfirm: function (oEvent) {
 			var oInput = oEvent.getSource().getParent();
 			var oItem = oEvent.getParameter("selectedItem");
 			var sCompanyCode = oItem.getProperty("title");

 			oInput.setValue(sCompanyCode);

 			this.handleValueHelpCountryClose();
 		},

 		handleValueHelpCountryClose: function () {
 			this._oValueHelpDialogCountry.destroy();
 			this._oValueHelpDialogCountry = undefined;
 		},

 		_onSubmitAddItem: function () {
 			var oModel = this.getView().getModel("MDMJSON");
 			var core = sap.ui.getCore();
 			var oData = {};
 			var Id = core.byId("input_Id").getValue();
 			var BankAccount = core.byId("input_Bankaccount").getValue();
 			var AccountHolderName = core.byId("input_AccountHolderName").getValue();
 			var BankAccountName = core.byId("input_BankAccountName").getValue();
 			var BankAccountReferenceText = core.byId("input_BankAccountReferenceText").getValue();
 			var BankControlKey = core.byId("input_BankControlKey").getValue();
 			var BankCountryKey = core.byId("input_BankCountryKey").getValue();
 			var BankIdentification = core.byId("input_BankIdentification").getValue();
 			var BankNumber = core.byId("input_BankNumber").getValue();
 			var IBAN = core.byId("input_IBAN").getValue();
 			var IBANStartDate = core.byId("input_IBANStartDate").getValue();
 			var StartDate = core.byId("input_StartDate").getValue();
 			var EndDate = core.byId("input_EndDate").getValue();
 			// date formate settings

 			// build new accounting data
 			oData = {
 				"Id": Id,
 				"BankIdentification": BankIdentification,
 				"BankAccount": BankAccount,
 				"BankCountryKey": BankCountryKey,
 				"BankNumber": BankNumber,
 				"BankControlKey": BankControlKey,
 				"BankAccountName": BankAccountName,
 				"AccountHolderName": AccountHolderName,
 				"IBAN": IBAN,
 				"IBANValidityStartDate": IBANStartDate,
 				"ValidityStartDate": StartDate,
 				"ValidityEndDate": EndDate,
 				"BankAccountReferenceText": BankAccountReferenceText
 			};

 			// push new accounting data to model
 			oModel.getData().to_Bank.push(oData);
 			oModel.refresh(true);
 			this._oAddProjectDialog.close();

 		},
 		/**
 		 * Called when a controller is instantiated and its View controls (if available) are already created.
 		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
 		 * @memberOf pwc.BusinessPartnerSaR.view.DeepDetail
 		 */

 		//var oView = this.getView();
 		//var oModelMDM = this.getOwnerComponent().getModel("MDM");
 		//var oModelWFL = this.getOwnerComponent().getModel("wfl");
 		//
 		//this.getView().setModel(oModelMDM, "MDM");

 		//oModelWFL.attachRequestCompleted(function () {
 		//	var contextData = oModelWFL.getData();
 		//
 		//	oView.bindElement({
 		//		path: "/BusinessPartner(guid'" + contextData.BusinessPartnerApproval.bupaID + "')",
 		//		model: "MDM",
 		//		events: {
 		//			//change: function (oEvent) {
 		//			//	var oBndContext = that.getView().getElementBinding().getBoundContext();
 		//			//	if (oBndContext) {
 		//			//		that._determineButtons();
 		//			//	}
 		//			//},
 		//			dataRequested: function () {
 		//				oView.setBusyIndicatorDelay(0);
 		//				oView.setBusy(true);
 		//			},
 		//			dataReceived: function (oData) {
 		//				oView.setBusy(false);
 		//			}
 		//		}
 		//	});
 		//});

 		//oModelWFL.metadataLoaded().then(function () {
 		//	var contextData = oModelWFL.getData();
 		//
 		//	oView.bindElement({
 		//		path: "/BusinessPartner(guid'" + contextData.BusinessPartnerApproval.bupaID + "')",
 		//		model: "MDM",
 		//		events: {
 		//			//change: function (oEvent) {
 		//			//	var oBndContext = that.getView().getElementBinding().getBoundContext();
 		//			//	if (oBndContext) {
 		//			//		that._determineButtons();
 		//			//	}
 		//			//},
 		//			dataRequested: function () {
 		//				oView.setBusyIndicatorDelay(0);
 		//				oView.setBusy(true);
 		//			},
 		//			dataReceived: function (oData) {
 		//				oView.setBusy(false);
 		//			}
 		//		}
 		//	});
 		//});

 		/*oModelMDM.metadataLoaded().then(function () {
 			var contextData = oModelWFL.getData();

 			oView.bindElement({
 				path: "/BusinessPartner(guid'" + contextData.BusinessPartnerApproval.bupaID + "')",
 				model: "MDM",
 				events: {
 					//change: function (oEvent) {
 					//	var oBndContext = that.getView().getElementBinding().getBoundContext();
 					//	if (oBndContext) {
 					//		that._determineButtons();
 					//	}
 					//},
 					dataRequested: function () {
 						oView.setBusyIndicatorDelay(0);
 						oView.setBusy(true);
 					},
 					dataReceived: function (oData) {
 						oView.setBusy(false);
 					}
 				}
 			});
 		});*/
 		//),

 		onBuPaTypeChange: function (oEvent) {
 			var oViewModel = this.getView().getModel("ViewModel");
 			var oMDMJSONModel = this.getView().getModel("MDMJSON");
 			var sSelectedKey = oEvent.getParameter("selectedItem").getProperty("key");

 			//Set visibility of additional BuPa type fields according to selection
 			if (sSelectedKey === "2") { //Organisation
 				oViewModel.setProperty("/nameInputsVisible", true);
 				oViewModel.setProperty("/fullnameInputsVisible", false);
 				oMDMJSONModel.setProperty("/to_Person", "");
 				oMDMJSONModel.setProperty("/to_Person/0/FirstName", "");
 				oMDMJSONModel.setProperty("/to_Person/0/LastName", "");

 				var oDataOrg = {
 					OrganizationName: {
 						CreationDate: "",
 						CreatedByUser: "",
 						ScriptCode: "",
 						FormOfAddress: "",
 						Parent_Id: "",
 						LastChangedByUser: "",
 						FoundationDate: "",
 						LastChangeDate: "",
 						OrganizationName1: "",
 						Id: "",
 						LiquidationDate: "",
 						OrganizationName4: "",
 						OrganizationName3: "",
 						LegalForm: "",
 						OrganizationName2: ""
 					}
 				};

 				oMDMJSONModel.setProperty("/to_Organization", oDataOrg);
 			} else if (sSelectedKey === "1") { //Person
 				oViewModel.setProperty("/nameInputsVisible", false);
 				oViewModel.setProperty("/fullnameInputsVisible", true);
 				oMDMJSONModel.setProperty("/to_Organization", "");
 				//oMDMJSONModel.setProperty("/FullName", "");

 				var oDataPerson = {
 					PersonName: {
 						CreationDate: "",
 						AdditionalNamePrefix: "",
 						CreatedByUser: "",
 						FormOfAddress: "",
 						Parent_Id: "",
 						BusinessPartnerOccupationGroup: "",
 						NameFormat: "",
 						Gender: "",
 						NaturalPersonEmployerName: "",
 						AdditionalLastName: "",
 						BirthName: "",
 						ScriptCode: " ",
 						FirstName: "",
 						NameCountry: "",
 						MiddleName: "",
 						NickName: "",
 						Initials: "",
 						AdditionalAcademicTitle: "",
 						Nationality: "",
 						LastChangedByUser: "",
 						AcademicTitle: "",
 						MaritalStatus: "",
 						BusinessPartnerBirthplaceName: "",
 						LastChangeDate: "",
 						LastNamePrefix: "",
 						Id: "",
 						LastName: "",
 						NameSupplement: "",
 						BusinessPartnerDeathDate: "",
 						BirthDate: ""
 					}
 				};

 				oMDMJSONModel.setProperty("/to_Person/0", oDataPerson);
 			}
 		},

 		onChangeBuPaFunction: function (oEvent) {
 			var oSendModel = this.getView().getModel("MDMJSON");
 			var sSelectedKey = oEvent.getParameter("selectedItem").getProperty("key");

 			//Set second role belonging to the first, to fit CPI requirements
 			if (sSelectedKey === "FLCU01") {
 				oSendModel.setProperty("/to_Role/1/Role", "FLCU00");
 			} else if (sSelectedKey === "FLVN01") {
 				oSendModel.setProperty("/to_Role/1/Role", "FLVN00");
 			}
 		},

 		onChangeEntityName: function (oEvent) {
 			var oSendModel = this.getView().getModel("MDMJSON");
 			var sValue = oEvent.getParameter("newValue");

 			oSendModel.setProperty("/to_Organization/0/OrganizationName1", sValue);
 		},

 		_validateForm: function () {
 			var bValidated = true;
 			var oInputEntityName = this.getView().byId("inputEntityName");
 			var oInputCountry = this.getView().byId("inputCountry");
 			var oInputCity = this.getView().byId("inputCity");
 			var oInputStreet = this.getView().byId("inputStreet");
 			var oInputHouseNumber = this.getView().byId("inputHouseNumber");
 			var oInputPostBox = this.getView().byId("inputPostBox");
 			var oInputFirstName = this.getView().byId("inputFirstName");
 			var oInputLastName = this.getView().byId("inputLastName");
 			var oInputCorrespondenceLanguage = this.getView().byId("inputCorrespondenceLanguage");
 			var oPostalCode = this.getView().byId("inputPostalCode");
 			//var oSelectAddressType = this.getView().byId("selectAddressType");
 			var oSelectBuPaType = this.getView().byId("selectBuPaType");
 			var oSelectBuPaFunction = this.getView().byId("selectBuPaFunction");

 			if (oSelectBuPaType.getSelectedKey() === "2") {
 				oSelectBuPaType.setValueState("None");

 				if (oInputEntityName.getValue() === "") {
 					bValidated = false;
 					oInputEntityName.setValueState("Error");
 					oInputEntityName.setValueStateText("Please enter a value");
 				} else {
 					oInputEntityName.setValueState("None");
 				}
 			} else if (oSelectBuPaType.getSelectedKey() === "1") {
 				oSelectBuPaType.setValueState("None");

 				if (oInputFirstName.getValue() === "") {
 					bValidated = false;
 					oInputFirstName.setValueState("Error");
 					oInputFirstName.setValueStateText("Please enter a value");
 				} else {
 					oInputFirstName.setValueState("None");
 				}

 				if (oInputLastName.getValue() === "") {
 					bValidated = false;
 					oInputLastName.setValueState("Error");
 					oInputLastName.setValueStateText("Please enter a value");
 				} else {
 					oInputLastName.setValueState("None");
 				}
 			} else {
 				oSelectBuPaType.setValueState("Error");
 				oSelectBuPaType.setValueStateText("Please select a value");
 			}

 			if (oInputCountry.getValue() === "") {
 				bValidated = false;
 				oInputCountry.setValueState("Error");
 				oInputCountry.setValueStateText("Please enter a value");
 			} else {
 				oInputCountry.setValueState("None");
 			}

 			if (oInputCity.getValue() === "") {
 				bValidated = false;
 				oInputCity.setValueState("Error");
 				oInputCity.setValueStateText("Please enter a value");
 			} else {
 				oInputCity.setValueState("None");
 			}

 			if (oInputStreet.getValue() === "" && oInputPostBox.getValue() === "") {
 				bValidated = false;
 				oInputStreet.setValueState("Error");
 				oInputStreet.setValueStateText("Please enter a value for street or post box");
 				oInputPostBox.setValueState("Error");
 				oInputPostBox.setValueStateText("Please enter a value for street or post box");
 			} else {
 				oInputStreet.setValueState("None");
 				oInputPostBox.setValueState("None");
 			}

 			if (oInputHouseNumber.getValue() === "") {
 				bValidated = false;
 				oInputHouseNumber.setValueState("Error");
 				oInputHouseNumber.setValueStateText("Please enter a value");
 			} else {
 				oInputHouseNumber.setValueState("None");
 			}

 			if (oInputCorrespondenceLanguage.getValue() === "") {
 				bValidated = false;
 				oInputCorrespondenceLanguage.setValueState("Error");
 				oInputCorrespondenceLanguage.setValueStateText("Please enter a value");
 			} else {
 				oInputCorrespondenceLanguage.setValueState("None");
 			}

 			if (oPostalCode.getValue() === "") {
 				bValidated = false;
 				oPostalCode.setValueState("Error");
 				oPostalCode.setValueStateText("Please enter a value");
 			} else {
 				oPostalCode.setValueState("None");
 			}

 			//if (oSelectAddressType.getSelectedKey() === "") {
 			//	bValidated = false;
 			//	oSelectAddressType.setValueState("Error");
 			//	oSelectAddressType.setValueStateText("Please select a value");
 			//} else {
 			//	oSelectAddressType.setValueState("None");
 			//}

 			if (oSelectBuPaFunction.getSelectedKey() === "") {
 				bValidated = false;
 				oSelectBuPaFunction.setValueState("Error");
 				oSelectBuPaFunction.setValueStateText("Please select a value");
 			} else {
 				oSelectBuPaFunction.setValueState("None");
 			}

 			return bValidated;
 		}

 		// onChangeTest: function (oEvent) {

 		//var contextData = oModelWFL.getData();
 		//
 		//oView.bindElement({
 		//	path: "/BusinessPartner(guid'" + contextData.BusinessPartnerApproval.bupaID + "')",
 		//	model: "MDM",
 		//	events: {
 		//		//change: function (oEvent) {
 		//		//	var oBndContext = that.getView().getElementBinding().getBoundContext();
 		//		//	if (oBndContext) {
 		//		//		that._determineButtons();
 		//		//	}
 		//		//},
 		//		dataRequested: function () {
 		//			oView.setBusyIndicatorDelay(0);
 		//			oView.setBusy(true);
 		//		},
 		//		dataReceived: function (oData) {
 		//			oView.setBusy(false);
 		//		}
 		//	}
 		//});
 		// }

 		/*
 				//ADO 55353 - AddPayementDetails
 				onPressAddAccounting: function () {
 					if (!this._oAddAccountDialog) {
 						this._oAddAccountDialog = sap.ui.xmlfragment("pwc.reviewBuPa.fragments.addAccount", this);
 						this._oAddAccountDialog.setModel(this.getView().getModel("workloadModel"));
 					}
 					this.getView().addDependent(this._oAddAccountDialog);
 					this._oAddAccountDialog.open();
 				},
 				onAccSave: function (){
 					
 					
 				},
 				onAccCancel: function (){
 					this.resizableDialog.close();
 				},
 				
 				onPressAddPaymentDetail: function (oEvent) {
 					//TODO: Change path when API or JSON is provided
 					var oModel = this.getView().getModel("context");
 					var oData = {
 						"Id": "",
 						"BankCountry": "",
 						"AccountNumber": "",
 						"BankKey": "",
 						"AccountName": "",
 						"AccountHolderName": "",
 						"AccountReferenceText": "",
 						"BankControlKey": "",
 						"Iban": "",
 						"IbanValidFrom": "",
 						"ValidFrom": "",
 						"ValidTo": ""
 					};

 					oModel.getProperty("/Item").push(oData);
 					oModel.refresh(true);
 				},
 				
 				pressCountryValueHelp: function (oEvent) {
 					var oItem = oEvent.getSource();
 					if (!this._oValueHelpDialogCountry) {
 						Fragment.load({
 							name: "pwc.reviewBuPa.fragments.VHCountry",
 							controller: this
 						}).then(function (oValueHelpDialog) {
 							this._oValueHelpDialogCountry = oValueHelpDialog;
 							oItem.addDependent(this._oValueHelpDialogCountry);
 							this._oValueHelpDialogCountry.open();
 						}.bind(this));
 					} else {
 						this._oValueHelpDialogCountry.open();
 					}
 				},
 				
 				/ **
 				 *@memberOf pwc.reviewBuPa.controller.reviewBuPa
 				 * /
 				onChangeIBAN: function (oEvent) {
 					var oInput = oEvent.getSource();
 					var sInputValue = oEvent.getParameter("newValue");
 					
 					if (this.validateIbanChecksum(sInputValue)) {
 						oInput.setValueState("None");
 					} else {
 						oInput.setValueState("Error");
 						oInput.setValueStateText("Please enter a valid IBAN");
 					}
 				},

 				validateIbanChecksum: function (iban) {
 					var ibanStripped = iban.replace(/[^A-Z0-9]+/gi, '') //keep numbers and letters only
 						.toUpperCase(); //calculation expects upper-case
 					var m = ibanStripped.match(/^([A-Z]{2})([0-9]{2})([A-Z0-9]{9,30})$/);
 					if (!m) return false;

 					var numbericed = (m[3] + m[1] + m[2]).replace(/[A-Z]/g, function (ch) {
 						//replace upper-case characters by numbers 10 to 35
 						return (ch.charCodeAt(0) - 55);
 					});
 					//The resulting number would be to long for javascript to handle without loosing precision.
 					//So the trick is to chop the string up in smaller parts.
 					var mod97 = numbericed.match(/\d{1,7}/g)
 						.reduce(function (total, curr) {
 							return Number(total + curr) % 97
 						}, '');

 					return (mod97 === 1);
 				},
 				
 				onChangeDate: function (oEvent){
 					//get both Date Objects by parent
 					var ddateFrom = oEvent.getSource().getParent().getContent()[19];
 					var ddateTo   = oEvent.getSource().getParent().getContent()[17];
 					
 					//check if one is initial
 					if (ddateFrom.getValue() === ""){
 						ddateFrom.setValueState("Error");
 						ddateFrom.setValueStateText("Please enter a date");
 					} 
 					
 				   else if (ddateTo.getValue() === "" ){
 						ddateTo.setValueState("Error");
 						ddateTo.setValueStateText("Please enter a date");
 					}
 					
 					//field are not empty
 					else{
 						var DateFrom =  new Date (ddateFrom.getValue());
 						var DateTo =  new Date (ddateTo.getValue());
 						//check if to > from 
 						if (DateFrom >= DateTo){
 							ddateTo.setValueState("Error");
 							ddateFrom.setValueState("Error");
 							ddateTo.setValueStateText("The start date can not be higher than the end date");
 						}
 						else{
 							ddateTo.setValueState("None");
 							ddateFrom.setValueState("None");
 						}
 					}
 				},
 				
 				onChangeBIC: function (oEvent) {
 					var oInput = oEvent.getSource();
 					var sInputValue = oEvent.getValue();
 					
 					if (this.validateBIC(sInputValue)) {
 						oInput.setValueState("None");
 					} else {
 						oInput.setValueState("Error");
 						oInput.setValueStateText("Please enter a valid BIC");
 					}
 				}, 
 				
 				validateBIC: function (sInput){
 					return /^([A-Z]{6}[A-Z2-9][A-NP-Z1-2])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test( sInput.toUpperCase() );
 				}

 			*/

 	});
 });