import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EditTextDialog from "./EditTextDialog";
import { store } from "../../store/store";
import { Provider } from "react-redux";

test("renders text field", () => {
  render(
    <Provider store={store}>
      <EditTextDialog
        isDialogOpen={true}
        dialogTitle=""
        dialogDescription=""
        dialogFieldLabel=""
        dialogFieldValue=""
        handleDialogClose={() => {}}
      />
    </Provider>
  );
  const textField = screen.getByTestId("editedText");
  expect(textField).toBeInTheDocument();
});

test("renders title", () => {
  render(
    <Provider store={store}>
      <EditTextDialog
        isDialogOpen={true}
        dialogTitle=""
        dialogDescription=""
        dialogFieldLabel=""
        dialogFieldValue=""
        handleDialogClose={() => {}}
      />
    </Provider>
  );
  const titleDisplay = screen.getByTestId("edit-text-dialog-header");
  expect(titleDisplay).toBeInTheDocument();
});

test("renders no description when blank", () => {
  render(
    <Provider store={store}>
      <EditTextDialog
        isDialogOpen={true}
        dialogTitle=""
        dialogDescription=""
        dialogFieldLabel=""
        dialogFieldValue=""
        handleDialogClose={() => {}}
      />
    </Provider>
  );
  const descriptionDisplay = screen.queryByTestId(
    "edit-text-dialog-description"
  );
  expect(descriptionDisplay).toBeNull();
});

test("renders description", () => {
  render(
    <Provider store={store}>
      <EditTextDialog
        isDialogOpen={true}
        dialogTitle=""
        dialogDescription="Test Description"
        dialogFieldLabel=""
        dialogFieldValue=""
        handleDialogClose={() => {}}
      />
    </Provider>
  );
  const descriptionDisplay = screen.getByTestId("edit-text-dialog-description");
  expect(descriptionDisplay).toBeInTheDocument();
});

test("submit button calls close", async () => {
  const onSubmit = jest.fn();
  render(
    <Provider store={store}>
      <EditTextDialog
        isDialogOpen={true}
        dialogTitle=""
        dialogDescription=""
        dialogFieldLabel=""
        dialogFieldValue=""
        handleDialogClose={() => onSubmit()}
      />
    </Provider>
  );
  const submitButton = screen.getByTestId("submit-button");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(1);
  });
});

test("cancel button calls close", async () => {
  const onSubmit = jest.fn();
  render(
    <Provider store={store}>
      <EditTextDialog
        isDialogOpen={true}
        dialogTitle=""
        dialogDescription=""
        dialogFieldLabel=""
        dialogFieldValue=""
        handleDialogClose={() => onSubmit()}
      />
    </Provider>
  );
  const cancelButton = screen.getByTestId("cancel-button");
  expect(cancelButton).toBeInTheDocument();
  fireEvent.click(cancelButton);
  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(1);
  });
});
