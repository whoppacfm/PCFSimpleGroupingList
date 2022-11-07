import {  provideFluentDesignSystem, fluentCheckbox } from "@fluentui/web-components";
provideFluentDesignSystem().register(fluentCheckbox());

class Boardcontrol {
    public container: HTMLDivElement;
    public context: {};

    public statuscodes_int: Array<number>;
    public statuscodes_name: Array<string>;
    public casetypes_int: Array<number>;
    public casetypes_name: Array<string>;
    public dataArray1: Array<{id:string,account:string,status:number,casetype:number}>;

    public init():void {
        this.statuscodes_int = [0, 1, 2, 3, 4];
        this.casetypes_int = [0, 1, 2, 3];
        this.statuscodes_name = ['Draft', 'Submitted', 'In Progress', 'Solved', 'Canceled'];
        this.casetypes_name = ['Warranty Claim for Unity', 'Commodity Parts', 'Logistic Parts', 'General Claim'];
        
        this.dataArray1 = [];
        this.dataArray1.push({id:'0',account:'Case1 Gmbh',status:4,casetype:0});
        this.dataArray1.push({id:'2',account:'Case2 Gmbh',status:2,casetype:0});
        this.dataArray1.push({id:'3',account:'Case3 Gmbh',status:0,casetype:1});
        this.dataArray1.push({id:'4',account:'Case4 Gmbh',status:0,casetype:1});
        this.dataArray1.push({id:'5',account:'Case5 Gmbh',status:3,casetype:2});
        this.dataArray1.push({id:'6',account:'Case6 Gmbh',status:1,casetype:3});
        this.dataArray1.push({id:'7',account:'Case7 Gmbh',status:1,casetype:2});
        this.dataArray1.push({id:'8',account:'Case8 Gmbh',status:0,casetype:1});
        this.dataArray1.push({id:'9',account:'Case9 Gmbh',status:0,casetype:2});
        this.dataArray1.push({id:'10',account:'Case10 Gmbh',status:2,casetype:0});

        //Register Event Functions
        (<any>window).top.boardcontrol_functionwrapper_dragstart = this.drag.bind(this);
        (<any>window).top.boardcontrol_functionwrapper_allowdrop = this.allowDrop.bind(this);
        (<any>window).top.boardcontrol_functionwrapper_ondropboardlane = this.ondropboardlane.bind(this);
        (<any>window).top.boardcontrol_functionwrapper_editcase = this.editCase.bind(this);
        (<any>window).top.boardcontrol_functionwrapper_editcaseclose = this.editCaseClose.bind(this);
        (<any>window).top.boardcontrol_functionwrapper_drop = this.drop.bind(this);
        (<any>window).top.boardcontrol_functionwrapper_rendercaselist = this.renderCaselist.bind(this);

        this.drag= this.drag.bind(this);
        this.allowDrop = this.allowDrop.bind(this);
        this.ondropboardlane= this.ondropboardlane.bind(this);
        this.editCase = this.editCase.bind(this);
        this.editCaseClose = this.editCaseClose.bind(this);
        this.renderCaselist = this.renderCaselist.bind(this);
        this.drop = this.drop.bind(this);
    };
    
    public get_HTML_Tile(title:string, account:string, status:string):HTMLDivElement {
        let div1:HTMLDivElement= document.createElement("div");
        let htmlstr = "";
        //<div id='`+title+`' class='tileStyle' style='' draggable='true' ondragstart=''>
        htmlstr += `
                <br/>
                <div class='titlediv'>`+title+`</div>
                <hr class='tilehr'/>
                <br/>
                <div style='font-size:smaller;'>Account: `+account+`</div>
                <div style='font-size:smaller;'>Status: `+status+`</div>
                <hr class='tilehr'/>
                <button style="display:none;" class='md_button' onclick='window.top.boardcontrol_functionwrapper_editcase()'>Edit</button>
                <div style="text-align:left;width:100%;height:0px;">
                    <fluent-checkbox style="margin-left:5px;"></fluent-checkbox>
                    <input type="checkbox" style="margin-left:5px;height:15px;width:15px;"/>
                </div>
                <div class='md_dropdown'>
                    <button class='md_dropbtn'>^</button>
                    <div class='md_dropdown-content'>
                        <a href='#' onclick='window.top.boardcontrol_functionwrapper_editcase();'>Edit</a>
                        <a href='#'>Link 2</a>
                        <a href='#'>Link 3</a>
                    </div>
                </div>
            `;
            //</div>

        div1.innerHTML = htmlstr;
        div1.setAttribute("id", title);
        div1.className = "tileStyle";
        div1.setAttribute("draggable", "true");
        //div1.addEventListener("dragstart", this.drag);
        
        return div1;
    };

    public renderSearchInput():void {
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

        this.container.appendChild(divtable);
    };

    public ondropboardlane(ev:any):void {
        this.drop(ev);
        this.renderCaselist();
    };
    
    public renderTable():void {
        let str = "";
        var lineDivs = [];
        
        //Init Lines
        for(var i=0;i<this.statuscodes_int.length;i++){
            //let div1: HTMLDivElement = document.createElement("div");
            let div1 = document.createElement("div");
            div1.setAttribute("id", "statusDiv"+this.statuscodes_int[i]);
            div1.className="lineDiv";

            //div1.style.paddingRight="10px";
            //div1.style.minWidth = "50px";
            //div1.style.maxWidth = "350px";
            //div1.style.width = "200px";
            
            console.log("st1:"+this.statuscodes_name[i]);
            
            div1.innerHTML = "<div class='lineDivTitle'>"+this.statuscodes_name[i]+"</div>";
            
            lineDivs.push(div1);
            this.container.appendChild(div1);

            div1.setAttribute("ondrop","window.top.boardcontrol_functionwrapper_ondropboardlane(event)");
            //div1.addEventListener("drop", this.ondropboardlane);
            div1.setAttribute("ondragover","window.top.boardcontrol_functionwrapper_allowdrop(event)");
            //div1.addEventListener("dragover", this.allowdrop);
        }

        //dataArray = dataArray.sort(function(a,b){return a.status > b.status});
        for(let case1 of this.dataArray1) {
            //let statusname = this.statuscodes_int.indexOf(case1.status);
            let statusname = this.statuscodes_name[case1.status];
            console.log(case1.id + ", " + case1.account + ", index: " + statusname);
            if(case1.status>-1) {
                let elem1 = this.get_HTML_Tile(case1.id, case1.account, statusname+"");
                //lineDivs[case1.status].innerHTML += elem1.outerHTML;
                lineDivs[case1.status].appendChild(elem1);
                
                //elem1.ondragstart = (event) => {
                //    alert("test");
                //}
                elem1.setAttribute("ondragstart", "window.top.boardcontrol_functionwrapper_dragstart(event)");
                //let _this = this;
                //elem1.addEventListener("dragstart", function(event){ _this.drag(event) });
                
                lineDivs[case1.status].innerHTML += "<br/>";
            }
        }

        console.log("renderTable_5");
    };

    public renderEditDialog():void {
        let htmlstr = "";
        htmlstr += `
            <div id='editCaseDialog' class='md_modal'>
                <div class='md_modal-content'>
                    <span onclick='window.top.boardcontrol_functionwrapper_editcaseclose()' class='md_close'>&times;</span>
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

        this.container.innerHTML += htmlstr;
    };

    public renderCaselist():void {
        this.container.innerHTML = "";
        this.renderSearchInput();
        this.renderTable();
        this.renderEditDialog();
    };

    public editCase(ev:any):void {
        document.getElementById("editCaseDialog")!.style!.display="block";
        //document.getElementById("editCaseDialog").style.display="block";
    };

	public editCaseClose(ev:any):void {
        document.getElementById("editCaseDialog")!.style!.display="none";
        //document.getElementById("editCaseDialog").style.display="none";
    };
	
    public allowDrop(ev:any):void {
        console.log("drag over " + ev.target.id);
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
    };

    public drag(ev:any):void {
        console.log("start drag");
        ev.dataTransfer.setData("text", ev.target.id);
        ev.dataTransfer.effectAllowed = "move";
    };

    public drop(ev:any):void {

        console.log("drop1 " + ev.target.id);
        console.log("drop2 " + ev.target.parentNode.id);
        console.log("drop3 " + ev.target.parentNode.parentNode.id);

        if(ev.target.id != "") {

            var data = ev.dataTransfer.getData("text");
            ev.preventDefault();

            //Move case tile to target
            //ev.target.parentNode.parentNode.appendChild(document.createElement("br"));
            //ev.target.parentNode.parentNode.appendChild(document.getElementById(data));
            //ev.target.parentNode.parentNode.appendChild(document.createElement("br"));

            console.log("case id: " + data); //0,1,2..
            //let newstatusint = ev.target.parentNode.parentNode.id.slice(-1);
            let newstatusint = ev.target.id.slice(-1);
            console.log("new status: " + newstatusint); //statusDiv2
            let newStatusText = this.statuscodes_name[newstatusint];
            console.log("new status: " + newStatusText);

            //Change in data structure
            for(var i=0;i<this.dataArray1.length;i++)
            {
                if(this.dataArray1[i].id==data) {
                    this.dataArray1[i].status = newstatusint;
                }
            }
        }
        this.renderCaselist();
    };
  }
  export = Boardcontrol;