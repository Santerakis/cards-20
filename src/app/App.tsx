import LinearProgress from "@mui/material/LinearProgress";
import { useAppSelector } from "common/hooks";
import { isLoadingSelector } from "app/app.selector";

export const App = () => {
  const isLoading = useAppSelector(isLoadingSelector);

  return <div className="App">{isLoading && <LinearProgress />}</div>;
};
