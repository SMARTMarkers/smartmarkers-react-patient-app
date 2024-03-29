import React, { useEffect } from "react";
import { Text, Button, Form } from "native-base";
import { useFhirContext } from "../smartmarkers-router";
import { useHistory } from "../react-router";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { discovery, serverUrl } from "../urls";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen: React.FC<any> = () => {
  const redirectUri = makeRedirectUri({
    native: "/",
  });
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: "code",
      clientId: "my_web_app",
      scopes: [
        "openid",
        "fhirUser",
        "offline_access",
        "user/*.*",
        "patient/*.*",
        "launch/encounter",
        "launch/patient",
        "profile",
      ],
      redirectUri,
      extraParams: {
        aud: serverUrl,
      },
    },
    discovery
  );

  const fhirContext = useFhirContext();
  const onLoginPress = () => {
    promptAsync();
  };

  const history = useHistory();

  useEffect(() => {
    if (response) {
      const data: any = {
        code: (response as any).params.code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        client_id: "my_web_app",
      };
      var formBody: any = [];
      for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      fetch(discovery.tokenEndpoint, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: formBody,
      })
        .then((res: any) => res.json())
        .then(async (tokenResponse: any) => {
          await fhirContext.loginCallback(
            tokenResponse,
            serverUrl,
            discovery.tokenEndpoint
          );
          history.push("/dashboard");
        })
        .catch((e: any) => e);
    }
  }, [response]);
  return (
    <Form>
      <Text
        style={{
          alignSelf: "center",
          marginTop: 20,
          fontSize: 24,
          fontWeight: "bold",
          flexGrow: 1,
          color: "#002a78",
        }}
      >
        Patient Reported Outcomes
      </Text>
      <Text
        style={{
          alignSelf: "center",
          marginTop: 5,
          fontSize: 24,
          fontWeight: "bold",
          flexGrow: 1,
          color: "#002a78",
        }}
      >
        Patient Login
      </Text>
      <Button
        full
        primary
        style={{ alignSelf: "center", margin: 20, marginTop: 40 }}
        onPress={onLoginPress}
      >
        <Text>Login to EHR</Text>
      </Button>
      <Text style={{ alignSelf: "center", marginTop: 35 }}>
        powered by SMART Markers
      </Text>
    </Form>
  );
};

export default LoginScreen;
