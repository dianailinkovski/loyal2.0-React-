import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import keys from 'utils/keys';

const Data = React.lazy(() => import('../screens/Data'));
const Page = React.lazy(() => import('../screens/Page'));
const MembersPage = React.lazy(() => import('../screens/MembersPage'));
const MemberSubscription = React.lazy(() =>
  import('../screens/MemberSubscription')
);
const MembersDatacleaner = React.lazy(() =>
  import('../screens/MembersDatacleaner')
);
const RedirectToViewList = () => {
  let { module_name } = useParams();

  if (module_name) {
    return (
      <Navigate
        to={`/data/${module_name}/${keys.DATA_VIEW_LIST_ACTION}`}
        replace
      />
    );
  } else {
    return <Navigate to="/" replace />;
  }
};

export const getRoutes = (
  currentModule = 'Data',
  currentDataID = '',
  currentPage = ''
) => {
  return [
    { path: '/home', exact: true, name: 'Home' }, // Just for breadcrumb & Home feel
    {
      path: `/data/:module_name`,
      exact: true,
      name:
        window.location.pathname.split('/').pop() === 'add' ? currentModule : ''
    }, // Just for breadcrumb
    {
      path: `/data/:module_name/${keys.DATA_ADD_ACTION}`,
      exact: true,
      name: 'Create'
    }, // Just for breadcrumb
    {
      path: '/data/:module_name/:action/:id',
      name: `${currentDataID}`,
      component: Data
    },
    {
      // If user put the module_name without specifying action then redirect to /viewlist
      path: `/data/:module_name`,
      exact: true,
      name: currentModule,
      component: RedirectToViewList
    },
    {
      // If user go to /view without 'id' then redirect to /viewlist
      path: `/data/:module_name/${keys.DATA_VIEW_ACTION}`,
      name: currentModule,
      component: RedirectToViewList
    },
    {
      // If user go to /edit without 'id' then redirect to /viewlist
      path: `/data/:module_name/${keys.DATA_EDIT_ACTION}`,
      name: currentModule,
      component: RedirectToViewList
    },
    {
      path: '/data/:module_name/:action',
      name: currentModule,
      component: Data
    },
    { path: '/:routeKey', name: currentPage, component: Page },
    {
      path: '/datamanager/bb_loyal2_members',
      exact: true,
      name: currentPage,
      component: MembersPage
    },
    {
      path: '/datamanager/bb_loyal2_members/:routeKey/:id',
      exact: true,
      name: currentPage,
      component: MembersPage
    },
    {
      path: '/datamanager/bb_loyal2_members/:routeKey',
      exact: true,
      name: currentPage,
      component: MembersPage
    },
    {
      path: '/members_subscription',
      exact: true,
      name: currentPage,
      component: MemberSubscription
    },
    {
      path: '/members_datacleaner',
      exact: true,
      name: currentPage,
      component: MembersDatacleaner
    }
  ];
};