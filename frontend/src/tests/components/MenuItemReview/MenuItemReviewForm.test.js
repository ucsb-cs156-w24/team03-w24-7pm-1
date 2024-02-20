import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import MenuItemReviewForm from "main/components/MenuItemReview/MenuItemReviewForm";
import { menuItemReviewFixtures } from "fixtures/menuItemReviewFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("MenuItemReviewForm tests", () => {

    test("renders correctly", async () => {

        render(
            <Router  >
                <MenuItemReviewForm />
            </Router>
        );
        expect(screen.getByText(/Item ID/)).toBeInTheDocument();
        expect(screen.getByText(/Create/)).toBeInTheDocument();
    });


    test("renders correctly when passing in a MenuItemReview", async () => {

        render(
            <Router  >
                <MenuItemReviewForm initialContents={menuItemReviewFixtures.oneReview} />
            </Router>
        );
        await screen.findByTestId(/MenuItemReviewForm-id/);
        expect(screen.getByText(/Id/)).toBeInTheDocument();
        expect(screen.getByTestId(/MenuItemReviewForm-id/)).toHaveValue("1");
    });


    test("Correct Error messsages on bad input", async () => {

        render(
            <Router  >
                <MenuItemReviewForm />
            </Router>
        );
        await screen.findByTestId("MenuItemReviewForm-itemId");
        const itemIDField = screen.getByTestId("MenuItemReviewForm-itemId");
        const starsField = screen.getByTestId("MenuItemReviewForm-stars");
        const dateReviewedField = screen.getByTestId("MenuItemReviewForm-dateReviewed");
        const commentsField = screen.getByTestId("MenuItemReviewForm-comments");
        const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

        fireEvent.change(dateReviewedField, { target: { value: 'bad-input' } });
        fireEvent.change(itemIDField, { target: { value: '-1' } });
        fireEvent.change(starsField, { target: { value: '-1' } });
        fireEvent.change(commentsField, { target: { value: "a".repeat(256) } });
        fireEvent.click(submitButton);
        
        await waitFor(() => {expect(screen.getByText(/dateReviewed is required/)).toBeInTheDocument();});
        expect(screen.getByText(/Item Id must be greater than or equal to 0/)).toBeInTheDocument();
        expect(screen.getByText(/Stars must be greater than or equal to 0/)).toBeInTheDocument();
        expect(screen.getByText(/Comments must be less than 255 characters/)).toBeInTheDocument();

        const starsField1 = screen.getByTestId("MenuItemReviewForm-stars");
        fireEvent.change(starsField1, { target: { value: '7' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Stars must be less than or equal to 5/)).toBeInTheDocument();
        });

    });

    test("Correct Error messsages on missing input", async () => {

        render(
            <Router  >
                <MenuItemReviewForm />
            </Router>
        );
        await screen.findByTestId("MenuItemReviewForm-submit");
        const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

        fireEvent.click(submitButton);

        await screen.findByText(/dateReviewed is required/);
        expect(screen.getByText(/Item Id is required/)).toBeInTheDocument();
        expect(screen.getByText(/Stars is required/)).toBeInTheDocument();
        expect(screen.getByText(/Comments are required./)).toBeInTheDocument();
        expect(screen.getByText(/ReviewerEmail is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        render(
            <Router  >
                <MenuItemReviewForm submitAction={mockSubmitAction} />
            </Router>
        );
        await screen.findByTestId("MenuItemReviewForm-itemId");

        const itemIdField = screen.getByTestId("MenuItemReviewForm-itemId");
        const reviewerEmailField = screen.getByTestId("MenuItemReviewForm-reviewerEmail");
        const starsField = screen.getByTestId("MenuItemReviewForm-stars");
        const dateReviewedField = screen.getByTestId("MenuItemReviewForm-dateReviewed");
        const commentsField = screen.getByTestId("MenuItemReviewForm-comments");
        const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

        fireEvent.change(itemIdField, { target: { value: '1011' } });
        fireEvent.change(reviewerEmailField, { target: { value: 'mutation@pitest.com' } });
        fireEvent.change(starsField, { target: { value: '2' } });
        fireEvent.change(dateReviewedField, { target: { value: '2022-01-02T12:00' } });
        fireEvent.change(commentsField, { target: { value: 'not the best but not the worst' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(screen.queryByText(/DateReviewed must be in ISO format/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Item Id must be greater than or equal to 0/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Stars must be greater than or equal to 0/)).not.toBeInTheDocument();

    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {

        render(
            <Router  >
                <MenuItemReviewForm />
            </Router>
        );
        await screen.findByTestId("MenuItemReviewForm-cancel");
        const cancelButton = screen.getByTestId("MenuItemReviewForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


