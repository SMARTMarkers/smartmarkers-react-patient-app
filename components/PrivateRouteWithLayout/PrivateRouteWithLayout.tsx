import React from 'react'
import { Route, Redirect } from '../../react-router'

interface RouteWithLayoutProps {
    component: React.ComponentClass<any> | React.FunctionComponent<any>
    layout: React.ComponentClass<any> | React.FunctionComponent<any>
    path: string
    exact?: boolean
    isAuthenticated: boolean
}

const PrivateRouteWithLayout: React.FC<RouteWithLayoutProps> = ({ ...props }) => {
    const { layout: Layout, component: Component, isAuthenticated, ...rest } = props

    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }

    return (
        <Route
            {...rest}
            render={(matchProps: any) => (
                <Layout>
                    <Component {...matchProps} />
                </Layout>
            )}
        />
    )
}

export default PrivateRouteWithLayout
