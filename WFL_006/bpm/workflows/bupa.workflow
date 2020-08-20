{
	"contents": {
		"72f53f11-cef3-46ba-aa5e-e56634fe7c76": {
			"classDefinition": "com.sap.bpm.wfs.Model",
			"id": "workflow006",
			"subject": "Review Business Partner Entitiy ${context.BusinessPartnerApproval.BusinessPartner}",
			"businessKey": "${context.BusinessPartnerApproval.BusinessPartner}",
			"customAttributes": [],
			"name": "workflow006",
			"documentation": "",
			"lastIds": "600eee18-fc10-4576-982b-74d08fbcb62e",
			"events": {
				"5f136fac-3aee-4c23-b9e4-5e4b837f3a16": {
					"name": "StartEvent1"
				},
				"b919de38-e160-4e57-8331-f1ee1aecd6f1": {
					"name": "EndEvent1"
				},
				"d99aa192-f1ba-4c85-919c-a7ae8862fe9e": {
					"name": "EndEvent3"
				}
			},
			"activities": {
				"8d59f760-8a8b-45cd-9591-2d05d71d7d12": {
					"name": "Data Steward"
				},
				"4fcd1e7b-ba34-4529-a20b-8efa923f1e9b": {
					"name": "MD Accountant"
				},
				"a077fa43-365b-4a99-a8c5-c2a47cae4478": {
					"name": "Check Decision"
				},
				"f8298304-3959-42f0-9ebb-1b7882674937": {
					"name": "Supplier?"
				},
				"b1f793f1-5ff7-4efb-8b64-91300646605e": {
					"name": "Accounts Payable"
				},
				"7054677e-aae6-433c-a872-e681f1c3e1f8": {
					"name": "Verified?"
				},
				"595a18cd-46a5-4d79-ae4d-4066d65d87b0": {
					"name": "Update MDM (entity)"
				}
			},
			"sequenceFlows": {
				"5bc7e1c2-bf3b-458f-a232-a61eb3b4b6bc": {
					"name": "SequenceFlow66"
				},
				"e3374e22-ca3e-4f41-80d1-3c094c8c63f1": {
					"name": "SequenceFlow67"
				},
				"7800260f-5df5-4fa1-a1d8-598e9d41f45b": {
					"name": "others"
				},
				"ed9e4a5d-4a8e-4d6c-a704-1b8fb3c4583a": {
					"name": "Verified"
				},
				"82618982-1356-4f0c-b606-5544a8d14c51": {
					"name": "No"
				},
				"6f9abeec-f972-4ff7-99fe-43f5ec1561bf": {
					"name": "Yes"
				},
				"969569a3-eb38-4bde-b38e-7a4bd762a9a2": {
					"name": "SequenceFlow73"
				},
				"72f5ad38-d515-44fd-9447-8327fae1a629": {
					"name": "Verified"
				},
				"558b6639-1e61-416f-83de-67e1e91926cf": {
					"name": "Not verified"
				},
				"f67dcf96-88f5-4b8d-93ab-3c919b42add9": {
					"name": "SequenceFlow78"
				},
				"637a51a0-58b5-4019-acbf-d339c98088cd": {
					"name": "SequenceFlow79"
				}
			},
			"diagrams": {
				"4ab8548a-fd15-4d6b-af74-84067a3c82b0": {}
			}
		},
		"5f136fac-3aee-4c23-b9e4-5e4b837f3a16": {
			"classDefinition": "com.sap.bpm.wfs.StartEvent",
			"id": "startevent1",
			"name": "StartEvent1"
		},
		"b919de38-e160-4e57-8331-f1ee1aecd6f1": {
			"classDefinition": "com.sap.bpm.wfs.EndEvent",
			"id": "endevent1",
			"name": "EndEvent1"
		},
		"d99aa192-f1ba-4c85-919c-a7ae8862fe9e": {
			"classDefinition": "com.sap.bpm.wfs.EndEvent",
			"id": "endevent3",
			"name": "EndEvent3"
		},
		"8d59f760-8a8b-45cd-9591-2d05d71d7d12": {
			"classDefinition": "com.sap.bpm.wfs.UserTask",
			"subject": "Review Business Partner Entity ${context.BusinessPartnerApproval.BusinessPartner}",
			"description": "",
			"priority": "MEDIUM",
			"isHiddenInLogForParticipant": false,
			"userInterface": "sapui5://comsapcloudworkflowwfl006reviewBuPa/com.sap.cloud.workflow.wfl006.reviewBuPa",
			"recipientGroups": "SCP-WF-APPR-GRP-WORKFLOW006-A",
			"id": "usertask3",
			"name": "Data Steward",
			"documentation": "Fields: All read & editable\nActions:\n-> Duplicate found \n-> Address not found\n-> Entity successfully verified"
		},
		"4fcd1e7b-ba34-4529-a20b-8efa923f1e9b": {
			"classDefinition": "com.sap.bpm.wfs.UserTask",
			"subject": "Check Entity ${context.BusinessPartnerApproval.BusinessPartner}",
			"description": "Please check this entity (4-eyes)",
			"priority": "MEDIUM",
			"isHiddenInLogForParticipant": false,
			"userInterface": "sapui5://comsapcloudworkflowwfl006reviewBuPa/com.sap.cloud.workflow.wfl006.reviewBuPa",
			"recipientGroups": "SCP-WF-APPR-GRP-WORKFLOW006-B",
			"userInterfaceParams": [],
			"id": "usertask4",
			"name": "MD Accountant",
			"documentation": "Fields: All read only\nActions:\n-> Verified\n-> Not verified"
		},
		"a077fa43-365b-4a99-a8c5-c2a47cae4478": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway7",
			"name": "Check Decision",
			"default": "7800260f-5df5-4fa1-a1d8-598e9d41f45b"
		},
		"f8298304-3959-42f0-9ebb-1b7882674937": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway8",
			"name": "Supplier?",
			"default": "82618982-1356-4f0c-b606-5544a8d14c51"
		},
		"b1f793f1-5ff7-4efb-8b64-91300646605e": {
			"classDefinition": "com.sap.bpm.wfs.UserTask",
			"subject": "Enter Bank data for ${context.rootCPI.BusinessPartnerSUITEReplicateRequestMessage.MessageHeader.InternalID}",
			"description": "Please enter necessary payment details.",
			"priority": "MEDIUM",
			"isHiddenInLogForParticipant": false,
			"userInterface": "sapui5://comsapcloudworkflowwfl006reviewBuPa/com.sap.cloud.workflow.wfl006.reviewBuPa",
			"recipientGroups": "SCP-WF-APPR-GRP-WORKFLOW006-C",
			"id": "usertask5",
			"name": "Accounts Payable"
		},
		"7054677e-aae6-433c-a872-e681f1c3e1f8": {
			"classDefinition": "com.sap.bpm.wfs.ExclusiveGateway",
			"id": "exclusivegateway9",
			"name": "Verified?",
			"default": "558b6639-1e61-416f-83de-67e1e91926cf"
		},
		"595a18cd-46a5-4d79-ae4d-4066d65d87b0": {
			"classDefinition": "com.sap.bpm.wfs.ServiceTask",
			"destination": "BPM2CPI",
			"httpMethod": "POST",
			"id": "servicetask11",
			"name": "Update MDM (entity)"
		},
		"5bc7e1c2-bf3b-458f-a232-a61eb3b4b6bc": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow66",
			"name": "SequenceFlow66",
			"sourceRef": "5f136fac-3aee-4c23-b9e4-5e4b837f3a16",
			"targetRef": "8d59f760-8a8b-45cd-9591-2d05d71d7d12"
		},
		"e3374e22-ca3e-4f41-80d1-3c094c8c63f1": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow67",
			"name": "SequenceFlow67",
			"sourceRef": "8d59f760-8a8b-45cd-9591-2d05d71d7d12",
			"targetRef": "a077fa43-365b-4a99-a8c5-c2a47cae4478"
		},
		"7800260f-5df5-4fa1-a1d8-598e9d41f45b": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow68",
			"name": "others",
			"sourceRef": "a077fa43-365b-4a99-a8c5-c2a47cae4478",
			"targetRef": "d99aa192-f1ba-4c85-919c-a7ae8862fe9e"
		},
		"ed9e4a5d-4a8e-4d6c-a704-1b8fb3c4583a": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"condition": "${context.tasks.usertask3.Status == \"verified\"}",
			"id": "sequenceflow69",
			"name": "Verified",
			"sourceRef": "a077fa43-365b-4a99-a8c5-c2a47cae4478",
			"targetRef": "4fcd1e7b-ba34-4529-a20b-8efa923f1e9b"
		},
		"82618982-1356-4f0c-b606-5544a8d14c51": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow71",
			"name": "No",
			"sourceRef": "f8298304-3959-42f0-9ebb-1b7882674937",
			"targetRef": "d99aa192-f1ba-4c85-919c-a7ae8862fe9e"
		},
		"6f9abeec-f972-4ff7-99fe-43f5ec1561bf": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"condition": "${context.irgendeine.entity.bupatype == \"supplier\"}",
			"id": "sequenceflow72",
			"name": "Yes",
			"sourceRef": "f8298304-3959-42f0-9ebb-1b7882674937",
			"targetRef": "b1f793f1-5ff7-4efb-8b64-91300646605e"
		},
		"969569a3-eb38-4bde-b38e-7a4bd762a9a2": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow73",
			"name": "SequenceFlow73",
			"sourceRef": "b1f793f1-5ff7-4efb-8b64-91300646605e",
			"targetRef": "595a18cd-46a5-4d79-ae4d-4066d65d87b0"
		},
		"72f5ad38-d515-44fd-9447-8327fae1a629": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"condition": "${context.tasks.usertask4.Status == \"verified\"}",
			"id": "sequenceflow74",
			"name": "Verified",
			"sourceRef": "7054677e-aae6-433c-a872-e681f1c3e1f8",
			"targetRef": "f8298304-3959-42f0-9ebb-1b7882674937"
		},
		"558b6639-1e61-416f-83de-67e1e91926cf": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow75",
			"name": "Not verified",
			"sourceRef": "7054677e-aae6-433c-a872-e681f1c3e1f8",
			"targetRef": "8d59f760-8a8b-45cd-9591-2d05d71d7d12"
		},
		"f67dcf96-88f5-4b8d-93ab-3c919b42add9": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow78",
			"name": "SequenceFlow78",
			"sourceRef": "595a18cd-46a5-4d79-ae4d-4066d65d87b0",
			"targetRef": "b919de38-e160-4e57-8331-f1ee1aecd6f1"
		},
		"637a51a0-58b5-4019-acbf-d339c98088cd": {
			"classDefinition": "com.sap.bpm.wfs.SequenceFlow",
			"id": "sequenceflow79",
			"name": "SequenceFlow79",
			"sourceRef": "4fcd1e7b-ba34-4529-a20b-8efa923f1e9b",
			"targetRef": "7054677e-aae6-433c-a872-e681f1c3e1f8"
		},
		"4ab8548a-fd15-4d6b-af74-84067a3c82b0": {
			"classDefinition": "com.sap.bpm.wfs.ui.Diagram",
			"symbols": {
				"616eec04-9bb6-4d3a-a10e-ab0f4512d369": {},
				"d5e35e7d-25e6-45e5-a803-15c7a9810a7e": {},
				"7bdcc596-ba0c-4f35-9195-417ce2d5cea8": {},
				"126fc093-4c04-4776-866d-7520d7d459dc": {},
				"e8e3e46c-8aa0-4007-882f-7d93115c6094": {},
				"1da73787-4533-4a00-b71f-15277320ab80": {},
				"0161d76f-ff7d-4c15-a0f6-87b277b77780": {},
				"f4e0e312-d479-4de0-860b-c61159f6d5a1": {},
				"f63c67a1-6f8a-41e9-bcea-473cb576e924": {},
				"877aa229-d46f-4ee5-879d-ad6fe9435901": {},
				"ab843be5-66ca-4f2a-979f-947adcf12058": {},
				"275fc0e9-4eae-40b5-939b-7d3d39873c5d": {},
				"e93311db-1d31-480e-a1dc-d54b867a71b2": {},
				"4448b732-3d47-4597-ab88-12c9183ef13a": {},
				"ae6970da-b1be-4b58-993e-0c367c64ad45": {},
				"e3737718-d12e-4f99-b80c-fde2baad56de": {},
				"16039bfe-5fbe-4aef-8aa5-f15d9da0574a": {},
				"6d3ab681-404a-4011-88d7-4086321630cc": {},
				"4d44b50b-65dd-4873-a1f8-24ec3e07d532": {},
				"298680e9-0701-4ae4-ac56-149cca42b22d": {},
				"5510c238-c7f4-4c4d-860b-3910f5f3932c": {}
			}
		},
		"616eec04-9bb6-4d3a-a10e-ab0f4512d369": {
			"classDefinition": "com.sap.bpm.wfs.ui.StartEventSymbol",
			"x": 999,
			"y": -178,
			"width": 32,
			"height": 32,
			"object": "5f136fac-3aee-4c23-b9e4-5e4b837f3a16"
		},
		"d5e35e7d-25e6-45e5-a803-15c7a9810a7e": {
			"classDefinition": "com.sap.bpm.wfs.ui.EndEventSymbol",
			"x": 1950,
			"y": 224,
			"width": 32,
			"height": 32,
			"object": "b919de38-e160-4e57-8331-f1ee1aecd6f1"
		},
		"7bdcc596-ba0c-4f35-9195-417ce2d5cea8": {
			"classDefinition": "com.sap.bpm.wfs.ui.UserTaskSymbol",
			"x": 1229.1681043845801,
			"y": -189.5625,
			"width": 100,
			"height": 55,
			"object": "8d59f760-8a8b-45cd-9591-2d05d71d7d12"
		},
		"126fc093-4c04-4776-866d-7520d7d459dc": {
			"classDefinition": "com.sap.bpm.wfs.ui.UserTaskSymbol",
			"x": 1403,
			"y": 22,
			"width": 100,
			"height": 60,
			"object": "4fcd1e7b-ba34-4529-a20b-8efa923f1e9b"
		},
		"e8e3e46c-8aa0-4007-882f-7d93115c6094": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 1432,
			"y": -183,
			"object": "a077fa43-365b-4a99-a8c5-c2a47cae4478"
		},
		"1da73787-4533-4a00-b71f-15277320ab80": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1015,-162.03125 1229.6681043845801,-162.03125",
			"sourceSymbol": "616eec04-9bb6-4d3a-a10e-ab0f4512d369",
			"targetSymbol": "7bdcc596-ba0c-4f35-9195-417ce2d5cea8",
			"object": "5bc7e1c2-bf3b-458f-a232-a61eb3b4b6bc"
		},
		"0161d76f-ff7d-4c15-a0f6-87b277b77780": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1279.1681043845801,-162.03125 1432.5,-162.03125",
			"sourceSymbol": "7bdcc596-ba0c-4f35-9195-417ce2d5cea8",
			"targetSymbol": "e8e3e46c-8aa0-4007-882f-7d93115c6094",
			"object": "e3374e22-ca3e-4f41-80d1-3c094c8c63f1"
		},
		"f4e0e312-d479-4de0-860b-c61159f6d5a1": {
			"classDefinition": "com.sap.bpm.wfs.ui.EndEventSymbol",
			"x": 1542.5,
			"y": -270.5,
			"width": 35,
			"height": 35,
			"object": "d99aa192-f1ba-4c85-919c-a7ae8862fe9e"
		},
		"f63c67a1-6f8a-41e9-bcea-473cb576e924": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1453,-162 1453,-253 1543,-253",
			"sourceSymbol": "e8e3e46c-8aa0-4007-882f-7d93115c6094",
			"targetSymbol": "f4e0e312-d479-4de0-860b-c61159f6d5a1",
			"object": "7800260f-5df5-4fa1-a1d8-598e9d41f45b"
		},
		"877aa229-d46f-4ee5-879d-ad6fe9435901": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1453,-162 1453,52",
			"sourceSymbol": "e8e3e46c-8aa0-4007-882f-7d93115c6094",
			"targetSymbol": "126fc093-4c04-4776-866d-7520d7d459dc",
			"object": "ed9e4a5d-4a8e-4d6c-a704-1b8fb3c4583a"
		},
		"ab843be5-66ca-4f2a-979f-947adcf12058": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 1805,
			"y": 31,
			"object": "f8298304-3959-42f0-9ebb-1b7882674937"
		},
		"275fc0e9-4eae-40b5-939b-7d3d39873c5d": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1826,31.5 1826,-253 1577,-253",
			"sourceSymbol": "ab843be5-66ca-4f2a-979f-947adcf12058",
			"targetSymbol": "f4e0e312-d479-4de0-860b-c61159f6d5a1",
			"object": "82618982-1356-4f0c-b606-5544a8d14c51"
		},
		"e93311db-1d31-480e-a1dc-d54b867a71b2": {
			"classDefinition": "com.sap.bpm.wfs.ui.UserTaskSymbol",
			"x": 1916,
			"y": 22,
			"width": 100,
			"height": 60,
			"object": "b1f793f1-5ff7-4efb-8b64-91300646605e"
		},
		"4448b732-3d47-4597-ab88-12c9183ef13a": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1826,52 1916.5,52",
			"sourceSymbol": "ab843be5-66ca-4f2a-979f-947adcf12058",
			"targetSymbol": "e93311db-1d31-480e-a1dc-d54b867a71b2",
			"object": "6f9abeec-f972-4ff7-99fe-43f5ec1561bf"
		},
		"ae6970da-b1be-4b58-993e-0c367c64ad45": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1966,52 1966,143",
			"sourceSymbol": "e93311db-1d31-480e-a1dc-d54b867a71b2",
			"targetSymbol": "4d44b50b-65dd-4873-a1f8-24ec3e07d532",
			"object": "969569a3-eb38-4bde-b38e-7a4bd762a9a2"
		},
		"e3737718-d12e-4f99-b80c-fde2baad56de": {
			"classDefinition": "com.sap.bpm.wfs.ui.ExclusiveGatewaySymbol",
			"x": 1560,
			"y": 31,
			"object": "7054677e-aae6-433c-a872-e681f1c3e1f8"
		},
		"16039bfe-5fbe-4aef-8aa5-f15d9da0574a": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1581,52 1826,52",
			"sourceSymbol": "e3737718-d12e-4f99-b80c-fde2baad56de",
			"targetSymbol": "ab843be5-66ca-4f2a-979f-947adcf12058",
			"object": "72f5ad38-d515-44fd-9447-8327fae1a629"
		},
		"6d3ab681-404a-4011-88d7-4086321630cc": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1581,72.5 1581,123 1279.1680908203125,123 1279.1681043845801,-135.0625",
			"sourceSymbol": "e3737718-d12e-4f99-b80c-fde2baad56de",
			"targetSymbol": "7bdcc596-ba0c-4f35-9195-417ce2d5cea8",
			"object": "558b6639-1e61-416f-83de-67e1e91926cf"
		},
		"4d44b50b-65dd-4873-a1f8-24ec3e07d532": {
			"classDefinition": "com.sap.bpm.wfs.ui.ServiceTaskSymbol",
			"x": 1916,
			"y": 113,
			"width": 100,
			"height": 60,
			"object": "595a18cd-46a5-4d79-ae4d-4066d65d87b0"
		},
		"298680e9-0701-4ae4-ac56-149cca42b22d": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1966,143 1966,240",
			"sourceSymbol": "4d44b50b-65dd-4873-a1f8-24ec3e07d532",
			"targetSymbol": "d5e35e7d-25e6-45e5-a803-15c7a9810a7e",
			"object": "f67dcf96-88f5-4b8d-93ab-3c919b42add9"
		},
		"5510c238-c7f4-4c4d-860b-3910f5f3932c": {
			"classDefinition": "com.sap.bpm.wfs.ui.SequenceFlowSymbol",
			"points": "1453,52 1560.5,52",
			"sourceSymbol": "126fc093-4c04-4776-866d-7520d7d459dc",
			"targetSymbol": "e3737718-d12e-4f99-b80c-fde2baad56de",
			"object": "637a51a0-58b5-4019-acbf-d339c98088cd"
		},
		"600eee18-fc10-4576-982b-74d08fbcb62e": {
			"classDefinition": "com.sap.bpm.wfs.LastIDs",
			"terminateeventdefinition": 2,
			"messageeventdefinition": 1,
			"timereventdefinition": 1,
			"hubapireference": 1,
			"sequenceflow": 79,
			"startevent": 1,
			"intermediatemessageevent": 1,
			"endevent": 3,
			"usertask": 5,
			"servicetask": 11,
			"scripttask": 6,
			"exclusivegateway": 9,
			"parallelgateway": 7
		}
	}
}