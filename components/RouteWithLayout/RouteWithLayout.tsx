import React from "react";
import { Route } from "../../react-router";

interface RouteWithLayoutProps {
  component: React.ComponentClass<any> | React.FunctionComponent<any>;
  layout: React.ComponentClass<any> | React.FunctionComponent<any>;
  path: string;
  exact?: boolean;
}

const RouteWithLayout: React.FC<RouteWithLayoutProps> = ({ ...props }) => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(matchProps: any) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
