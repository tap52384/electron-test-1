# electron-test-1
learning electron like https://www.electronjs.org/docs/tutorial/first-app

## Setup

```bash
# 0. Set necessary envs
app_folder=~/code/electron-test-1/
container_name=hakchi
image_name=registry.access.redhat.com/ubi8/nodejs-12:latest
cp -nv "$app_folder".env.example "$app_folder".env
touch "$app_folder".env

# 1. Pull my docker image
docker pull "$image_name"

# 2. Use s2i build to create a usable image for this application
s2i build \
--environment-file "$app_folder".env \
"$app_folder" \
"$image_name" \
nodejs-12:s2i

# 3. Delete any existing containers using this image
docker rm -f $(docker ps -aq --filter ancestor=${image_name} --format="{{.ID}}") || true

# 4. Start the container (not needed if you are not using remote containers with VS Code)
docker run --name "$container_name" \
--env-file "$app_folder".env \
-d -p 8080:8080 \
-p 8443:8443 \
-v "$app_folder":/opt/app-root/src/ \
nodejs-12:s2i
```
