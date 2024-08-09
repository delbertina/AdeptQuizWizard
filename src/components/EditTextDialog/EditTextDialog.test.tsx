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