import { createSlice } from "@reduxjs/toolkit";

// Define interface for Redux state
interface UserState {
    currentUser: unknown[],
    UserAccount: unknown[],
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
        }
    }
});


export const { addUser, addUserAccount, addAdminToken } = UserSlice.actions;


export const getCurrentUser = (state: { user: UserState }) => state.user.currentUser;
export const getAdminToken = (state: { user: UserState }) => state.user.adminToken;
export const getUserAccount = (state: { user: UserState }) => state.user.UserAccount
// Export reducer
export default UserSlice.reducer;
