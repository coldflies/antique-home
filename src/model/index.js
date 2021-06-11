import { all } from 'redux-saga/effects'
import home from './home'
// import header from './header'
// import login from './login'
// import manageAccount from './manageAccount'
// import manageBar from './manageBar'

export default function* rootSaga() {
    yield all([
        home(),
        // header(),
        // login(),
        // manageAccount(),
        // manageBar()
    ])
}