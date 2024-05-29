import { createSlice } from "@reduxjs/toolkit";
import {UserAccountModel,OrderData} from "../../modules/model/useAccount/UserAccountModel";
import {AccountOrder} from "../../modules/model/CartOrder/CartModel"
import { RetailerModel } from "../../modules/model/AccountType/retailer/RetailerModel";
import { CurentUser } from "../../modules/model/useAccount/CurrentUser";
// Define interface for Redux state
interface UserState {
    currentUser: CurentUser| null,
    UserAccount: UserAccountModel|null,
    UserRetailer:RetailerModel[]
    adminToken: null | string,
    userOrders: unknown[],
    userProfile: CurentUser[],
    
}


const UserSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        UserAccount: null,
        UserRetailer:[],
        adminToken: null,
        userOrders:[],
        userProfile:[]
    } as UserState, 
    reducers: {
        resetUserAccount:(state)=>{
        state.currentUser=null;
        state.UserAccount=null;
        state.UserRetailer=[];
        state.adminToken=null;
            state.userOrders=[];
        },
        addUser: (state, action) => {
            state.currentUser = action.payload.currentUser;
            state.UserRetailer=action.payload.UserRetailer;
            state.adminToken=action.payload.adminToken;
            state.userProfile= action.payload.profile


        },
        addUserRetailer:(state,action)=>{
            state.UserRetailer=action.payload.UserRetailer;
        },
        addUserAccount: (state, action) => {
            state.UserAccount = action.payload.UserAccount;
        },
        // addUserInfo: (state, action) => {
        //     state.UserInfo = action.payload.UserInfo;
        // },
        addAdminToken: (state, action) => {
            state.adminToken = action.payload.adminToken;
        }, 
        addUserOrders:(state,action)=>{
            state.userOrders = action.payload.userOrders
        },
        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload;
              
        },
    
    }
});


export const { addUser, addUserAccount,
    addAdminToken ,
    addUserOrders,updateOrderStatus,resetUserAccount,addUserRetailer} = UserSlice.actions;


export const getCurrentUser = (state: { user: UserState }) => state.user.currentUser;
export const getUserProfile = (state: { user: UserState }) => state.user.userProfile;
export const getAdminToken = (state: { user: UserState }) => state.user.adminToken;
export const getUserAccount = (state: { user: UserState }) => state.user.UserAccount
export const getUserRetailer = (state: { user: UserState }) => state.user.UserRetailer
export const getUserOrders = (state: { user: UserState }) => state.user.userOrders
// Export reducer
export default UserSlice.reducer;
