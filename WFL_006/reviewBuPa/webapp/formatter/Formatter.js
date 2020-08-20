sap.ui.define(function () {
	"use strict";
	return {
		formatAvatarIcon: function (sCategory) {
			if (sCategory === "2") {
				return "sap-icon://building";
			} else {
				return "sap-icon://person";
			}
		},

		formatBuPaTypeHeaderInfo: function (sCategory) {
			if (sCategory === "1") {
				return this.getOwnerComponent().getModel("i18n").getProperty("txtExternalPerson");
			} else if (sCategory === "2") {
				return this.getOwnerComponent().getModel("i18n").getProperty("txtExternalOrg");
			}
		}
	};
});