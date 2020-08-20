function initModel() {
	var sUrl = "/comsapcloudworkflowwfl006reviewBuPa/s1011/mdmbupa/API_BUSINESS_PARTNER/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}