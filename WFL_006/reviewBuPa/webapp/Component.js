sap.ui
	.define(
		["sap/ui/core/UIComponent", "sap/ui/Device",
			"com/sap/cloud/workflow/wfl006/reviewBuPa/model/models",
			"sap/ui/model/json/JSONModel"
		],
		function (UIComponent, Device, models, JSONModel) {
			"use strict";

			return UIComponent
				.extend(
					"com.sap.cloud.workflow.wfl006.reviewBuPa.Component", {

						metadata: {
							manifest: "json"
						},

						/**
						 * The component is initialized by UI5
						 * automatically during the startup of
						 * the app and calls the init method
						 * once.
						 * 
						 * @public
						 * @override
						 */
						init: function () {
							// call the base component's init function
							UIComponent.prototype.init.apply(
								this, arguments);
							// set the device model
							this.setModel(models.createDeviceModel(), "device");

							// get task data
							var startupParameters = this.getComponentData().startupParameters;
							var taskModel = startupParameters.taskModel;
							var taskData = taskModel.getData();
							var taskId = taskData.InstanceID;
							// Cut the taskDefID at @ char
							var wflSliceIndex = taskData.TaskDefinitionID.indexOf("@");
							taskData.TaskDefinitionID = taskData.TaskDefinitionID.slice(0, wflSliceIndex);

							// read process context & bind it to the view's model
							var that = this;
							var contextModelWFL = new sap.ui.model.json.JSONModel(
								"/comsapcloudworkflowwfl006reviewBuPa/bpmworkflowruntime/v1/task-instances/" + taskId + "/context");
							//var contextData = contextModelWFL.getData();
							contextModelWFL.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);

							//Initialize View Model
							var viewData = {
								inputsEditable: true,
								nameInputsVisible: true,
								fullnameInputsVisible: false
							};

							var oViewModel = new sap.ui.model.json.JSONModel();
							oViewModel.setData(viewData);
							this.setModel(oViewModel, "ViewModel");

							if (taskData.TaskDefinitionID === "usertask3") {
								oViewModel.setProperty("/inputsEditable", true);
							} else {
								oViewModel.setProperty("/inputsEditable", false);
							}

							/*
							 * function contextModelWFL.attachRequestCompleted
							 * 
							 * @descr: update the workflow context with
							 * task related information
							 * note that this information is not
							 * persisted, but is available only when the
							 * particular task UI is loaded
							 *
							 * Since the model is loaded
							 * asynchronously we add the task
							 * related information
							 * in the call back function
							 *
							 */

							contextModelWFL.attachRequestCompleted(function () {
								var contextData = contextModelWFL.getData();
								// Get task related data to be set in UI ObjectHeader
								contextData.task = {};
								contextData.task.Title = taskData.TaskTitle;
								contextData.task.Priority = taskData.Priority;
								contextData.task.Status = taskData.Status;
								contextData.task.definitionID = taskData.TaskDefinitionID;
								
								//Define extend Data 
								contextData.extendData = {};
								
								// Set priority 'state' based on the priority (color shema)
								if (taskData.Priority === "HIGH") {
									contextData.task.PriorityState = "Warning";
								} else if (taskData.Priority === "VERY HIGH") {
									contextData.task.PriorityState = "Error";
								} else {
									contextData.task.PriorityState = "Success";
								}

								// Get date on which task was created
								contextData.task.CreatedOn = taskData.CreatedOn.toDateString();

								// Get task description and add it to the UI model
								startupParameters.inboxAPI
									.getDescription(
										"NA",
										taskData.InstanceID)
									.done(
										function (dataDescr) {
											contextData.task.Description = dataDescr.Description;
											contextModelWFL.setData(contextData);
										})
									.fail(
										function (errorText) {
											jQuery.sap
												.require("sap.m.MessageBox");
											sap.m.MessageBox
												.error(
													errorText, {
														title: "Error"
													});
										});

								var oView = that.getRootControl();
								var oModelMDM = that.getModel("MDM");
								//var oModelWFL = this.getOwnerComponent().getModel("wfl");
							    oView.setModel(oModelMDM, "MDM");

								//var contextData = oModelWFL.getData();
								//Expanding Entities
								oView.bindElement({
									path: "/BusinessPartner(guid'" + contextData.BusinessPartnerApproval.BusinessPartnerUUID + "')",
									model: "MDM",
									parameters: {
										expand: "to_AddressInformation/to_AddressUsage/to_Address/to_PostalAddress,to_Role,to_Person,to_Organization,to_Bank"
									},
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

											var oModelMDMJSON = new sap.ui.model.json.JSONModel();
											oModelMDMJSON.setData(oData.getParameter("data"));
											that.setModel(oModelMDMJSON, "MDMJSON");

											//Set selected key of BuPa type
											if (oModelMDMJSON.getProperty("/Category") === "1") { //Person
												oViewModel.setProperty("/fullnameInputsVisible", true);
												oViewModel.setProperty("/nameInputsVisible", false);
											} else if (oModelMDMJSON.getProperty("/Category") === "2") { //Organisation
												oViewModel.setProperty("/fullnameInputsVisible", false);
												oViewModel.setProperty("/nameInputsVisible", true);
											}
										}
									}
								});
							 	
															
								// We're creating a new model to store the MDM data "live":
								//var contextModelMDM = new sap.ui.model.odata.v2.ODataModel(
								//	"/comsapcloudworkflowwfl006reviewBuPa/s1011/mdmbupa/API_BUSINESS_PARTNER/");
								//contextModelMDM.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
								//contextModelMDM.attachMetaDataLoaded(null, function () {
								//	// Now we need to fetch the data 
								//	contextModelMDM.getData("/BusinessPartner(guid'" + contextData.BusinessPartnerApproval.bupaID + "')");								
								//	this.setModel(contextModelMDM);
								//});
								/*
								function xmlToJson(xml) {
									function parse(node, j) {
										var nodeName = node.nodeName.replace(/^.+:/, '').toLowerCase();
										var cur = null;
										var text = $(node).contents().filter(function (x) {
											return this.nodeType === 3;
										});
										if (text[0] && text[0].nodeValue.trim()) {
											cur = text[0].nodeValue;
										} else {
											cur = {};
											$.each(node.attributes, function () {
												if (this.name.indexOf('xmlns:') !== 0) {
													cur[this.name.replace(/^.+:/, '')] = this.value;
												}
											});
											$.each(node.children, function () {
												parse(this, cur);
											});
										}

										j[nodeName] = cur;
									}

									var roots = $(xml);
									var root = roots[roots.length - 1];
									var json = {};
									parse(root, json);
									
								var oModel = new JSONModel(json);
								oModel.setJSON(json);
								sap.ui.getCore().setModel(oModel, "businesspartner");
									
								}
								
								// fetch business partner data from MDM
								$.ajax({
									// Call mdm bupa api							
									url: "/comsapcloudworkflowwfl006reviewBuPa/s1011/mdmbupa/API_BUSINESS_PARTNER/BusinessPartner(guid'" + contextData.BusinessPartnerApproval
										.bupaID + "')",
									method: "GET",
									contentType: "text/xml; charset=\"utf-8\"",
									success: function (result, xhr, data) {																			
										contextModelMDM.setData(result);																				
									}

								});
								*/
							});

							// overwrite context model
							this.setModel(contextModelWFL, "wfl");

							// ADO: 59392 - Add Actions
							var oActionDuplicateFound = {
								sBtnTxt: "DuplicateFound",
								type: "Reject",
								onBtnPressed: function () {
									var model = that.getModel();
									model.refresh(true);

									// Call a local method to perform further action
									// instanceID, jsonModel, approvalStatus, refreshContext, refreshTask, callback
									that._triggerComplete(
										that.oComponentData.inboxHandle.attachmentHandle.detailModel.getData().InstanceID,
										model.getJSON(),
										"duplicate",
										false,
										jQuery.proxy(
											// on successful competion, call a local method to
											// refresh the task list in My Inbox
											that._refreshTask,
											that
										)
									);
								}
							};
							var oActionAddressNotFound = {
								sBtnTxt: "Address not found",
								type: "Reject",
								onBtnPressed: function () {
									var model = that.getModel();
									model.refresh(true);

									// Call a local method to perform further action
									// instanceID, jsonModel, approvalStatus, refreshContext, refreshTask, callback
									that._triggerComplete(
										that.oComponentData.inboxHandle.attachmentHandle.detailModel.getData().InstanceID,
										model.getJSON(),
										"addressNotFound",
										false,
										jQuery.proxy(
											// on successful competion, call a local method to
											// refresh the task list in My Inbox
											that._refreshTask,
											that
										)
									);
								}
							};
							var oActionVerified = {
								sBtnTxt: "Verified",
								type: "Accept",
								onBtnPressed: function () {
									//var model = that.getModel("MDMJSON");
									var model = that.getModel("wfl");
									model.refresh(true);

									if (that.getComponentData().startupParameters.taskModel.getData().TaskDefinitionID === "usertask4") { //Do this when MD accountant has approved
										// Delete role ZREP. This signals the CPI that the workflow is approved
										var aRoles = model.oData.to_Role;

										for (var i = 0; i < aRoles.length; i++) {
											if (aRoles[i].Role === "ZREP") {
												aRoles.splice(i, 1);
											}
										}

										// Reset comment
										that.getRootControl().byId("taComment").setValue("");

										// ?Data to MDM? Or already done in _triggerComplete "refresh"
									}

									// Call a local method to perform further action
									// instanceID, jsonModel, approvalStatus, refreshContext, refreshTask, callback
									that._triggerComplete(
										that.oComponentData.inboxHandle.attachmentHandle.detailModel.getData().InstanceID,
										model.getJSON(),
										"verified",
										true,
										jQuery.proxy(
											// on successful competion, call a local method to
											// refresh the task list in My Inbox
											that._refreshTask,
											that
										)
									);
								}
							};
							var oActionNotVerified = {
								sBtnTxt: "Not Verified",
								type: "Reject",
								onBtnPressed: function () {
									var model = that.getModel();
									model.refresh(true);

									// Call a local method to perform further action
									// instanceID, jsonModel, approvalStatus, refreshContext, refreshTask, callback
									that._triggerComplete(
										that.oComponentData.inboxHandle.attachmentHandle.detailModel.getData().InstanceID,
										model.getJSON(),
										"notVerified",
										false,
										jQuery.proxy(
											// on successful competion, call a local method to
											// refresh the task list in My Inbox
											that._refreshTask,
											that
										)
									);
								}
							};

							var oActionSave = {
								sBtnTxt: "Save",
								type: "Default",
								onBtnPressed: function () {
									var model = that.getModel("wfl");
									model.refresh(true);

									// Call a local method to perform further action
									// instanceID, jsonModel, approvalStatus, refreshContext, refreshTask, callback
									that._triggerComplete(
										that.oComponentData.inboxHandle.attachmentHandle.detailModel.getData().InstanceID,
										model.getJSON(),
										"saved",
										false,
										jQuery.proxy(
											//// on successful competion, call a local method to
											//// refresh the task list in My Inbox
											that._refreshTask,
											that
										)
									);
								}
							};

							// ADO: 593982 - Add actions corresponding to the usertask
							if (taskData.TaskDefinitionID == "usertask3") {
								startupParameters.inboxAPI
									.addAction({
										action: oActionDuplicateFound.sBtnTxt,
										label: oActionDuplicateFound.sBtnTxt,
										type: oActionDuplicateFound.type,
									}, oActionDuplicateFound.onBtnPressed);
								startupParameters.inboxAPI
									.addAction({
										action: oActionAddressNotFound.sBtnTxt,
										label: oActionAddressNotFound.sBtnTxt,
										type: oActionAddressNotFound.type,
									}, oActionAddressNotFound.onBtnPressed);
								startupParameters.inboxAPI
									.addAction({
										action: oActionVerified.sBtnTxt,
										label: oActionVerified.sBtnTxt,
										type: oActionVerified.type,
									}, oActionVerified.onBtnPressed);
								startupParameters.inboxAPI
									.addAction({
										action: oActionSave.sBtnTxt,
										label: oActionSave.sBtnTxt,
										type: oActionSave.type,
									}, oActionSave.onBtnPressed);
							} else if (taskData.TaskDefinitionID == "usertask4") {
								startupParameters.inboxAPI
									.addAction({
										action: oActionNotVerified.sBtnTxt,
										label: oActionNotVerified.sBtnTxt,
										type: oActionNotVerified.type,
									}, oActionNotVerified.onBtnPressed);
								startupParameters.inboxAPI
									.addAction({
										action: oActionVerified.sBtnTxt,
										label: oActionVerified.sBtnTxt,
										type: oActionVerified.type,
									}, oActionVerified.onBtnPressed);
								startupParameters.inboxAPI
									.addAction({
										action: oActionSave.sBtnTxt,
										label: oActionSave.sBtnTxt,
										type: oActionSave.type,
									}, oActionSave.onBtnPressed);
							}
						},

						// This method is called when a
						// button is click by the end user
						_triggerComplete: function (taskId, taskContext, approvalStatus, refreshContext, callback) {
							if (this._validateForm()) {
								if (approvalStatus != "" && approvalStatus !== "saved") {
									// we will save our decisions and other related task stuff to the context
									//var oTaskData = this.getComponentData().startupParameters.taskModel.getData();
									taskContext = JSON.parse(taskContext);
									taskContext.task.Status = approvalStatus;
									//oTaskData.Status = approvalStatus;
									// prepare the payload
									var updatePayload = {
										"status": "COMPLETED",
										"context": {}
									};
									// check if we're required to refresh the (complete) context from the model								
									if (refreshContext !== false) {
										updatePayload.context = taskContext;
										// check if there is already an array for tasks
										if (updatePayload.context.tasks === undefined) {
											updatePayload.context.tasks = {};
										}
										// add the task details to the context
										updatePayload.context.tasks[taskContext.task.definitionID] = taskContext.task;
										// delete the model entry (as it shouldn't appear on wfl context)
										delete updatePayload.context.task;
									} else {
										// add the task details to the context
										// as we did not overwrite the context, there is no array for "tasks" - so add one
										updatePayload.context.tasks = {};
										updatePayload.context.tasks[taskContext.task.definitionID] = taskContext.task;

										// old approach
										//updatePayload = "{ \"status\":\"COMPLETED\",\"context\": {\"lastTask\Status\": \"" + approvalStatus + "\" }}";
									}

									this._sendToMDM();

									updatePayload = JSON.stringify(updatePayload);
									$.ajax({
										// Call workflow API
										// to get the xsrf token
										url: "/comsapcloudworkflowwfl006reviewBuPa/bpmworkflowruntime/v1/xsrf-token",
										method: "GET",
										headers: {
											"X-CSRF-Token": "Fetch"
										},
										success: function (
											result,
											xhr, data) {
											// After retrieving the xsrf token successfully
											var token = data.getResponseHeader("X-CSRF-Token");

											$.ajax({
												// Call workflow API to complete the task
												url: "/comsapcloudworkflowwfl006reviewBuPa/bpmworkflowruntime/v1/task-instances/" + taskId,
												method: "PATCH",
												contentType: "application/json",
												// pass the updated context to the API
												data: updatePayload,
												headers: {
													// pass the xsrf token retrieved earlier
													"X-CSRF-Token": token
												},
												// refreshTask needs to be called on successful completion
												success: callback
											});
										}
									});
								} else if (approvalStatus === "saved") {
									this._sendToMDM();
								}
							}
						},

						_sendToMDM: function (oEvent) {
							//var oModel = this.getRootControl().getModel("MDM");
							var oModelWFL = this.getRootControl().getModel("wfl");
							var contextData = oModelWFL.getData();
							var oModelMDMJSON = this.getRootControl().getModel("MDMJSON");
							var sJson = oModelMDMJSON.getJSON();
							var sPath = "/BusinessPartner(guid'" + contextData.BusinessPartnerApproval.BusinessPartnerUUID + "')";
							//var oEntry = oModelMDMJSON.getData();

							$.ajax({
								// Call BuPa API
								// to get the xsrf token
								url: "/comsapcloudworkflowwfl006reviewBuPa/s1011/mdmbupa/API_BUSINESS_PARTNER" + sPath,
								method: "GET",
								headers: {
									"X-CSRF-Token": "Fetch"
								},
								success: function (result, xhr, data) {
									// After retrieving the xsrf token successfully
									var token = data.getResponseHeader("X-CSRF-Token");

									$.ajax({
										// Call BuPa API
										// to get the etag
										url: "/comsapcloudworkflowwfl006reviewBuPa/s1011/mdmbupa/API_BUSINESS_PARTNER" + sPath,
										method: "GET",
										success: function (result, xhr, data) {
											// After retrieving the etag successfully
											var etag = data.getResponseHeader("etag");

											$.ajax({
												// Call BuPa API to send back data
												url: "/comsapcloudworkflowwfl006reviewBuPa/s1011/mdmbupa/API_BUSINESS_PARTNER" + sPath,
												//url: "/comsapcloudworkflowwfl006reviewBuPa/s1011/mdmbupa/API_BUSINESS_PARTNER" + sPath + "?$expand=to_AddressInformation/to_AddressUsage/to_Address/to_PostalAddress,to_Role,to_Person,to_Organization,to_Bank",
												//url: "/comsapcloudworkflowwfl006reviewBuPa/s1011/mdmbupa/API_BUSINESS_PARTNER" + sPath + "?$expand=to_AddressInformation%2fto_AddressUsage%2fto_Address%2fto_PostalAddress%2cto_Role%2cto_Person%2cto_Organization%2cto_Bank",
												method: "PATCH",
												contentType: "application/json",
												// pass the updated context to the API
												data: sJson,
												headers: {
													//"Access-Control-Allow-Methods": "OPTIONS, HEAD, GET, POST, PUT, DELETE",
                                                    //"Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Content-Length",
													"Access-Control-Allow-Origin": "*",
													// pass the xsrf token retrieved earlier
													"X-CSRF-Token": token,
													// pass the etag retrieved earlier
													"if-match": etag
												},
												success: function () {
													debugger;
												}
											});
										}
									});
								}
							});
						},

						_validateForm: function () {
							var bValidated = true;
							var oInputEntityName = this.getRootControl().byId("inputEntityName");
							var oInputCountry = this.getRootControl().byId("inputCountry");
							var oInputCity = this.getRootControl().byId("inputCity");
							var oInputStreet = this.getRootControl().byId("inputStreet");
							var oInputHouseNumber = this.getRootControl().byId("inputHouseNumber");
							var oInputPostBox = this.getRootControl().byId("inputPostBox");
							var oInputFirstName = this.getRootControl().byId("inputFirstName");
							var oInputLastName = this.getRootControl().byId("inputLastName");
							var oInputCorrespondenceLanguage = this.getRootControl().byId("inputCorrespondenceLanguage");
							var oPostalCode = this.getRootControl().byId("inputPostalCode");
							//var oSelectAddressType = this.getRootControl().byId("selectAddressType");
							var oSelectBuPaType = this.getRootControl().byId("selectBuPaType");
							var oSelectBuPaFunction = this.getRootControl().byId("selectBuPaFunction");

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
						},

						_refreshTask: function () {
							var taskId = this
								.getComponentData().startupParameters.taskModel
								.getData().InstanceID;
							this.getComponentData().startupParameters.inboxAPI
								.updateTask("NA", taskId);
						}

					});

		});