import { createSlice } from "@reduxjs/toolkit";
import {UserAccountModel,OrderData} from "../../modules/model/useAccount/UserAccountModel"
// Define interface for Redux state
interface UserState {
    currentUser: unknown[],
    UserAccount: UserAccountModel[],
    adminToken: null | string,
}


const UserSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: [],
        UserAccount: [],
        adminToken: null,
    } as UserState, 
    reducers: {
        addUser: (state, action) => {
            state.currentUser = action.payload.currentUser;
        },
        addUserAccount: (state, action) => {
            state.UserAccount = action.payload.UserAccount;
        },
        addAdminToken: (state, action) => {
            state.adminToken = action.payload.adminToken;
        }, 
        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload;
            state.UserAccount.forEach((userAccount) => {
                if (userAccount.attributes && userAccount.attributes.orders && userAccount.attributes.orders.data) {
                    userAccount.attributes.orders.data.forEach((order: OrderData) => {
                        if (order.id === orderId) {
                            order.attributes!.Status = status;
                        }
                    });
                }
            });
        },
    
    }
});


export const { addUser, addUserAccount, addAdminToken ,updateOrderStatus} = UserSlice.actions;


export const getCurrentUser = (state: { user: UserState }) => state.user.currentUser;
export const getAdminToken = (state: { user: UserState }) => state.user.adminToken;
export const getUserAccount = (state: { user: UserState }) => state.user.UserAccount
// Export reducer
export default UserSlice.reducer;
