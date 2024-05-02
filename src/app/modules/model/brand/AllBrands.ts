export interface BrandModel{
    id?:number,
        attributes?:BrandData,
}

// export interface DataBrand{
  
//         id?:number,
//         attributes?:BrandData,

    
// }

export interface BrandData{
    Name?:string;
    Description?:string;
     Logo?:LogoData
}

export interface LogoData{
    data: DataLogo;
}

export interface DataLogo{
    id?:number,
    attributes?:{
        formats?:{
          thumbnail:FormatsData,
          large?:FormatsData,
          medium?:FormatsData,
          small?:FormatsData
        }
      }
}

export interface FormatsData{
    name?: string;
    hash?: string;
    ext?: string;
    mime?: string;
    path?: null | string;
    width?: number;
    height?: number;
    size?: number;
    url?: string;
  }