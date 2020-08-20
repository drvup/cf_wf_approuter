var rolesFromS4 = $.context.roles.Aps_Iam_Siag_Br_Dll.Aps_Iam_Siag_Br_DllType;
var roles = [];
rolesFromS4.forEach(function(e){
    if(e.ID.substring(0, 1) === "Y"){
        roles.push({"ID": e.ID, "description": e.Description, "Selected": false});        
	}
});
$.context.availableRoles = roles;
$.context.roles = [];