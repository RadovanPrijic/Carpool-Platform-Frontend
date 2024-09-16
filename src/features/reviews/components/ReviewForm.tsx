import { ChangeEvent } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import { useNavigation } from "react-router";

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
  const navigation = useNavigation();

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
        type="submit"
        label={
          navigation.state === "submitting"
            ? "Submitting ..."
            : type === "create"
            ? "Post review"
            : "Edit review"
        }
        disabled={navigation.state === "submitting"}
      />
    </form>
  );
};

export default ReviewForm;
