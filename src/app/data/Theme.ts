export interface Theme { 
    name: string;
    properties: CssVar[];
}

export interface CssVar {
  key: string;
  value: string;
}

export const light: Theme = {
    name: "light",
    properties: [
      {key: '--textColor', value: '#222222'},
      {key: '--backgroundColor', value: '#ecefed'},
      {key: '--cardColor', value: '#222222'},
      {key: '--cardBackground', value: '#f0f5f3'},
    ]
  };
  
  export const dark: Theme = {
    name: "dark",
    properties: [
      {key: '--textColor', value: '#FFFFFF'},
      {key: '--backgroundColor', value: '#222222'},
      {key: '--cardColor', value: '#FFFFFF'},
      {key: '--cardBackground', value: '#222222'},
    ]
  };