import { screen, render, fireEvent, waitFor, waitForElementToBeRemoved } from "@testing-library/react-native";
import SourcesList from "../SourcesList";
import { NavigationContainer } from "@react-navigation/native";
import mainStore from "../../store/mainStore";

jest.mock("../../store/mainStore", () => ({
  getSelectedSourceName: jest.fn(),
  getSources: jest.fn(),
  setSelectedSourceName: jest.fn(),
  loadSources: jest.fn(),
}));

const MockSourcesList = (onSourceChange) => {
  return (
    <NavigationContainer>
      <SourcesList onSourceChange={onSourceChange}></SourcesList>
    </NavigationContainer>
  );
};

describe("Basic tests", () => {
  it("Sources should be displayed", async () => {
    mainStore.getSelectedSourceName.mockReturnValue("selectedSource");
    mainStore.getSources.mockReturnValue(["source1", "source2"]);

    const { getByText } = render(MockSourcesList());

    expect(getByText("source1")).toBeTruthy();
    expect(getByText("source2")).toBeTruthy();
  });

  it("Should allow the user to select a source by clicking on it", () => {
    const sources = ["Source 1", "Source 2", "Source 3"];
    mainStore.getSources.mockReturnValue(sources);
    const onSourceChange = jest.fn();

    const { getByText } = render(MockSourcesList(onSourceChange));

    sources.forEach((source) => {
      fireEvent.press(getByText(source));
      expect(onSourceChange).toHaveBeenCalledWith(source);
    });
  });

  it("Should highlight the selected source with a different style", () => {
    const sources = ["Source 1", "Source 2", "Source 3"];
    mainStore.getSources.mockReturnValue(sources);
    const onSourceChange = jest.fn();
    const selectedSource = "Source 2";

    const { getByText } = render(MockSourcesList(onSourceChange));

    fireEvent.press(getByText(selectedSource));

    expect(getByText(selectedSource)).toHaveStyle("backgroundColor: #fec100");
  });
});
