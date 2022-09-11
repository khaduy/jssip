export const CAP_NHAT_USER = "CAP_NHAT_USER";

const initialState = {
  user: '',
};

export default function actionForReducer(state = initialState, payload) {
  switch (payload.type) {
    case CAP_NHAT_USER:
      return {
        ...state,
        user: payload.user,
      };
    default:
      return state
  }
}
