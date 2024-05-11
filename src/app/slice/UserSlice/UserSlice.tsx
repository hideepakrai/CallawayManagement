import { createSlice } from "@reduxjs/toolkit";
import {UserAccountModel,OrderData} from "../../modules/model/useAccount/UserAccountModel";
import {AccountOrder} from "../../modules/model/CartOrder/CartModel"
// Define interface for Redux state
interface UserState {
    currentUser: unknown[],
    UserAccount: UserAccountModel[],
    UserInfo:unknown[]
    adminToken: null | string,
    userOrders: AccountOrder[],
}


const UserSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: [],
        UserAccount: [],
        UserInfo:[],
        adminToken: null,
        userOrders:[]
    } as UserState, 
    reducers: {
        resetUserAccount:(state)=>{
        state.currentUser=[];
        state.UserAccount=[];
        state.UserInfo=[];
        state.adminToken=null;
            state.userOrders=[];
        },
        addUser: (state, action) => {
            state.currentUser = action.payload.currentUser;
        },
        addUserAccount: (state, action) => {
            state.UserAccount = action.payload.UserAccount;
        },
        addUserInfo: (state, action) => {
            state.UserInfo = action.payload.UserInfo;
        },
        addAdminToken: (state, action) => {
            state.adminToken = action.payload.adminToken;
        }, 
        addUserOrders:(state,action)=>{
            state.userOrders = action.payload.userOrders
        },
        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload;
              const index = state.userOrders.findIndex(
                (order) => order.id=== orderId
              );
              if (index !== -1 && state.userOrders[index]?.attributes) {
                state.userOrders[index].attributes = {
                    ...state.userOrders[index].attributes,
                    Status: status
                };
            }
        },
    
    }
});


export const { addUser, addUserAccount,
    addUserInfo, addAdminToken ,
    addUserOrders,updateOrderStatus,resetUserAccount} = UserSlice.actions;


export const getCurrentUser = (state: { user: UserState }) => state.user.currentUser;
export const getAdminToken = (state: { user: UserState }) => state.user.adminToken;
export const getUserAccount = (state: { user: UserState }) => state.user.UserAccount
export const getUserInfo = (state: { user: UserState }) => state.user.UserInfo
export const getUserOrders = (state: { user: UserState }) => state.user.userOrders
// Export reducer
export default UserSlice.reducer;
