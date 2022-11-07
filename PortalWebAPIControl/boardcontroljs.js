	
   	//import * as $ from 'jquery';

//const { debug } = require("console");

    
    
    //Boardcontrol

    //declare var window : any;
	
	//import * as BoardcontrolLib from './boardcontrolmodule.mjs';




	window.top.boardcontrol = {};

	window.top.boardcontrol.container = "";
	window.top.boardcontrol.context = "";

	window.top.boardcontrol.data = {
		statuscodes_int: ['0', '1', '2', '3', '4'],
		statuscodes_name: ['Draft', 'Submitted', 'In Progress', 'Solved', 'Canceled'],

		casetypes_int: ['0', '1', '2', '3'],
		casetypes_name: ['Warranty Claim for Unity', 'Commodity Parts', 'Logistic Parts', 'General Claim'],

		dataArray1: []
	};

	class Boardcontroldata {}

	window.top.boardcontrol.functions = {
		
		init: function(boardcontrolid) {

			//BoardcontrolLib.helloWorld2();

			let dataArray1 = [{"id":0,"account":"Case Gmbh","status":"4","casetype":"0"}, 
							 {"id":1,"account":"Case1 Gmbh","status":"4","casetype":"0"}, 
							 {"id":2,"account":"Case2 Gmbh","status":"2","casetype":"0"},
							 {"id":3,"account":"Case3 Gmbh","status":"0","casetype":"0"},
							 {"id":4,"account":"Case4 Gmbh","status":"0","casetype":"1"},
							 {"id":5,"account":"Case5 Gmbh","status":"0","casetype":"1"},
							 {"id":6,"account":"Case6 Gmbh","status":"0","casetype":"2"},
							 {"id":7,"account":"Case7 Gmbh","status":"3","casetype":"2"},
							 {"id":8,"account":"Case8 Gmbh","status":"4","casetype":"3"},
							 {"id":9,"account":"Case9 Gmbh","status":"3","casetype":"3"},
							 {"id":10,"account":"Case10 Gmbh","status":"0","casetype":"1"},
							 {"id":11,"account":"Case11 Gmbh","status":"1","casetype":"0"},
							 {"id":12,"account":"Case12 Gmbh","status":"1","casetype":"0"}
							];
			window.top.boardcontrol.data.dataArray1 = dataArray1;
			let boardcontroldata=new Boardcontroldata();
			boardcontroldata.dataArray1 = dataArray1;
			window.top.sessionStorage[boardcontrolid + "data"] = JSON.stringify(boardcontroldata);
		},

		getDataObject:function(htmlElement) {
			let bcid = $(htmlElement).closest("div[boardcontrolid]").attr("boardcontrolid");
			let dataObj = JSON.parse(localStorage[bcid+"data"]);
			return JSON.parse(dataObj);
		},

		getHTMLContainer:function() {
			//..
		},

		//get_HTML_Tile:function(title:string, account:string, status:string) {
		get_HTML_Tile:function(title, account, status) {
			let htmlstr = "";
			htmlstr += `
				<div id='`+title+`' class='tileStyle' style='' draggable='true' ondragstart1='BoardcontrolLib.helloWorld2(event)' ondragstart='window.top.boardcontrol.functions.drag(event)'>
					<br/>
					<div class='titlediv'>`+title+`</div>
					<hr class='tilehr'/>
					<br/>
					<div style='font-size:smaller;'>Account: `+account+`</div>
					<div style='font-size:smaller;'>Status: `+status+`</div>
					<hr class='tilehr'/>
					<button style="display:none;" class='md_button' onclick='window.top.boardcontrol.functions.editCase()'>Edit</button>

					<div class='md_dropdown'>
						<button class='md_dropbtn'>^</button>
						<div class='md_dropdown-content'>
							<a href='#' onclick='window.top.boardcontrol.functions.editCase();'>Edit</a>
							<a href='#'>Link 2</a>
							<a href='#'>Link 3</a>
						</div>
					</div>
					
				</div>`;

			return htmlstr;
		},

		renderSearchInput:function() {
			//let divtable: HTMLDivElement = document.createElement("div");
			let divtable = document.createElement("div");
			
			divtable.style.margin="50px";
			divtable.innerHTML = `
					<label for='search_input'>Search</label>
					<input id='search_input' style='width:200px;' />
					`;

			divtable.innerHTML += `
					<label style='margin-left:20px;' for='boardGroupSelect'>Group by</label>
					<select style='width:200px;' id='boardGroupSelect'>
						<option value='status'>Case Status</option>
						<option value='casetype'>Case Type</option>
					</select>
					`;

			window.top.boardcontrol.container.appendChild(divtable);
		},

		//ondropboardlane:function(ev:any) {
		ondropboardlane:function(ev) {
			window.top.boardcontrol.functions.drop(ev);
			window.top.boardcontrol.functions.renderCaselist();
		},

		renderTable:function() {
			let str = "";
			var lineDivs = [];

			//Init Lines
			for(var i=0;i<window.top.boardcontrol.data.statuscodes_int.length;i++){
				//let div1: HTMLDivElement = document.createElement("div");
				let div1 = document.createElement("div");
				div1.setAttribute("id", "statusDiv"+window.top.boardcontrol.data.statuscodes_int[i]);
				div1.className="lineDiv";

				//div1.style.paddingRight="10px";
				//div1.style.minWidth = "50px";
				//div1.style.maxWidth = "350px";
				//div1.style.width = "200px";

				div1.setAttribute("ondrop","window.top.boardcontrol.functions.drop(event)");
				//div1.addEventListener("ondrop", this.ondropboardlane);
				div1.setAttribute("ondragover","window.top.boardcontrol.functions.allowDrop(event)");
				
				div1.innerHTML = "<div class='lineDivTitle'>"+window.top.boardcontrol.data.statuscodes_name[i]+"</div>";
				lineDivs.push(div1);
				
				window.top.boardcontrol.container.appendChild(div1);
			}
			
			//dataArray = dataArray.sort(function(a,b){return a.status > b.status});

			//let dataObj = window.top.boardcontrol.functions.getDataObject();
			for(let case1 of window.top.boardcontrol.data.dataArray1) {
				//for(let case1 of dataObj.dataArray1) {
				let statusname = window.top.boardcontrol.data.statuscodes_int.indexOf(case1.status);
				console.log(case1.id + ", " + case1.account + ", index: " + statusname);
				if(case1.status>-1) {
					lineDivs[case1.status].innerHTML += window.top.boardcontrol.functions.get_HTML_Tile(case1.id, case1.account, statusname);
					lineDivs[case1.status].innerHTML += "<br/>";
				}
			}

			//$("#1").addEventListener("ondragstart", BoardcontrolLib.helloWorld(event));
		},

		renderEditDialog: function() {
			let htmlstr = "";
			htmlstr += `

				<div id='editCaseDialog' class='md_modal'>
					<div class='md_modal-content'>
						<span onclick='window.top.boardcontrol.functions.editCaseClose()' class='md_close'>&times;</span>
						<p>Edit Case</p>

						<fieldset class='md_fieldset'>
					
							<label for='title_input'>Title</label>
							<input id='title_input' class='md_input'></input><br/>
					
							<label for='invoicenr_input'>Invoice Nr</label>
							<input id='invoicenr_input' class='md_input'></input><br/>

							<label for='complaint_input'>Complaint</label>
							<input id='complaint_input' class='md_input'></input><br/>
								
							<label for='repairdate_input'>Repair Date</label>
							<input id='repairdate_input' class='md_input' type='date'></input><br/>
					
						</fieldset>

						<br/>
						<br/>
						<button class='md_button' style='margin-right:100px;'>Save</button>
						<button class='md_button'>Cancel</button>
						<br/>
						<br/>

					</div>
				</div>`

				window.top.boardcontrol.container.innerHTML += htmlstr;
		},

		renderCaselist:function(boardcontrolid) {
			//Clear
			window.top.boardcontrol.container.innerHTML = "";
			//Render
			this.renderSearchInput();
			this.renderTable();
			this.renderEditDialog();
		},

		//editCase: function(ev:any) {
		editCase: function(ev) {
			//document.getElementById("editCaseDialog")!.style!.display="block";
			document.getElementById("editCaseDialog").style.display="block";
		},
		//editCaseClose: function(ev:any) {
		editCaseClose: function(ev) {
			//document.getElementById("editCaseDialog")!.style!.display="none";
			document.getElementById("editCaseDialog").style.display="none";
		},
	
		//allowDrop: function(ev:any) {
		allowDrop: function(ev) {
			console.log("drag over " + ev.target.id);
			ev.preventDefault();
		},
		//drag: function(ev:any) {
		drag: function(ev) {
			//BoardcontrolLib.helloWorld2();
			console.log("start drag");
			ev.dataTransfer.setData("text", ev.target.id);
		},
		//drop: function(ev:any) {
		drop: function(ev) {
			console.log("drop1 " + ev.target.id);
			console.log("drop2 " + ev.target.parentNode.id);
			console.log("drop3 " + ev.target.parentNode.parentNode.id);
	
			ev.preventDefault();
	
			if(ev.target.id != "") {
	
				var data = ev.dataTransfer.getData("text");
	
				//Move case tile to target
				//ev.target.parentNode.parentNode.appendChild(document.createElement("br"));
				//ev.target.parentNode.parentNode.appendChild(document.getElementById(data));
				//ev.target.parentNode.parentNode.appendChild(document.createElement("br"));
	
				console.log("case id: " + data); //0,1,2..
				//let newstatusint = ev.target.parentNode.parentNode.id.slice(-1);
				let newstatusint = ev.target.id.slice(-1);
				console.log("new status: " + newstatusint); //statusDiv2
				let newStatusText = window.top.boardcontrol.data.statuscodes_name[newstatusint];
				console.log("new status: " + newStatusText);
				
				//Change in data structure
				for(var i=0;i<window.top.boardcontrol.data.dataArray1.length;i++)
				{
					if(window.top.boardcontrol.data.dataArray1[i].id==data) {
						window.top.boardcontrol.data.dataArray1[i].status = newstatusint;
					}
				}
			}
			
			window.top.boardcontrol.functions.renderCaselist();
		}
	};
