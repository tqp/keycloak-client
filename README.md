# Keycloak-Client

## Initial Setup
* Create Project
  * `ng new keycloak-client`
* Install Angular Material
  * `ng add @angular/material`
* Install Keycloak
  * `npm install keycloak-angular`
  * `npm install keycloak-js`
* Run Project
  * `npm run start` or `ng serve`

## Step-By-Step Deployment

Preparation and Setup:
* To deploy directly to the "dist" folder, change `angular.json -> projects -> architect -> build -> options -> outputPath` to:
  * "outputPath": "dist",

* Start Docker Desktop
* Run the build script in package.json.
* Run docker-build-image.sh.
* Save image to .tar to move to VM (make sure the 'images' directory exists).
  * `docker image save keycloak-client:latest -o deploy-config/images/keycloak-client.tar`
* Move the image to the AWS
  * `scp -i ./deploy-config/secrets/tims-analytics.pem ./deploy-config/images/keycloak-client.tar ec2-user@ec2-54-146-74-179.compute-1.amazonaws.com:~/.`
* Stop the running Docker container.
* Remove the previous image.
  * `docker image ls`
  * `docker image rm <image_id>`
* Load the image into Docker
  * `docker image load -i keycloak-client.tar`
* Update the docker-compose.yml file to reference the proper image version.
* Start the container using docker-compose:
  * `docker-compose up -d`
