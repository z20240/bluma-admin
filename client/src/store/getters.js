export default {
    CONST: () => ({
        USER_STATE: {
            UN_ACTIVE: 0,
            ACTIVE: 1
        }
    }),
    token: state => state.app.token,
    userName: state => state.app.userName,
    userEmail: state => state.app.userEmail,
    userAvatar: state => state.app.userAvatar,
    isNavBarVisible: state => state.app.isNavBarVisible,
    isFooterBarVisible: state => state.app.isFooterBarVisible,
    isAsideVisible: state => state.app.isAsideVisible,
    isAsideMobileExpanded: state => state.app.isAsideMobileExpanded,
};