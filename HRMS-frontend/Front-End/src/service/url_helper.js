// Login
export const LOGIN_SERVER = "/auth/login"
let USER_ID

//  Admin User Registration
// export const ADMIN_USER_REGISTER = '/user'
export const USERS = '/user';

// if (localStorage.getItem('token'))
export let getUrlWithId = (URL,id) => {

console.log("this is id",id);
    return (URL + "/" + id)
}
// export const TASK_ADD = ''

export const TASK_ADD = '/task'
// export { USER_ID }