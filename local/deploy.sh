DATE_TIME=`date "+%Y-%m-%d %H:%M:%S"`
OUTPUT_STRING="--------------------- $DATE_TIME : shellScript running. ---------------------"
echo $OUTPUT_STRING

# go to root directory
cd ..
cd server 
docker stop university-backend
docker rm university-backend
docker rmi university-backend
docker build -t university-backend .


cd ..
cd client
docker stop university-frontend
docker rm university-frontend
docker rmi university-frontend
docker build -t university-frontend .


docker container ls -a
docker run --name university-frontend -d -it -p 3000:3000 university-frontend
docker run --name university-backend -d -it -p 3001:3001 university-backend

sleep 10

open http://localhost:3000

DATE_TIME=`date "+%Y-%m-%d %H:%M:%S"`
OUTPUT_STRING="--------------------- $DATE_TIME : process completed. ---------------------"
echo $OUTPUT_STRING
