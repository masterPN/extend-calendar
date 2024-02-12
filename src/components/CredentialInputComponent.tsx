import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

function CredentialInputComponent() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const LabelInLineStyles = {
    display: "inline",
  };

  interface environmentConfig {
    env: string;
    client: number;
  }

  const environmentConfigs: environmentConfig[] = [
    { env: "sys0", client: 0 },
    { env: "sys1", client: 1 },
  ];

  interface CredentialInput {
    host: string;
    port: number;
    env: string;
    username: string;
    password: string;
  }

  const OnSubmit = (data: CredentialInput) => {
    const host = data.host;
    const port = data.port;
    const env = data.env;
    const username = data.username;
    const password = data.password;

    const fetchData = async (
      host: string,
      port: number,
      env: string,
      username: string,
      password: string
    ) => {
      console.log("test");

      try {
        setIsLoading(true);
        await environmentConfigs
          .filter((config: environmentConfig) => config.env === env)
          .map((envConfig) => {
            const data = JSON.stringify({
              object_name: "SCRI.EXECUTE.WITH.JSON.INPUT.JSON",
              execution_option: "execute",
            });

            const config = {
              method: "post",
              maxBodyLength: Infinity,
              url:
                "https://" +
                host +
                ":" +
                port +
                "/ae/api/v1/" +
                envConfig.client +
                "/executions",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + btoa(username + ":" + password),
              },
              data: data,
            };

            setResult("Loading " + { env } + "...");
            axios
              .request(config)
              .then((response) => {
                console.log(JSON.stringify(response.data));
                setResult(JSON.stringify(response.data));
              })
              .catch((error) => {
                console.log("error!!!");

                console.log(error);
                setResult(error.response?.data?.message || error.message);
              });
          });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(host, port, env, username, password);
  };

  return (
    <>
      <form onSubmit={handleSubmit(OnSubmit)}>
        <label htmlFor="host" style={LabelInLineStyles}>
          Host
        </label>
        <input
          type="text"
          id="host"
          required
          {...register("host", { required: true })}
        />
        <label htmlFor="port" style={LabelInLineStyles}>
          Port
        </label>
        <input
          type="number"
          id="port"
          required
          {...register("port", { required: true })}
        />
        <p></p>
        <label htmlFor="environment" style={LabelInLineStyles}>
          Environment
        </label>
        <select id="environment" {...register("env")}>
          <option value={"sys0"}>sys0</option>
          <option value={"sys1"}>sys1</option>
        </select>
        <label htmlFor="username" style={LabelInLineStyles}>
          Username
        </label>
        <input
          type="text"
          id="username"
          required
          {...register("username", { required: true })}
        />
        <label htmlFor="password" style={LabelInLineStyles}>
          Password
        </label>
        <input
          type="password"
          id="password"
          required
          {...register("password", { required: true })}
        />
        <p style={LabelInLineStyles}> </p>
        <button type="submit" id="execute">
          Execute
        </button>
      </form>
      <p>{result}</p>
    </>
  );
}

export default CredentialInputComponent;
