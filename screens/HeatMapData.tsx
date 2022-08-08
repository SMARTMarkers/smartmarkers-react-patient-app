import React from "react";
import { useParams, useHistory } from "../react-router";
import {
  List,
  ListItem,
  Text,
  Body,
  Spinner,
} from "native-base";
import {
  useFhirContext,
  Report,
  ReportType,
  ReportFactory,
  HeatMap,
  TransformReports,
  IHeatMap,
} from "../smartmarkers-router";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../store/models";
import { setReports, setSelectedReport } from "../store/main/actions";

interface RouteParams {
  completed: string;
  srId: string;
  qId: string;
}

export const HeatMapData: React.FC<any> = (props) => {
  const { user, server } = useFhirContext();
  const { srId, qId, completed } = useParams<RouteParams>();
  const history = useHistory();
  const reports = useSelector((store: Store) => store.root.reports);
  const dispatch = useDispatch();
  const selectedTask = useSelector((store: Store) => store.root.selectedTask);

  const [isReady, setIsReady] = React.useState(false);

  const [maxRangeValue, setMaxRangeValue] = React.useState<number>();
  const [sectionData, setSectionData] = React.useState<IHeatMap[]>([]);
  const selectedTasks = useSelector((store: Store) => store.root.selectedTask);

  React.useEffect(() => {
    const loadItems = async () => {
      if (server) {
        const items = await server?.getPatientReports(
          ReportType.QuestionnaireResponse,
          `patient=${user?.id}&based-on=ServiceRequest/${srId}`,
          false
        );
        const factory = new ReportFactory(server);
        const reports = items.map((i: any) => factory.createReport(i));
        dispatch(setReports(reports));
        if (reports.length > 0) {
          let heatMapObj = TransformReports(reports, selectedTasks);
          setMaxRangeValue(heatMapObj.maxCount);
          setSectionData(heatMapObj.heatMapArray);
        }
      }
      setIsReady(true);
    };
    loadItems();
  }, [srId, user, user?.id]);

  const getHeatMap = () => {
    if (!isReady && !reports.length) {
      return <Spinner />;
    }

    if (reports?.length && maxRangeValue) {
      return (
        <>
          <HeatMap
            sections={sectionData}
            colors={["#F0B22C", "#E77F24", "#E04931", "#732671"]}
            maxValue={maxRangeValue}
          />
        </>
      );
    } else {
      return (
        <>
          <ListItem>
            <Body>
              <Text note>No Responses Found</Text>
            </Body>
          </ListItem>
        </>
      );
    }
  };

  return (
    <List> 
      {getHeatMap()}
    </List>
  );
};

export default HeatMapData;

const styles = StyleSheet.create({
    
});
