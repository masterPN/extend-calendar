import { useForm } from "react-hook-form";

function CredentialInputComponent() {
  const { register, handleSubmit } = useForm();

  const LabelInLineStyles = {
    display: "inline",
  };

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <p style={LabelInLineStyles}>User name </p>
      <input
        type="text"
        required
        {...register("userName", { required: true })}
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
