import { render, screen } from "@testing-library/react";
import EditTextDialog from "./EditTextDialog";
import { store } from "../../store/store";
import { Provider } from "react-redux";

test('renders text field', () => {
    render(<Provider store={store}><EditTextDialog 
        isDialogOpen={true}
        dialogTitle=""
        dialogDescription=""
        dialogFieldLabel=""
        dialogFieldValue=""
        handleDialogClose={() => {}}/></Provider>);
    const textField = screen.getByTestId("editedText");
    expect(textField).toBeInTheDocument();
  });

  test('renders title', () => {
    render(<Provider store={store}><EditTextDialog 
        isDialogOpen={true}
        dialogTitle=""
        dialogDescription=""
        dialogFieldLabel=""
        dialogFieldValue=""
        handleDialogClose={() => {}}/></Provider>);
    const titleDisplay = screen.getByTestId("edit-text-dialog-header");
    expect(titleDisplay).toBeInTheDocument();
  });

  test('renders no description when blank', () => {
    render(<Provider store={store}><EditTextDialog 
        isDialogOpen={true}
        dialogTitle=""
        dialogDescription=""
        dialogFieldLabel=""
        dialogFieldValue=""
        handleDialogClose={() => {}}/></Provider>);
    const descriptionDisplay = screen.getByTestId("edit-text-dialog-description");
    expect(descriptionDisplay).not.toBeInTheDocument();
  });

  test('renders description', () => {
    render(<Provider store={store}><EditTextDialog 
        isDialogOpen={true}
        dialogTitle=""
        dialogDescription="Test Description"
        dialogFieldLabel=""
        dialogFieldValue=""
        handleDialogClose={() => {}}/></Provider>);
    const descriptionDisplay = screen.getByTestId("edit-text-dialog-description");
    expect(descriptionDisplay).not.toBeInTheDocument();
  });