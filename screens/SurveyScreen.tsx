import React from "react";
import { useParams } from "../react-router";
import { ExampleType, ExampleMap } from "../example";

import { Form, FormData, IQuestionnaireResponse } from "../smartmarkers-router";

interface RouteParams {
  example: string;
}

const SurveyScreen: React.FC<any> = (props) => {
  const { example } = useParams<RouteParams>();
  const questionnaireData = ExampleMap[example as ExampleType];
  const onSubmit = (formData: FormData, response: IQuestionnaireResponse) => {
    alert(JSON.stringify(response));
  };
  return <Form questionnaire={questionnaireData} onSubmit={onSubmit} />;
};

export default SurveyScreen;
