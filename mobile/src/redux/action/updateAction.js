import { CAP_NHAT_USER } from "../reducers/infoReducer";

export const updateUser = (user) => async dispact => {
  try {
    dispact({
      type: CAP_NHAT_USER,
      user: user
    })
    
    console.log("da lay thong tin tu server")
  } catch (error) {
    
  }
}