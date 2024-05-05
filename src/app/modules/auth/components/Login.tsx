
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { getUserByToken, login, getAdminToken } from '../core/_requests'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { useAuth } from '../core/Auth'
import { useDispatch, useSelector } from 'react-redux'
import "./Login.css"
import { addUser, addAdminToken } from "../../../slice/UserSlice/UserSlice"

import GetUserAccount from './GetUserAccount'
import { UserModel } from '../core/_models';
import {LoadingStart} from "../../../slice/loading/LoadingSlice"
import GetRetailerAccount from './GetRetailerAccount'
import GetAllProduct from '../../../api/allProduct/GetAllProduct';
import {getUserAccount} from "../../../slice/UserSlice/UserSlice"
import Manager from "../../../api/manager/Manager"
import {UserAccountModel} from "../../model/useAccount/UserAccountModel"
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: 'ankurShriv@gmail.com',
  password: 'Ankur1!',
  role: 'manager'
}


/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const { saveAuth, setCurrentUser } = useAuth()
  const [userName, setUserName] = useState(null)
  const [userId, setUserId] = useState(null)
  const [userRoleId, setUserRoleId] = useState<number|null>(null)
  const [isManager, setisManager] = useState<boolean>(true)
  const [isRetailer, setIsRetailer] =useState<boolean>(false)
  const [isSalesRep, setIsSalesRep] = useState<boolean>(false)
  const [grpqlUser, setGrpqlUser] = useState<boolean>(false)
  const [grpqlManager, setGrpqlManager] = useState<boolean>(false)
  const [grpqlRetailer, setGrpqlRetailer] =useState<boolean>(false)
  const [grpqlSalesRep, setGrpqlSalesRep] = useState<boolean>(false)

  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)

      const data = {
        identifier: values.email,
        password: values.password,
      };

      try {
        const response = await login(data)
        saveAuth(response)
        setUserName(response?.user?.name);
        
       setUserId(response?.user?.id);
       setGrpqlUser(true)
        dispatch(addUser({
          currentUser: response
        }))

        // if(values.role==='retailer'){
        //   setGrpqlManager(false)
        //   setGrpqlRetailer(true)
        //   setGrpqlSalesRep(false)
        // } else if (values.role==='manager'){
        //   setGrpqlManager(true)
        //   setGrpqlRetailer(false)
        //   setGrpqlSalesRep(false)
        // }
        // const token = {
        //   email: "ankurShriv@gmail.com",
        //   password: "AnkurDzinly1!"

        // }
        // const admintoken = await getAdminToken(token)
        // dispatch(addAdminToken({
        //   adminToken: admintoken
        // }))
        // setCurrentUser(response)
        dispatch(LoadingStart())
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The login details are incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })


  const getUserAccounts= useSelector(getUserAccount) as UserAccountModel;
  console.log(getUserAccounts)
  //get user Sale and retailer associated with 
  useEffect(()=>{

    if(getUserAccounts &&
      getUserAccounts.attributes &&
      getUserAccounts.attributes.role &&
      getUserAccounts.attributes.role.data &&
      getUserAccounts.attributes.role.data.attributes  &&
      getUserAccounts.attributes.role.data.attributes.name

    ){
      const userRole:string= getUserAccounts.attributes.role.data.attributes.name
      if(userRole==="manager"){
       
        const id=getUserAccounts?.attributes?.manager?.data?.id
        if (id ) {
         
          setUserRoleId(id);
          setGrpqlManager(true)
          setGrpqlRetailer(false)
          setGrpqlSalesRep(false)
        }
      }
      
    }
  },[getUserAccounts]) 



  const handleResetRoleId=() => {
    setUserRoleId(null)
    setGrpqlManager(false)
    setGrpqlRetailer(false)
    setGrpqlSalesRep(false)
  }
  // afterGetting userId and userName search finds its roles
  const handleResetId = () => {
    setUserId(null)
    setGrpqlUser(false)


  }

  const handleRetailer=()=>{
    setisManager(false);
    setIsRetailer(true);
    setIsSalesRep(false)
    formik.setValues({
      ...formik.values,
      email: 'testretailer@gmail.com',
      password: 'Jaipur1!',
      role:"retailer"
    });
  }
  const handleManager=()=>{
    setisManager(true);
    setIsRetailer(false);
    setIsSalesRep(false)
    formik.setValues({
      ...formik.values,
      email: 'ankurShriv@gmail.com',
      password: 'Ankur1!',
      role:"retailer"
    });
  }
  const handleSalesRep=()=>{
    setIsSalesRep(true)
    setisManager(false);
    setIsRetailer(false);
    formik.setValues({
      ...formik.values,
      email: 'testsalerep@gmail.com',
      password: 'Jaipur1!',
      role:"sales-representtaive"
    });
  }



  return (
    <>
      <form
        className='form w-100'
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >


        {/* end::Separator */}

        {/* {formik.status ? (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        ) : (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>
              Use account <strong>admin@demo.com</strong> and password <strong>demo</strong> to
              continue.
            </div>
          </div>
        )} */}

        {/* begin::Form group */}
        <div className='fv-row mb-8'>
          <div className="form-group">
            {/* <label>Role</label> */}

            <div className="user-section row mb-8">
              <div className="col user-box  text-center col-3" 
              onClick={handleManager}
              >
               
                  <div className='user-checkbox'>
                    <div className="user-img">
                    <img src="https://dzinlystrapi.s3.us-east-2.amazonaws.com/graphic_designer_5b13ac7386.png" alt="Image 1"></img>

                    </div>
                    <h4 className="user-detail d-flex  fs-5 fw-bolder text-gray-900">Manager</h4><div className="tick_container">
                     { isManager && <div className="tick">
                        <i className="bi bi-check2"></i>
                      </div>}
                      
                    </div>
                  </div>
              </div>


              <div className="col user-box text-center col-3"
               onClick={handleRetailer}
              >
                
                  <div className='user-checkbox'>
                    <div className="user-img">
                    <img src=" https://dzinlystrapi.s3.us-east-2.amazonaws.com/people_bc29368361.png" alt="Image 2"></img>
                  </div>
                    <h4 className="user-detail  fs-5 fw-bolder text-gray-900 retailer"
                   
                    >Retailer</h4>
                    <div className="tick_container">
                     { isRetailer &&<div className="tick">
                        <i className="bi bi-check2"></i>
                      </div>}
                    </div>
                  </div>
              </div>

              <div className="col user-box text-center col-3" 
              onClick={handleSalesRep}
              >
               
                  <div className='user-checkbox'>
                    <div className="user-img">
                      <img src="/media/icons/sales-representative.png" alt="Image 3"></img>

                      </div>
                    <h4 className="user-detail  fs-5 fw-bolder text-gray-900"> Sales Rep</h4>
                    <div className="tick_container">
                     {isSalesRep &&<div className="tick">
                        <i className="bi bi-check2"></i>
                      </div>}
                    </div>
                  </div>
              </div>
            </div>



            {/* <div className="radio-inline">
              
              <label className="radio radio-rounded">
                <input
                  type="radio"
                  {...formik.getFieldProps('role')}
                  name="role"
                  value="manager" // Set value for the role
                  checked={formik.values.role === 'manager'} // Check if the value matches the current role
                  onChange={(event) => {
                    // Update email and password values based on the selected role
                    formik.setFieldValue('role', event.target.value);
                    formik.setFieldValue('email', 'ankurShriv@gmail.com');
                    formik.setFieldValue('password', 'Ankur1!');
                  }}
                />
                <span></span>
                Manager
              </label>


              <label className="radio radio-rounded">
                <input
                  type="radio"

                  {...formik.getFieldProps('role')}
                  name="role"
                  value="retailer" // Set value for the role
                  checked={formik.values.role === 'retailer'}
                  onChange={(event) => {
                    // Update email and password values based on the selected role
                    formik.setFieldValue('role', event.target.value);
                    formik.setFieldValue('email', 'reatailer@example.com');
                    formik.setFieldValue('password', 'retailerPassword1!');
                  }}
                />
                <span></span>
                Retailer
              </label>

              <label className="radio radio-rounded">
                <input
                  type="radio"
                  {...formik.getFieldProps('role')}
                  name="role"
                  value="salesRepresentative" // Set value for the role
                  checked={formik.values.role === 'salesRepresentative'}
                  onChange={(event) => {
                    // Update email and password values based on the selected role
                    formik.setFieldValue('role', event.target.value);
                    formik.setFieldValue('email', 'salesRepresentative@example.com');
                    formik.setFieldValue('password', 'salesRepresentativePassword1!');
                  }}
                />
                <span></span>
                Sales Representative
              </label>

            </div> */}



          
          </div>

          <label className='form-label fs-6 fw-bolder text-gray-900'>Email</label>
          <input
            placeholder='Email'
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control bg-transparent',
              { 'is-invalid': formik.touched.email && formik.errors.email },
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
            type='email'
            name='email'
            autoComplete='off'
          />
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='fv-row mb-3'>
          <label className='form-label fw-bolder text-gray-900 fs-6 mb-0'>Password</label>
          <input
            type='password'
            autoComplete='off'
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control bg-transparent',
              {
                'is-invalid': formik.touched.password && formik.errors.password,
              },
              {
                'is-valid': formik.touched.password && !formik.errors.password,
              }
            )}
          />
          {formik.touched.password && formik.errors.password && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Wrapper */}
        <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'> 
        
          <div />

          {/* begin::Link */}
          <Link to='/auth/forgot-password' className='link-primary'>
            Forgot Password ?
          </Link>
          {/* end::Link */}
        </div>
        {/* end::Wrapper */}

        {/* begin::Action */}
        <div className='d-grid mb-10'>
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn sub-btn '
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label text-white'>Continue</span>}
            {loading && (
              <span className='indicator-progress' style={{ display: 'block',color:"#fff" }}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Action */}

       
      </form>
      {grpqlUser&& userId!=null &&<GetUserAccount
        userId={userId}
        resetId={() => handleResetId}
      />}

      {grpqlManager && userRoleId!=null && 
      <Manager
      userRoleId={userRoleId}
      resetmanagerid={handleResetRoleId}
      />}
      {grpqlRetailer&& userId!=null &&<GetRetailerAccount
        userId={userId}
        resetId={() => handleResetId}
      />}

      <GetAllProduct/>
    </>

  )
}
