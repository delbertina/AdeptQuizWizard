import { fireEvent, screen, waitFor } from "@testing-library/react";
import EditTextDialog from "./EditTextDialog";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../shared/test-utils";

test("renders text field", () => {
  renderWithProviders(
    <EditTextDialog
      isDialogOpen={true}
      dialogTitle=""
      dialogDescription=""
      dialogFieldLabel=""
      dialogFieldValue=""
      handleDialogClose={() => {}}
    />
  );
  const textField = screen.getByTestId("editedText");
  expect(textField).toBeInTheDocument();
});

test("renders title", () => {
  renderWithProviders(
    <EditTextDialog
      isDialogOpen={true}
      dialogTitle=""
      dialogDescription=""
      dialogFieldLabel=""
      dialogFieldValue=""
      handleDialogClose={() => {}}
    />
  );
  const titleDisplay = screen.getByTestId("edit-text-dialog-header");
  expect(titleDisplay).toBeInTheDocument();
});

test("renders no description when blank", () => {
  renderWithProviders(
    <EditTextDialog
      isDialogOpen={true}
      dialogTitle=""
      dialogDescription=""
      dialogFieldLabel=""
      dialogFieldValue=""
      handleDialogClose={() => {}}
    />
  );
  const descriptionDisplay = screen.queryByTestId(
    "edit-text-dialog-description"
  );
  expect(descriptionDisplay).toBeNull();
});

test("renders description", () => {
  renderWithProviders(
    <EditTextDialog
      isDialogOpen={true}
      dialogTitle=""
      dialogDescription="Test Description"
      dialogFieldLabel=""
      dialogFieldValue=""
      handleDialogClose={() => {}}
    />
  );
  const descriptionDisplay = screen.getByTestId("edit-text-dialog-description");
  expect(descriptionDisplay).toBeInTheDocument();
});

test("submit button calls close", async () => {
  const onSubmit = jest.fn();
  renderWithProviders(
    <EditTextDialog
      isDialogOpen={true}
      dialogTitle=""
      dialogDescription=""
      dialogFieldLabel=""
      dialogFieldValue=""
      handleDialogClose={(edited?: string) => onSubmit(edited)}
    />
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
  renderWithProviders(
    <EditTextDialog
      isDialogOpen={true}
      dialogTitle=""
      dialogDescription=""
      dialogFieldLabel=""
      dialogFieldValue=""
      handleDialogClose={(edited?: string) => onSubmit(edited)}
    />
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
  renderWithProviders(
    <EditTextDialog
      isDialogOpen={true}
      dialogTitle=""
      dialogDescription=""
      dialogFieldLabel=""
      dialogFieldValue={initialFieldValue}
      handleDialogClose={(edited?: string) => onSubmit(edited)}
    />
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
  renderWithProviders(
    <EditTextDialog
      isDialogOpen={true}
      dialogTitle=""
      dialogDescription=""
      dialogFieldLabel=""
      dialogFieldValue={initialFieldValue}
      handleDialogClose={(edited?: string) => onSubmit(edited)}
    />
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
  renderWithProviders(
    <EditTextDialog
      isDialogOpen={true}
      dialogTitle=""
      dialogDescription=""
      dialogFieldLabel={fieldLabel}
      dialogFieldValue=""
      handleDialogClose={(edited?: string) => onSubmit(edited)}
    />
  );
  const textField = screen.getByLabelText(fieldLabel, { exact: false });
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
  renderWithProviders(
    <EditTextDialog
      isDialogOpen={true}
      dialogTitle=""
      dialogDescription=""
      dialogFieldLabel={fieldLabel}
      dialogFieldValue=""
      handleDialogClose={(edited?: string) => onSubmit(edited)}
    />
  );
  const textField = screen.getByLabelText(fieldLabel, { exact: false });
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
