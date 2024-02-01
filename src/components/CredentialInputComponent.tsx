import { useForm } from "react-hook-form";
import FetchExecutionComponent from "./FetchExecutionComponent";

function CredentialInputComponent() {
  const { register, handleSubmit } = useForm();

  const LabelInLineStyles = {
    display: "inline",
  };

  return (
    <form
      onSubmit={handleSubmit((data) =>
        FetchExecutionComponent(data.environment, data.username, data.password)
      )}
    >
      <p style={LabelInLineStyles}>Environment</p>
      <select {...register("environment")}>
        <option value={"sys1"}>sys1</option>
        <option value={"sys2"}>sys2</option>
      </select>
      <p style={LabelInLineStyles}>Username </p>
      <input
        type="text"
        required
        {...register("username", { required: true })}
      />
      <p style={LabelInLineStyles}> Password </p>
      <input
        type="password"
        required
        {...register("password", { required: true })}
      />
      <p style={LabelInLineStyles}> </p>
      <input type="submit" />
    </form>
  );
}

export default CredentialInputComponent;
