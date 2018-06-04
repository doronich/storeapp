import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { item } from './item.reducer'

const rootReducer = combineReducers({
    authentication,
    item
});

export default rootReducer;