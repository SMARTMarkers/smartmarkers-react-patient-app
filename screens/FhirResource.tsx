import React from "react";
import { View } from "native-base";
import {
  QuestionnaireResponse,
  FhirResourceView,
} from "../smartmarkers-router";
import { Store } from "../store/models";
import { useSelector } from "react-redux";

const FhirResource: React.FC<any> = (props) => {
  const selectedReport = useSelector(
    (store: Store) => store.root.selectedReport
  );

  return (
    <View>
      {selectedReport &&
        selectedReport.resourceType === "QuestionnaireResponse" && (
          <FhirResourceView
            response={selectedReport as QuestionnaireResponse}
          />
        )}
    </View>
  );
};

export default FhirResource;
