import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import RecommendationRequestForm from "main/components/RecommendationRequest/RecommendationRequestForm";
import { recommendationRequestFixtures } from "fixtures/recommendationRequestFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("RecommendationRequestForm tests", () => {

    test("renders correctly", async () => {

        render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await screen.findByText(/Professor Email/);
        await screen.findByText(/Create/);
    });


    test("renders correctly when passing in a RecommendationRequest", async () => {

        render(
            <Router  >
                <RecommendationRequestForm initialContents={recommendationRequestFixtures.oneRequest} />
            </Router>
        );
        await screen.findByTestId(/RecommendationRequestForm-id/);
        expect(screen.getByText(/Id/)).toBeInTheDocument();
        expect(screen.getByTestId(/RecommendationRequestForm-id/)).toHaveValue("1");
    });


    test("Correct Error messsages on bad input", async () => {

        render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await screen.findByTestId("RecommendationRequestForm-professorEmail");
        const professorEmailField = screen.getByTestId("RecommendationRequestForm-professorEmail");
        const requesterEmailField = screen.getByTestId("RecommendationRequestForm-requesterEmail");
        const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

        fireEvent.change(professorEmailField, { target: { value: 'bad-input' } });
        fireEvent.change(requesterEmailField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await screen.findByText(/professorEmail must be a valid email/);
        await screen.findByText(/requesterEmail must be a valid email/);
    });

    test("Correct Error messsages on missing input", async () => {

        render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await screen.findByTestId("RecommendationRequestForm-submit");
        const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

        fireEvent.click(submitButton);

        await screen.findByText(/requesterEmail is required./);
        expect(screen.getByText(/professorEmail is required./)).toBeInTheDocument();
        expect(screen.getByText(/Explanation is required./)).toBeInTheDocument();
        expect(screen.getByText(/dateRequested is required./)).toBeInTheDocument();
        expect(screen.getByText(/dateNeeded is required./)).toBeInTheDocument();
        expect(screen.getByText(/done is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        render(
            <Router  >
                <RecommendationRequestForm submitAction={mockSubmitAction} />
            </Router>
        );
        await screen.findByTestId("RecommendationRequestForm-professorEmail");

        const requesterEmailField = screen.getByTestId("RecommendationRequestForm-requesterEmail");
        const professorEmailField = screen.getByTestId("RecommendationRequestForm-professorEmail");
        const explanationField = screen.getByTestId("RecommendationRequestForm-explanation");
        const dateRequestedField = screen.getByTestId("RecommendationRequestForm-dateRequested");
        const dateNeededField = screen.getByTestId("RecommendationRequestForm-dateNeeded");
        const doneField = screen.getByTestId("RecommendationRequestForm-done");
        const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'abc@gmail.com' } });
        fireEvent.change(professorEmailField, { target: { value: 'def@gmail.com' } });
        fireEvent.change(explanationField, { target: { value: 'it would be so nice' } });
        fireEvent.change(dateRequestedField, { target: { value: '2022-01-02T12:00' } });
        fireEvent.change(dateNeededField, { target: { value: '20223-01-02T12:00' } });
        fireEvent.change(doneField, { target: { value: 'true' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(screen.queryByText(/professorEmail must be a valid email/)).not.toBeInTheDocument();
        expect(screen.queryByText(/requesterEmail must be a valid email/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Explanation is required./)).not.toBeInTheDocument();
        expect(screen.queryByText(/dateRequested is required./)).not.toBeInTheDocument();
        expect(screen.queryByText(/dateNeeded is required./)).not.toBeInTheDocument();
        expect(screen.queryByText(/done is required./)).not.toBeInTheDocument();
    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {

        render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await screen.findByTestId("RecommendationRequestForm-cancel");
        const cancelButton = screen.getByTestId("RecommendationRequestForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


