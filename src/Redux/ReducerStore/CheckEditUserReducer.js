const checkEditUser=(state='',action)=>{
    if(action.type=='SAVE_CHECK_EDIT'){
        return action.check
    }
    return state;
}
export default checkEditUser;