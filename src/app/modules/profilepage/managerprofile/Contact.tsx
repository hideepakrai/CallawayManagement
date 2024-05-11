import React from "react";

import {contactList} from './ContactsList'

type Props={
    contactList: data[]
    
}
type data={
    icon:string
    title:string
    desc:string
    id:number
}


const Contact = ({contactList}: Props) => {

  return (
<div className="card card-custom mt-3">
<div className="card-header">
    <h3 className="card-title">Contact</h3>
    
</div>
<div className="card-body">
<div >
      {contactList.map((data:data, index) =>
        <div key={index} className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
        

          <div className="gx-media-body">
            <span className="gx-mb-0 text-muted fw-semibold fs-6">{data.title}</span>
            <p><a href="#" className="gx-mb-0 text-gray-900 fw-bold text-hover-primary fs-6">{data.desc}</a></p>
          </div>
        </div>
      )}
</div>
</div>

</div>

   



  )
}

export default Contact;
