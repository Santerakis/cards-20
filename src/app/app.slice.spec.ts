import { appActions, appReducer } from "app/app.slice";

describe("appReducer", () => {
  const initialState = {
    error: null,
    isLoading: false,
    isAppInitialized: false,
    unhandleActions: [],
  };

  it("should handle setIsLoading", () => {
    const action = appActions.setIsLoading({ isLoading: true });

    const newState = appReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
  });

  it("should handle setError", () => {
    const newState = appReducer(
      initialState,
      appActions.setError({ error: "Something went wrong" })
    );

    expect(newState.error).toBe("Something went wrong");
  });

  it("should handle multiple actions", () => {
    let newState = appReducer(
      initialState,
      appActions.setIsLoading({ isLoading: true })
    );
    newState = appReducer(
      newState,
      appActions.setError({ error: "Something went wrong" })
    );

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBe("Something went wrong");
    expect(newState).toEqual({
      ...initialState,
      isLoading: true,
      error: "Something went wrong",
    });
  });

  it("should handle unknown action", () => {
    const newState = appReducer(initialState, { type: "UNKNOWN_ACTION" });

    expect(newState).toEqual(initialState);
  });
});
