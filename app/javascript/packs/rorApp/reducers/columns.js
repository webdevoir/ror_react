import {
  COLUMNS_FETCH,
  COLUMNS_ADD_REQUEST,
  COLUMNS_ADD_SUCCESS,
  COLUMNS_ADD_FAILURE,
  COLUMNS_EDIT_REQUEST,
  COLUMNS_EDIT_SUCCESS,
  COLUMNS_EDIT_FAILURE,
} from '../actions'

function columns(state = [], action) {
  let items = []

  switch (action.type) {
    case COLUMNS_FETCH:
      let {data} = action.payload
      return Object.assign({}, state, {
        isFetching: false,
        items: data,
      })

    case COLUMNS_ADD_SUCCESS:
      let {response} = action.payload
      if (state.items) items = state.items.slice(0)
      items = items.concat(response)

      return Object.assign({}, state, {
        isFetching: false,
        items: items,
      })

    case COLUMNS_EDIT_SUCCESS:
      let updatedColumn = action.payload.response
      state.items.forEach((v, i) => {
        if (v._id.$oid === updatedColumn._id.$oid) v.values = updatedColumn.values
        items.push(v);
      })

      return Object.assign({}, state, {
        isFetching: false,
        items: items,
      })

    case COLUMNS_EDIT_REQUEST:
      return state

    case COLUMNS_ADD_REQUEST:
    case COLUMNS_EDIT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })

    case COLUMNS_ADD_FAILURE:
    case COLUMNS_EDIT_FAILURE:
      let {error} = action.payload
      console.error('An error occurred.', error)

      return Object.assign({}, state, {
        isFetching: false,
      })

    default:
      return state
  }
}

export default columns
