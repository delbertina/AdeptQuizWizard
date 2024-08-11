import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EditTextDialog from "./EditTextDialog";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

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
        handleDialogClose={(edited?: string) => onSubmit(edited)}
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
        handleDialogClose={(edited?: string) => onSubmit(edited)}
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

test("submit button calls close with initial data", async () => {
  const initialFieldValue = "Initial Field Value";
  const onSubmit = jest.fn();
  render(
    <Provider store={store}>
      <EditTextDialog
        isDialogOpen={true}
        dialogTitle=""
        dialogDescription=""
        dialogFieldLabel=""
        dialogFieldValue={initialFieldValue}
        handleDialogClose={(edited?: string) => onSubmit(edited)}
      />
    </Provider>
  );
  const submitButton = screen.getByTestId("submit-button");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(1);
  });
  expect(onSubmit).toBeCalledWith(initialFieldValue);
});

test("cancel button calls close without initial data", async () => {
  const initialFieldValue = "Initial Field Value";
  const onSubmit = jest.fn();
  render(
    <Provider store={store}>
      <EditTextDialog
        isDialogOpen={true}
        dialogTitle=""
        dialogDescription=""
        dialogFieldLabel=""
        dialogFieldValue={initialFieldValue}
        handleDialogClose={(edited?: string) => onSubmit(edited)}
      />
    </Provider>
  );
  const cancelButton = screen.getByTestId("cancel-button");
  expect(cancelButton).toBeInTheDocument();
  fireEvent.click(cancelButton);
  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(1);
  });
  expect(onSubmit).not.toBeCalledWith(initialFieldValue);
});

test("submit button calls close with new data", async () => {
  const newFieldValue = "New Field Value";
  const fieldLabel = "Field Label";
  const onSubmit = jest.fn();
  render(
    <Provider store={store}>
      <EditTextDialog
        isDialogOpen={true}
        dialogTitle=""
        dialogDescription=""
        dialogFieldLabel={fieldLabel}
        dialogFieldValue=""
        handleDialogClose={(edited?: string) => onSubmit(edited)}
      />
    </Provider>
  );
  const textField = screen.getByLabelText(fieldLabel, {exact:false});
  await userEvent.type(textField, newFieldValue);
  expect(textField).toHaveValue(newFieldValue);

  const submitButton = screen.getByTestId("submit-button");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(1);
  });
  expect(onSubmit).toBeCalledWith(newFieldValue);
});

test("cancel button calls close without new data", async () => {
  const newFieldValue = "New Field Value";
  const fieldLabel = "Field Label";
  const onSubmit = jest.fn();
  render(
    <Provider store={store}>
      <EditTextDialog
        isDialogOpen={true}
        dialogTitle=""
        dialogDescription=""
        dialogFieldLabel={fieldLabel}
        dialogFieldValue=""
        handleDialogClose={(edited?: string) => onSubmit(edited)}
      />
    </Provider>
  );
  const textField = screen.getByLabelText(fieldLabel, {exact:false});
  await userEvent.type(textField, newFieldValue);
  expect(textField).toHaveValue(newFieldValue);

  const cancelButton = screen.getByTestId("cancel-button");
  expect(cancelButton).toBeInTheDocument();
  fireEvent.click(cancelButton);
  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(1);
  });
  expect(onSubmit).not.toBeCalledWith(newFieldValue);
});