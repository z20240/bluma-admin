cd mongodb-macos-x86_64-4.2.8/bin/;

TODAY=$(date +"%Y-%m-%d")
mongod --dbpath ../../data/db | tee -a ../../data/db-$TODAY.log;
