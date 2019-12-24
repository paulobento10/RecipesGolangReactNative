# RecipesGolangReactNative

This is a project for academic purposes that uses Docker with Postgres as the main database, Golang for the API(Model and Controller) and React Native, for the front end technology for the front-end portion for the mobile version.

Installation

Docker(Database + API)

1) Install docker;

2) docker-compose down --rmi all --volume, beware, this command deletes all docker containers, volumes, everything related to docker;

3) Run: docker-compose up --build, the --build only the first time;

React Native

4) Follow: https://facebook.github.io/react-native/docs/getting-started, select React Native CLI Quickstart;

4.1) Open Android Studio;

4.2)  Go to: Tools -> Sdk Manager -> System Setting Android SDK

4.2.1) Place images

4.3) To install sdk, click Apply and then OK

4.4) To edit .bash_profile run: sudo nano ~/.bash_profile or sudo gedit ~/.bash_profile, if you have and prefer using gedit

4.5) Copy and paste: use the ones in https://facebook.github.io/react-native/docs/getting-started
  
  export ANDROID_HOME=$HOME/Android/Sdk
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/tools
  export PATH=$PATH:$ANDROID_HOME/tools/bin 
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  

4.6) To install watchman:

4.6.1) Follow: https://facebook.github.io/watchman/docs/install.html#buildinstall

4.6.2) Beware of the format in these steps

       $ # use the latest stable release
       
       $ git clone https://github.com/facebook/watchman.git -b v4.9.0 --depth 1
       
       $ cd watchman 
       
       $ ./autogen.sh
       
       $ ./configure
       
       $ make
       
       $ sudo make install
       
       $ watchman --version, to check version
       
5) Finally to run the app:

5.1) cd front

5.1.1) You might need to run npm install, and npm install axios

5.2) Connect a physicall device to you computer or use the emulator from Android Studio

5.3) Open two terminal windows, in the first one run: sudo npx react-native start

5.4) In the second one run: sudo npx react-native run-android

5.5) Since React Native, uses SDK 9, it does not allow the use of http, so some changes were made to the AndroidManifest.xml

5.6) Another important change to make is, instead of using localhost in the axios request such as:
      http://localhost:8000/api/searchUser/id/1
      use
      http://192.168.1.68:8000/api/searchUser/id/1

5.7) To obtain your machine's ip, run: ip -c a | grep 192
