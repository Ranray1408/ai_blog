import { configureStore } from '@reduxjs/toolkit';
import mainStatesReducer from './mainStatesSlice';
import membersReducer from './membersStateSlice';
import headerReducer from './headerSlice';
import footerReducer from './footerSlice';
import heroBannerReducer from './heroBannerSlice';
import linkBlocksReducer from './linkBlocksSlice';
import titleBlockReducer from './titleBlockSlice';
import blogInfoBlockReducer from './blogInfoBlockSlice';
import downloadBlocksReducer from './downloadBlocksSlice';
import titleLinksBlockReducer from './titleLinksBlockSlice';
import contactsPageReducer from './contactsPageSlice';
import adminChatsReducer from './adminChatsSlice';
import userChatReducer from './userChatSlice';
import adminActiveCustomersReducer from './adminActiveCustomersSlice';

const store = configureStore({
  reducer: {
    mainStates: mainStatesReducer,
    membersList: membersReducer,
    headerState: headerReducer,
    heroBannerState: heroBannerReducer,
    linkBlocksState: linkBlocksReducer,
    titleBlocksState: titleBlockReducer,
    blogInfoBlockState: blogInfoBlockReducer,
    downloadBlocksState: downloadBlocksReducer,
    titleLinksBlockState: titleLinksBlockReducer,
    footerState: footerReducer,
    contactsPageState: contactsPageReducer,
    adminChatsState: adminChatsReducer,
    userChatState: userChatReducer,
    adminActiveCustomersState: adminActiveCustomersReducer,
  },
});

export default store;
