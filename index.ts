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
	import pcfboardcontrol = require("./boardcontroltsx");

	export class PCFSimpleGroupingList implements ComponentFramework.StandardControl<IInputs, IOutputs>
	{
		private _container: HTMLDivElement;
		private _context: ComponentFramework.Context<IInputs>;
		private _controlViewRendered: boolean;

		public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
			this._context = context;
			this._controlViewRendered = false;

			this._container = document.createElement("div");
			this._container.setAttribute("id","comp1divid");
			container.appendChild(this._container);
		}
		
		public updateView(context: ComponentFramework.Context<IInputs>): void {
			this._context = context;

			if (!this._controlViewRendered) {
				this._controlViewRendered = true;
								
				pcfboardcontrol.RenderBoard(this._context, this._container);
			}
		}
		
		public getOutputs(): IOutputs {
			// no-op: method not leveraged by this example custom control
			return {};
		}
		
		public destroy(): void {
			// no-op: method not leveraged by this example custom control
		}
	}
