import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

function CredentialInputComponent() {
  const { register, handleSubmit } = useForm<CredentialInput>();
  const [result, setResult] = useState("");

  interface environmentConfig {
    env: string;
    client: number;
  }

  const environmentConfigs: environmentConfig[] = [
    { env: "sys0", client: 0 },
    { env: "sys1", client: 1 },
  ];

  type CredentialInput = {
    host: string;
    port: number;
    env: string;
    username: string;
    password: string;
  };

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
      try {
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
        console.log("done");
      }
    };

    fetchData(host, port, env, username, password);
  };

  return (
    <>
      <form onSubmit={handleSubmit(OnSubmit)}>
        <div className="my-4">
          <div className="block lg:inline-block my-4 lg:my-0">
            <label htmlFor="host" className="inline mx-4">
              Host
            </label>
            <input
              type="text"
              id="host"
              required
              className="border-2"
              {...register("host", { required: true })}
            />
          </div>
          <div className="block lg:inline-block">
            <label htmlFor="port" className="inline mx-4">
              Port
            </label>
            <input
              type="number"
              id="port"
              required
              className="max-w-32 border-2"
              {...register("port", { required: true })}
            />
          </div>
        </div>
        <div className="my-4">
          <label htmlFor="environment" className="inline mx-4">
            Environment
          </label>
          <select id="environment" className="border-4" {...register("env")}>
            <option value={"sys0"}>sys0</option>
            <option value={"sys1"}>sys1</option>
          </select>
        </div>
        <div className="my-4">
          <div className="block lg:inline-block my-4 lg:my-0">
            <label htmlFor="username" className="inline mx-4">
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              className="border-2"
              {...register("username", { required: true })}
            />
          </div>
          <div className="block lg:inline-block">
            <label htmlFor="password" className="inline mx-4">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="border-2"
              {...register("password", { required: true })}
            />
          </div>
        </div>
        <div className="my-4">
          <button
            type="submit"
            id="execute"
            className="bg-green-400 min-w-24 min-h-10"
          >
            Execute
          </button>
        </div>
      </form>
      <p>{result}</p>
    </>
  );
}

export default CredentialInputComponent;
