// import {FC} from 'react'
// import {PageTitle} from 'sr/layout/master-layout'

// const BuilderPageWrapper: FC = () => {
//   return (
//     <>
//       <PageTitle breadcrumbs={[]}>Layout Builder</PageTitle>
//       {/* <BuilderPage /> */}
//     </>
//   )
// }

// export default BuilderPageWrapper
import React from 'react';
import DashboardWrapper from '../dashboard/DashboardWrapper';

const withCustomComponent = (CustomComponent:React.FC) => (props:any) => (
  <DashboardWrapper customComponent={CustomComponent} {...props} />
);

export default withCustomComponent;

