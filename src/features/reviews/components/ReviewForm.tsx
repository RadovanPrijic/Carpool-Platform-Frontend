import { ChangeEvent } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Textarea from "../../../components/TextArea";

interface ReviewFormProps {
  rating: number;
  comment: string;
  type: "create" | "update";
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  rating,
  comment,
  type,
  onSubmit,
  onChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Input
        label="Rating"
        id="rating"
        name="rating"
        type="number"
        value={rating}
        min={1}
        max={5}
        onChange={onChange}
        placeholder="Choose your rating ..."
        required
      />
      <Textarea
        label="Comment"
        id="comment"
        name="comment"
        value={comment}
        maxLength={1000}
        onChange={onChange}
        placeholder="Enter your comment ..."
      />
      <Button
        label={type === "create" ? "Post review" : "Edit review"}
        type="submit"
      />
    </form>
  );
};

export default ReviewForm;
