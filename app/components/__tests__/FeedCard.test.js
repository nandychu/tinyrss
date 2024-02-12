import { screen, render, fireEvent, waitFor, waitForElementToBeRemoved } from "@testing-library/react-native";
import FeedCard from "../FeedCard";
import { NavigationContainer } from "@react-navigation/native";

let mockedArticle = {
  headerImage: "uri",
  title: "title_test",
  author: "Mark",
  content: "content",
  briefContent: "briefContent",
  index: 0,
  published: '12/10/12',
};

const MockFeedCard = () => {
  return (
    <NavigationContainer>
      <FeedCard article={mockedArticle}></FeedCard>
    </NavigationContainer>
  );
};

describe("Basic tests", () => {
  it("All esentials elements should be on the screen", async () => {
    await waitFor(() => render(<MockFeedCard></MockFeedCard>));

    expect(screen.getByTestId("article-title")).toBeOnTheScreen();
    expect(screen.getByTestId("article-brief")).toBeOnTheScreen();
    expect(screen.getByTestId("article-author")).toBeOnTheScreen();
    expect(screen.getByTestId("article-published")).toBeOnTheScreen();
  });

  it("Author Text element should not be visible if null value", async () => {
    mockedArticle = {...mockedArticle, author: null}
    await waitFor(() => render(<MockFeedCard></MockFeedCard>));

    expect(screen.queryByTestId("article-author")).toBeNull(); 
  });

  it("Published Text element should not be visible if null value", async () => {
    mockedArticle = {...mockedArticle, published: null}
    await waitFor(() => render(<MockFeedCard></MockFeedCard>));

    expect(screen.queryByTestId("article-published")).toBeNull(); 
  });
});
