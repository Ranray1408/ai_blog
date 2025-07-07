'use client';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import CustomersList from './CustomersList';
import PageBlockCustomShow from './PageBlockCustomShow';

const getApisData = [
  { apiName: 'header', blockKey: 'header_data' },
  { apiName: 'heroBanner', blockKey: 'hero_banner' },
  { apiName: 'linkBlocks', blockKey: 'link_blocks' },
  { apiName: 'titleBlock', blockKey: 'title_blocks_data' },
  { apiName: 'blogInfoBlock', blockKey: 'blog_info_block' },
  { apiName: 'membersList', blockKey: 'members_list' },
  { apiName: 'downloadBlocks', blockKey: 'download_blocks' },
  { apiName: 'titleLinksBlock', blockKey: 'title_links_block' },
  { apiName: 'footer', blockKey: 'footer_data' },
  { apiName: 'contactsPage', blockKey: 'contacts_page_data' },
];

const baseProvider = simpleRestProvider('http://localhost:5000/api');
const dataProvider = {
  ...baseProvider,
  getList: (resource, params) => {
    const customResource =
      resource === 'customers' ? resource : `${resource}/adminData`;
    return baseProvider.getList(customResource, params);
  },
};

const AppAdmin = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="customers" list={CustomersList} />
      {getApisData.map(({ apiName }) => (
        <Resource
          key={apiName}
          name={apiName}
          list={(props) => <PageBlockCustomShow {...props} apiUrl={apiName} />}
        />
      ))}
    </Admin>
  );
};

export default AppAdmin;
