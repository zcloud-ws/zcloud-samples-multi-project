# zcloud-samples-multi-project
Sample Project with multiples subprojects

## Install ZWS Cli

```
Valid environment variables values for script
ZWS_OS: linux, win and darwin (Mac)
ZWS_ARCH: amd64 and arm64
```

For example to run in Mac M1:

```bash
 curl https://gh.zcloud.ws/scripts/zws-install.sh | ZWS_OS=darwin ZWS_ARCH=arm64 sh -
 ```

This will install zws cli in your local `bin` folder.

So to run it you will use `bin/./zws`.

## Init config

Get your account id, app id and env name in your environment on [app.zcloud.ws](app.zcloud.ws).

```bash
bin/./zws init-config --account-id <account id> --app-id <app-id> --env-name <env>
```

Example of `.zcloud-config.json` for this example:
```json
{
  "$schema": "https://gh.zcloud.ws/schemas/json/zcloud.config.schema.json",
  "srcDir": "dist/",
  "buildCommand": {
    "script": "npm",
    "args": ["run", "build"],
    "envVars": {}
  },
  "accountId": "",
  "appId": "",
  "envName": ""
}

```

## Deploy

Get your access token in your account on [app.zcloud.ws](app.zcloud.ws).

```bash
 bin/./zws publish --env-name beta --access-token <access token>
```

