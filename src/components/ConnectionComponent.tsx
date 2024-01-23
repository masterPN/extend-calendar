import { useState } from "react";
import CredentialInputComponent from "./CredentialInputComponent";

const defaultConnections = [
  { id: 0, env: "sys0" },
  { id: 1, env: "sys1" },
  { id: 2, env: "sys2" },
];
export default function ConnectionsComponent() {
  const [connections] = useState(defaultConnections);

  return (
    <>
      <p>Please fill your credential to entend calendar in system.</p>
      {connections.map((connection) => {
        return (
          <div>
            <p>{connection.env}</p>
            <CredentialInputComponent />
          </div>
        );
      })}
    </>
  );
}
