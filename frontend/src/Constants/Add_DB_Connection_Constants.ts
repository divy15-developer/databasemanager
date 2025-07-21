type InputType = 'text' | 'password' | 'number';

type FormNameType = 'ip' | 'user' | 'database' | 'password' | 'developer_id' | 'port'

export type FormField = {
    name : FormNameType,
    label : string,
    type : InputType
};

export const form_constants: FormField[] = [
    {name : 'ip' , label : 'Hostname (IP Address)' , type : 'text'},
    {name : 'database' , label : 'Database name' , type : 'text'},
    {name : 'user' , label : 'User name' , type : 'text'},
    {name : 'password' , label : 'Password' , type : 'password'},
    {name : 'port', label : 'PORT' , type : 'text'},
    {name : 'developer_id' , label : 'Developer ID' , type : 'text'}
];