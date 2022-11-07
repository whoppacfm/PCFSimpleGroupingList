/*
	This file is part of the Microsoft PowerApps code samples. 
	Copyright (C) Microsoft Corporation.  All rights reserved. 
	This source code is intended only as a supplement to Microsoft Development Tools and/or  
	on-line documentation.  See these other materials for detailed information regarding  
	Microsoft code samples. 

	THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER  
	EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF  
	MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE. 
 */

	import { IInputs, IOutputs } from "./generated/ManifestTypes";

	import * as React from "react";
	import * as ReactDOM from "react-dom";

	//import * as Boardcontrol from './boardcontrolmodule.mjs';
	//import "./boardcontroljs.js";
	import * as $ from 'jquery';
	import Boardcontrol = require("./boardcontrolts");
	import boardcontrolreact1 = require("./boardcontroltsx");

	declare var window : any;
	//(<any>window).$ = (<any>window).jQuery = $;
	

	export class PCFSimpleBoardcontrol implements ComponentFramework.StandardControl<IInputs, IOutputs>
	{
		private _container: HTMLDivElement;
		private _container2: HTMLDivElement;
		private _container3: HTMLDivElement;
		private _context: ComponentFramework.Context<IInputs>;
		private static _entityName = "account";
		private static _requiredAttributeName = "name";
		private static _requiredAttributeValue = "Web API Custom Control (Sample)";
		private static _currencyAttributeName = "revenue";
		private static _currencyAttributeNameFriendlyName = "annual revenue";
		private _controlViewRendered: boolean;
		private _createEntity1Button: HTMLButtonElement;
		private _createEntity2Button: HTMLButtonElement;
		private _createEntity3Button: HTMLButtonElement;
		private _deleteRecordButton: HTMLButtonElement;
		private _fetchXmlRefreshButton: HTMLButtonElement;
		private _oDataRefreshButton: HTMLButtonElement;
		private _odataStatusContainerDiv: HTMLDivElement;
		private _resultContainerDiv: HTMLDivElement;
		private _dropDownList:HTMLSelectElement;
		private _boardcontrolid:number;
		private boardcontrol1:Boardcontrol;
		

		public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
			this._context = context;
			this._controlViewRendered = false;
			this._container = document.createElement("div");
			this._container2 = document.createElement("div");
			this._container3 = document.createElement("div");

			this._container3.setAttribute("id","comp1divid");
			this._container.classList.add("PortalWebAPIControl_Container");
			
			
			//Determine Client System
			let url = window.location.href;
			let system="PORTAL";
			if(url.indexOf(".dynamics.com")>-1){
				system="CRM";
			}
			console.error("URL: " + url);
			console.error("SYSTEM: " + system);
			
			

			//console.error("Client: " + this._context.client.getClient());
			
			/*
			Entity Meta Data not supported by Portals
			this._context.utils.getEntityMetadata("incident", ["statuscode"]).then(function(param) {
				console.error("Metadata1: " + param);
				console.error("Metadata2: " + JSON.stringify(param));
			});
			*/

			//Init Data
			container.appendChild(this._container);
			container.appendChild(this._container2);
			container.appendChild(this._container3);
			
			//Init JQuery
			(<any>window).$ = (<any>window).jQuery = $;
			(<any>window).top.$ = (<any>window).top.jQuery = $;
			
			//Init Boardcontrol
			//(<any>window).top.boardcontrol.context = context;
			//(<any>window).top.boardcontrol.container = this._container2;
			
			//this._boardcontrolid = Math.floor(Math.random() * 99999999999);
			//(<any>window).top.boardcontrol.container.setAttribute("boardcontrolid", this._boardcontrolid);
			//(<any>window).top.boardcontrol.functions.init(this._boardcontrolid);
			this.boardcontrol1 = new Boardcontrol();
			this.boardcontrol1.context = context;
			this.boardcontrol1.container = this._container2;
			this.boardcontrol1.init();


			window.top._context = this._context;
			


			//boardcontrolreact1.Render();
			//boardcontrolreact1.RenderBoard();
						
			//Register functions
			//this.renderOnClick = this.renderOnClick.bind(this);
			//this.renderTable = this.renderTable.bind(this);
			//this.renderCaselist = this.renderCaselist.bind(this);
			//this.ondropboardlane = this.ondropboardlane.bind(this);
		}
		
		public updateView(context: ComponentFramework.Context<IInputs>): void {
			this._context = context;

			if (!this._controlViewRendered) {
				this._controlViewRendered = true;
								
				// Render Web API Examples
				//this.renderCreateExample();
				//this.renderDeleteExample();
				//this.renderFetchXmlRetrieveMultipleExample();
				//this.renderODataRetrieveMultipleExample();
				
				// Render result div to display output of Web API calls
				//this.renderResultsDiv();
				
				//Render Caselist
				//(<any>window).top.boardcontrol.functions.renderCaselist(this._boardcontrolid);
				//window.top.GROUPINGBOARD.Functions.renderCaselist();
				//this.boardcontrol1.renderCaselist();
				//boardcontrolreact1.Render();
				
				/*
				this._context.parameters.entityname.raw;
				this._context.parameters.portal_edit_url.raw;
				this._context.parameters.line_picklist_field.raw;
				this._context.parameters.line_option_texts.raw;
				this._context.parameters.line_option_values.raw;
				this._context.parameters.top_section_fields.raw;
				this._context.parameters.middle_section_fields.raw;
				this._context.parameters.bottom_section_fields.raw;
				*/
				boardcontrolreact1.RenderBoard(this._context, "");
			}
			
			//console.log("check jquery version: " + $.fn.jquery  + ", " + $().jquery);
		}
		
		public getOutputs(): IOutputs {
			// no-op: method not leveraged by this example custom control
			return {};
		}
		
		public destroy(): void {
			// no-op: method not leveraged by this example custom control
		}

		/*
		private get_HTML_Tile(title:string, account:string, status:string) {
			let htmlstr = "";
			htmlstr += "<div id='"+title+"' class='tileStyle' style='' draggable='true' ondragstart='window.statusBoard_drag(event)'>";
			htmlstr += "<div>"+title+"</div>";
			htmlstr += "<br/>";
			htmlstr += "<div style='font-size:small;'>Account: "+account+"</div>";
			htmlstr += "<div style='font-size:small;'>Status: "+status+"</div>";
			htmlstr += "<button onclick='window.statusBoard_editCase()'>Edit</button>";
			htmlstr += "</div>";
			return htmlstr;
		}
		
		private renderExchangeButton() {
			let btn: HTMLButtonElement = document.createElement("button");
			btn.innerHTML="Go";
			btn.id="renderbutton";
			btn.addEventListener("click", this.renderOnClick);
			btn.style.display="none";
			
			this._container2.appendChild(btn);
		}

		public renderOnClick(event: Event): void {
			//alert("searchOnClick");
			console.log("renderOnClick");
			
			(<any>window).top.test1 = 1;
		


			//Rerender through calling updateView
			//this._context.factory.requestRender();
			//(<any>window).context1.factory.requestRender();
			
			//Refresh Caselist
			this.renderCaselist();
		}

		private renderSearchInput() {
			let divtable: HTMLDivElement = document.createElement("div");
			
			divtable.style.margin="50px";
			divtable.innerHTML = `
								<label for='search_input'>Search</label>
								<input id='search_input' style='width:200px;' />
								`;
			
			this._container2.appendChild(divtable);
		}

		private ondropboardlane(ev:any) {
			(<any>window).statusBoard_drop(ev);
			this.renderCaselist();
		}

		private renderTable() {
			let str = "";
			var lineDivs = [];

			//Init Lines
			for(var i=0;i<(<any>window).GROUPINGBOARD.Const.statuscodes_int.length;i++){
				let div1: HTMLDivElement = document.createElement("div");
				div1.setAttribute("id", "statusDiv"+(<any>window).top.GROUPINGBOARD.Const.statuscodes_int[i]);
				div1.style.float = "left";
				div1.style.marginLeft = "20px";
				div1.style.paddingRight="10px";
				div1.style.minHeight="1000px";
				div1.style.border="solid 1px black";
				//div1.style.minWidth = "50px";
				//div1.style.maxWidth = "350px";
				//div1.style.width = "200px";

				div1.setAttribute("ondrop","window.top.statusBoard_drop(event)");
				//div1.addEventListener("ondrop", this.ondropboardlane);
				div1.setAttribute("ondragover","window.top.statusBoard_allowDrop(event)");
				
				div1.innerHTML = "<div>"+(<any>window).top.GROUPINGBOARD.Const.statuscodes_name[i]+"</div>";
				lineDivs.push(div1);

				this._container2.appendChild(div1);
			}
			
			//dataArray = dataArray.sort(function(a,b){return a.status > b.status});
			for(let case1 of (<any>window).dataArray1) {
				let index = (<any>window).top.GROUPINGBOARD.Const.statuscodes_name.indexOf(case1.status);
				console.log(case1.id + ", " + case1.account + ", index: " + index);
				if(index>-1) {
					lineDivs[index].innerHTML += this.get_HTML_Tile(case1.id, case1.account, case1.status);
					lineDivs[index].innerHTML += "<br/>";
				}
			}
			
			//for(var i=0;i<6;i++) {
			//	str += "<div class='headerTileStyle' style=''>"+(<any>window).GROUPINGBOARD.Const.statuscodes_name[i]+"</div>";
			//}
			//str += "<br/>";
						
			//for(var j=0;j<30;j++) {
			//	for(var i=0;i<7;i++) {
			//		str+=this.get_HTML_Tile("Case " + (i+j));
			//	}
			//	str += "<br/>";
			//}
						
			//divtable.innerHTML = str;
			//this._container.appendChild(divtable);
		}


		private renderEditDialog() {

			//this._container2.innerHTML = "";


			let htmlstr = "";
			htmlstr += "<div id='editCaseDialog' class='md_modal'>";
			htmlstr += "<div class='md_modal-content'>";
			htmlstr += "<span onclick='window.top.statusBoard_editCaseClose()' class='md_close'>&times;</span>";
			htmlstr += "<p>Edit Case</p>";
			
			htmlstr += "<label for='title_input'>Title</label>";
			htmlstr += "<input id='title_input' class='md_input'></input><br/>";
			
			htmlstr += "<label for='invoicenr_input'>Invoice Nr</label>";
			htmlstr += "<input id='invoicenr_input' class='md_input'></input><br/>";

			htmlstr += "<label for='complaint_input'>Complaint</label>";
			htmlstr += "<input id='complaint_input' class='md_input'></input><br/>";
						
			htmlstr += "<label for='repairdate_input'>Repair Date</label>";
			htmlstr += "<input id='repairdate_input' class='md_input'></input><br/>";
			
			htmlstr += "<br/>";
			htmlstr += "<br/>";
			htmlstr += "<button>Save</button>";
			htmlstr += "<button>Cancel</button>";
			htmlstr += "<br/>";
			htmlstr += "<br/>";

			htmlstr += "</div>";
			htmlstr += "</div>";

			this._container2.innerHTML += htmlstr;
		}


		private renderCaselist() {
			//Clear
			this._container2.innerHTML = "";
			//Render
			this.renderSearchInput();
			this.renderExchangeButton();
			this.renderTable();
			this.renderEditDialog();
			//(<any>window).statusBoard_renderTable(this._container2);
		}
*/

		
		private renderCreateExample() {
			// Create header label for Web API sample
			const headerDiv: HTMLDivElement = this.createHTMLDivElement("create_container", true, `Click to create ${PCFSimpleBoardcontrol._entityName} record`);
			this._container.appendChild(headerDiv);
	
			// Create button 1 to create record with revenue field set to 100
			const value1 = "100";
			this._createEntity1Button = this.createHTMLButtonElement(
				this.getCreateRecordButtonLabel(value1),
				this.getCreateButtonId(value1),
				value1,
				this.createButtonOnClickHandler.bind(this));
				
			// Create button 2 to create record with revenue field set to 200
			const value2 = "200";
			this._createEntity2Button = this.createHTMLButtonElement(
				this.getCreateRecordButtonLabel(value2),
				this.getCreateButtonId(value2),
				value2,
				this.createButtonOnClickHandler.bind(this));
	
			// Create button 3 to create record with revenue field set to 300
			const value3 = "300";
			this._createEntity3Button = this.createHTMLButtonElement(
				this.getCreateRecordButtonLabel(value3),
				this.getCreateButtonId(value3),
				value3,
				this.createButtonOnClickHandler.bind(this));
	
			// Append all button HTML elements to custom control container div
			this._container.appendChild(this._createEntity1Button);
			this._container.appendChild(this._createEntity2Button);
			this._container.appendChild(this._createEntity3Button);
		}
	
		private renderDeleteExample(): void {
			// Create header label for Web API sample
			const headerDiv: HTMLDivElement = this.createHTMLDivElement("delete_container", true, `Click to delete ${PCFSimpleBoardcontrol._entityName} record`);

			this._deleteRecordButton = document.createElement("button");
			this._deleteRecordButton.innerHTML = "Delete Record";
			this._deleteRecordButton.id = "delete_button";	
			this._deleteRecordButton.classList.add("SampleControl_PortalWebAPIControl_DeleteButtonClass");
			this._deleteRecordButton.addEventListener("click", this.deleteButtonOnClickHandler.bind(this));
			this._dropDownList = document.createElement("select");
			this._dropDownList.name = "Delete Entity";
			this._dropDownList.id = "DeleteEntity";
			this._dropDownList.classList.add("SampleControl_PortalWebAPIControl_SelectClass");

			// Append elements to custom control container div
			this._container.appendChild(headerDiv);
			this._container.appendChild(this._dropDownList);
			this._container.appendChild(this._deleteRecordButton);
			this.PopulateItemsToDelete();
		}
	
		private renderODataRetrieveMultipleExample(): void {
			const containerClassName = "odata_status_container";
	
			// Create header label for Web API sample
			const statusDivHeader: HTMLDivElement = this.createHTMLDivElement(containerClassName, true, "Click to refresh record count");
			this._odataStatusContainerDiv = this.createHTMLDivElement(containerClassName, false, undefined);
	
			// Create button to invoke OData RetrieveMultiple Example
			this._fetchXmlRefreshButton = this.createHTMLButtonElement(
				"Refresh record count",
				"odata_refresh",
				null,
				this.refreshRecordCountButtonOnClickHandler.bind(this));
	
			// Append HTML elements to custom control container div
			this._container.appendChild(statusDivHeader);
			this._container.appendChild(this._odataStatusContainerDiv);
			this._container.appendChild(this._fetchXmlRefreshButton);
		}
	
		private renderFetchXmlRetrieveMultipleExample(): void {
			const containerName = "fetchxml_status_container";
	
			// Create header label for Web API sample
			const statusDivHeader: HTMLDivElement = this.createHTMLDivElement(containerName, true,
				`Click to calculate average value of ${PCFSimpleBoardcontrol._currencyAttributeNameFriendlyName}`);
			const statusDiv: HTMLDivElement = this.createHTMLDivElement(containerName, false, undefined);

			statusDivHeader.style.marginTop = "40px";
	
			// Create button to invoke Fetch XML RetrieveMultiple Web API example
			this._oDataRefreshButton = this.createHTMLButtonElement(
				`Calculate average value of ${PCFSimpleBoardcontrol._currencyAttributeNameFriendlyName}`,
				"odata_refresh",
				null,
				this.calculateAverageButtonOnClickHandler.bind(this));
	
			// Append HTML Elements to custom control container div
			this._container.appendChild(statusDivHeader);
			this._container.appendChild(statusDiv);
			this._container.appendChild(this._oDataRefreshButton);
		}
	
		private renderResultsDiv() {
			// Render header label for result container
			const resultDivHeader: HTMLDivElement = this.createHTMLDivElement("result_container", true,
				"Result of last action");
			this._container.appendChild(resultDivHeader);
	
			// Div elements to populate with the result text
			this._resultContainerDiv = this.createHTMLDivElement("result_container", false, undefined);
			this._container.appendChild(this._resultContainerDiv);
	
			// Init the result container with a notification the control was loaded
			this.updateResultContainerText("Web API sample custom control loaded");
		}	
		
		private createButtonOnClickHandler(event: Event): void {
			// Retrieve the value to set the currency field to from the button's attribute
			const currencyAttributeValue: number = parseInt(
				(event.target as Element)?.attributes?.getNamedItem("buttonvalue")?.value ?? "0"
			);
	
			// Generate unique record name by appending timestamp to _requiredAttributeValue
			const recordName = `${PCFSimpleBoardcontrol._requiredAttributeValue}_${Date.now()}`;
	
			// Set the values for the attributes we want to set on the new record
			// If you want to set additional attributes on the new record, add to data dictionary as key/value pair
			const data: ComponentFramework.WebApi.Entity = {};
			data[PCFSimpleBoardcontrol._requiredAttributeName] = recordName;
			data[PCFSimpleBoardcontrol._currencyAttributeName] = currencyAttributeValue;
			
			// Invoke the Web API to creat the new record
			this._context.webAPI.createRecord(PCFSimpleBoardcontrol._entityName, data).then(
				(response: ComponentFramework.LookupValue) => {
					// Callback method for successful creation of new record
	
					// Get the ID of the new record created
					const id: string = response.id;
	
					// Generate HTML to inject into the result div to showcase the fields and values of the new record created
					let resultHtml = `Created new ${  PCFSimpleBoardcontrol._entityName  } record with below values:`;
					resultHtml += "<br />";
					resultHtml += "<br />";
					resultHtml += `id: ${id}`;
					resultHtml += "<br />";
					resultHtml += "<br />";
					resultHtml += `${PCFSimpleBoardcontrol._requiredAttributeName}: ${recordName}`;
					resultHtml += "<br />";
					resultHtml += "<br />";
					resultHtml += `${PCFSimpleBoardcontrol._currencyAttributeName}: ${currencyAttributeValue}`;
	
					this.updateResultContainerText(resultHtml);
					this.PopulateItemsToDelete();
				},
				(errorResponse) => {
					// Error handling code here - record failed to be created
					this.updateResultContainerTextWithErrorResponse(errorResponse);
				}
			);
		}

		private PopulateItemsToDelete(): void{
			var i, L = this._dropDownList.options.length - 1;
			for(i = L; i >= 0; i--) 
			{
				this._dropDownList.options.remove(i);
			}

			const queryString = `?$select=${PCFSimpleBoardcontrol._requiredAttributeName}&$filter=contains(${PCFSimpleBoardcontrol._requiredAttributeName},'${PCFSimpleBoardcontrol._requiredAttributeValue}')`;
			// Invoke the Web API Retrieve Multiple call
			this._context.webAPI.retrieveMultipleRecords(PCFSimpleBoardcontrol._entityName, queryString).then(
				(response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
					var option = document.createElement("option");
					option.value = "";
					option.text = "";
					this._dropDownList.appendChild(option);
					for (const entity of response.entities) {
						var option = document.createElement("option");
						option.value = entity.accountid;
						option.text = entity.name;
						this._dropDownList.appendChild(option);
					}
				});
		}
	
		private deleteButtonOnClickHandler(): void {			
			if(this._dropDownList.value != "")
			{
				var entityId = this._dropDownList.value;
				this._context.webAPI.deleteRecord(PCFSimpleBoardcontrol._entityName, this._dropDownList.value).then(
					(response: ComponentFramework.LookupValue) => {
						const responseEntityType: string = response.entityType;

						this.updateResultContainerText(`Deleted ${responseEntityType} record with ID: ${entityId}`);
						this.PopulateItemsToDelete();
					},
					(errorResponse) => {
						// Error handling code here
						this.updateResultContainerTextWithErrorResponse(errorResponse);
					});
			}
		}
		
		private calculateAverageButtonOnClickHandler(): void {
			// Build FetchXML to retrieve the average value of _currencyAttributeName field for all _entityName records
			// Add a filter to only aggregate on records that have _currencyAttributeName not set to null
			let fetchXML = "<fetch distinct='false' mapping='logical' aggregate='true'>";
			fetchXML += `<entity name='${PCFSimpleBoardcontrol._entityName}'>`;
			fetchXML += `<attribute name='${PCFSimpleBoardcontrol._currencyAttributeName}' aggregate='avg' alias='average_val' />`;
			fetchXML += "<filter>";
			fetchXML += `<condition attribute='${PCFSimpleBoardcontrol._currencyAttributeName}' operator='not-null' />`;
			fetchXML += "</filter>";
			fetchXML += "</entity>";
			fetchXML += "</fetch>";
	
			// Invoke the Web API RetrieveMultipleRecords method to calculate the aggregate value
			this._context.webAPI.retrieveMultipleRecords(PCFSimpleBoardcontrol._entityName, `?fetchXml=${  fetchXML}`).then(
				(response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
					// Retrieve multiple completed successfully -- retrieve the averageValue 
					const averageVal: number = response.entities[0].average_val;
	
					// Generate HTML to inject into the result div to showcase the result of the RetrieveMultiple Web API call
					const resultHTML = `Average value of ${PCFSimpleBoardcontrol._currencyAttributeNameFriendlyName} attribute for all ${PCFSimpleBoardcontrol._entityName} records: ${averageVal}`;
					this.updateResultContainerText(resultHTML);
				},
				(errorResponse) => {
					// Error handling code here
					this.updateResultContainerTextWithErrorResponse(errorResponse);
				}
			);
		}
		
		private refreshRecordCountButtonOnClickHandler(): void {
			// Generate OData query string to retrieve the _currencyAttributeName field for all _entityName records
			// Add a filter to only retrieve records with _requiredAttributeName field which contains _requiredAttributeValue
			const queryString = `?$select=${PCFSimpleBoardcontrol._currencyAttributeName  }&$filter=contains(${PCFSimpleBoardcontrol._requiredAttributeName},'${PCFSimpleBoardcontrol._requiredAttributeValue}')`;
			
			// Invoke the Web API Retrieve Multiple call
			this._context.webAPI.retrieveMultipleRecords(PCFSimpleBoardcontrol._entityName, queryString).then(
				(response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
					// Retrieve Multiple Web API call completed successfully
					let count1 = 0;
					let count2 = 0;
					let count3 = 0;
	
					// Loop through each returned record
					for (const entity of response.entities) {
						// Retrieve the value of _currencyAttributeName field
						const value: number = entity[PCFSimpleBoardcontrol._currencyAttributeName];
	
						// Check the value of _currencyAttributeName field and increment the correct counter
						if (value == 100) {
							count1++;
						}
						else if (value == 200) {
							count2++;
						}
						else if (value == 300) {
							count3++;
						}
					}
	
					// Generate HTML to inject into the fetch xml status div to showcase the results of the OData retrieve example
					let innerHtml = "Use above buttons to create or delete a record to see count update";
					innerHtml += "<br />";
					innerHtml += "<br />";
					innerHtml += `Count of ${PCFSimpleBoardcontrol._entityName} records with ${PCFSimpleBoardcontrol._currencyAttributeName} of 100: ${count1}`;
					innerHtml += "<br />";
					innerHtml += `Count of ${PCFSimpleBoardcontrol._entityName} records with ${PCFSimpleBoardcontrol._currencyAttributeName} of 200: ${count2}`;
					innerHtml += "<br />";
					innerHtml += `Count of ${PCFSimpleBoardcontrol._entityName} records with ${PCFSimpleBoardcontrol._currencyAttributeName} of 300: ${count3}`;
	
					// Inject the HTML into the fetch xml status div
					if (this._odataStatusContainerDiv) {
						this._odataStatusContainerDiv.innerHTML = innerHtml;
					}
	
					// Inject a success message into the result div
					this.updateResultContainerText("Record count refreshed");
				},
				(errorResponse) => {
					// Error handling code here
					this.updateResultContainerTextWithErrorResponse(errorResponse);
				}
			);
		}
	
		private updateResultContainerText(statusHTML: string): void {
			if (this._resultContainerDiv) {
				this._resultContainerDiv.innerHTML = statusHTML;
			}
		}
	
		private updateResultContainerTextWithErrorResponse(errorResponse: any): void {
			if (this._resultContainerDiv) {
				// Retrieve the error message from the errorResponse and inject into the result div
				let errorHTML = "Error with Web API call:";
				errorHTML += "<br />";
				errorHTML += errorResponse.message;
				this._resultContainerDiv.innerHTML = errorHTML;
			}
		}
	
		private getCreateRecordButtonLabel(entityNumber: string): string {
			return `Create record with ${PCFSimpleBoardcontrol._currencyAttributeNameFriendlyName} of ${entityNumber}`;
		}
	
		private getCreateButtonId(entityNumber: string): string {
			return `create_button_${entityNumber}`;
		}
	
		private createHTMLButtonElement(buttonLabel: string, buttonId: string, buttonValue: string | null, onClickHandler: (event?: any) => void): HTMLButtonElement {
			const button: HTMLButtonElement = document.createElement("button");
						
			button.innerHTML = buttonLabel;
	
			if (buttonValue) {
				button.setAttribute("buttonvalue", buttonValue);
			}
	
			button.id = buttonId;
	
			button.classList.add("SampleControl_PortalWebAPIControl_ButtonClass");
			//button.classList.add("ms-Button");
			
			button.addEventListener("click", onClickHandler);
			return button;
		}
	
		private createHTMLDivElement(elementClassName: string, isHeader: boolean, innerText?: string): HTMLDivElement {
			const div: HTMLDivElement = document.createElement("div");
	
			if (isHeader) {
				div.classList.add("SampleControl_PortalWebAPIControl_Header");
				elementClassName += "_header";
			}
	
			if (innerText) {
				div.innerText = innerText.toUpperCase();
			}
	
			div.classList.add(elementClassName);
			return div;
		}
		
	}