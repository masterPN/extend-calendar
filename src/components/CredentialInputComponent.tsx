import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

function CredentialInputComponent() {
  const { register, handleSubmit } = useForm<CredentialInput>();
  const [result, setResult] = useState("");
  const environmentConfigs: environmentConfig[] = [
    { env: "sys0", client: 0 },
    { env: "sys0", client: 1 },
  ];

  interface environmentConfig {
    env: string;
    client: number;
  }

  type CredentialInput = {
    host: string;
    port: number;
    env: string;
    username: string;
    password: string;
  };

  interface PostExecutionResponse {
    runId: number;
  }

  interface RunIdMap {
    client: number;
    runId: number;
  }

  interface GetExecutionReportResponseData {
    page: number;
    content: string;
  }

  interface GetExecutionReportResponse {
    total: number;
    data: GetExecutionReportResponseData[];
    hasmore: boolean;
  }

  const OnSubmit = (data: CredentialInput) => {
    async function postExecutions(
      host: string,
      port: number,
      env: string,
      username: string,
      password: string
    ) {
      let resultString = "";
      const runIdMaps: RunIdMap[] = [];

      await Promise.all(
        environmentConfigs
          .filter((config: environmentConfig) => config.env === env)
          .map(async (envConfig) => {
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
              },
              auth: {
                username: username,
                password: password,
              },
              data: data,
            };

            resultString += "Loading Client " + envConfig.client + "...\n";
            setResult(resultString);
            await axios
              .request(config)
              .then((response) => {
                const postExecutionResponse =
                  response.data as PostExecutionResponse;
                console.log(
                  "Client " +
                    envConfig.client +
                    "has been executed with run_id " +
                    postExecutionResponse.runId
                );
                runIdMaps.push({
                  client: envConfig.client,
                  runId: postExecutionResponse.runId,
                });
                resultString += "Client " + envConfig.client + " - SUCCESS\n";
                setResult(resultString);
              })
              .catch((error) => {
                console.log("error from postExecutions");
                console.log(error);
                alert(
                  "Please check client" +
                    envConfig.client +
                    " - " +
                    (error.response?.data?.message || error.message) +
                    "\n"
                );
                resultString += "Client " + envConfig.client + " - FAILED\n";
                setResult(resultString);
              });
          })
      );

      return runIdMaps;
    }

    async function getExecutionsReport(
      host: string,
      port: number,
      username: string,
      password: string,
      runIdMaps: RunIdMap[]
    ) {
      let reportString = "";

      console.log(runIdMaps);

      runIdMaps.forEach(async function (runIdMap) {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url:
            "https://" +
            host +
            ":" +
            port +
            "/ae/api/v1/" +
            runIdMap.client +
            "/executions/" +
            runIdMap.runId +
            "/reports/ACT",
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: username,
            password: password,
          },
        };

        await axios
          .request(config)
          .then((response) => {
            const getExecutionReportResponse =
              response.data as GetExecutionReportResponse;
            reportString += "******************* SOF *******************\n";
            reportString += getExecutionReportResponse.data[0].content + "\n";
            reportString += "******************* EOF *******************\n";
            setResult(reportString);
          })
          .catch((error) => {
            console.log(
              "Failed to get report from client " +
                runIdMap.client +
                " run_id " +
                runIdMap.runId
            );
            console.log(error);
            reportString +=
              "Failed to get report from client " +
              runIdMap.client +
              " run_id " +
              runIdMap.runId +
              "\n";
            setResult(reportString);
          });
      });
    }

    async function main(data: CredentialInput) {
      const runIdMaps = await postExecutions(
        data.host,
        data.port,
        data.env,
        data.username,
        data.password
      );
      await getExecutionsReport(
        data.host,
        data.port,
        data.username,
        data.password,
        runIdMaps
      );
    }

    main(data);
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
      <div className="h-full w-full">
        <textarea
          className="border-2 h-full w-full"
          readOnly
          value={result}
        ></textarea>
      </div>
    </>
  );
}

export default CredentialInputComponent;
