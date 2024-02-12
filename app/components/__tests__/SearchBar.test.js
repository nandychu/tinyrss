import { screen, render, fireEvent, waitFor, waitForElementToBeRemoved } from "@testing-library/react-native";
import SearchBar from "../SearchBar";

describe("Basic tests", () => {
  it("All esentials elements should be on the screen", async () => {
    await waitFor(() => render(<SearchBar></SearchBar>));

    expect(screen.getByTestId("search-input")).toBeOnTheScreen();
  });

  it("Test on change funcion call", async () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<SearchBar onChange={onChange} />);

    const input = getByTestId("search-input");
    fireEvent.changeText(input, "hola");


    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalledWith("hola");

      },
      { timeout: 5000 }
    );
  });


  it("Test on change funcion to be called once due debounce from rxjs", async () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<SearchBar onChange={onChange} />);

    const input = getByTestId("search-input");
    fireEvent.changeText(input, "hola");
    fireEvent.changeText(input, "hola1");
    fireEvent.changeText(input, "hola2");

    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalledWith("hola2");
        expect(onChange).toHaveBeenCalledTimes(1)
      },
      { timeout: 5000 }
    );
  });
});
