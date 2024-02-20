import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function MenuItemReviewForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker restore all

    const navigate = useNavigate();

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks

    // Stryker disable next-line Regex
    const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;

    return (

        <Form onSubmit={handleSubmit(submitAction)}>


            <Row>

                {initialContents && (
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="id">Id</Form.Label>
                            <Form.Control
                                data-testid="MenuItemReviewForm-id"
                                id="id"
                                type="text"
                                {...register("id")}
                                value={initialContents.id}
                                disabled
                            />
                        </Form.Group>
                    </Col>
                )}

                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="itemId">Item ID</Form.Label>
                            <Form.Control
                                data-testid="MenuItemReviewForm-itemId"
                                id="itemId"
                                type="number"
                                isInvalid={Boolean(errors.itemId)}
                                {...register("itemId", { required: "Item Id is required" ,
                                    min: { value: 0, message: "Item Id must be greater than or equal to 0" }})}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.itemId?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Form.Group className="mb-3" >
                    <Form.Label htmlFor="reviewerEmail">Reviewer Email</Form.Label>
                    <Form.Control
                        data-testid={"MenuItemReviewForm-reviewerEmail"}
                        id="reviewerEmail"
                        type="text"
                        isInvalid={Boolean(errors.reviewerEmail)}
                        {...register("reviewerEmail", {
                            required: "ReviewerEmail is required."
                        })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.reviewerEmail?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="stars">Stars</Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-stars"
                            id="stars"
                            type="number"
                            isInvalid={Boolean(errors.stars)}
                            {...register("stars", { required: "Stars is required" ,
                                min: { value: 0, message: "Stars must be greater than or equal to 0" },
                                max: { value: 5, message: "Stars must be less than or equal to 5" }})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.stars?.message}

                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="dateReviewed">Date Reviewed (iso format)</Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-dateReviewed"
                            id="dateReviewed"
                            type="datetime-local"
                            isInvalid={Boolean(errors.dateReviewed)}
                            {...register("dateReviewed", { required: "dateReviewed is required", pattern: isodate_regex })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dateReviewed?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>

                <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="comments">Comments</Form.Label>
                        <Form.Control
                            data-testid="MenuItemReviewForm-comments"
                            id="comments"
                            type="text"
                            isInvalid={Boolean(errors.name)}
                            {...register("comments", {
                                required: "Comments are required.",
                                maxLength: { value: 255, message: "Comments must be less than 255 characters" }
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.comments?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button
                        type="submit"
                        data-testid="MenuItemReviewForm-submit"
                    >
                        {buttonLabel}
                    </Button>
                    <Button
                        variant="Secondary"
                        onClick={() => navigate(-1)}
                        data-testid="MenuItemReviewForm-cancel"
                    >
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Form>

    )
}

export default MenuItemReviewForm;
