
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { getUserByToken, login, getAdminToken } from '../core/_requests'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { useAuth } from '../core/Auth'
import { useDispatch, useSelector } from 'react-redux'
import "./Login.css"
import { addUser, addAdminToken, getUserRetailer } from "../../../slice/UserSlice/UserSlice"

import GetUserAccount from './GetUserAccount'
import { UserModel } from '../core/_models';
import { LoadingStart } from "../../../slice/loading/LoadingSlice"
import GetRetailerAccount from './GetRetailerAccount'
import GetAllProduct from '../../../api/allProduct/GetAllProduct';
import { getUserAccount } from "../../../slice/UserSlice/UserSlice"
import Manager from "../../../api/manager/Manager"
import { UserAccountModel } from "../../model/useAccount/UserAccountModel"
import GetRetailerInfo from '../../../api/retailers/GetRetailerInfo'
import { Select } from 'antd';
import { RetailerModel } from '../../model/AccountType/retailer/RetailerModel'


const { Option, OptGroup } = Select;
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
  email: 'shashi.kiranshetty@callawaygolf.com',
  password: 'Callaway@1!',
  role: 'manager'
}


/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function TestLogin() {
  const [loading, setLoading] = useState(false)
  const { saveAuth, setCurrentUser } = useAuth()
  const [userName, setUserName] = useState(null)
  const [userId, setUserId] = useState(null)
  const [userRoleId, setUserRoleId] = useState<number | null>(null)
  const [isManager, setisManager] = useState<boolean>(true)
  const [isRetailer, setIsRetailer] = useState<boolean>(false)
  const [isSalesRep, setIsSalesRep] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [grpqlUser, setGrpqlUser] = useState<boolean>(false)
  const [grpqlManager, setGrpqlManager] = useState<boolean>(false)
  const [grpqlRetailer, setGrpqlRetailer] = useState<boolean>(false)
  const [grpqlSalesRep, setGrpqlSalesRep] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)

  const getUserRetailers= useSelector(getUserRetailer)
  const dispatch = useDispatch()

  const navigate= useNavigate()
  const [allSalesRep, setAllSalesRep]= useState<RetailerModel []>([])
  const [allManager, setAllManager]= useState<RetailerModel []>([])
  const [allRetailer, setAllRetailer]= useState<RetailerModel []>([])
  useEffect(()=>{
    const manger:RetailerModel[]=[]
    const retailer:RetailerModel[]=[]
    const saleRep:RetailerModel[]=[]
    if(getUserRetailers && getUserRetailers.length>0){
      getUserRetailers.map((item)=>{
        if(item.role==="Manager"){
          manger.push(item)
        }
        else if(item.role==="Sales Representative"){
          saleRep.push(item)
        }
        else if(item.role==="Retailer"){
          retailer.push(item)
        }
      })
 console.log("hello")
    }
    setAllManager(manger);
    setAllSalesRep(saleRep);
    setAllRetailer(retailer)

  },[getUserRetailers])
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)

      const data = {
        // identifier: values.email,
        email: values.email,
        password: values.password,
      };


      try {
        const response = await login(data)


        saveAuth(response?.token)
        setCurrentUser(response)
        sessionStorage.setItem('refreshAuth', response)
        dispatch(addUser({
          currentUser: response.user,
          UserRetailer: response.accountType,
          adminToken: response.token,
          profile: response.profile

        }))

        setLoading(false)
        navigate("/dashboard")

      } catch (error) {
        if (error) {
          alert("check your username and password")
        }
        saveAuth(undefined)
        setStatus('The login details are incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })


  const getUserAccounts = useSelector(getUserAccount) as UserAccountModel;










  const handleChange = (val: string) => {
    const value= parseInt(val)
    console.log("val", val)
   
     if(getUserRetailers &&getUserRetailers.length>0){
      getUserRetailers.map((item)=>{
        if(item.id===value){
          console.log("item",item)
          if(item.email && item.password_hash){
            formik.setValues({
              ...formik.values,
              email: item.email,
              password: item.password_hash
              
            })
          }
          
        }
      })
     
     }
      
  }

  return (
    <>
      <form
        className='form w-100'
        onSubmit={formik.handleSubmit}
        noValidate
        id='kt_login_signin_form'
      >


      

        {/* begin::Form group */}
        <div className='fv-row mb-8'>
          <div className="form-group">
            {/* <label>Role</label> */}

          
          <div>

            
          <Select
    style={{ width: '100%', height: '40px', marginBottom: '50px' }}
    defaultValue="lucy"
    onChange={handleChange}
  >
    <OptGroup label="Manager">
      {allManager?.map((item) => (
        <Option key={item.id} value={item.id}>{item.name}</Option>
      ))}
    </OptGroup>
    <OptGroup label="Sales Rep">
      {allSalesRep?.map((item) => (
        <Option key={item.id} value={item.id}>{item.name}</Option>
      ))}
    </OptGroup>
    <OptGroup label="Retailers">
      {allRetailer?.map((item) => (
        <Option key={item.id} value={item.id}>{item.name}</Option>
      ))}
    </OptGroup>
  </Select>
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
              'form-control bg-transparent login-input',
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


    
        <div className='fv-row mb-3'>
          <div className="position-relative mb-3">
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete='off'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control bg-transparent login-input',
                { 'is-invalid': formik.touched.password && formik.errors.password },
                { 'is-valid': formik.touched.password && !formik.errors.password }

              )}
            />
            <span
              className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2 eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}></i>

            </span>
          </div>


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
              <span className='indicator-progress' style={{ display: 'block', color: "#fff" }}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Action */}


      </form>





    </>

  )
}
