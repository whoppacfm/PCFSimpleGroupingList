//React
import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';

//Redux
import { useSelector, useDispatch, Provider } from 'react-redux';
import { createStore, AnyAction, combineReducers } from "redux";

//FluentUI
import { IContextualMenuProps, Stack, IStackTokens, initializeIcons, Checkbox } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { unwatchFile } from 'fs';
import { PropertyStyleSheetBehavior } from '@microsoft/fast-foundation';
import { config } from 'process';
import {Dialog, DialogType, DialogFooter} from 'office-ui-fabric-react/lib/Dialog'
import {FaEdit} from 'react-icons/fa';

initializeIcons();

var DATA_SOURCE = "CRM"
if(window!.top!.location.href.indexOf("127.") > -1) {
  DATA_SOURCE="TEST";
}

//Test-Data
const statuscodes_int = [0, 1, 2, 3, 4, 5, 6, 7];
const statuscodes_name = ['Draft', 'Submitted', 'In Progress', 'Solved', 'Canceled', "Reopened", "OnHold", "Shipping"];

const casetypes_int = [0, 1, 2, 3];
const casetypes_name = ['Harddisk', 'CPU', 'Display', 'Input'];

const casesubtypes_int = [0];
const casesubtypes_name = ['Standard'];

//Interfaces
interface ICase {
  id?:number;
  title?:string;
  status?:string;
  account?:string;
  casetype?:string;
  casesubtype?:string;
  modifiedon?:string;
  contact?: string;
}
interface ICaseTestData {
  data:ICase[];
  origindata:ICase[];
}
const initialCases:ICase[] = [
  {"id":3432532,"account":"Case Gmbh","status":"4","casetype":"0", "casesubtype":"0","title":"IN10344480 - 12464 - 34645645", "contact":"user, user"},
  {"id":1435634,"account":"Case1 Gmbh","status":"4","casetype":"0", "casesubtype":"0","title":"IN1304480 - 22454 - 4534634", "contact":"user, user"}, 
  {"id":2234532,"account":"Case2 Gmbh","status":"2","casetype":"0", "casesubtype":"0","title":"IN65104480 - 32444 - 34645645", "contact":"user, user"},
  {"id":3634344,"account":"Case3 Gmbh","status":"0","casetype":"0", "casesubtype":"0","title":"IN105434480 - 32164 - 34645645", "contact":"user, user"},
  {"id":4234323,"account":"Case4 Gmbh","status":"0","casetype":"1", "casesubtype":"0","title":"IN10324480 - 42434 - 34645645", "contact":"user, user"},
  {"id":5654453,"account":"Case5 Gmbh","status":"0","casetype":"1", "casesubtype":"0","title":"IN10644480 - 52465 - 34645645", "contact":"user, user"},
  {"id":6876675,"account":"Case6 Gmbh","status":"0","casetype":"2", "casesubtype":"0","title":"IN103244480 - 62424 - 34645645", "contact":"user, user"},
  {"id":7656565,"account":"Case7 Gmbh","status":"3","casetype":"2", "casesubtype":"0","title":"IN10764480 - 72463 - 34645645", "contact":"user, user"},
  {"id":8234344,"account":"Case8 Gmbh","status":"4","casetype":"3", "casesubtype":"0","title":"IN10497480 - 82454 - 34645645", "contact":"user, user"},
  {"id":9345435,"account":"Case9 Gmbh","status":"3","casetype":"3", "casesubtype":"0","title":"IN1034480 - 92564 - 34645645", "contact":"user, user"},
  {"id":1054354,"account":"Case10 Gmbh","status":"0","casetype":"1", "casesubtype":"0","title":"IN14IN140 - 32464 - 34645645", "contact":"user, user"},
  {"id":1165466,"account":"Case11 Gmbh","status":"1","casetype":"0", "casesubtype":"0","title":"IN104723480 - 32464 - 34645645", "contact":"user, user"},
  {"id":1223443,"account":"Case12 Gmbh","status":"1","casetype":"0", "casesubtype":"0","title":"IN1046480 - 32464 - 34645645", "contact":"user, user"},
  {"id":1323544,"account":"Case13 Gmbh","status":"5","casetype":"0", "casesubtype":"0","title":"IN104634480 - 32464 - 34645645", "contact":"user, user"},
  {"id":1465466,"account":"Case14 Gmbh","status":"5","casetype":"0", "casesubtype":"0","title":"IN10234480 - 32464 - 34645645", "contact":"user, user"},
  {"id":1767895,"account":"Case15 Gmbh","status":"5","casetype":"0", "casesubtype":"0","title":"IN10465 - 12334 - 34645645", "contact":"user, user"},
  {"id":1623433,"account":"Case16 Gmbh","status":"6","casetype":"0", "casesubtype":"0","title":"IN10430 - 22464 - 34645645", "contact":"user, user"},
  {"id":1776794,"account":"Case17 Gmbh","status":"7","casetype":"0", "casesubtype":"0","title":"IN12360 - 32444 - 34645645", "contact":"user, user"},
  {"id":1824743,"account":"Case18 Gmbh","status":"0","casetype":"0", "casesubtype":"0","title":"IN102340 - 32454 - 34645645", "contact":"user, user"},
  {"id":1932464,"account":"Case18 Gmbh","status":"0","casetype":"0", "casesubtype":"0","title":"IN1076580 - 62464 - 34645645", "contact":"user, user"},
  {"id":2034642,"account":"Case18 Gmbh","status":"0","casetype":"0", "casesubtype":"0","title":"IN1764580 - 82564 - 34645645", "contact":"user, user"},
  {"id":2154334,"account":"Case18 Gmbh","status":"0","casetype":"0", "casesubtype":"0","title":"IN104480 - 32664 - 34645645", "contact":"user, user"},
  {"id":2263455,"account":"Case18 Gmbh","status":"0","casetype":"0", "casesubtype":"0","title":"IN15464 - 62364 - 34645645", "contact":"user, user"},
  {"id":2323346,"account":"Case18 Gmbh","status":"0","casetype":"0", "casesubtype":"0","title":"IN654480 - 22454 - 34645645", "contact":"user, user"},
  {"id":2474588,"account":"Case18 Gmbh","status":"0","casetype":"0", "casesubtype":"0","title":"IN10876480 - 3643464 - 34645645", "contact":"user, user"},
  {"id":2586675,"account":"Case18 Gmbh","status":"0","casetype":"0", "casesubtype":"0","title":"IN34480 - 3234364 - 34645645", "contact":"user, user"},
  {"id":2645853,"account":"Case18 Gmbh","status":"0","casetype":"0", "casesubtype":"0","title":"IN17650 - 32434264 - 34645645", "contact":"user, user"}
  ];
const initialCaseData:ICaseTestData = {data:initialCases, origindata:initialCases};

interface IUserData {
  firstName: string,
  lastName: string
}

const initialUserdata:IUserData = {
  firstName: 'noname',
  lastName: 'noname'
};

interface IField {
  name: string;
  type: string;
}

interface IConfig {
  entityname: string;
  portal_edit_url:string;
  crm_edit: string;

  line_picklist_field:string;
  line_picklist_field2:string;

  line_picklist_field_displayname:string;
  line_picklist_field2_displayname:string;

  tile_id_field:string;
  
  line_option_texts:string[];
  line_option_values:string[];

  line_option_texts2:string[];
  line_option_values2:string[];

  top_section_fields:string[];
  middle_section_fields:string[];
  bottom_section_fields:string[];

  top_section_fieldnames:string[];
  middle_section_fieldnames:string[];
  bottom_section_fieldnames:string[];

  top_section_fieldtypes:string[];
  middle_section_fieldtypes:string[];
  bottom_section_fieldtypes:string[];

  top_section_fields_obj:IField[];
  middle_section_fields_obj:IField[];
  bottom_section_fields_obj:IField[];

  related:string[]; //[sub-entityname],[displayname],[relation-lookup],[field1..x;fieldtype]
}

const initialConfigData:IConfig = {
  entityname: "",
  portal_edit_url:"",
  crm_edit: "",
  line_picklist_field:"",
  line_picklist_field2:"",

  line_picklist_field_displayname:"",
  line_picklist_field2_displayname:"",

  tile_id_field:"",

  line_option_texts:[],
  line_option_values:[],

  line_option_texts2:[],
  line_option_values2:[],

  top_section_fields:[],
  middle_section_fields:[],
  bottom_section_fields:[],
  
  top_section_fieldnames:[],
  middle_section_fieldnames:[],
  bottom_section_fieldnames:[],

  top_section_fieldtypes:[],
  middle_section_fieldtypes:[],
  bottom_section_fieldtypes:[],
  
  top_section_fields_obj:[],
  middle_section_fields_obj:[],
  bottom_section_fields_obj:[],

  related:["contact","Contacts","","fullname"]
};

interface IBoardData {
  userdata: IUserData,
  casedata_test: ICaseTestData,
  casedata_crm_origin: ComponentFramework.WebApi.Entity[],
  casedata_crm: ComponentFramework.WebApi.Entity[],
}

const initialBoarddata:IBoardData = {
  userdata: initialUserdata,
  casedata_test: initialCaseData,
  casedata_crm_origin: [],
  casedata_crm: [],
}

function reducerBoardData(boarddata:IBoardData = initialBoarddata, action:AnyAction) {
  switch (action.type) {
    case "USERDATA/SETFIRSTNAME":
      return {
        ...boarddata,
        userdata:{ 
          ...boarddata.userdata,
          firstName: action.data1
        }
      };
    case "USERDATA/SETLASTNAME":
      return {
        ...boarddata,
        userdata:{ 
          ...boarddata.userdata,
          lastName: action.data1
        }
      };
    case "CASEDATA/SETCASEDATA":
      return {
        ...boarddata,
        casedata:{
          ...boarddata.casedata_test,
          data: action.data1
        }
      }
      case "CASEDATA/SETCASEDATA2":
        return {
          ...boarddata,
          casedata_crm: action.data1
        }
        case "CASEDATA/SETCASEDATA2ORIGIN":
          return {
            ...boarddata,
            casedata_crm_origin: action.data1
          }        
    default:
      return boarddata;
  }
}

const store = createStore(reducerBoardData as any);

interface IButtonProps {
  disabled?: boolean;
  checked?: boolean;
  className?: string;
  tileid:string;
}


function TileButton(props:any) {

  let config = props.configdata;

  const openRecordForEdit = (): any => { 
    let id = props.tileid;
    let context = props.context;
    if(DATA_SOURCE=="CRM") {
      context.navigation.openForm({entityId:id, entityName:config.entityname, openInNewWindow: true});
    }
    else {
      let targeturl = window!.top!.document!.location!.origin + "/" + config.portal_edit_url + "?id="+id;
      console.log("url: " + targeturl);
      window.open(targeturl, "_blank");
    }
  };

  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: 'editrecord',
        text: 'Edit',
        iconProps: { iconName: 'Edit' },
        onClick: openRecordForEdit
      },
    ],
  };

  let tileid=props.tileid;
  if((config.related!=null && config.related.length>3) || DATA_SOURCE=="TEST") {
    let relatedname = config.related[1];
    let relatedItem1 = {
      id: 'id_'+tileid,
      key: 'showrelated_'+tileid,
      data: tileid,
      text: 'Related ' + relatedname,
      iconProps: { iconName: 'List' },
      onClick: props.showRelated
    }
    menuProps.items.push(relatedItem1);
  }

  function showAlert_() {
    //alert("test");
  }

  return (
      <DefaultButton
        className={props.className}
        text=""
        split
        splitButtonAriaLabel=""
        aria-roledescription=""
        menuProps={menuProps}
        onClick={showAlert_}
        disabled={props.disabled}
        checked={props.checked}
      />
  );
};

function Boardcontrol(props:any) {

  const [showRelatedVisible, setShowRelatedVisible] = React.useState({ 
    visible: false
  });

  const [showRelatedData, setShowRelatedData] = React.useState(
    {
      data: [] as Array<object>
    }
  );

  function showRelated(item:any) {
    let parentEntityId = item.target.offsetParent.id.split("_")[1];

    if(DATA_SOURCE=="CRM") {
        FetchSubData(props.context, configData, parentEntityId).then(function(data1) {
          
          console.error("fetch result: " + data1);
          console.error("fetch result count: " + (data1 as Array<object>)?.length);

          debugger;
          
          setShowRelatedData({data:data1 as Array<object>});

          /*
          if(data!="") {
            dispatch({ type: "CASEDATA/SETCASEDATA2", data1: data });
            dispatch({ type: "CASEDATA/SETCASEDATA2ORIGIN", data1: data });
          }
          */

        }, function(err) {
          console.log("Error FetchSubData: " + err);
        });
    }
    
    setShowRelatedVisible({visible:true});
  }

  function closeShowRelated() {
    setShowRelatedVisible({visible:false});
  }

  function FetchSubData(context:any, configdata:IConfig, parentEntityId:any) {

    return new Promise((resolve, reject) => {

      // [sub-entityname],[displayname],[relation-lookup],[field1..x;fieldtype]

      if(configdata.related==null || configdata.related.length<3) {
        resolve("");
      }

      let entityname = configdata.related[0];
      let displayname = configdata.related[1];
      let lookupidfield = configdata.related[2];
      let fields = "";

      for(let i=3;i<configdata.related.length;i++) {
        fields += "<attribute name='"+configdata.related[i]+"' />"
      }

      let fetchXML = `<fetch distinct='false' mapping='logical'>
                        <entity name='`+entityname+`'>
                          FIELDS
                          <filter>
                            <condition attribute='PARENT_LOOKUP_FIELD' operator='eq' value='PARENT_RECORD_ID' />   
                          </filter>
                        </entity>
                      </fetch>`;

      fetchXML = fetchXML.replace("FIELDS", fields);
      fetchXML = fetchXML.replace("PARENT_RECORD_ID", parentEntityId);
      fetchXML = fetchXML.replace("PARENT_LOOKUP_FIELD", lookupidfield);

      console.log("fetch sub records fetchxml: " + fetchXML);

      context.webAPI.retrieveMultipleRecords(entityname, `?fetchXml=${fetchXML}`).then(
        (response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
          console.log("entities: " + response.entities);
          console.log("count: " + response.entities.length);
          resolve(response.entities);
        },
        (errorResponse:any) => {
          console.error("Error fetching subrecords: " + errorResponse);
          resolve("")
        }
      );
    })
  }

  function FetchBoardData(context:any, configdata:IConfig) {
    
    return new Promise((resolve, reject) => {

      let ret: ICase[];

      let fetchXML = `<fetch distinct='false' mapping='logical'>
                        <entity name='`+configdata.entityname+`'>
                          FIELDS
                        </entity>
                      </fetch>`;

      let fields = configdata.top_section_fieldnames;
      let fields2 = configdata.middle_section_fieldnames;
      let fields3 = configdata.bottom_section_fieldnames;

      if(configdata.middle_section_fieldnames.length>0) {
        fields = fields.concat(fields2);
      }
      if(configdata.bottom_section_fieldnames.length>0) {
        fields = fields.concat(fields3);
      }
      fields = fields.concat([configdata.line_picklist_field.split(",")[0]]);
      if(configdata.line_picklist_field2!=""){
        fields = fields.concat([configdata.line_picklist_field2.split(",")[0]]);
      }
      
      let uniqueFields = Array.from(new Set(fields)); //remove duplicates
      let attrs = "";
      
      uniqueFields.forEach(item=>attrs+="<attribute name='"+item+"' />")
      fetchXML = fetchXML.replace("FIELDS", attrs);

      console.log(fetchXML);

      context.webAPI.retrieveMultipleRecords(configdata.entityname, `?fetchXml=${fetchXML}`).then(
        (response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
          console.log("entities: " + response.entities);
          console.log("count: " + response.entities.length);
          resolve(response.entities);
        },
        (errorResponse:any) => {
          console.error("Error: " + errorResponse);
          resolve("")
        }
      );
    })
  }
  
  //Portal does currently not support metadata function
  //props.context.utils.getEntityMetadata("cra6f_incident", ["statuscode"]).then(function(res:any) {
  //  console.error("result: " + res);
  //});

  //Browser-Window Resize
  const [controlWidth, setControlWidth] = React.useState({ 
   width: window.innerWidth
  })
  
  React.useEffect(() => {
    function handleResize() {
      setControlWidth({
        width: window.innerWidth
      })
    }
    window!.top!.addEventListener('resize', handleResize);
  });


  //Init Dispatch
  const dispatch = useDispatch();

  //Get Config from CRM
  const configParams = props.context.parameters;
  const configData:IConfig = {
    entityname:configParams.entityname.raw,
    portal_edit_url:configParams.portal_edit_url.raw,
    crm_edit:configParams.crm_edit.raw,
    
    line_picklist_field:configParams.line_picklist_field.raw.split(",")[0],
    line_picklist_field2:configParams.line_picklist_field2.raw.split(",")[0],

    line_picklist_field_displayname:configParams.line_picklist_field.raw.split(",")[1],
    line_picklist_field2_displayname:configParams.line_picklist_field2.raw.split(",")[1],

    tile_id_field:configParams.entityname.raw+"id",

    line_option_texts:configParams.line_option_texts.raw.split(","),
    line_option_values:configParams.line_option_values.raw.split(","),

    line_option_texts2:configParams.line_option_texts2.raw.split(","),
    line_option_values2:configParams.line_option_values2.raw.split(","),

    top_section_fields:configParams.top_section_fields.raw!=null ? configParams.top_section_fields.raw.split(",") : "",
    middle_section_fields:configParams.middle_section_fields.raw!=null ? configParams.middle_section_fields.raw.split(",") : "",
    bottom_section_fields:configParams.bottom_section_fields.raw!=null ? configParams.bottom_section_fields.raw.split(",") : "",

    top_section_fieldnames:[],
    middle_section_fieldnames:[],
    bottom_section_fieldnames:[],
    top_section_fieldtypes:[],
    middle_section_fieldtypes:[],
    bottom_section_fieldtypes:[],
    top_section_fields_obj:[],
    middle_section_fields_obj:[],
    bottom_section_fields_obj:[],
    
    related:configParams.related.raw!=null ? configParams.related.raw.split(",") : "",
  };
  
  function pushToAr(from:any,  toObj:any, toFieldnames:any, toFieldtypes:any) {
    from.forEach(function(item:any) {
      let items = item.split(";");
      let field: IField = {name:"", type:""};
      field.name = items[0];
      field.type="";
      if(items.length>1) {
        field.type = items[1];
      }
      toObj.push(field);
      toFieldnames.push(field.name);
      toFieldtypes.push(field.type);
    })
  }

  pushToAr(configData.top_section_fields, configData.top_section_fields_obj, configData.top_section_fieldnames, configData.top_section_fieldtypes);
  pushToAr(configData.middle_section_fields, configData.middle_section_fields_obj, configData.middle_section_fieldnames, configData.middle_section_fieldtypes);
  pushToAr(configData.bottom_section_fields, configData.bottom_section_fields_obj, configData.bottom_section_fieldnames, configData.bottom_section_fieldtypes);


  //Get Boarddata
  let boarddata = useSelector((boarddata: IBoardData) => boarddata);
  let griddata = boarddata.casedata_test.data;
  let griddata2 = boarddata.casedata_crm;
  
  if(DATA_SOURCE=="CRM" && (griddata2==null || griddata2.length==0)) {
    //Get data from crm
    //useEffect(() => { 
      FetchBoardData(props.context, configData).then(function(data) {
        console.error("fetch result: " + data);
        console.error("fetch result count: " + (data as Array<object>)?.length);
        if(data!="") {
          dispatch({ type: "CASEDATA/SETCASEDATA2", data1: data });
          dispatch({ type: "CASEDATA/SETCASEDATA2ORIGIN", data1: data });
        }
      }, function(err) {
        console.log("Error FetchBoardData: " + err);
      });
    //},[])
  }

    const userLogin=function() {
      dispatch({ type: "USERDATA/SETFIRSTNAME", data1: "Christian" });
      dispatch({ type: "USERDATA/SETLASTNAME", data1: "Merz" });
    }

    function handleDropLine(e:any) {
      handleBoardDropEvent(e, dispatch, griddata, griddata2, "line", configData);
    }

    let listItems : Array<any> = [];

    let groupByVal=0;
    if(document.getElementById("groupByList1")!=null) {
      groupByVal = parseInt((document.getElementById("groupByList1") as HTMLInputElement)!.value);
    }

    //Prepare Tiles
    if(DATA_SOURCE=="TEST") {
      listItems = griddata.map((casen:any) => {
          let st = casen.status;
          if(1==(groupByVal)) {
            st=casen.casetype;
          }
          console.error("groupByVal: " + groupByVal + ", casetype: " + casen.casetype + ", status: " + casen.status + ", groupby: " + st);
          return <BoardcontrolTile showRelated={showRelated} context={props.context} configdata={configData} groupbyval={st} case1={casen}></BoardcontrolTile>;
        }
      );
    }
    else if(DATA_SOURCE=="CRM") {
      let groupField=configData.line_picklist_field;
      if((groupByVal)==1) {
        groupField=configData.line_picklist_field2;
      }

      listItems = griddata2.map((casen:any) =>
        <BoardcontrolTile showRelated={showRelated} context={props.context} configdata={configData} groupbyval={casen[groupField]} case1={casen}></BoardcontrolTile>
      );
    }

    //Prepare Lines
    let lineItems : Array<any> = [];

    if(DATA_SOURCE=="TEST") {
      let vals = statuscodes_int;
      let groupField="groupbyval";

      if((groupByVal)==1) {
        vals = casetypes_int;
      }

      lineItems = vals.map((val:any) =>
           <BoardcontrolLine context={props.context} configdata={configData} groupby={groupByVal} onclickupdate={userLogin} groupbyval={val} tiles={listItems.filter(item=>item.props[groupField]==val)} handleDropLine={handleDropLine}/>
      );

    } else if(DATA_SOURCE=="CRM") {
      let vals = configData.line_option_values;
      let groupField="groupbyval";

      if((groupByVal)==1) {
        vals = configData.line_option_values2;
      }

      lineItems = vals.map((val:any) =>
            <BoardcontrolLine context={props.context} configdata={configData} groupby={groupByVal} onclickupdate={userLogin} groupbyval={val} tiles={listItems.filter(item=>item.props[groupField]==val)} handleDropLine={handleDropLine}/>
      );
    }

    //let userData1 = useSelector((boarddata: IBoardData) => boarddata.userdata);
    
    let origingriddata = boarddata.casedata_test.origindata;
    let origingriddata2 = boarddata.casedata_crm_origin;

    function onSearch(evt:any) {
      let searchval = evt.currentTarget.value;
      
      if(DATA_SOURCE=="TEST") {
        let newgriddata1 = origingriddata!.filter(item=>item!.account!.toLowerCase().indexOf(searchval.toLowerCase())>-1);
        if(newgriddata1!=null) {
            dispatch({ type: "CASEDATA/SETCASEDATA", data1: newgriddata1 });
        }
      }
      if(DATA_SOURCE=="CRM") {
        let fields = configData.top_section_fieldnames;
        fields = fields.concat(configData.middle_section_fieldnames);
        fields = fields.concat(configData.bottom_section_fieldnames);
        
        let uniqueFields = Array.from(new Set(fields)); //remove duplicates
        let resultar:Array<any> = [];
        
        let types = configData.top_section_fieldtypes.concat(configData.middle_section_fieldtypes).concat(configData.bottom_section_fieldtypes);
        let fieldnames = configData.top_section_fieldnames.concat(configData.middle_section_fieldnames).concat(configData.bottom_section_fieldnames);
        
        for(var i=0;i<uniqueFields.length;i++) {
          let fieldname = uniqueFields[i];
          let index = fieldnames.indexOf(fieldname);
          let type = types[index];
          
          if(type=="lookup") {
            uniqueFields[i] = "_" + fieldname + "_value@OData.Community.Display.V1.FormattedValue";
          }
          if(type=="optionset" || type=="datetime") {
            uniqueFields[i] = fieldname +"@OData.Community.Display.V1.FormattedValue";
          }
        }
        
        try {
          uniqueFields.forEach(itemfield => resultar = resultar.concat(origingriddata2!.filter(item=>item[itemfield]?.toLowerCase().indexOf(searchval.toLowerCase())>-1)));
        }
        catch(e:any) {
          debugger;
          console.error(e);
        }

        if(resultar!=null) {
            resultar = Array.from(new Set(resultar));
            dispatch({ type: "CASEDATA/SETCASEDATA2", data1: resultar });
        }
      }
    }

    const boardControlInnerStyle = {
      width: controlWidth.width+"px"
    };      

    let groupByList = [{"name":"Status Reason", "value":0},{"name":"Case Type", "value":1}];
    
    if(DATA_SOURCE=="CRM") {
      groupByList = [{"name":configData.line_picklist_field_displayname, "value":0},{"name":configData.line_picklist_field2_displayname, "value":1}];
    }

    const selectStyle = { "width": "200px", "margin-left": "20px" };

    let onChangeGroupByList = function(e:any) {
      let val = e.target.value;

      console.log("onChangeGroupByList " + val);

      if(val==0) {
        //..
      }

      if(val==1) {
        //..
      }

      if(DATA_SOURCE=="TEST") {
          const newgriddata=[];
          for (let item of origingriddata) {
            newgriddata.push(item);
          }
          dispatch({ type: "CASEDATA/SETCASEDATA", data1: newgriddata });
      }
      
      if(DATA_SOURCE=="CRM") {
        const newgriddata=[];
        for (let item of origingriddata2) {
          newgriddata.push(item);
        }          
        if(newgriddata!=null && newgriddata.length>0) {
          dispatch({ type: "CASEDATA/SETCASEDATA2", data1: newgriddata });
        }
      }
    }

    return (
      <div className="boardControlDiv" style={boardControlInnerStyle}>
        <ShowRelatedDialog context={props.context} configdata={configData} showRelatedData={showRelatedData.data} closeShowRelated={closeShowRelated} showRelatedVisible={showRelatedVisible.visible}></ShowRelatedDialog>
        <div className='actionbarDivider'></div>
        <div className='searchcontroldiv'>
          <SearchControl onkeyup={onSearch}></SearchControl>
          <GroupByControl selectStyle={selectStyle} items={groupByList} id="groupByList1" onChange={onChangeGroupByList}></GroupByControl>
        </div>
        <div id="boardContentDiv" className='divLinecontent1'>
          <div className='divLinecontent2'>
            {lineItems}
          </div>
        </div>
      </div>
    );
}

function SearchControl(props:any) {
  return (
    <input onKeyUp={props.onkeyup} className="searchInputField" placeholder='Search'></input>
  )
}

function ShowRelatedDialog(props:any) {
  //{this.state.isOpen}
  //let isOpen=true;
  //{showRelatedVisible.visible}

  function closeDialog() {
    props.closeShowRelated();
  }

  function editRecord(item:any) {
    
    debugger; 

    let id = item.currentTarget.id;
    let entname = props.configdata.related[0];
    
    if(DATA_SOURCE=="CRM") {

      props.context.navigation.openForm({entityId:id, entityName:entname, openInNewWindow: true});
    }
    else {
      //let targeturl = window!.top!.document!.location!.origin + "/" + config.portal_edit_url + "?id="+id;
      //console.log("url: " + targeturl);
      //window.open(targeturl, "_blank");
    }
  }
  
  let data:Array<object> = props.showRelatedData;
  let items="";
  
  debugger;

  if(data.length==0){
    data.push({contactid:"123", fullname:"hans müller"});
    data.push({contactid:"1231", fullname:"hans1 müller"});
    data.push({contactid:"1232", fullname:"hans2 müller"});
    data.push({contactid:"1233", fullname:"hans3 müller"});
  }

  //configdata. cfm111
  //for(let i=3;i<configdata.related.length;i++) {
  //  fields += "<attribute name='"+configdata.related[i]+"' />"
  //}
  
  let editStyle:any = { "float": "left", "marginRight":"10px", "marginTop":"5px","width":"10px"};
  let editDivStyle1:any = { "cursor": "pointer", "margin":"5px","padding":"10px", "backgroundColor":"lightgrey", "border":"1px solid lightgrey" };
  let editDivStyle2:any = { "cursor": "pointer", "margin":"5px","padding":"10px", "backgroundColor":"lightblue", "border":"1px solid lightgrey" };
  let dialogContentStyle:any = { "border": "1px solid #bbbbbb", "marginTop":"20px", "marginBottom":"-20px", "padding":"20px" };
  let subgridTableHStyle:any={"border":"1px solid lightgrey", "margin":"5px","padding":"0px" };
  let subgridTableHPStyle:any={"width":"20%", "text-align":"center", "font-name":"bold" };

  let related_fieldname1 = "fullname";
  if(props.configdata.related.length>3) {
    related_fieldname1 = props.configdata.related[3];
  }
  
  let displayname = props.configdata.related[1];

  if(displayname=="") {
    displayname="Related";
  }

  if(DATA_SOURCE=="TEST") {
    displayname="Contacts";
  }

  let table = [];

  /*
  ( i%2==0 ?

    (<div title="Edit" style={i%2==0 ? editDivStyle1 : editDivStyle2} onClick={editRecord} className="editDivSt" id={item.contactid}>
      <FaEdit id='faedit' style={editStyle} onClick={editRecord} /><p>{item[related_fieldname1]}</p>
    </div>)

    :

    (<div title="Edit" style={editDivStyle2} onClick={editRecord} className="editDivSt" id={item.contactid}>
      <FaEdit id='faedit' style={editStyle} onClick={editRecord} /><p>{item[related_fieldname1]}</p>
    </div>)
  )
  */
  return (
    <>
      <Dialog
        isOpen={props.showRelatedVisible}
        hidden={!props.showRelatedVisible}
        onDismiss={ () => closeDialog() } 
        type={DialogType.close} 
        title={displayname} 
        subText='' 
        isBlocking={false} 
        minWidth={600} 
        maxWidth={900} 
        closeButtonAriaLabel='Close'  
        dialogContentProps={{ 
          showCloseButton: true, 
        }} 
      >
        <div style={dialogContentStyle}>

        <div title="Header" style={subgridTableHStyle} id="subgrid_tableHeader1">
          <p style={subgridTableHPStyle}>Fullname</p>
        </div>

        {data.map((item:any, i:number) => (

          <div title="Edit" style={i%2==0 ? editDivStyle1 : editDivStyle2} onClick={editRecord} className="editDivSt" id={item.contactid}>
            <FaEdit id='faedit' style={editStyle} onClick={editRecord} /><p>{item[related_fieldname1]}</p>
          </div>

          )

        )}
        </div>
        <DialogFooter> 
        </DialogFooter> 
      </Dialog>       
      </>
  )
}

function GroupByControl(props:any) {
  return (
    <select style={props.selectStyle} id={props.id} onChange={props.onChange}>
       {props.items.map((object:any, i:any) => 
        <option value={object.value}>{object.name}</option>
       )}
    </select>    
  )
}

function LoginButton(props:any) {
  return (
    <button onClick={props.onclick}>
      Login User
    </button>    
  )
}

function BoardcontrolLine(props:any) {

  function dragover(e:any) {
    e.preventDefault();
    console.error("dragover_line");
  }

  let boarddata = useSelector((boarddata: IBoardData) => boarddata);
  let configdata = props.configdata;

  let lineName = "";

  //let groupByVal="0";
  //if(document.getElementById("groupByList1")!=null) {
  //  groupByVal = (document.getElementById("groupByList1") as HTMLInputElement)!.value;
  //}

  let groupBy = parseInt(props.groupby);

  if(DATA_SOURCE=="CRM") {
    if((groupBy)==0){
      let ind = configdata.line_option_values.indexOf(props.groupbyval);
      lineName = configdata.line_option_texts[ind];
    }
    if((groupBy)==1){
      let ind = configdata.line_option_values2.indexOf(props.groupbyval);
      lineName = configdata.line_option_texts2[ind];
    }
  }
  else if(DATA_SOURCE=="TEST") {
    if((groupBy)==0){
      lineName = statuscodes_name[props.groupbyval];
    }
    if((groupBy)==1){
      lineName = casetypes_name[props.groupbyval];
    }
  }
  
  if(props.loading) {
    return (<div>Loading..</div>);
  }
  else {
    let case1 = props.case1;
    return (
      <div className='lineDiv'>
        <div className='lineDivTitle'>{lineName}</div>
        <div className='lineDivData' id={'linedivdata'+props.status} status-val={props.status} onDrop={props.handleDropLine} onDragOver={dragover}>
          {props.tiles}
        </div>
      </div>
    );
  }
}

function BoardcontrolTile(props:any) {
  
  const dispatch = useDispatch();

  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);
  
  function handleDragStart(e:any) {
    console.error("handleDragStart");
    setIsDragging(true);
    const data = JSON.stringify({ type: "card", id: e.target.id });
    e.dataTransfer.setData("text/plain", data);
  }

  function handleDragEnd(e:any) {
    console.error("handleDragEnd");
    setIsDragging(false);
    e.dataTransfer.clearData();
  }

  function dragover(e:any) {
    e.preventDefault();
    console.error("dragover");
  }

  let boarddata = useSelector((boarddata: IBoardData) => boarddata);
  let griddata = boarddata.casedata_test.data;
  let griddata2 = boarddata.casedata_crm;
  let configdata = props.configdata;

  function handleDrop(e:any) {
    handleBoardDropEvent(e, dispatch, griddata, griddata2, "tile", configdata);
  }

  function handleDragLeave() {
    setIsOver(false);
  }

  let tileid = "";
  if(DATA_SOURCE=="CRM") {
    tileid = props.case1[configdata.tile_id_field].toString()
  }
  else if(DATA_SOURCE="TEST") {
    tileid = props.case1.id;
  }

  let showEdit = 0;
  if(DATA_SOURCE=="CRM") {
    if(configdata.crm_edit=="1") {
      showEdit=1;
    }
  }
  else if(configdata.edit_url_portal!="") {
    showEdit=1;
  }

  function getFormattedFieldValue(pos:any, fieldname:string, case1:any) {

    let types:string[] = [];
    let names:string[] = [];

    if(pos=="top") {
      types = configdata.top_section_fieldtypes;
      names = configdata.top_section_fieldnames;
    }

    if(pos=="middle") {
      types = configdata.middle_section_fieldtypes;
      names = configdata.middle_section_fieldnames;
    }

    if(pos=="bottom") {
      types = configdata.bottom_section_fieldtypes;
      names = configdata.bottom_section_fieldnames;
    }

    let index = names.indexOf(fieldname);
    let type = types[index];

    if(type=="optionset" || type=="datetime") {
      return case1[fieldname+"@OData.Community.Display.V1.FormattedValue"];
    }
    else if(type=="lookup") {
      return case1["_"+fieldname+"_value@OData.Community.Display.V1.FormattedValue"];
    }
    else {
      return case1[fieldname];
    }
    
    return "";
  }

  function _onChangeTileCheckbox(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
    console.log(`The option has been changed to ${isChecked}.`);
  }

  if(props.loading) {
    return (<div>Loading..</div>);
  }
  else {
    let case1 = props.case1;
    return (
      
      //enable drag&drop: add attr "draggable"
      <div className='tileStyle' is-tile="1" style={{backgroundColor: isDragging ? "lightgrey" : isOver ? "lightblue" : "white"}} id={tileid} onDragOver={dragover} onDrop={handleDrop} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragLeave={handleDragLeave}>

       {DATA_SOURCE=="TEST" &&  
          <div>
            <div className='titlediv'>#{case1.id}</div>
            <div>{casetypes_name[case1.casetype]}</div>
            <div>{casesubtypes_name[case1.casesubtype]}</div>
          </div>
        }

        {DATA_SOURCE=="CRM" &&  
          configdata.top_section_fieldnames.map((item:any, i:any) => {     
            return (<div className='scrollText'>{getFormattedFieldValue("top", item, case1)}</div>)
          })
        }

        <hr className='tilehr'/>
        
        {DATA_SOURCE=="TEST" &&  
              <div>
                <div className="scrollText">{case1.title}</div>
              </div>
            }

        {DATA_SOURCE=="CRM" &&  
          configdata.middle_section_fieldnames.map((item:any, i:any) => {     
            return (<div className='scrollText'>{getFormattedFieldValue("middle", item, case1)}</div>)
          })
        }        
        
        <hr className='tilehr'/>
        <div className="tileCheckBoxDiv">

          {DATA_SOURCE=="CRM" &&  
            configdata.bottom_section_fieldnames.map((item:any, i:any) => {     
              return (<div className='scrollText'>{getFormattedFieldValue("bottom", item, case1)}</div>)
            })
          }     

            {DATA_SOURCE=="TEST" &&  
              <div>
                <div>{case1.account}</div>
                <div>{case1.contact}</div>
              </div>
            }

            <Checkbox className="tileCheckBox" label="" onChange={_onChangeTileCheckbox} />
            {showEdit==1 &&
              <div className="centerDivRight">
                <TileButton showRelated={props.showRelated} configdata={configdata} context={props.context} tileid={tileid} className="tileSplitButton"></TileButton>
              </div>
            }
        </div>
      </div>
    );
  }
}

function handleBoardDropEvent(e:any, dispatch:any, griddata:ICase[], griddata2:ComponentFramework.WebApi.Entity[], target_type:any, configdata:IConfig) {
    function isTile(elid:any) {
      if(elid=="") {return};
      if(elid==null || elid==undefined) {return false};
      if(document.getElementById(elid)!.getAttribute("is-tile")=="1") {return true};
      return false;
    }
    console.error("handleDrop");
    const dataJSON = e.dataTransfer.getData("text/plain");
    let data;
    
    try {
      data = JSON.parse(dataJSON);
    } catch {}

    if (data && data.type === "card") {
      let tileid = data.id;
      let targetid = "";

      if(isTile(e.target.id)) {
        targetid = e.target.id;
      }
      else if(isTile(e.target.parentElement.id)){
        targetid = e.target.parentElement.id;
      }
      else if(isTile(e.target.parentElement.parentElement.id)){
        targetid = e.target.parentElement.parentElement.id;
      }
      if(targetid==null || targetid==undefined) {return};
      
      if(target_type=="line") {
        let newstatus = document.getElementById(e.target.id)!.getAttribute("status-val");
        console.error("tileid: " + tileid + ", newstatus: " + newstatus);
        if(newstatus==null || newstatus==undefined) {return};
        
        let obj:any;
        
        if(DATA_SOURCE=="TEST") 
        {
          obj = griddata!.filter(item=>item!.id==tileid)[0];
          obj!.status = (newstatus || undefined);
        }
        else if(DATA_SOURCE=="CRM") 
        {
          obj = griddata2!.filter(item=>item[configdata.tile_id_field]==tileid)[0];
          obj[configdata.line_picklist_field] = (newstatus || undefined);
        }
        
        if(newstatus==null || newstatus==undefined) {return};
      }

      if(target_type=="tile") {
        if(DATA_SOURCE=="TEST") 
        {
          let newstatus = griddata.filter(item=>item.id==parseInt(targetid))[0].status;
          console.error("tileid: " + tileid + ", newstatus: " + newstatus);
          griddata.filter(item=>item.id==tileid)[0].status=newstatus;
        }
        else if(DATA_SOURCE=="CRM") 
        {
          console.error("targetid: " + targetid);
          let newstatus = griddata2.filter(item=>item[configdata.tile_id_field]==targetid)[0][configdata.line_picklist_field];
          console.error("tileid: " + tileid + ", newstatus: " + newstatus);
          griddata2.filter(item=>item[configdata.tile_id_field]==tileid)[0][configdata.line_picklist_field]=newstatus;
        }
      }

      if(DATA_SOURCE=="TEST") {
        dispatch({ type: "CASEDATA/SETCASEDATA", data1: griddata });
      }
      else if(DATA_SOURCE=="CRM") {
        dispatch({ type: "CASEDATA/SETCASEDATA2", data1: griddata2 });
      }
    }   
}

export function RenderBoard(context:any, container:any) {
    ReactDOM.render(
        <Provider store={store}>
            {/*<p>Logged in: {userData.firstName + " " + userData.lastName}</p>*/}
            <div><Boardcontrol context={context} /></div>
        </Provider>
        , container
      );
}

