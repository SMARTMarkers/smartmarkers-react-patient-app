import React from "react";
import { useParams, useHistory } from "../react-router";
import { View, Text, ListItem, Body, List, Right, Icon } from "native-base";
import {
  QuestionnaireResponse,
  QuestionnaireResponseView,
} from "../smartmarkers-router";
import { Store } from "../store/models";
import { useSelector } from "react-redux";

interface RouteParams {
  qrId: string;
}

const ResponseScreen: React.FC<any> = (props) => {
  const { qrId } = useParams<RouteParams>();
  const history = useHistory();
  const selectedReport = useSelector(
    (store: Store) => store.root.selectedReport
  );

  const goToFhirResource = () => history.push(`/response/${qrId}/resource`);

  return (
    <View>
      {selectedReport &&
        selectedReport.resourceType === "QuestionnaireResponse" && (
          <QuestionnaireResponseView
            response={selectedReport as QuestionnaireResponse}
          />
        )}
      <List style={{ paddingTop: 30 }}>
        <ListItem style={{ borderTopWidth: 1 }} onPress={goToFhirResource}>
          <Body>
            <Text>FHIR Resource</Text>
          </Body>
          <Right>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
      </List>
    </View>
  );
};

export default ResponseScreen;
