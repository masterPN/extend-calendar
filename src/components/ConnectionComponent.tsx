import CredentialInputComponent from "./CredentialInputComponent";

export default function ConnectionsComponent() {
  return (
    <>
      <p className=" text-center font-sans text-xl my-8">
        Please fill your credential to extend calendar in system.
      </p>
      <div>
        <CredentialInputComponent />
      </div>
    </>
  );
}
