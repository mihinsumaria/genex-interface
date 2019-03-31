[![Build Status](https://travis-ci.com/mihinsumaria/genex-interface.svg?token=JV6Lzpw6RdVFisK63Hhc&branch=master)](https://travis-ci.com/mihinsumaria/genex-interface)

# genex-interface

GENEX (General Exploration System) Interface is an interface built on top of a time series exploration that facilitates series exploration with multiple distances.
## Install Dependencies
#### Linux:
Run the following command in the cloned repository:
```
git submodule update --init --recursive
```
Install genex by following the instructions [here](https://github.com/mihinsumaria/genex/tree/8d858b10410d95e38dfe88c826d28a70ea6a61f5).

Install nodejs and npm using the following commands:
```
curl -sL https://deb.nodesource.com/setup_10.x | bash -
sudo apt-get install -y nodejs
```

## Build and Run
### Linux:
Change current directory to `genex-interface/genex-interface/` and run the following commands:
```
npm install
npm run build
```
You can start the server and run the app in the following two ways:

For Development:
```
export FLASK_APP=app.py
flask run
```

For deployment:

We use gunicorn to deploy the app in production. Switch to the `production` branch and run the following command:
`gunicorn --workers=WORKERS --timeout=TIMEOUT --bind=BIND wsgi`

Refer to [gunicorn's documentation](http://docs.gunicorn.org/en/stable/run.html) to understand what your arguments should be.

You can also use docker to build the exact environment that was used by us. You can build a container in Docker using the following command in the cloned directory in the `production` branch:
```
docker build -t <image_name> .
docker run -d --name=<container_name> -p PORT:PORT <image_name>
```

Refer to docker documentation to set the arguments, or to add any additional arguments.

