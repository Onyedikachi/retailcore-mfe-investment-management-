import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this for additional matchers
import ActivityLog from "../../components/summary/ActivityLog";
import {Router} from 'react-router';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    process: 'success'
  }),
  }));
  
  

test("renders the ActivityLog component with loading state", () => {


  const { getByText } = render(
    <ActivityLog isFetching={false} activities={[]} isLoading={true} />
  );

  const loadingText = getByText("Loading");

  expect(loadingText).toBeInTheDocument();
});

test("renders the ActivityLog component with no activities", () => {
  const { getByText } = render(
    <ActivityLog isFetching={false} activities={[]} isLoading={false} />
  );

  const noActivityText = getByText("No activity found");

  expect(noActivityText).toBeInTheDocument();
});

test("renders the ActivityLog component with activities", () => {
  const activities = [
    { description: "Activity 1", created_at: "2021-03-12T12:03:00" },
    { description: "Activity 2", created_at: "2021-03-13T13:05:00" },
  ];

  const { getByText, getAllByTestId } = render(
    <ActivityLog isFetching={false} activities={activities} isLoading={false} />
  );

  const activityDescriptions = activities.map((activity) =>
    getByText(activity.description)
  );
  const activityTimeStamps = getAllByTestId("activity-timestamp");

  activityDescriptions.forEach((activityDescription, index) => {
    expect(activityDescription).toBeInTheDocument();
  });
});
