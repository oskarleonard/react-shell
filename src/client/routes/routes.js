import universal from 'react-universal-component';

export default [
  {
    path: '/',
    exact: true,
    componentPath: 'routes/homeRoute/HomeRoute',
    Component: universal(import('routes/homeRoute/HomeRoute')),
  },
  {
    path: '/team',
    exact: true,
    componentPath: 'routes/teamRoute/TeamRoute',
    Component: universal(import('routes/teamRoute/TeamRoute')),
  },
];
