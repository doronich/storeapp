import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { item } from './item.reducer'

import { i18nReducer } from 'redux-react-i18n'

const rootReducer = combineReducers({
    authentication,
    item,
    i18n:i18nReducer
});

export default rootReducer;