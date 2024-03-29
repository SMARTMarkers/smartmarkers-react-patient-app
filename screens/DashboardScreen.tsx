import React from "react";
import { useHistory } from "../react-router";
import { List, ListItem, Text, Body, Right, Icon } from "native-base";
import { Task, TaskScheduleStatus } from "../smartmarkers-router";
import { StyleSheet } from "react-native";
import RequestList from "../components/RequestList";
import { useDispatch } from "react-redux";
import { setReports, setSelectedTask } from "../store/main/actions";

const DashboardScreen: React.FC<any> = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onItemPress = async (item: Task) => {
    dispatch(setSelectedTask(item));
    dispatch(setReports([]));
    history.push(
      `history/${item.request?.id}/${
        item.instrument?.id
      }/false/${item.getTitle()}`
    );
  };

  const renderItem = (
    item: Task,
    key: any,
    onItemPress: (item: Task) => void
  ) => (
    <ListItem
      key={key}
      onPress={() => onItemPress(item)}
      noBorder
      style={styles.listItem}
    >
      <Body>
        <Text note>
          #{item?.request?.id} |{" "}
          {new Date(
            item?.request?.meta?.lastUpdated as string
          ).toLocaleDateString("en-US")}{" "}
        </Text>
        <Text>
          Instrument: <Text style={styles.title}>{item.getTitle()}</Text>
        </Text>
        <Text>Requested by: {item?.request?.getRequester()} </Text>
      </Body>
      <Right>
        <Icon style={{ color: "#002a78" }} active name="arrow-forward" />
      </Right>
    </ListItem>
  );

  return (
    <List>
      <ListItem noBorder noIndent>
        <Body>
          <Text style={styles.patientName}>Assessment Requests</Text>
        </Body>
      </ListItem>
      <RequestList
        renderItem={renderItem}
        onItemPress={onItemPress}
        filter={"status=active"}
        statuses={[
          TaskScheduleStatus.Completed,
          TaskScheduleStatus.Due,
          TaskScheduleStatus.Upcoming,
          TaskScheduleStatus.Overdue,
        ]}
      />
    </List>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "#f0f2f8",
    borderRadius: 10,
    marginBottom: 3,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 15,
  },
  title: { color: "#002a78", fontWeight: "bold" },
  note: { color: "#a4a5a6" },
  patientName: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
    color: "#575757",
    marginLeft: 0 ,
  },
});
