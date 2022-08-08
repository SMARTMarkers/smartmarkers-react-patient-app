import React from "react";
import { Switch, Redirect } from "../react-router";
import { RouteWithLayout, PrivateRouteWithLayout } from "../components";
import { Main as MainLayout } from "../layouts";

import {
  NotFoundScreen,
  DashboardScreen,
  SettingsScreen,
  SurveyScreen,
  SurveysListScreen,
  SurveyWizardScreen,
  LoginScreen,
  QuestionnaireScreen,
  CompletedScreen,
  TaskScreen,
  ResponseScreen,
  FhirResource,
} from "../screens";
import { useFhirContext } from "../smartmarkers-router";
import ManualScreen from "../screens/ManualScreen";

const Routes: React.FC = () => {
  const fhirContext = useFhirContext();

  return (
    <Switch>
      <Redirect exact from="/" to={`/dashboard`} />
      {fhirContext.isAuthenticated && (
        <Redirect exact from="/login" to="/dashboard" />
      )}
      <RouteWithLayout
        exact
        path="/login"
        component={LoginScreen}
        layout={MainLayout}
      />
      <PrivateRouteWithLayout
        component={DashboardScreen}
        exact
        layout={MainLayout}
        path="/dashboard"
        isAuthenticated={fhirContext.isAuthenticated}
      />
      <PrivateRouteWithLayout
        component={SettingsScreen}
        exact
        layout={MainLayout}
        path="/settings"
        isAuthenticated={fhirContext.isAuthenticated}
      />
      <PrivateRouteWithLayout
        component={SurveysListScreen}
        exact
        layout={MainLayout}
        path="/my-surveys"
        isAuthenticated={fhirContext.isAuthenticated}
      />
      <PrivateRouteWithLayout
        component={TaskScreen}
        exact
        layout={MainLayout}
        path="/history/:srId/:qId/:completed/:instrumentTitle"
        isAuthenticated={fhirContext.isAuthenticated}
      />
      <PrivateRouteWithLayout
        component={ResponseScreen}
        exact
        layout={MainLayout}
        path="/response/:qrId"
        isAuthenticated={fhirContext.isAuthenticated}
      />
      <PrivateRouteWithLayout
        component={CompletedScreen}
        exact
        layout={MainLayout}
        path="/completed"
        isAuthenticated={fhirContext.isAuthenticated}
      />
      <PrivateRouteWithLayout
        component={SurveyScreen}
        exact
        layout={MainLayout}
        path="/survey/:example"
        isAuthenticated={fhirContext.isAuthenticated}
      />
      <PrivateRouteWithLayout
        component={ManualScreen}
        exact
        layout={MainLayout}
        path="/manual"
        isAuthenticated={fhirContext.isAuthenticated}
      />
      <PrivateRouteWithLayout
        component={SurveyWizardScreen}
        exact
        layout={MainLayout}
        path="/survey-wizard/:example"
        isAuthenticated={fhirContext.isAuthenticated}
      />
      <PrivateRouteWithLayout
        component={QuestionnaireScreen}
        exact
        layout={MainLayout}
        path="/questionnaire/:rid/:id"
        isAuthenticated={fhirContext.isAuthenticated}
      />
      <RouteWithLayout
        component={NotFoundScreen}
        exact
        layout={MainLayout}
        path="/not-found"
      />
      <PrivateRouteWithLayout
        component={FhirResource}
        exact
        layout={MainLayout}
        path="/response/:qrId/resource"
        isAuthenticated={fhirContext.isAuthenticated}
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
