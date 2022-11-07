/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    controlfieldname: ComponentFramework.PropertyTypes.StringProperty;
    entityname: ComponentFramework.PropertyTypes.StringProperty;
    portal_edit_url: ComponentFramework.PropertyTypes.StringProperty;
    crm_edit: ComponentFramework.PropertyTypes.EnumProperty<"1" | "0">;
    top_section_fields: ComponentFramework.PropertyTypes.StringProperty;
    middle_section_fields: ComponentFramework.PropertyTypes.StringProperty;
    bottom_section_fields: ComponentFramework.PropertyTypes.StringProperty;
    line_picklist_field: ComponentFramework.PropertyTypes.StringProperty;
    line_picklist_field2: ComponentFramework.PropertyTypes.StringProperty;
    line_option_values: ComponentFramework.PropertyTypes.StringProperty;
    line_option_texts: ComponentFramework.PropertyTypes.StringProperty;
    line_option_values2: ComponentFramework.PropertyTypes.StringProperty;
    line_option_texts2: ComponentFramework.PropertyTypes.StringProperty;
    related: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    controlfieldname?: string;
}
